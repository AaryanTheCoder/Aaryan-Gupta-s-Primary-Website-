// Physics and AI copied from your primary website's shooter-game/routes.js.
// This local version runs in the browser, so Flask is the only server needed.
// The movement, shooting, obstacles and low-health difficulty use the same rules.
const DEFAULT_GAME_SETTINGS = Object.freeze({
  arenaSize: 900,
  fps: 100,

  playerSize: 64,
  playerSpeed: 5,
  playerLives: 10,
  playerShotsPerSecond: 6.7,

  bulletSize: 18,
  bulletSpeed: 7.7,

  cactusSize: 74,
  cactusDamageCooldownMs: 900,

  aiStartSpeed: 0.5,
  aiHardcoreSpeed: 10,
  aiStartBulletSpeed: 4,
  aiHardcoreBulletSpeed: 7.7,
  aiStartShotsPerSecond: 0.25,
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


const ARENA_SIZE = DEFAULT_GAME_SETTINGS.arenaSize;
const PLAYER_SIZE = DEFAULT_GAME_SETTINGS.playerSize;
const BULLET_SIZE = DEFAULT_GAME_SETTINGS.bulletSize;
const CACTUS_SIZE = DEFAULT_GAME_SETTINGS.cactusSize;
function now() { return Date.now(); }
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
  // Keep small easy-mode steps: rounding half a pixel could stop the AI moving.
  const hardcore = aiIsHardcore(aiPlayer, settings);
  aiPlayer.x += hardcore ? Math.round(movement.x) : movement.x;
  touchedCactus = pushOutOfObstacles(aiPlayer, room.cactuses) || touchedCactus;
  aiPlayer.y += hardcore ? Math.round(movement.y) : movement.y;
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


class ShooterMatch {
  constructor() {
    this.settings = { ...DEFAULT_GAME_SETTINGS };
    this.restart();
  }

  restart() {
    this.players = { 1: makePlayer(1, this.settings), 2: makePlayer(2, this.settings) };
    this.bullets = [];
    this.cactuses = makeCactuses();
    this.winner = null;
  }

  tick() {
    if (this.winner) return;
    const currentTime = now();
    const human = this.players[1];
    const ai = this.players[2];
    const humanTouched = applyInput(human, this.cactuses, this.settings);
    shoot(human, this, currentTime);
    const aiTouched = applyAiMovement(ai, human, this);
    applyAiShooting(ai, human, this, currentTime);
    damageFromCactuses(human, this.cactuses, currentTime, humanTouched, this.settings);
    damageFromCactuses(ai, this.cactuses, currentTime, aiTouched, this.settings);
    updateBullets(this);
    if (human.health <= 0 && ai.health <= 0) this.winner = 'draw';
    else if (human.health <= 0) this.winner = 2;
    else if (ai.health <= 0) this.winner = 1;
  }

  state() {
    return {
      playerSize: PLAYER_SIZE, bulletSize: BULLET_SIZE,
      playerLives: this.settings.playerLives, winner: this.winner,
      cactuses: this.cactuses, bullets: this.bullets, players: this.players
    };
  }
}

