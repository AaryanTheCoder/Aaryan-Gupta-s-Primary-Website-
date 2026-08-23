const viewerVideo = document.getElementById('viewerVideo');
const viewerMessage = document.getElementById('viewerMessage');
const cameraPreview = document.getElementById('cameraPreview');
const previewMessage = document.getElementById('previewMessage');
const recordButton = document.getElementById('recordButton');
const qualitySelect = document.getElementById('qualitySelect');
const fpsSelect = document.getElementById('fpsSelect');
const rotateButton = document.getElementById('rotateButton');
const cameraButton = document.getElementById('cameraButton');
const connectionStatus = document.getElementById('connectionStatus');
const viewerCount = document.getElementById('viewerCount');
const liveBadge = document.getElementById('liveBadge');
const helpText = document.getElementById('helpText');

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d', { alpha: false });
let socket;
let cameraStream;
let broadcasting = false;
let frameTimer;
let frameInProgress = false;
let rotated = false;
let frontCamera = false;
let viewerUrl;

function websocketUrl() {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${protocol}//${window.location.host}/stream/ws`;
}

function setConnection(text) { connectionStatus.textContent = text; }

function setLive(live) {
  liveBadge.textContent = live ? 'LIVE' : 'OFFLINE';
  liveBadge.classList.toggle('live', live);
  viewerMessage.hidden = live;
}

function setViewerFrame(frame) {
  if (viewerUrl) URL.revokeObjectURL(viewerUrl);
  viewerUrl = URL.createObjectURL(frame);
  viewerVideo.src = viewerUrl;
  setLive(true);
}

function clearViewer() {
  if (viewerUrl) URL.revokeObjectURL(viewerUrl);
  viewerUrl = '';
  viewerVideo.removeAttribute('src');
  viewerVideo.load();
  setLive(false);
}

function updateRecordButton() {
  recordButton.textContent = broadcasting ? 'Stop broadcast' : 'Start broadcast';
  recordButton.classList.toggle('recording', broadcasting);
}

function stopCamera() {
  if (cameraStream) cameraStream.getTracks().forEach(track => track.stop());
  cameraStream = null;
  cameraPreview.srcObject = null;
  previewMessage.hidden = false;
}

async function openCamera() {
  stopCamera();
  previewMessage.textContent = 'Asking for camera permission…';
  previewMessage.hidden = false;
  try {
    // audio is deliberately false: this page never records or transmits sound.
    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: frontCamera ? 'user' : 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      audio: false
    });
    cameraPreview.srcObject = cameraStream;
    cameraPreview.classList.toggle('mirrored', frontCamera);
    previewMessage.hidden = true;
    await cameraPreview.play();
    return true;
  } catch (error) {
    helpText.textContent = `Camera could not start: ${error.message || 'permission was not granted'}. Camera streaming needs HTTPS (or localhost).`;
    stopCamera();
    return false;
  }
}

function drawFrame() {
  const sourceWidth = cameraPreview.videoWidth;
  const sourceHeight = cameraPreview.videoHeight;
  if (!sourceWidth || !sourceHeight || frameInProgress || !socket || socket.readyState !== WebSocket.OPEN) return;
  if (socket.bufferedAmount > 512 * 1024) return; // Skip a frame instead of building a client-side queue.

  frameInProgress = true;
  const longestSide = 1280;
  const scale = Math.min(1, longestSide / Math.max(sourceWidth, sourceHeight));
  const width = Math.round(sourceWidth * scale);
  const height = Math.round(sourceHeight * scale);
  canvas.width = rotated ? height : width;
  canvas.height = rotated ? width : height;
  context.save();
  if (rotated) {
    context.translate(canvas.width, 0);
    context.rotate(Math.PI / 2);
  }
  context.drawImage(cameraPreview, 0, 0, width, height);
  context.restore();
  canvas.toBlob(blob => {
    frameInProgress = false;
    if (blob && socket && socket.readyState === WebSocket.OPEN && broadcasting) socket.send(blob);
  }, 'image/jpeg', Number(qualitySelect.value));
}

function beginFrameRelay() {
  clearInterval(frameTimer);
  frameTimer = setInterval(drawFrame, 1000 / Number(fpsSelect.value));
}

function stopBroadcast() {
  clearInterval(frameTimer);
  frameTimer = undefined;
  if (broadcasting && socket && socket.readyState === WebSocket.OPEN) socket.send(JSON.stringify({ type: 'stopBroadcast' }));
  broadcasting = false;
  updateRecordButton();
  stopCamera();
}

async function requestBroadcast() {
  if (!socket || socket.readyState !== WebSocket.OPEN) {
    helpText.textContent = 'The live connection is not ready yet. Please try again in a moment.';
    return;
  }
  if (!(await openCamera())) return;
  socket.send(JSON.stringify({ type: 'startBroadcast' }));
  helpText.textContent = 'Checking whether this device can broadcast…';
}

function connect() {
  socket = new WebSocket(websocketUrl());
  socket.binaryType = 'blob';
  socket.addEventListener('open', () => setConnection('Connected securely'));
  socket.addEventListener('message', event => {
    if (event.data instanceof Blob) {
      setViewerFrame(event.data);
      return;
    }
    let message;
    try { message = JSON.parse(event.data); } catch { return; }
    if (message.type === 'ready') {
      setLive(message.broadcasting);
      viewerCount.textContent = `${message.viewerCount} viewer${message.viewerCount === 1 ? '' : 's'}`;
    }
    if (message.type === 'viewerCount') viewerCount.textContent = `${message.count} viewer${message.count === 1 ? '' : 's'}`;
    if (message.type === 'broadcasterClaimed') {
      broadcasting = true;
      beginFrameRelay();
      updateRecordButton();
      helpText.textContent = 'Broadcasting video only. Frames are forwarded live and not saved.';
    }
    if (message.type === 'broadcastEnded') clearViewer();
    if (message.type === 'broadcastStarted') setLive(true);
    if (message.type === 'error') {
      helpText.textContent = message.error || 'The stream could not be started.';
      if (!broadcasting) stopCamera();
    }
  });
  socket.addEventListener('close', () => {
    setConnection('Disconnected — refresh to reconnect');
    if (broadcasting) stopBroadcast();
  });
  socket.addEventListener('error', () => setConnection('Connection error'));
}

recordButton.addEventListener('click', () => broadcasting ? stopBroadcast() : requestBroadcast());
fpsSelect.addEventListener('change', () => { if (broadcasting) beginFrameRelay(); });
rotateButton.addEventListener('click', () => {
  rotated = !rotated;
  rotateButton.textContent = `Rotate: ${rotated ? '90°' : 'off'}`;
});
cameraButton.addEventListener('click', async () => {
  frontCamera = !frontCamera;
  cameraButton.textContent = frontCamera ? 'Use back camera' : 'Use front camera';
  if (broadcasting) await openCamera();
});
window.addEventListener('beforeunload', () => { if (socket) socket.close(); stopCamera(); if (viewerUrl) URL.revokeObjectURL(viewerUrl); });

connect();
