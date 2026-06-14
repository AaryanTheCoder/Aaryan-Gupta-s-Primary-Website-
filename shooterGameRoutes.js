const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');
const { isPathInside } = require('./routeHelpers');

const PUBLIC_DIR = path.join(__dirname, 'shooter-game');
const ARENA_SIZE = 900;
const FPS = 60;
const TICK_MS = 1000 / FPS;
const ROOM_TTL_MS = 3 * 60 * 60 * 1000;
const ROOM_CODE_RE = /^\d{4}$/;

const PLAYER_SIZE = 64;
const PLAYER_SPEED = 4.3;
const PLAYER_LIVES = 8;
const TOUCH_DAMAGE_COOLDOWN_MS = 900;
const BULLET_SIZE = 18;
const BULLET_SPEED = 6.7;
const PLAYER_FIRE_COOLDOWN_MS = 250;
const CACTUS_SIZE = 74;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const rooms = new Map();
const wss = new WebSocket.Server({ noServer: true });

function now() {
  return Date.now();
}

function makeCode() {
  let code;
  do {
    code = String(Math.floor(1000 + Math.random() * 9000));
  } while (rooms.has(code));
  return code;
}

function makePlayer(slot) {
  const start = slot === 1
    ? { x: PLAYER_SIZE, y: ARENA_SIZE - PLAYER_SIZE * 2 }
    : { x: ARENA_SIZE - PLAYER_SIZE * 2, y: PLAYER_SIZE };

  return {
    slot,
    x: start.x,
    y: start.y,
    vx: 0,
    vy: 0,
    health: PLAYER_LIVES,
    lastShotAt: -PLAYER_FIRE_COOLDOWN_MS,
    lastCactusDamageAt: -TOUCH_DAMAGE_COOLDOWN_MS,
    input: {
      up: false,
      down: false,
      left: false,
      right: false,
      shooting: false,
      aimX: ARENA_SIZE / 2,
      aimY: ARENA_SIZE / 2
    }
  };
}

function makeCactuses() {
  const positions = [
    [ARENA_SIZE * 0.22, ARENA_SIZE * 0.20],
    [ARENA_SIZE * 0.50, ARENA_SIZE * 0.18],
    [ARENA_SIZE * 0.78, ARENA_SIZE * 0.24],
    [ARENA_SIZE * 0.32, ARENA_SIZE * 0.48],
    [ARENA_SIZE * 0.66, ARENA_SIZE * 0.50],
    [ARENA_SIZE * 0.20, ARENA_SIZE * 0.78],
    [ARENA_SIZE * 0.50, ARENA_SIZE * 0.82],
    [ARENA_SIZE * 0.82, ARENA_SIZE * 0.76],
    [ARENA_SIZE * 0.47, ARENA_SIZE * 0.36]
  ];

  const centerSafe = {
    x: ARENA_SIZE / 2 - (PLAYER_SIZE * 5) / 2,
    y: ARENA_SIZE / 2 - (PLAYER_SIZE * 5) / 2,
    w: PLAYER_SIZE * 5,
    h: PLAYER_SIZE * 5
  };

  return positions
    .map(([cx, cy]) => ({
      x: Math.round(cx - CACTUS_SIZE / 2),
      y: Math.round(cy - CACTUS_SIZE / 2),
      w: CACTUS_SIZE,
      h: CACTUS_SIZE
    }))
    .filter(rect => !rectsCollide(rect, centerSafe));
}

function resetRoom(room) {
  room.players = {
    1: makePlayer(1),
    2: makePlayer(2)
  };
  room.bullets = [];
  room.cactuses = makeCactuses();
  room.winner = null;
  room.startedAt = now();
  room.updatedAt = now();
}

function createRoom() {
  const room = {
    code: makeCode(),
    sockets: new Map(),
    players: {},
    bullets: [],
    cactuses: [],
    winner: null,
    createdAt: now(),
    updatedAt: now(),
    interval: null
  };
  resetRoom(room);
  rooms.set(room.code, room);
  room.interval = setInterval(() => tickRoom(room), TICK_MS);
  room.interval.unref?.();
  return room;
}

function cleanupRooms() {
  const cutoff = now() - ROOM_TTL_MS;
  for (const [code, room] of rooms.entries()) {
    if (room.updatedAt >= cutoff && room.sockets.size > 0) continue;
    clearInterval(room.interval);
    for (const socket of room.sockets.keys()) {
      socket.close();
    }
    rooms.delete(code);
  }
}

setInterval(cleanupRooms, 10 * 60 * 1000).unref?.();

function rectsCollide(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function playerRect(player) {
  return { x: player.x, y: player.y, w: PLAYER_SIZE, h: PLAYER_SIZE };
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function pushOutOfObstacles(player, obstacles) {
  let touched = false;

  for (const obstacle of obstacles) {
    const rect = playerRect(player);
    if (!rectsCollide(rect, obstacle)) continue;

    touched = true;
    const overlapLeft = rect.x + rect.w - obstacle.x;
    const overlapRight = obstacle.x + obstacle.w - rect.x;
    const overlapTop = rect.y + rect.h - obstacle.y;
    const overlapBottom = obstacle.y + obstacle.h - rect.y;
    const smallest = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

    if (smallest === overlapLeft) {
      player.x = obstacle.x - PLAYER_SIZE;
    } else if (smallest === overlapRight) {
      player.x = obstacle.x + obstacle.w;
    } else if (smallest === overlapTop) {
      player.y = obstacle.y - PLAYER_SIZE;
    } else {
      player.y = obstacle.y + obstacle.h;
    }
  }

  return touched;
}

function applyInput(player, obstacles) {
  const oldX = player.x;
  const oldY = player.y;
  let dx = 0;
  let dy = 0;

  if (player.input.up) dy -= 1;
  if (player.input.down) dy += 1;
  if (player.input.left) dx -= 1;
  if (player.input.right) dx += 1;

  const length = Math.hypot(dx, dy);
  if (length > 0) {
    dx = (dx / length) * PLAYER_SPEED;
    dy = (dy / length) * PLAYER_SPEED;
  }

  let touchedCactus = false;
  player.x += Math.round(dx);
  touchedCactus = pushOutOfObstacles(player, obstacles) || touchedCactus;
  player.y += Math.round(dy);
  touchedCactus = pushOutOfObstacles(player, obstacles) || touchedCactus;
  player.x = clamp(player.x, 0, ARENA_SIZE - PLAYER_SIZE);
  player.y = clamp(player.y, 0, ARENA_SIZE - PLAYER_SIZE);
  player.vx = player.x - oldX;
  player.vy = player.y - oldY;

  return touchedCactus;
}

function damageFromCactuses(player, cactuses, currentTime, touchedCactus) {
  if (currentTime - player.lastCactusDamageAt < TOUCH_DAMAGE_COOLDOWN_MS) return;

  if (touchedCactus || cactuses.some(cactus => rectsCollide(playerRect(player), cactus))) {
    player.health = Math.max(0, player.health - 1);
    player.lastCactusDamageAt = currentTime;
  }
}

function shoot(player, room, currentTime) {
  if (!player.input.shooting || currentTime - player.lastShotAt < PLAYER_FIRE_COOLDOWN_MS) return;

  const centerX = player.x + PLAYER_SIZE / 2;
  const centerY = player.y + PLAYER_SIZE / 2;
  const aimX = clamp(Number(player.input.aimX) || centerX, 0, ARENA_SIZE);
  const aimY = clamp(Number(player.input.aimY) || centerY, 0, ARENA_SIZE);
  let dx = aimX - centerX;
  let dy = aimY - centerY;
  const length = Math.hypot(dx, dy) || 1;
  dx /= length;
  dy /= length;

  player.lastShotAt = currentTime;
  room.bullets.push({
    x: centerX,
    y: centerY,
    vx: dx * BULLET_SPEED,
    vy: dy * BULLET_SPEED,
    owner: player.slot
  });
}

function updateBullets(room) {
  const keep = [];

  for (const bullet of room.bullets) {
    bullet.x += bullet.vx;
    bullet.y += bullet.vy;

    const bulletRect = {
      x: bullet.x - BULLET_SIZE / 2,
      y: bullet.y - BULLET_SIZE / 2,
      w: BULLET_SIZE,
      h: BULLET_SIZE
    };

    if (
      bulletRect.x + bulletRect.w < 0 ||
      bulletRect.y + bulletRect.h < 0 ||
      bulletRect.x > ARENA_SIZE ||
      bulletRect.y > ARENA_SIZE
    ) {
      continue;
    }

    if (room.cactuses.some(cactus => rectsCollide(bulletRect, cactus))) {
      continue;
    }

    const targetSlot = bullet.owner === 1 ? 2 : 1;
    const target = room.players[targetSlot];
    if (target && rectsCollide(bulletRect, playerRect(target))) {
      target.health = Math.max(0, target.health - 1);
      continue;
    }

    keep.push(bullet);
  }

  room.bullets = keep;
}

function roomIsFull(room) {
  return [...room.sockets.values()].filter(Boolean).length >= 2;
}

function firstOpenSlot(room) {
  const taken = new Set(room.sockets.values());
  if (!taken.has(1)) return 1;
  if (!taken.has(2)) return 2;
  return null;
}

function livingPlayers(room) {
  return [room.players[1], room.players[2]].filter(Boolean);
}

function tickRoom(room) {
  room.updatedAt = now();

  if (!room.winner && roomIsFull(room)) {
    const currentTime = now();
    const touched = {};

    for (const player of livingPlayers(room)) {
      touched[player.slot] = applyInput(player, room.cactuses);
      shoot(player, room, currentTime);
    }

    for (const player of livingPlayers(room)) {
      damageFromCactuses(player, room.cactuses, currentTime, touched[player.slot]);
    }

    updateBullets(room);

    const player1Dead = room.players[1].health <= 0;
    const player2Dead = room.players[2].health <= 0;
    if (player1Dead && player2Dead) {
      room.winner = 'draw';
    } else if (player1Dead) {
      room.winner = 2;
    } else if (player2Dead) {
      room.winner = 1;
    }
  }

  broadcastState(room);
}

function publicState(room) {
  return {
    type: 'state',
    roomCode: room.code,
    arenaSize: ARENA_SIZE,
    playerSize: PLAYER_SIZE,
    bulletSize: BULLET_SIZE,
    playerLives: PLAYER_LIVES,
    waiting: !roomIsFull(room),
    winner: room.winner,
    cactuses: room.cactuses,
    bullets: room.bullets.map(bullet => ({
      x: Math.round(bullet.x),
      y: Math.round(bullet.y),
      owner: bullet.owner
    })),
    players: {
      1: playerSummary(room.players[1]),
      2: playerSummary(room.players[2])
    }
  };
}

function playerSummary(player) {
  return {
    x: Math.round(player.x),
    y: Math.round(player.y),
    health: player.health
  };
}

function send(socket, message) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  }
}

function broadcastState(room) {
  const state = publicState(room);
  for (const [socket, slot] of room.sockets.entries()) {
    send(socket, { ...state, yourSlot: slot });
  }
}

function parseMessage(raw) {
  try {
    return JSON.parse(raw.toString());
  } catch {
    return null;
  }
}

function cleanInput(input) {
  input = input && typeof input === 'object' ? input : {};
  return {
    up: Boolean(input.up),
    down: Boolean(input.down),
    left: Boolean(input.left),
    right: Boolean(input.right),
    shooting: Boolean(input.shooting),
    aimX: clamp(Number(input.aimX) || ARENA_SIZE / 2, 0, ARENA_SIZE),
    aimY: clamp(Number(input.aimY) || ARENA_SIZE / 2, 0, ARENA_SIZE)
  };
}

function joinRequestedRoom(code) {
  if (!ROOM_CODE_RE.test(code)) return null;
  const room = rooms.get(code);
  if (!room || roomIsFull(room)) return null;
  return room;
}

wss.on('connection', socket => {
  let room = null;
  let slot = null;

  socket.on('message', raw => {
    const message = parseMessage(raw);
    if (!message) {
      send(socket, { type: 'error', error: 'Invalid message JSON' });
      return;
    }

    if (message.type === 'join') {
      if (room) return;
      cleanupRooms();

      room = message.roomCode ? joinRequestedRoom(String(message.roomCode)) : createRoom();
      if (!room) {
        send(socket, { type: 'error', error: 'Room not found or already full' });
        return;
      }

      slot = firstOpenSlot(room);
      if (!slot) {
        send(socket, { type: 'error', error: 'Room is already full' });
        return;
      }

      room.sockets.set(socket, slot);
      room.updatedAt = now();
      send(socket, { type: 'joined', roomCode: room.code, yourSlot: slot });
      broadcastState(room);
      return;
    }

    if (!room || !slot) {
      send(socket, { type: 'error', error: 'Join a room first' });
      return;
    }

    if (message.type === 'input') {
      room.players[slot].input = cleanInput(message.input);
      return;
    }

    if (message.type === 'restart' && room.winner) {
      resetRoom(room);
      broadcastState(room);
    }
  });

  socket.on('close', () => {
    if (!room) return;
    room.sockets.delete(socket);
    room.updatedAt = now();
    broadcastState(room);
  });
});

function sendText(res, statusCode, text, contentType = 'text/plain; charset=utf-8') {
  res.writeHead(statusCode, {
    'Content-Type': contentType,
    'Cache-Control': 'no-store'
  });
  res.end(text);
}

function sendJson(res, statusCode, payload) {
  sendText(res, statusCode, JSON.stringify(payload), 'application/json; charset=utf-8');
}

function serveFile(req, res, pathname) {
  const normalized = pathname === '/shooter-game' || pathname === '/shooter-game/'
    ? '/index.html'
    : pathname.replace(/^\/shooter-game\/?/, '/');
  const filePath = path.resolve(PUBLIC_DIR, normalized.replace(/^\/+/, ''));

  if (!isPathInside(PUBLIC_DIR, filePath)) {
    sendText(res, 403, 'Forbidden');
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      sendText(res, 404, 'Shooter Game file not found');
      return;
    }

    const contentType = MIME_TYPES[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': contentType.includes('html') ? 'no-store' : 'public, max-age=3600'
    });
    res.end(req.method === 'HEAD' ? undefined : data);
  });
}

function handle(req, res) {
  const url = new URL(req.url, 'http://localhost');
  const pathname = url.pathname;

  if (pathname === '/shooter-game/health' && req.method === 'GET') {
    cleanupRooms();
    sendJson(res, 200, {
      ok: true,
      service: 'shooter-game',
      activeRooms: rooms.size,
      websocketPath: '/shooter-game/ws'
    });
    return;
  }

  if ((pathname === '/shooter-game' || pathname.startsWith('/shooter-game/')) && (req.method === 'GET' || req.method === 'HEAD')) {
    serveFile(req, res, pathname);
    return;
  }

  sendJson(res, 404, { ok: false, error: 'Shooter Game route not found' });
}

function handleUpgrade(req, socket, head) {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  if (pathname !== '/shooter-game/ws') return false;

  wss.handleUpgrade(req, socket, head, ws => {
    wss.emit('connection', ws, req);
  });
  return true;
}

module.exports = {
  handle,
  handleUpgrade
};
