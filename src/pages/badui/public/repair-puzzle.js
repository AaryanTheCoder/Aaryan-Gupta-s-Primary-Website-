// The bar breaks, scissors cut tape, and the cut tape patches the hole.
class RepairPuzzle {
    constructor(onComplete, onFail) {
        this.onComplete = onComplete;
        this.onFail = onFail;
        this.scene = document.getElementById("repairScene");
        this.objects = document.getElementById("puzzleObjects");
        this.hole = document.getElementById("progressHole");
        this.fill = document.getElementById("progressFill");
        this.track = document.getElementById("progressTrack");
        this.percent = document.getElementById("progressPercent");
        this.status = document.getElementById("repairStatus");
        this.stage = "idle";
        this.scene.addEventListener("pointerdown", event => this.startDrag(event));
        this.scene.addEventListener("pointermove", event => this.moveDrag(event));
        this.scene.addEventListener("pointerup", event => this.endDrag(event));
        this.scene.addEventListener("pointercancel", () => this.cancelDrag());
        this.scene.addEventListener("lostpointercapture", () => this.cancelDrag());
    }

    start() {
        this.stop();
        this.progress = 0;
        this.stage = "filling";
        this.scene.classList.remove("burst");
        this.hole.classList.remove("patched");
        this.hole.hidden = true;
        this.objects.replaceChildren();
        this.status.textContent = "";
        this.paint();
        this.timer = setInterval(() => this.tick(), 100);
    }

    tick() {
        if (this.stage === "filling") {
            this.progress = Math.min(68, this.progress + 1);
            if (this.progress === 68) this.burst();
        } else if (this.stage === "broken" || this.stage === "cut") {
            // Use real time, so a slow or background browser tab cannot pause the clock.
            const remaining = Math.max(0, this.deadline - Date.now());
            this.progress = 68 * remaining / 20000;
            this.status.textContent = Math.ceil(remaining / 1000) + "s";
            if (remaining === 0) { this.fail("0%"); return; }
        } else if (this.stage === "patched") {
            this.progress = Math.min(100, this.progress + 3);
            if (this.progress === 100) {
                this.stage = "complete";
                clearInterval(this.timer);
                this.status.textContent = "";
                this.onComplete();
            }
        }
        this.paint();
    }

    paint() {
        this.fill.style.width = this.progress + "%";
        this.percent.textContent = Math.round(this.progress) + "%";
        this.track.setAttribute("aria-valuenow", Math.round(this.progress));
    }

    burst() {
        this.stage = "broken";
        this.deadline = Date.now() + 20000;
        this.status.textContent = "20s";
        this.scene.classList.add("burst");
        this.hole.hidden = false;
        const decoys = ["🧦", "🦆", "🥄", "🍌", "🔑", "🧽", "🧲", "🪥"];
        // Fisher-Yates shuffle: swap each object with a random earlier object.
        for (let i = decoys.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [decoys[i], decoys[j]] = [decoys[j], decoys[i]];
        }
        const items = [{ kind: "scissors", icon: "✂️", name: "Scissors" },
            { kind: "tape", icon: "◉", name: "Tape" },
            ...decoys.slice(0, 6).map(icon => ({ kind: "decoy", icon, name: "Object" }))];
        const origin = this.scene.getBoundingClientRect();
        // Keep tools clear of the bar, header and other objects so they stay reachable.
        const blocked = [this.track, document.getElementById("repairHeader")].map(element => {
            const box = element.getBoundingClientRect();
            return { x: box.left - origin.left - 8, y: box.top - origin.top - 8,
                w: box.width + 16, h: box.height + 55 };
        });
        for (const item of items) {
            let x, y;
            for (let attempt = 0; attempt < 100; attempt++) {
                x = Math.random() * Math.max(0, this.scene.clientWidth - 64);
                y = Math.random() * Math.max(0, this.scene.clientHeight - 64);
                if (!blocked.some(box => x < box.x + box.w && x + 64 > box.x &&
                    y < box.y + box.h && y + 64 > box.y)) break;
            }
            blocked.push({ x: x - 8, y: y - 8, w: 80, h: 80 });
            const button = document.createElement("button");
            button.type = "button";
            button.className = "puzzle-object";
            button.dataset.kind = item.kind;
            button.textContent = item.icon;
            button.setAttribute("aria-label", item.name); // No visible object labels.
            button.style.left = x + "px";
            button.style.top = y + "px";
            this.objects.append(button);
        }
        for (let i = 0; i < 14; i++) {
            const chip = document.createElement("i");
            chip.className = "burst-chip";
            chip.style.setProperty("--dx", (Math.random() * 220 - 110) + "px");
            chip.style.setProperty("--dy", (Math.random() * 100 + 30) + "px");
            this.objects.append(chip);
        }
    }

    drop(item, target) {
        if (!["broken", "cut"].includes(this.stage) || !item || !target || item === target) return;
        // Also check at drop time: a last-second drop must not sneak past the timer.
        if (Date.now() >= this.deadline) { this.fail("0%"); return; }
        if (item.dataset.kind === "scissors" && target.dataset.kind === "tape") {
            target.dataset.kind = "patch";
            target.textContent = "▰";
            target.setAttribute("aria-label", "Cut tape");
            item.disabled = true;
            this.stage = "cut";
        } else if (target === this.hole) {
            if (item.dataset.kind === "patch" && this.stage === "cut") {
                this.stage = "patched";
                this.scene.classList.remove("burst");
                this.hole.classList.add("patched");
                this.objects.replaceChildren();
                this.status.textContent = "";
            } else this.fail("Nope.");
        }
    }

    fail(message) {
        this.progress = 0;
        this.paint();
        this.stop();
        this.objects.replaceChildren();
        this.onFail(message);
    }

    startDrag(event) {
        const item = event.target.closest(".puzzle-object");
        if (!["broken", "cut"].includes(this.stage) || !item || item.disabled ||
            !this.objects.contains(item) || this.drag || event.button !== 0) return;
        const box = item.getBoundingClientRect();
        this.drag = { item, id: event.pointerId, x: event.clientX - box.left,
            y: event.clientY - box.top, left: item.style.left, top: item.style.top };
        item.classList.add("dragging");
        this.scene.setPointerCapture(event.pointerId);
    }

    moveDrag(event) {
        if (!this.drag || event.pointerId !== this.drag.id) return;
        const box = this.scene.getBoundingClientRect();
        this.drag.item.style.left = Math.max(0, Math.min(this.scene.clientWidth - 64,
            event.clientX - box.left - this.drag.x)) + "px";
        this.drag.item.style.top = Math.max(0, Math.min(this.scene.clientHeight - 64,
            event.clientY - box.top - this.drag.y)) + "px";
        event.preventDefault();
    }

    endDrag(event) {
        if (!this.drag || event.pointerId !== this.drag.id) return;
        const item = this.drag.item;
        item.style.visibility = "hidden";
        const beneath = document.elementFromPoint(event.clientX, event.clientY);
        item.style.visibility = "";
        const target = beneath && beneath.closest(".puzzle-object, #progressHole");
        if (target && this.scene.contains(target)) this.drop(item, target);
        this.cancelDrag();
    }

    cancelDrag() {
        if (!this.drag) return;
        const drag = this.drag;
        this.drag = null;
        drag.item.classList.remove("dragging");
        drag.item.style.left = drag.left;
        drag.item.style.top = drag.top;
        if (this.scene.hasPointerCapture(drag.id)) this.scene.releasePointerCapture(drag.id);
    }

    stop() {
        clearInterval(this.timer);
        this.timer = null;
        this.cancelDrag();
        this.stage = "idle";
    }
}
