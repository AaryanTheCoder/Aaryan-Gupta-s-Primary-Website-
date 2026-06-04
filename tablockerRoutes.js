const crypto = require('crypto');
const WebSocket = require('ws');

const ROOM_TTL_MS = 6 * 60 * 60 * 1000;
const ROOM_CODE_RE = /^\d{6}$/;
const rooms = new Map();
const wss = new WebSocket.Server({ noServer: true });

function makeCode() {
  let code;
  do {
    code = String(Math.floor(100000 + Math.random() * 900000));
  } while (rooms.has(code));
  return code;
}

function makeToken() {
  return crypto.randomBytes(24).toString('hex');
}

function now() {
  return Date.now();
}

function cleanupRooms() {
  const cutoff = now() - ROOM_TTL_MS;
  for (const [code, room] of rooms.entries()) {
    if (room.updatedAt < cutoff) {
      broadcast(room, { type: 'roomClosed' });
      closeRoomSockets(room);
      rooms.delete(code);
    }
  }
}

setInterval(cleanupRooms, 10 * 60 * 1000).unref?.();

function touch(room) {
  room.updatedAt = now();
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(payload));
}

function readJsonBody(req, callback) {
  let body = '';
  req.on('data', chunk => {
    body += chunk;
    if (Buffer.byteLength(body) > 128 * 1024) {
      req.destroy();
    }
  });
  req.on('end', () => {
    try {
      callback(null, JSON.parse(body || '{}'));
    } catch (error) {
      callback(error);
    }
  });
  req.on('error', callback);
}

function statusPage(res) {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8',
    'Cache-Control': 'no-store'
  });
  res.end(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>TabLocker Remote Classroom</title>
  <style>
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: #f5f7fb; color: #202124; }
    main { width: min(720px, calc(100% - 32px)); background: white; border: 1px solid #dfe4ee; border-radius: 10px; padding: 28px; box-shadow: 0 14px 40px rgba(32,33,36,.10); }
    h1 { margin: 0 0 10px; }
    p { color: #5f6368; line-height: 1.6; }
    code { background: #eef3fe; color: #174ea6; padding: 3px 6px; border-radius: 5px; }
  </style>
</head>
<body>
  <main>
    <h1>TabLocker Remote Classroom is live</h1>
    <p>Health endpoint: <code>/tablocker/health</code></p>
    <p>WebSocket endpoint: <code>/tablocker/ws</code></p>
    <p>Active rooms reset when this Azure App Service restarts.</p>
  </main>
</body>
</html>`);
}

function createRoom(res) {
  cleanupRooms();
  const code = makeCode();
  const room = {
    code,
    hostToken: makeToken(),
    hostSocket: null,
    students: new Map(),
    createdAt: now(),
    updatedAt: now()
  };
  rooms.set(code, room);
  sendJson(res, 201, {
    ok: true,
    code,
    hostToken: room.hostToken,
    expiresInMs: ROOM_TTL_MS
  });
}

function roomSummary(room) {
  return {
    ok: true,
    code: room.code,
    studentCount: room.students.size,
    createdAt: room.createdAt,
    updatedAt: room.updatedAt
  };
}

function handle(req, res) {
  const url = new URL(req.url, 'http://localhost');
  const pathname = url.pathname;

  if (req.method === 'OPTIONS') {
    sendJson(res, 204, {});
    return;
  }

  if (pathname === '/tablocker' && req.method === 'GET') {
    statusPage(res);
    return;
  }

  if (pathname === '/tablocker/health' && req.method === 'GET') {
    cleanupRooms();
    sendJson(res, 200, {
      ok: true,
      service: 'tablocker-remote-classroom',
      activeRooms: rooms.size,
      websocketPath: '/tablocker/ws'
    });
    return;
  }

  if (pathname === '/tablocker/api/rooms' && req.method === 'POST') {
    readJsonBody(req, error => {
      if (error) {
        sendJson(res, 400, { ok: false, error: 'Invalid JSON body' });
        return;
      }
      createRoom(res);
    });
    return;
  }

  const roomMatch = pathname.match(/^\/tablocker\/api\/rooms\/(\d{6})$/);
  if (roomMatch && req.method === 'GET') {
    cleanupRooms();
    const room = rooms.get(roomMatch[1]);
    if (!room) {
      sendJson(res, 404, { ok: false, error: 'Room not found' });
      return;
    }
    sendJson(res, 200, roomSummary(room));
    return;
  }

  sendJson(res, 404, { ok: false, error: 'TabLocker route not found' });
}

function send(ws, payload) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(payload));
  }
}

function broadcast(room, payload) {
  send(room.hostSocket, payload);
  for (const student of room.students.values()) {
    send(student.ws, payload);
  }
}

function roster(room) {
  return Array.from(room.students.values()).map(student => ({
    id: student.id,
    name: student.name,
    joinedAt: student.joinedAt,
    updatedAt: student.updatedAt
  }));
}

function sendRoster(room) {
  send(room.hostSocket, {
    type: 'roster',
    code: room.code,
    students: roster(room)
  });
}

function closeRoomSockets(room) {
  if (room.hostSocket) {
    try { room.hostSocket.close(); } catch {}
  }
  for (const student of room.students.values()) {
    try { student.ws.close(); } catch {}
  }
}

function parseMessage(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function isHost(room, message) {
  return Boolean(room && message.hostToken && message.hostToken === room.hostToken);
}

function commandId() {
  return `cmd-${now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function relayToStudent(room, studentId, payload) {
  const student = room.students.get(studentId);
  if (!student) return false;
  touch(room);
  student.updatedAt = now();
  send(student.ws, payload);
  return true;
}

function relayToAllStudents(room, buildPayload) {
  let sent = 0;
  for (const student of room.students.values()) {
    send(student.ws, buildPayload(student));
    sent += 1;
  }
  touch(room);
  return sent;
}

function handleHostMessage(ws, room, message) {
  if (!isHost(room, message)) {
    send(ws, { type: 'error', error: 'Host authorization failed' });
    return;
  }

  if (message.type === 'lockStudent') {
    const sent = relayToStudent(room, message.studentId, {
      type: 'command',
      commandId: commandId(),
      command: message.command || { action: 'remoteStartLock' }
    });
    if (!sent) send(ws, { type: 'error', error: 'Student is not connected' });
    return;
  }

  if (message.type === 'lockAll') {
    relayToAllStudents(room, () => ({
      type: 'command',
      commandId: commandId(),
      command: message.command || { action: 'remoteStartLock' }
    }));
    return;
  }

  if (message.type === 'unlockStudent') {
    const sent = relayToStudent(room, message.studentId, {
      type: 'command',
      commandId: commandId(),
      command: { action: 'remoteStopLock' }
    });
    if (!sent) send(ws, { type: 'error', error: 'Student is not connected' });
    return;
  }

  if (message.type === 'unlockAll') {
    relayToAllStudents(room, () => ({
      type: 'command',
      commandId: commandId(),
      command: { action: 'remoteStopLock' }
    }));
    return;
  }

  if (message.type === 'requestTabs') {
    const sent = relayToStudent(room, message.studentId, { type: 'requestTabs' });
    if (!sent) send(ws, { type: 'error', error: 'Student is not connected' });
  }
}

function handleStudentMessage(ws, room, student, message) {
  if (message.type === 'studentTabs') {
    send(room.hostSocket, {
      type: 'studentTabs',
      code: room.code,
      studentId: student.id,
      studentName: student.name,
      tabs: Array.isArray(message.tabs) ? message.tabs : []
    });
    return;
  }

  if (message.type === 'studentStatus') {
    send(room.hostSocket, {
      type: 'studentStatus',
      code: room.code,
      studentId: student.id,
      studentName: student.name,
      commandId: message.commandId || '',
      ok: Boolean(message.ok),
      status: String(message.status || '')
    });
  }
}

wss.on('connection', ws => {
  let currentRoom = null;
  let currentStudent = null;
  let isCurrentHost = false;

  ws.on('message', raw => {
    const message = parseMessage(raw);
    if (!message) {
      send(ws, { type: 'error', error: 'Invalid message JSON' });
      return;
    }

    if (message.type === 'joinHost') {
      const code = String(message.code || '');
      const room = rooms.get(code);
      if (!room || !isHost(room, message)) {
        send(ws, { type: 'error', error: 'Room not found or host token invalid' });
        ws.close();
        return;
      }
      currentRoom = room;
      isCurrentHost = true;
      room.hostSocket = ws;
      touch(room);
      sendRoster(room);
      return;
    }

    if (message.type === 'joinStudent') {
      const code = String(message.code || '');
      const room = ROOM_CODE_RE.test(code) ? rooms.get(code) : null;
      if (!room) {
        send(ws, { type: 'error', error: 'Room not found' });
        ws.close();
        return;
      }
      const student = {
        id: String(message.studentId || makeToken()).slice(0, 80),
        name: String(message.name || 'Student').slice(0, 80),
        ws,
        joinedAt: now(),
        updatedAt: now()
      };
      currentRoom = room;
      currentStudent = student;
      room.students.set(student.id, student);
      touch(room);
      sendRoster(room);
      return;
    }

    if (!currentRoom) {
      send(ws, { type: 'error', error: 'Join a room first' });
      return;
    }

    if (isCurrentHost) {
      handleHostMessage(ws, currentRoom, message);
    } else if (currentStudent) {
      handleStudentMessage(ws, currentRoom, currentStudent, message);
    }
  });

  ws.on('close', () => {
    if (!currentRoom) return;
    if (isCurrentHost && currentRoom.hostSocket === ws) {
      currentRoom.hostSocket = null;
    }
    if (currentStudent) {
      currentRoom.students.delete(currentStudent.id);
      sendRoster(currentRoom);
    }
    touch(currentRoom);
  });
});

function handleUpgrade(req, socket, head) {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  if (pathname !== '/tablocker/ws') return false;

  wss.handleUpgrade(req, socket, head, ws => {
    wss.emit('connection', ws, req);
  });
  return true;
}

module.exports = {
  handle,
  handleUpgrade
};
