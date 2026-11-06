// The engine handles the rules. This file draws the game and reads controls.
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const p1Health = document.getElementById('p1Health');
const p2Health = document.getElementById('p2Health');
const restartButton = document.getElementById('restartButton');
const overlay = document.getElementById('overlay');
const overlayTitle = document.getElementById('overlayTitle');
const overlayText = document.getElementById('overlayText');
const peter = new Image();
peter.src = '/shooter-game/peter.webp';

let match;
let state;
let matchTimer;
let resultSent = false;
let pointerDown = false;
let aim = { x: 450, y: 450 };
const keys = { up: false, down: false, left: false, right: false };

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

function connect() {
  clearInterval(matchTimer);
  pointerDown = false;
  for (const key of Object.keys(keys)) keys[key] = false;
  match = new ShooterMatch();
  state = match.state();
  resultSent = false;
  updateUi();
  matchTimer = setInterval(() => {
    match.players[1].input = { ...keys, shooting: pointerDown, aimX: aim.x, aimY: aim.y };
    match.tick();
    state = match.state();
    updateUi();
    if (match.winner) clearInterval(matchTimer);
  }, 1000 / match.settings.fps);
}

function updateUi() {
  p1Health.textContent = state.players[1].health;
  p2Health.textContent = state.players[2].health;
  restartButton.disabled = !state.winner || state.winner === 1;
  overlay.classList.toggle('hidden', !state.winner);
  if (!state.winner) return;
  overlayTitle.textContent = state.winner === 1 ? 'You win' : state.winner === 'draw' ? 'Draw' : 'Peter wins';
  overlayText.textContent = state.winner === 1 ? '' : 'Restart';
  if (state.winner === 1 && !resultSent) {
    resultSent = true;
    window.parent.postMessage({ type: 'shooter-victory' }, window.location.origin);
  }
}

function drawPlayer(player, slot, playerSize, playerLives) {
  const partSize = playerSize / 2;
  const bodyColor = slot === 1 ? colors.blue : colors.red;
  const faceColor = slot === 1 ? colors.blueFace : colors.redFace;
  const centerX = player.x + playerSize / 2;

  if (slot === 2 && peter.complete && peter.naturalWidth > 0) {
    ctx.drawImage(peter, player.x, player.y, playerSize, playerSize);
  } else {
    ctx.fillStyle = faceColor;
    ctx.fillRect(centerX - partSize / 2, player.y, partSize, partSize);
    ctx.fillStyle = bodyColor;
    ctx.fillRect(centerX - partSize / 2, player.y + partSize, partSize, partSize);
    ctx.strokeStyle = colors.white;
    ctx.lineWidth = 2;
    ctx.strokeRect(centerX - partSize / 2, player.y, partSize, playerSize);
  }

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
  if (!state || state.winner) return;
  const player = state.players[1];
  if (!player) return;

  const size = state.playerSize;
  const centerX = player.x + size / 2;
  const centerY = player.y + size / 2;
  ctx.save();
  ctx.setLineDash([8, 10]);
  ctx.strokeStyle = 'rgba(45, 168, 255, 0.45)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(aim.x, aim.y);
  ctx.stroke();
  ctx.restore();
}

function render() {
  ctx.fillStyle = colors.background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (const cactus of state.cactuses) drawCactus(cactus);
  drawPlayer(state.players[1], 1, state.playerSize, state.playerLives);
  drawPlayer(state.players[2], 2, state.playerSize, state.playerLives);
  for (const bullet of state.bullets) drawBullet(bullet, state.bulletSize);
  drawAim();
  requestAnimationFrame(render);
}

function setKey(event, pressed) {
  const controls = { w: 'up', ArrowUp: 'up', s: 'down', ArrowDown: 'down',
    a: 'left', ArrowLeft: 'left', d: 'right', ArrowRight: 'right' };
  const key = controls[event.key] || controls[event.key.toLowerCase()];
  if (key) { keys[key] = pressed; event.preventDefault(); }
}

function updateAim(event) {
  const box = canvas.getBoundingClientRect();
  aim.x = (event.clientX - box.left) / box.width * canvas.width;
  aim.y = (event.clientY - box.top) / box.height * canvas.height;
}

document.addEventListener('keydown', event => {
  setKey(event, true);
  if (event.key.toLowerCase() === 'r') restartButton.click();
});
document.addEventListener('keyup', event => setKey(event, false));
canvas.addEventListener('pointerdown', event => {
  pointerDown = true;
  canvas.setPointerCapture(event.pointerId);
  updateAim(event);
});
canvas.addEventListener('pointermove', updateAim);
canvas.addEventListener('pointerup', () => { pointerDown = false; });
canvas.addEventListener('pointercancel', () => { pointerDown = false; });
canvas.addEventListener('contextmenu', event => event.preventDefault());
window.addEventListener('blur', () => {
  for (const key of Object.keys(keys)) keys[key] = false;
  pointerDown = false;
});
restartButton.addEventListener('click', () => {
  if (match.winner && match.winner !== 1) connect();
});
connect();
render();
