const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const connectionStatus = document.getElementById('connectionStatus');
const joinForm = document.getElementById('joinForm');
const createButton = document.getElementById('createButton');
const aiButton = document.getElementById('aiButton');
const roomInput = document.getElementById('roomInput');
const roomCode = document.getElementById('roomCode');
const slotLabel = document.getElementById('slotLabel');
const p1Health = document.getElementById('p1Health');
const p2Name = document.getElementById('p2Name');
const p2Health = document.getElementById('p2Health');
const restartButton = document.getElementById('restartButton');
const settingsButton = document.getElementById('settingsButton');
const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlayTitle');
const overlayText = document.getElementById('overlayText');
const settingsPanel = document.getElementById('settingsPanel');
const settingsForm = document.getElementById('settingsForm');
const settingsHint = document.getElementById('settingsHint');
const closeSettingsButton = document.getElementById('closeSettingsButton');
const resetSettingsButton = document.getElementById('resetSettingsButton');
const applySettingsButton = document.getElementById('applySettingsButton');

// ---------- Easy client settings ----------
// Gameplay speed is controlled by shooterGameRoutes.js on the server.
const CLIENT_SETTINGS = Object.freeze({
  defaultArenaSize: 900,
  defaultPlayerSize: 64,
  defaultBulletSize: 18,
  defaultPlayerLives: 8,
  roomCodeDigits: 4,
  inputSendEveryMs: 16,
  aimLineDash: [8, 10]
});

const DEFAULT_ROOM_SETTINGS = Object.freeze({
  playerSpeed: 6.7,
  playerLives: 8,
  playerShotsPerSecond: 4,
  bulletSpeed: 11.7,
  cactusDamageCooldownMs: 900,
  aiStartSpeed: 1,
  aiHardcoreSpeed: 10,
  aiStartBulletSpeed: 4,
  aiHardcoreBulletSpeed: 11.7,
  aiStartShotsPerSecond: 0.5,
  aiHardcoreShotsPerSecond: 50,
  aiHardcoreAfterLosingLives: 5,
  aiDodgeLookahead: 360,
  aiDodgeRadius: 95,
  aiDodgeWeight: 3.5,
  aiTooCloseDistance: 240,
  aiTooFarDistance: 380,
  aiStrafeStrength: 0.8,
  aiStrafeCycleMs: 380,
  aiCactusAvoidDistanceMultiplier: 1.45,
  aiCactusAvoidWeight: 1.8
});

const ROOM_SETTING_FIELDS = Object.keys(DEFAULT_ROOM_SETTINGS);

roomInput.maxLength = CLIENT_SETTINGS.roomCodeDigits;
roomInput.placeholder = '0'.repeat(CLIENT_SETTINGS.roomCodeDigits);

let socket = null;
let state = null;
let joined = false;
let yourSlot = null;
let pointerDown = false;
let aim = {
  x: CLIENT_SETTINGS.defaultArenaSize / 2,
  y: CLIENT_SETTINGS.defaultArenaSize / 2
};
let lastInputSentAt = 0;
let lastSettingsJson = '';
let settingsSubmitInProgress = false;

const keys = {
  up: false,
  down: false,
  left: false,
  right: false
};

const colors = {
  background: '#000000',
  white: '#f5f5f5',
  blue: '#28a0ff',
  blueFace: '#a5dcff',
  red: '#ff5555',
  redFace: '#ffb4b4',
  cactus: '#239b4b',
  cactusDark: '#105f2d',
  cactusLight: '#5fe178',
  healthBack: '#4b1414',
  healthFront: '#46eb5f',
  bullet: '#ffee5a'
};

function wsUrl() {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${protocol}//${window.location.host}/shooter-game/ws`;
}

function setStatus(text) {
  connectionStatus.textContent = text;
}

function connect(room, mode = 'online') {
  if (socket) {
    socket.close();
  }

  joined = false;
  yourSlot = null;
  state = null;
  settingsSubmitInProgress = false;
  setStatus('Connecting');

  socket = new WebSocket(wsUrl());

  socket.addEventListener('open', () => {
    socket.send(JSON.stringify({
      type: 'join',
      roomCode: room || '',
      mode
    }));
  });

  socket.addEventListener('message', event => {
    const message = parseMessage(event.data);
    if (!message) return;

    if (message.type === 'joined') {
      joined = true;
      yourSlot = message.yourSlot;
      roomCode.textContent = message.roomCode;
      roomInput.value = message.roomCode;
      slotLabel.textContent = yourSlot === 1 ? 'Blue' : 'Red';
      setStatus('Connected');
      return;
    }

    if (message.type === 'state') {
      state = message;
      yourSlot = message.yourSlot || yourSlot;
      updateUi();
      return;
    }

    if (message.type === 'settingsUpdated') {
      settingsSubmitInProgress = false;
      syncSettingsForm(message.settings, true);
      updateSettingsControls();
      setStatus('Settings applied');
      return;
    }

    if (message.type === 'error') {
      settingsSubmitInProgress = false;
      updateSettingsControls();
      setStatus(message.error || 'Connection error');
      showOverlay('Room unavailable', 'Create a room or check the code.');
    }
  });

  socket.addEventListener('close', () => {
    joined = false;
    settingsSubmitInProgress = false;
    setStatus('Disconnected');
    restartButton.disabled = true;
    applySettingsButton.disabled = true;
    showOverlay('Disconnected', 'Create or join a room.');
  });
}

function parseMessage(data) {
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

function updateUi() {
  if (!state) return;

  roomCode.textContent = state.roomCode || '----';
  slotLabel.textContent = yourSlot === 1 ? 'Blue' : yourSlot === 2 ? 'Red' : '--';
  p1Health.textContent = state.players?.[1]?.health ?? 0;
  p2Name.textContent = state.mode === 'ai' ? 'AI' : 'Red';
  p2Health.textContent = state.players?.[2]?.health ?? 0;
  restartButton.disabled = !state.winner;
  updateSettingsControls();

  syncSettingsForm(state.settings);

  if (state.waiting) {
    showOverlay('Waiting for player 2', `Room ${state.roomCode}`);
  } else if (state.winner) {
    const text = state.winner === 'draw'
      ? 'Draw'
      : state.winner === yourSlot
        ? 'You win'
        : state.mode === 'ai'
          ? 'AI wins'
          : 'You lose';
    showOverlay(text, 'Press restart to play again.');
  } else {
    hideOverlay();
  }
}

function showOverlay(title, text) {
  overlayTitle.textContent = title;
  overlayText.textContent = text;
  overlay.classList.remove('hidden');
}

function hideOverlay() {
  overlay.classList.add('hidden');
}

function mergedRoomSettings(settings = {}) {
  return {
    ...DEFAULT_ROOM_SETTINGS,
    ...settings
  };
}

function syncSettingsForm(settings, force = false) {
  const merged = mergedRoomSettings(settings);
  const nextJson = JSON.stringify(merged);
  if (!force && nextJson === lastSettingsJson) return;

  for (const field of ROOM_SETTING_FIELDS) {
    const input = settingsForm.elements[field];
    if (input) input.value = merged[field];
  }

  lastSettingsJson = nextJson;
}

function readSettingsForm() {
  const settings = {};

  for (const field of ROOM_SETTING_FIELDS) {
    const input = settingsForm.elements[field];
    if (!input) continue;
    const value = Number(input.value);
    if (Number.isFinite(value)) {
      settings[field] = value;
    }
  }

  return settings;
}

function showSettingsPanel() {
  syncSettingsForm(state?.settings || DEFAULT_ROOM_SETTINGS, true);
  updateSettingsControls();
  settingsPanel.classList.remove('hidden');
}

function hideSettingsPanel() {
  settingsPanel.classList.add('hidden');
}

function updateSettingsControls() {
  if (!joined || !state) {
    applySettingsButton.disabled = true;
    settingsHint.textContent = 'Create or join a room before applying settings.';
    return;
  }

  applySettingsButton.disabled = yourSlot !== 1 || settingsSubmitInProgress;
  settingsHint.textContent = yourSlot === 1
    ? 'Applying settings restarts this room.'
    : 'Only player 1 can change room settings.';
}

function canvasPoint(event) {
  const rect = canvas.getBoundingClientRect();
  const arenaSize = state?.arenaSize || CLIENT_SETTINGS.defaultArenaSize;
  const x = ((event.clientX - rect.left) / rect.width) * arenaSize;
  const y = ((event.clientY - rect.top) / rect.height) * arenaSize;
  return {
    x: Math.max(0, Math.min(arenaSize, x)),
    y: Math.max(0, Math.min(arenaSize, y))
  };
}

function updateAim(event) {
  aim = canvasPoint(event);
}

function inputPayload() {
  return {
    up: keys.up,
    down: keys.down,
    left: keys.left,
    right: keys.right,
    shooting: pointerDown,
    aimX: aim.x,
    aimY: aim.y
  };
}

function sendInput(time) {
  if (!joined || !socket || socket.readyState !== WebSocket.OPEN) return;
  if (time - lastInputSentAt < CLIENT_SETTINGS.inputSendEveryMs) return;
  lastInputSentAt = time;
  socket.send(JSON.stringify({
    type: 'input',
    input: inputPayload()
  }));
}

function drawPlayer(player, slot, playerSize, playerLives) {
  const partSize = playerSize / 2;
  const bodyColor = slot === 1 ? colors.blue : colors.red;
  const faceColor = slot === 1 ? colors.blueFace : colors.redFace;
  const centerX = player.x + playerSize / 2;

  ctx.fillStyle = faceColor;
  ctx.fillRect(centerX - partSize / 2, player.y, partSize, partSize);
  ctx.fillStyle = bodyColor;
  ctx.fillRect(centerX - partSize / 2, player.y + partSize, partSize, partSize);

  ctx.strokeStyle = colors.white;
  ctx.lineWidth = 2;
  ctx.strokeRect(centerX - partSize / 2, player.y, partSize, playerSize);

  const barWidth = playerSize;
  const barHeight = 6;
  const healthWidth = Math.round(barWidth * (player.health / playerLives));
  const barX = centerX - barWidth / 2;
  const barY = player.y - 13;
  ctx.fillStyle = colors.healthBack;
  ctx.fillRect(barX, barY, barWidth, barHeight);
  ctx.fillStyle = colors.healthFront;
  ctx.fillRect(barX, barY, healthWidth, barHeight);
  ctx.strokeStyle = colors.white;
  ctx.lineWidth = 1;
  ctx.strokeRect(barX, barY, barWidth, barHeight);
}

function drawCactus(cactus) {
  const armWidth = Math.max(8, cactus.w / 6);
  const armHeight = Math.max(16, cactus.h / 3);

  ctx.fillStyle = colors.cactus;
  ctx.fillRect(cactus.x, cactus.y, cactus.w, cactus.h);
  ctx.fillStyle = colors.cactusDark;
  ctx.fillRect(cactus.x - armWidth, cactus.y + cactus.h / 2 - armHeight / 2, armWidth, armHeight);
  ctx.fillRect(cactus.x + cactus.w, cactus.y + cactus.h / 2 - armHeight, armWidth, armHeight);
  ctx.strokeStyle = colors.cactusLight;
  ctx.lineWidth = 2;
  ctx.strokeRect(cactus.x, cactus.y, cactus.w, cactus.h);
}

function drawBullet(bullet, bulletSize) {
  ctx.beginPath();
  ctx.arc(bullet.x, bullet.y, bulletSize / 2, 0, Math.PI * 2);
  ctx.fillStyle = colors.bullet;
  ctx.fill();
}

function drawAim() {
  if (!state || !yourSlot || state.waiting || state.winner) return;
  const player = state.players?.[yourSlot];
  if (!player) return;

  const size = state.playerSize || CLIENT_SETTINGS.defaultPlayerSize;
  const centerX = player.x + size / 2;
  const centerY = player.y + size / 2;
  ctx.save();
  ctx.setLineDash(CLIENT_SETTINGS.aimLineDash);
  ctx.strokeStyle = yourSlot === 1 ? 'rgba(45, 168, 255, 0.45)' : 'rgba(255, 91, 91, 0.45)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(aim.x, aim.y);
  ctx.stroke();
  ctx.restore();
}

function render() {
  const arenaSize = state?.arenaSize || CLIENT_SETTINGS.defaultArenaSize;
  canvas.width = arenaSize;
  canvas.height = arenaSize;
  ctx.fillStyle = colors.background;
  ctx.fillRect(0, 0, arenaSize, arenaSize);

  if (!state) {
    return;
  }

  for (const cactus of state.cactuses || []) {
    drawCactus(cactus);
  }

  const playerSize = state.playerSize || CLIENT_SETTINGS.defaultPlayerSize;
  const playerLives = state.playerLives || CLIENT_SETTINGS.defaultPlayerLives;
  if (state.players?.[1]) drawPlayer(state.players[1], 1, playerSize, playerLives);
  if (state.players?.[2]) drawPlayer(state.players[2], 2, playerSize, playerLives);

  for (const bullet of state.bullets || []) {
    drawBullet(bullet, state.bulletSize || CLIENT_SETTINGS.defaultBulletSize);
  }

  drawAim();
}

function loop(time) {
  sendInput(time);
  render();
  requestAnimationFrame(loop);
}

function setKey(event, value) {
  if (event.key === 'w' || event.key === 'W' || event.key === 'ArrowUp') keys.up = value;
  if (event.key === 's' || event.key === 'S' || event.key === 'ArrowDown') keys.down = value;
  if (event.key === 'a' || event.key === 'A' || event.key === 'ArrowLeft') keys.left = value;
  if (event.key === 'd' || event.key === 'D' || event.key === 'ArrowRight') keys.right = value;
}

document.addEventListener('keydown', event => {
  if (!settingsPanel.classList.contains('hidden')) {
    if (event.key === 'Escape') {
      hideSettingsPanel();
    }
    return;
  }

  setKey(event, true);
  if ((event.key === 'r' || event.key === 'R') && state?.winner) {
    restartButton.click();
  }
});

document.addEventListener('keyup', event => {
  setKey(event, false);
});

canvas.addEventListener('pointerdown', event => {
  pointerDown = true;
  canvas.setPointerCapture(event.pointerId);
  updateAim(event);
});

canvas.addEventListener('pointermove', updateAim);

canvas.addEventListener('pointerup', event => {
  pointerDown = false;
  updateAim(event);
});

canvas.addEventListener('pointercancel', () => {
  pointerDown = false;
});

canvas.addEventListener('contextmenu', event => {
  event.preventDefault();
});

createButton.addEventListener('click', () => {
  connect('', 'online');
});

aiButton.addEventListener('click', () => {
  connect('', 'ai');
});

joinForm.addEventListener('submit', event => {
  event.preventDefault();
  const code = roomInput.value.trim();
  const roomCodePattern = new RegExp(`^\\d{${CLIENT_SETTINGS.roomCodeDigits}}$`);
  if (!roomCodePattern.test(code)) {
    setStatus(`Enter a ${CLIENT_SETTINGS.roomCodeDigits} digit room`);
    return;
  }
  connect(code, 'online');
});

roomInput.addEventListener('input', () => {
  roomInput.value = roomInput.value.replace(/\D/g, '').slice(0, CLIENT_SETTINGS.roomCodeDigits);
});

restartButton.addEventListener('click', () => {
  if (!socket || socket.readyState !== WebSocket.OPEN) return;
  socket.send(JSON.stringify({ type: 'restart' }));
});

settingsButton.addEventListener('click', () => {
  showSettingsPanel();
});

closeSettingsButton.addEventListener('click', () => {
  hideSettingsPanel();
});

settingsPanel.addEventListener('click', event => {
  if (event.target === settingsPanel) {
    hideSettingsPanel();
  }
});

resetSettingsButton.addEventListener('click', () => {
  for (const field of ROOM_SETTING_FIELDS) {
    const input = settingsForm.elements[field];
    if (input) input.value = DEFAULT_ROOM_SETTINGS[field];
  }
});

for (const field of ROOM_SETTING_FIELDS) {
  const input = settingsForm.elements[field];
  if (input) input.required = true;
}

settingsForm.addEventListener('submit', event => {
  event.preventDefault();

  if (!settingsForm.reportValidity()) return;

  if (!socket || socket.readyState !== WebSocket.OPEN) {
    setStatus('Connect before changing settings');
    return;
  }

  if (yourSlot !== 1) {
    setStatus('Only player 1 can change settings');
    return;
  }

  settingsSubmitInProgress = true;
  applySettingsButton.disabled = true;
  setStatus('Applying settings');
  socket.send(JSON.stringify({
    type: 'updateSettings',
    settings: readSettingsForm()
  }));
});

requestAnimationFrame(loop);
