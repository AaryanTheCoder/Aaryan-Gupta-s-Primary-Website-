// Broken Thermometer: generate a temperature from -100 to 100, confirm it,
// then complete the pushups, shooter game and broken progress-bar puzzle.

var captcha = document.getElementById("captcha");
var video = document.getElementById("webcam");
var overlay = document.getElementById("poseOverlay");
var startButton = document.getElementById("enableCamera");
var countText = document.getElementById("pushupCount");
var cameraStream = null;
var counter;
var pendingAnswer = "";
var session = 0;
var poseDetector = null;
var detectorLoading = null;
var lastVideoTime = -1;
var chosenTemperature = null;
var chosenDirection = "";
var convertButton = document.getElementById("convertButton");
var teleportOnCooldown = false;
var shooterDialog = document.getElementById("shooterChallenge");
var shooterFrame = document.getElementById("shooterFrame");
var challengeStage = "start";
var repairDialog = document.getElementById("repairChallenge");
var repairPuzzle = new RepairPuzzle(finishCalculation, resetToStart);

function teleportButton(button) {
    // Ignore more hovers until 1 second after the last jump.
    if (teleportOnCooldown) return;
    teleportOnCooldown = true;

    // Fixed positioning measures left/top from the browser window's edges.
    button.style.position = "fixed";
    button.style.maxWidth = "100vw";

    // Subtract the button's size so it stays inside the visible page.
    var maxX = Math.max(0, window.innerWidth - button.offsetWidth);
    var maxY = Math.max(0, window.innerHeight - button.offsetHeight);
    button.style.left = Math.floor(Math.random() * (maxX + 1)) + "px";
    button.style.top = Math.floor(Math.random() * (maxY + 1)) + "px";
    setTimeout(function () {
        teleportOnCooldown = false;
    }, 1000);
}

function generateTemperature() {
    resetToStart("");
    convertButton.style.position = "";
    convertButton.style.left = "";
    convertButton.style.top = "";
    // Math.random() picks a value below 1. Multiplying by 201 and rounding down
    // gives 0 to 200. Subtracting 100 gives a whole number from -100 to 100.
    var temperature = Math.floor(Math.random() * 201) - 100;
    var direction = document.getElementById("direction").value;
    var unit = direction === "fahrenheit" ? "°F" : "°C";
    var label = temperature + " " + unit;
    document.getElementById("temperature").textContent = "Generated temperature: " + label;

    // confirm() returns true for OK and false for Cancel.
    if (confirm("Is this the temperature you want to convert?\n\n" + label)) {
        chosenTemperature = temperature;
        chosenDirection = direction;
        convertButton.hidden = false;
    }
}

function convertTemperature() {
    if (chosenTemperature === null || challengeStage !== "start") return;
    // Use the number and unit that the user accepted, even if the dropdown changes.
    var temperature = chosenTemperature;
    var direction = chosenDirection;
    var answer;

    if (direction === "fahrenheit") {
        answer = (temperature - 32) * 5 / 9;
        pendingAnswer = answer.toFixed(2) + " °C";
    } else {
        answer = temperature * 9 / 5 + 32;
        pendingAnswer = answer.toFixed(2) + " °F";
    }

    counter = new PushupCounter();
    challengeStage = "captcha";
    countText.textContent = "0 / 6";
    startButton.disabled = false;
    captcha.showModal();
}

function stopCamera() {
    // Old camera promises and responses must not affect a new attempt.
    session++;

    if (cameraStream) cameraStream.getTracks().forEach(track => track.stop());
    cameraStream = null;
    video.srcObject = null;
    overlay.getContext("2d").clearRect(0, 0, overlay.width, overlay.height);
}

function closeCaptcha() {
    stopCamera();
    captcha.close();
}

function startShooterChallenge() {
    if (challengeStage !== "captcha") return;
    closeCaptcha(); // Stop the webcam before starting the game.
    challengeStage = "shooter";
    shooterFrame.src = "/badui/shooter-game/";
    shooterDialog.showModal();
    shooterFrame.focus();
}

function stopShooterGame() {
    // Unloading the game stops its timers and clears the current match.
    shooterFrame.src = "about:blank";
}

function closeShooterChallenge() {
    stopShooterGame();
    shooterDialog.close();
}

function handleShooterResult(event) {
    // Only accept a win from our own game frame during an active challenge.
    if (challengeStage !== "shooter" || !shooterDialog.open ||
        event.origin !== location.origin || event.source !== shooterFrame.contentWindow ||
        !event.data) return;

    if (event.data.type !== "shooter-victory") return;
    closeShooterChallenge();
    challengeStage = "repair";
    document.getElementById("repairAnswer").textContent = "";
    document.getElementById("cancelRepair").textContent = "Cancel";
    repairDialog.showModal();
    repairPuzzle.start();
}

function finishCalculation() {
    if (challengeStage !== "repair") return;
    challengeStage = "complete";
    document.getElementById("repairAnswer").textContent = "Temperature: " + pendingAnswer;
    document.getElementById("temperatureResult").textContent = "Temperature: " + pendingAnswer;
    document.getElementById("cancelRepair").textContent = "Done";
}

function resetToStart(message) {
    // Every failure clears ALL stages, timers, the webcam and the pending answer.
    challengeStage = "start";
    closeCaptcha();
    closeShooterChallenge();
    repairPuzzle.stop();
    if (repairDialog.open) repairDialog.close();
    chosenTemperature = null;
    chosenDirection = "";
    pendingAnswer = "";
    counter = null;
    convertButton.hidden = true;
    document.getElementById("temperature").textContent = "No temperature generated yet.";
    document.getElementById("temperatureResult").textContent = "";
    document.getElementById("repairAnswer").textContent = "";
    document.getElementById("notice").textContent = message || "";
    countText.textContent = "0 / 6";
    startButton.disabled = false;
    if (message) document.getElementById("generateButton").focus();
}

// Load MediaPipe only when someone chooses to enable the camera.
// Detection runs on this device; camera pictures are never uploaded.
async function loadPoseDetector() {
    if (poseDetector) return poseDetector;
    if (!detectorLoading) {
        detectorLoading = (async () => {
            var vision = await import("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.21/vision_bundle.mjs");
            var files = await vision.FilesetResolver.forVisionTasks(
                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.21/wasm");
            poseDetector = await vision.PoseLandmarker.createFromOptions(files, {
                baseOptions: { modelAssetPath: "/badui/models/pose_landmarker_lite.task" },
                runningMode: "VIDEO",
                numPoses: 1
            });
            return poseDetector;
        })().finally(() => { detectorLoading = null; });
    }
    return detectorLoading;
}

async function startCamera() {
    if (challengeStage !== "captcha") return;
    startButton.disabled = true;
    var attempt = ++session;
    try {
        if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
            throw new Error("Camera access needs HTTPS (or localhost) and a browser with camera support.");
        }
        countText.textContent = "Loading camera detector…";
        await loadPoseDetector();
        if (attempt !== session) return;
        var stream = await navigator.mediaDevices.getUserMedia({
            video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" },
            audio: false
        });
        // If Cancel was clicked while permission was pending, release the webcam.
        if (attempt !== session) {
            stream.getTracks().forEach(track => track.stop());
            return;
        }
        cameraStream = stream;
        video.srcObject = stream;
        stream.getVideoTracks()[0].addEventListener("ended", () => {
            if (attempt === session) cameraError(new Error("Camera disconnected. Try again."));
        });
        await video.play();
        if (attempt !== session) return;
        counter = new PushupCounter();
        countText.textContent = "0 / 6";
        lastVideoTime = -1;
        processFrame(attempt);
    } catch (error) {
        if (attempt === session) cameraError(error);
    }
}

function cameraError(error) {
    resetToStart(error.name === "NotAllowedError" ? "Camera blocked. Allow camera access and try again." : "Camera error: " + error.message);
}

function drawArms(points) {
    var context = overlay.getContext("2d");
    context.clearRect(0, 0, overlay.width, overlay.height);
    context.strokeStyle = "#51ff8a";
    context.fillStyle = "#51ff8a";
    context.lineWidth = 4;
    for (var arm of [[11, 13, 15], [12, 14, 16]]) {
        if (!arm.every(i => points[i] && points[i].visibility >= 0.6)) continue;
        context.beginPath();
        arm.forEach((i, index) => {
            var x = points[i].x * overlay.width;
            var y = points[i].y * overlay.height;
            if (index === 0) context.moveTo(x, y);
            else context.lineTo(x, y);
        });
        context.stroke();
        arm.forEach(i => {
            context.beginPath();
            context.arc(points[i].x * overlay.width, points[i].y * overlay.height, 6, 0, Math.PI * 2);
            context.fill();
        });
    }
}

async function processFrame(attempt) {
    if (attempt !== session || !cameraStream) return;
    try {
        if (!video.videoWidth || !video.videoHeight) {
            setTimeout(() => processFrame(attempt), 100);
            return;
        }
        if (video.currentTime === lastVideoTime) {
            setTimeout(() => processFrame(attempt), 100);
            return;
        }
        lastVideoTime = video.currentTime;
        overlay.width = video.videoWidth;
        overlay.height = video.videoHeight;
        video.parentElement.style.aspectRatio = overlay.width + " / " + overlay.height;
        var result = poseDetector.detectForVideo(video, performance.now());
        // The web API exposes visibility; the Python counter also expected presence.
        var points = (result.landmarks[0] || []).map(point => ({
            ...point, presence: point.presence ?? point.visibility
        }));
        counter.update(points, overlay.width, overlay.height);
        countText.textContent = counter.count + " / 6";
        drawArms(points);
        if (counter.count === 6) {
            startShooterChallenge();
            return;
        }
        // Check roughly ten frames per second to limit processor usage.
        setTimeout(() => processFrame(attempt), 100);
    } catch (error) {
        if (attempt === session) cameraError(error);
    }
}

startButton.addEventListener("click", startCamera);
document.getElementById("cancelCaptcha").addEventListener("click", () => resetToStart("Pushup challenge cancelled. Back to the start."));
captcha.addEventListener("cancel", event => {
    event.preventDefault();
    resetToStart("Pushup challenge cancelled. Back to the start.");
});
captcha.addEventListener("close", stopCamera);
window.addEventListener("pagehide", stopCamera);
window.addEventListener("message", handleShooterResult);
window.addEventListener("pagehide", stopShooterGame);
document.getElementById("cancelShooter").addEventListener("click", () => resetToStart("Shooter challenge cancelled. Back to the start."));
shooterDialog.addEventListener("cancel", event => {
    event.preventDefault();
    resetToStart("Shooter challenge cancelled. Back to the start.");
});
shooterDialog.addEventListener("close", stopShooterGame);
document.getElementById("cancelRepair").addEventListener("click", () => {
    if (challengeStage === "complete") repairDialog.close();
    else resetToStart("Calculation cancelled. Back to the start.");
});
repairDialog.addEventListener("cancel", event => {
    event.preventDefault();
    if (challengeStage === "complete") repairDialog.close();
    else resetToStart("Calculation cancelled. Back to the start.");
});
repairDialog.addEventListener("close", () => repairPuzzle.stop());
window.addEventListener("pagehide", () => repairPuzzle.stop());
