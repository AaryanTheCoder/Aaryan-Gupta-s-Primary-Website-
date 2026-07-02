const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');
const { isPathInside } = require('../../shared/routeHelpers');

const PUBLIC_DIR = path.join(__dirname, 'public');

// ---------- Easy game settings ----------
// Change these values to tune the online 1v1 match.
const DEFAULT_GAME_SETTINGS = Object.freeze({
  arenaSize: 900,
  fps: 100,
  roomLifetimeHours: 3,
  roomCodeDigits: 4,

  playerSize: 64,
  playerSpeed: 5,
  playerLives: 10,
  playerShotsPerSecond: 6.7,

  bulletSize: 18,
  bulletSpeed: 7.7,

  cactusSize: 74,
  cactusDamageCooldownMs: 900,

  aiStartSpeed: 1,
  aiHardcoreSpeed: 10,
  aiStartBulletSpeed: 4,
  aiHardcoreBulletSpeed: 7.7,
  aiStartShotsPerSecond: 0.5,
  aiHardcoreShotsPerSecond: 30,
  aiHardcoreAfterLosingLives: 7,
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

const SETTING_LIMITS = Object.freeze({
  playerSpeed: [1, 18],
  playerLives: [1, 50],
  playerShotsPerSecond: [0.2, 20],
  bulletSpeed: [1, 30],
  cactusDamageCooldownMs: [100, 5000],
  aiStartSpeed: [0, 18],
  aiHardcoreSpeed: [0, 24],
  aiStartBulletSpeed: [1, 30],
  aiHardcoreBulletSpeed: [1, 36],
  aiStartShotsPerSecond: [0.1, 20],
  aiHardcoreShotsPerSecond: [0.1, 80],
  aiHardcoreAfterLosingLives: [0, 50],
  aiDodgeLookahead: [0, 1000],
  aiDodgeRadius: [0, 300],
  aiDodgeWeight: [0, 12],
  aiTooCloseDistance: [0, 700],
  aiTooFarDistance: [0, 900],
  aiStrafeStrength: [0, 5],
  aiStrafeCycleMs: [80, 3000],
  aiCactusAvoidDistanceMultiplier: [0, 5],
  aiCactusAvoidWeight: [0, 8]
});

const ARENA_SIZE = DEFAULT_GAME_SETTINGS.arenaSize;
const FPS = DEFAULT_GAME_SETTINGS.fps;
const TICK_MS = 1000 / FPS;
const ROOM_TTL_MS = DEFAULT_GAME_SETTINGS.roomLifetimeHours * 60 * 60 * 1000;
const ROOM_CODE_RE = new RegExp(`^\\d{${DEFAULT_GAME_SETTINGS.roomCodeDigits}}$`);

const PLAYER_SIZE = DEFAULT_GAME_SETTINGS.playerSize;
const BULLET_SIZE = DEFAULT_GAME_SETTINGS.bulletSize;
const CACTUS_SIZE = DEFAULT_GAME_SETTINGS.cactusSize;
const ROOM_MODE_ONLINE = 'online';
const ROOM_MODE_AI = 'ai';
const AI_SLOT = 2;

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

function cloneRoomSettings(source = {}) {
  const settings = {};
  for (const key of Object.keys(DEFAULT_GAME_SETTINGS)) {
    settings[key] = source[key] ?? DEFAULT_GAME_SETTINGS[key];
  }
  return settings;
}

function cleanRoomSettings(input, base = DEFAULT_GAME_SETTINGS) {
  const next = cloneRoomSettings(base);
  const source = input && typeof input === 'object' ? input : {};

  for (const [key, [min, max]] of Object.entries(SETTING_LIMITS)) {
    if (source[key] === undefined) continue;
    const value = Number(source[key]);
    if (!Number.isFinite(value)) continue;
    next[key] = clamp(value, min, max);
  }

  next.playerLives = Math.round(next.playerLives);
  next.aiHardcoreAfterLosingLives = Math.round(next.aiHardcoreAfterLosingLives);
  next.cactusDamageCooldownMs = Math.round(next.cactusDamageCooldownMs);
  next.aiDodgeLookahead = Math.round(next.aiDodgeLookahead);
  next.aiDodgeRadius = Math.round(next.aiDodgeRadius);
  next.aiStrafeCycleMs = Math.round(next.aiStrafeCycleMs);
  return next;
}

function makeCode() {
  const min = 10 ** (DEFAULT_GAME_SETTINGS.roomCodeDigits - 1);
  const range = 9 * min;
  let code;
  do {
    code = String(Math.floor(min + Math.random() * range));
  } while (rooms.has(code));
  return code;
}

function makePlayer(slot, settings) {
  const start = slot === 1
    ? { x: PLAYER_SIZE, y: ARENA_SIZE - PLAYER_SIZE * 2 }
    : { x: ARENA_SIZE - PLAYER_SIZE * 2, y: PLAYER_SIZE };

  return {
    slot,
    x: start.x,
    y: start.y,
    vx: 0,
    vy: 0,
    health: settings.playerLives,
    lastShotAt: -(1000 / settings.playerShotsPerSecond),
    lastCactusDamageAt: -settings.cactusDamageCooldownMs,
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
    1: makePlayer(1, room.settings),
    2: makePlayer(2, room.settings)
  };
  room.players[AI_SLOT].isAi = room.mode === ROOM_MODE_AI;
  room.bullets = [];
  room.cactuses = makeCactuses();
  room.winner = null;
  room.startedAt = now();
  room.updatedAt = now();
}

function createRoom(mode = ROOM_MODE_ONLINE) {
  const room = {
    code: makeCode(),
    mode,
    settings: cloneRoomSettings(),
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

function centerOf(rect) {
  return {
    x: rect.x + rect.w / 2,
    y: rect.y + rect.h / 2
  };
}

function playerCenter(player) {
  return {
    x: player.x + PLAYER_SIZE / 2,
    y: player.y + PLAYER_SIZE / 2
  };
}

function distanceBetween(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function lineIntersectsRect(start, end, rect) {
  if (
    start.x >= rect.x &&
    start.x <= rect.x + rect.w &&
    start.y >= rect.y &&
    start.y <= rect.y + rect.h
  ) {
    return true;
  }

  const dx = end.x - start.x;
  const dy = end.y - start.y;
  let t0 = 0;
  let t1 = 1;
  const checks = [
    [-dx, start.x - rect.x],
    [dx, rect.x + rect.w - start.x],
    [-dy, start.y - rect.y],
    [dy, rect.y + rect.h - start.y]
  ];

  for (const [p, q] of checks) {
    if (p === 0) {
      if (q < 0) return false;
      continue;
    }

    const ratio = q / p;
    if (p < 0) {
      if (ratio > t1) return false;
      if (ratio > t0) t0 = ratio;
    } else {
      if (ratio < t0) return false;
      if (ratio < t1) t1 = ratio;
    }
  }

  return true;
}

function rectLineBlocked(start, end, obstacles) {
  return obstacles.some(obstacle => lineIntersectsRect(start, end, obstacle));
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

function applyInput(player, obstacles, settings) {
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
    dx = (dx / length) * settings.playerSpeed;
    dy = (dy / length) * settings.playerSpeed;
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

function aiIsHardcore(aiPlayer, settings) {
  return settings.playerLives - aiPlayer.health >= settings.aiHardcoreAfterLosingLives;
}

function currentAiSpeed(aiPlayer, settings) {
  return aiIsHardcore(aiPlayer, settings) ? settings.aiHardcoreSpeed : settings.aiStartSpeed;
}

function currentAiBulletSpeed(aiPlayer, settings) {
  return aiIsHardcore(aiPlayer, settings) ? settings.aiHardcoreBulletSpeed : settings.aiStartBulletSpeed;
}

function currentAiFireCooldownMs(aiPlayer, settings) {
  const shotsPerSecond = aiIsHardcore(aiPlayer, settings)
    ? settings.aiHardcoreShotsPerSecond
    : settings.aiStartShotsPerSecond;
  return 1000 / shotsPerSecond;
}

function incomingBulletDodge(aiPlayer, bullets, settings) {
  if (settings.aiDodgeLookahead <= 0 || settings.aiDodgeRadius <= 0 || settings.aiDodgeWeight <= 0) {
    return { x: 0, y: 0 };
  }

  const aiCenter = playerCenter(aiPlayer);
  const dodge = { x: 0, y: 0 };

  for (const bullet of bullets) {
    if (bullet.owner === aiPlayer.slot) continue;

    const velocityLength = Math.hypot(bullet.vx, bullet.vy);
    if (velocityLength === 0) continue;

    const bulletDirection = {
      x: bullet.vx / velocityLength,
      y: bullet.vy / velocityLength
    };
    const toAi = {
      x: aiCenter.x - bullet.x,
      y: aiCenter.y - bullet.y
    };
    const forwardDistance = toAi.x * bulletDirection.x + toAi.y * bulletDirection.y;

    if (forwardDistance < 0 || forwardDistance > settings.aiDodgeLookahead) continue;

    const closestPoint = {
      x: bullet.x + bulletDirection.x * forwardDistance,
      y: bullet.y + bulletDirection.y * forwardDistance
    };
    const missDistance = distanceBetween(aiCenter, closestPoint);

    if (missDistance > settings.aiDodgeRadius) continue;

    const dodgeSide = {
      x: -bulletDirection.y,
      y: bulletDirection.x
    };
    if (toAi.x * dodgeSide.x + toAi.y * dodgeSide.y < 0) {
      dodgeSide.x *= -1;
      dodgeSide.y *= -1;
    }

    const distanceDanger = 1 - missDistance / settings.aiDodgeRadius;
    const timeDanger = 1 - forwardDistance / settings.aiDodgeLookahead;
    dodge.x += dodgeSide.x * (distanceDanger + timeDanger) * settings.aiDodgeWeight;
    dodge.y += dodgeSide.y * (distanceDanger + timeDanger) * settings.aiDodgeWeight;
  }

  return dodge;
}

function applyAiMovement(aiPlayer, humanPlayer, room) {
  const oldX = aiPlayer.x;
  const oldY = aiPlayer.y;
  const aiCenter = playerCenter(aiPlayer);
  const humanCenter = playerCenter(humanPlayer);
  const toHuman = {
    x: humanCenter.x - aiCenter.x,
    y: humanCenter.y - aiCenter.y
  };
  const distance = Math.hypot(toHuman.x, toHuman.y);
  const direction = distance === 0
    ? { x: 1, y: 0 }
    : { x: toHuman.x / distance, y: toHuman.y / distance };
  const lineBlocked = rectLineBlocked(aiCenter, humanCenter, room.cactuses);
  const movement = { x: 0, y: 0 };
  const settings = room.settings;

  if (lineBlocked) {
    movement.x += direction.x;
    movement.y += direction.y;
  } else {
    if (distance < settings.aiTooCloseDistance) {
      movement.x -= direction.x;
      movement.y -= direction.y;
    } else if (distance > settings.aiTooFarDistance) {
      movement.x += direction.x;
      movement.y += direction.y;
    }

    const strafeAmount = Math.sin(now() / settings.aiStrafeCycleMs) * settings.aiStrafeStrength;
    movement.x += -direction.y * strafeAmount;
    movement.y += direction.x * strafeAmount;
  }

  const dodge = incomingBulletDodge(aiPlayer, room.bullets, settings);
  movement.x += dodge.x;
  movement.y += dodge.y;

  let nearestCactus = null;
  let nearestDistance = Infinity;
  for (const cactus of room.cactuses) {
    const cactusDistance = distanceBetween(aiCenter, centerOf(cactus));
    if (cactusDistance < nearestDistance) {
      nearestCactus = cactus;
      nearestDistance = cactusDistance;
    }
  }

  if (nearestCactus && nearestDistance < CACTUS_SIZE * settings.aiCactusAvoidDistanceMultiplier) {
    const cactusCenter = centerOf(nearestCactus);
    const away = {
      x: aiCenter.x - cactusCenter.x,
      y: aiCenter.y - cactusCenter.y
    };
    const awayLength = Math.hypot(away.x, away.y);
    if (awayLength > 0) {
      movement.x += (away.x / awayLength) * settings.aiCactusAvoidWeight;
      movement.y += (away.y / awayLength) * settings.aiCactusAvoidWeight;
    }
  }

  const movementLength = Math.hypot(movement.x, movement.y);
  if (movementLength > 0) {
    const speed = currentAiSpeed(aiPlayer, settings);
    movement.x = (movement.x / movementLength) * speed;
    movement.y = (movement.y / movementLength) * speed;
  }

  let touchedCactus = false;
  aiPlayer.x += Math.round(movement.x);
  touchedCactus = pushOutOfObstacles(aiPlayer, room.cactuses) || touchedCactus;
  aiPlayer.y += Math.round(movement.y);
  touchedCactus = pushOutOfObstacles(aiPlayer, room.cactuses) || touchedCactus;
  aiPlayer.x = clamp(aiPlayer.x, 0, ARENA_SIZE - PLAYER_SIZE);
  aiPlayer.y = clamp(aiPlayer.y, 0, ARENA_SIZE - PLAYER_SIZE);
  aiPlayer.vx = aiPlayer.x - oldX;
  aiPlayer.vy = aiPlayer.y - oldY;

  return touchedCactus;
}

function currentAiTarget(aiPlayer, humanPlayer, settings) {
  const aiCenter = playerCenter(aiPlayer);
  const humanCenter = playerCenter(humanPlayer);
  const distance = distanceBetween(aiCenter, humanCenter);
  const framesUntilHit = distance / currentAiBulletSpeed(aiPlayer, settings);

  return {
    x: clamp(humanCenter.x + humanPlayer.vx * framesUntilHit, 0, ARENA_SIZE),
    y: clamp(humanCenter.y + humanPlayer.vy * framesUntilHit, 0, ARENA_SIZE)
  };
}

function applyAiShooting(aiPlayer, humanPlayer, room, currentTime) {
  const aiCenter = playerCenter(aiPlayer);
  const humanCenter = playerCenter(humanPlayer);
  const settings = room.settings;
  aiPlayer.input.shooting = false;
  if (rectLineBlocked(aiCenter, humanCenter, room.cactuses)) return;

  aiPlayer.input.shooting = true;
  const target = currentAiTarget(aiPlayer, humanPlayer, settings);
  aiPlayer.input.aimX = target.x;
  aiPlayer.input.aimY = target.y;
  aiPlayer.fireCooldownMs = currentAiFireCooldownMs(aiPlayer, settings);
  shoot(aiPlayer, room, currentTime, {
    fireCooldownMs: currentAiFireCooldownMs(aiPlayer, settings),
    bulletSpeed: currentAiBulletSpeed(aiPlayer, settings)
  });
}

function damageFromCactuses(player, cactuses, currentTime, touchedCactus, settings) {
  if (currentTime - player.lastCactusDamageAt < settings.cactusDamageCooldownMs) return;

  if (touchedCactus || cactuses.some(cactus => rectsCollide(playerRect(player), cactus))) {
    player.health = Math.max(0, player.health - 1);
    player.lastCactusDamageAt = currentTime;
  }
}

function shoot(player, room, currentTime, options = {}) {
  const fireCooldownMs = options.fireCooldownMs ?? (1000 / room.settings.playerShotsPerSecond);
  const bulletSpeed = options.bulletSpeed ?? room.settings.bulletSpeed;
  if (!player.input.shooting || currentTime - player.lastShotAt < fireCooldownMs) return;

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
    vx: dx * bulletSpeed,
    vy: dy * bulletSpeed,
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

function roomIsReady(room) {
  return room.mode === ROOM_MODE_AI ? room.sockets.size > 0 : roomIsFull(room);
}

function firstOpenSlot(room) {
  if (room.mode === ROOM_MODE_AI) return room.sockets.size === 0 ? 1 : null;

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

  if (!room.winner && roomIsReady(room)) {
    const currentTime = now();
    const touched = {};

    if (room.mode === ROOM_MODE_AI) {
      const human = room.players[1];
      const ai = room.players[AI_SLOT];
      touched[human.slot] = applyInput(human, room.cactuses, room.settings);
      shoot(human, room, currentTime);
      touched[ai.slot] = applyAiMovement(ai, human, room);
      applyAiShooting(ai, human, room, currentTime);
    } else {
      for (const player of livingPlayers(room)) {
        touched[player.slot] = applyInput(player, room.cactuses, room.settings);
        shoot(player, room, currentTime);
      }
    }

    for (const player of livingPlayers(room)) {
      damageFromCactuses(player, room.cactuses, currentTime, touched[player.slot], room.settings);
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
    playerLives: room.settings.playerLives,
    mode: room.mode,
    settings: room.settings,
    waiting: !roomIsReady(room),
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
    health: player.health,
    isAi: Boolean(player.isAi)
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
  if (!room || room.mode !== ROOM_MODE_ONLINE || roomIsFull(room)) return null;
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

      const requestedMode = message.mode === ROOM_MODE_AI ? ROOM_MODE_AI : ROOM_MODE_ONLINE;
      room = message.roomCode ? joinRequestedRoom(String(message.roomCode)) : createRoom(requestedMode);
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
      return;
    }

    if (message.type === 'updateSettings') {
      if (slot !== 1) {
        send(socket, { type: 'error', error: 'Only player 1 can change room settings' });
        return;
      }

      room.settings = cleanRoomSettings(message.settings, room.settings);
      resetRoom(room);
      send(socket, { type: 'settingsUpdated', settings: room.settings });
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

    const extension = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[extension] || 'application/octet-stream';
    const shouldSkipCache = ['.html', '.js', '.css'].includes(extension);
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': shouldSkipCache ? 'no-store' : 'public, max-age=3600'
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
