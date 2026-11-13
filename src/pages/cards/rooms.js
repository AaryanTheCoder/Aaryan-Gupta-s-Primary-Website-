const { randomUUID, randomBytes } = require('crypto');
const { makeDeck, shuffle, requireMove } = require('./deck');
const bluff = require('./bluff');
const poker = require('./poker');

const engines = { bluff, poker };
const emptyMedia = () => ({ joined: false, camera: false, microphone: false });

function settingsFor(type, input = {}) {
  requireMove(
    input && typeof input === 'object' && !Array.isArray(input),
    'Invalid game settings.'
  );
  if (type === 'bluff') {
    const jokers = input.jokers ?? 0;
    const rankMode = input.rankMode ?? 'same';
    const voiceMode = input.voiceMode ?? false;
    requireMove(
      Number.isInteger(jokers) && jokers >= 0 && jokers <= 2,
      'Choose 0, 1, or 2 jokers.'
    );
    requireMove(['same', 'adjacent'].includes(rankMode), 'Choose a valid rank rule.');
    requireMove(typeof voiceMode === 'boolean', 'Voice declarations must be on or off.');
    return { jokers, rankMode, voiceMode };
  }
  requireMove(type === 'poker', 'Choose Bluff or Poker.');
  const startingChips = input.startingChips ?? 1000;
  const smallBlind = input.smallBlind ?? 10;
  const bigBlind = input.bigBlind ?? 20;
  requireMove(
    [startingChips, smallBlind, bigBlind].every(
      (value) => Number.isSafeInteger(value) && value > 0 && value <= 1000000
    ),
    'Chips and blinds must be whole numbers from 1 to 1,000,000.'
  );
  requireMove(
    smallBlind < bigBlind && bigBlind < startingChips,
    'Use a small blind below the big blind, and a big blind below the starting chips.'
  );
  return { startingChips, smallBlind, bigBlind };
}

class GameHub {
  constructor({ now = Date.now } = {}) {
    this.now = now;
    this.sessions = new Map();
    this.tokens = new Map();
    this.rooms = new Map();
    this.invites = new Map();
  }

  connect(send, close = () => {}) {
    return { send, close, sessionId: null, joinedAt: this.now() };
  }

  send(session, message) {
    if (session?.connected) session.peer.send({ ...message, serverTime: this.now() });
  }

  receive(peer, message) {
    try {
      requireMove(
        message && typeof message === 'object' && !Array.isArray(message),
        'Invalid command.'
      );
      if (message.type === 'join' || message.type === 'resume') {
        requireMove(!peer.sessionId, 'You already have a nickname.');
        this.identify(peer, message);
        return;
      }
      const session = this.sessions.get(peer.sessionId);
      requireMove(
        session && session.peer === peer && session.connected,
        'Choose a nickname first.'
      );
      if (message.type === 'create') this.createRoom(session, message);
      else if (message.type === 'respond') this.respond(session, message);
      else if (message.type === 'leave') this.leave(session);
      else if (message.type === 'signal') this.signal(session, message);
      else if (message.type === 'media') this.media(session, message);
      else {
        const room = this.rooms.get(session.roomId);
        requireMove(room && room.players.includes(session.id), 'You are not in a room.');
        if (message.type === 'move') {
          requireMove(room.game && room.game.phase !== 'ended', 'The game is not running.');
          if (engines[room.type].tick(room.game, this.now())) this.broadcastRoom(room);
          engines[room.type].action(room.game, session.id, message, this.now());
        } else {
          requireMove(room.adminId === session.id, 'Only the room admin can do that.');
          if (message.type === 'start') this.start(room);
          else if (message.type === 'removeTen') this.removeTen(room);
          else if (message.type === 'end') {
            requireMove(room.game && room.game.phase !== 'ended', 'No game is running.');
            engines[room.type].end(room.game, 'The admin ended the game.');
          } else if (message.type === 'reset') {
            requireMove(room.game?.phase === 'ended', 'Finish this game first.');
            room.game = null;
            room.preparedDeck = null;
            room.removedTen = false;
          } else throw new Error('Unknown command.');
        }
        this.broadcastRoom(room);
      }
    } catch (error) {
      peer.send({
        type: 'error',
        error: error.message,
        code: error.code || 'invalidMove',
        serverTime: this.now()
      });
    }
  }

  identify(peer, message) {
    let session;
    if (message.type === 'resume') {
      session = this.sessions.get(this.tokens.get(message.token));
      if (!session || (!session.connected && this.now() - session.disconnectedAt >= 60000)) {
        const error = new Error(
          'Your previous session has ended. Choose a nickname to join again.'
        );
        error.code = 'resumeExpired';
        throw error;
      }
      if (session.connected) {
        session.peer.send({ type: 'replaced' });
        session.peer.sessionId = null;
        session.peer.close();
      }
    } else {
      requireMove(typeof message.name === 'string', 'Enter your nickname.');
      const name = message.name.normalize('NFKC').trim().replace(/\s+/gu, ' ');
      requireMove(
        name.length >= 1 && name.length <= 20 && !/[\p{Cc}\p{Cf}]/u.test(name),
        'Use a nickname of 1–20 visible characters.'
      );
      requireMove(
        ![...this.sessions.values()].some(
          (s) => s.name.toLocaleLowerCase() === name.toLocaleLowerCase()
        ),
        'That nickname is taken. Try another.'
      );
      session = {
        id: randomUUID(),
        token: randomBytes(32).toString('hex'),
        name,
        roomId: null,
        inviteTimes: [],
        media: emptyMedia()
      };
      this.sessions.set(session.id, session);
      this.tokens.set(session.token, session.id);
    }
    peer.sessionId = session.id;
    session.peer = peer;
    session.connected = true;
    session.disconnectedAt = null;
    this.send(session, {
      type: 'session',
      player: { id: session.id, name: session.name },
      token: session.token
    });
    this.broadcastLobby();
    const room = this.rooms.get(session.roomId);
    if (room) this.broadcastRoom(room);
    else this.send(session, { type: 'room', room: null });
    for (const invite of this.invites.values())
      if (invite.to === session.id && invite.expiresAt > this.now()) this.sendInvitation(invite);
  }

  broadcastLobby() {
    const players = [...this.sessions.values()]
      .filter((s) => s.connected)
      .map((s) => ({
        id: s.id,
        name: s.name,
        status: !s.roomId ? 'available' : this.rooms.get(s.roomId)?.game ? 'playing' : 'in room'
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
    for (const s of this.sessions.values()) this.send(s, { type: 'lobby', players });
  }

  roomView(room, playerId) {
    return {
      id: room.id,
      type: room.type,
      settings: room.settings,
      adminId: room.adminId,
      removedTen: room.removedTen,
      players: room.players
        .map((id) => this.sessions.get(id))
        .filter(Boolean)
        .map((s) => ({ id: s.id, name: s.name, connected: s.connected, media: s.media })),
      invitations: room.invitations.map((invite) => ({ name: invite.name, status: invite.status })),
      game: room.game ? engines[room.type].view(room.game, playerId) : null
    };
  }

  broadcastRoom(room) {
    for (const id of room.players)
      this.send(this.sessions.get(id), { type: 'room', room: this.roomView(room, id) });
    this.broadcastLobby();
  }

  createRoom(session, message) {
    requireMove(!session.roomId, 'Leave your current room first.');
    const targets = message.players;
    requireMove(
      Array.isArray(targets) &&
        targets.length >= 1 &&
        targets.length <= 5 &&
        new Set(targets).size === targets.length &&
        !targets.includes(session.id),
      'Choose 1–5 other players.'
    );
    const opponents = targets.map((id) => this.sessions.get(id));
    requireMove(
      opponents.every((s) => s?.connected && !s.roomId),
      'One of those players is no longer available.'
    );
    const settings = settingsFor(message.game, message.settings);
    session.inviteTimes = session.inviteTimes.filter((time) => this.now() - time < 60000);
    requireMove(
      session.inviteTimes.length + targets.length <= 15,
      'Please wait before sending more invitations.'
    );
    targets.forEach(() => session.inviteTimes.push(this.now()));
    const room = {
      id: randomUUID(),
      type: message.game,
      settings,
      adminId: session.id,
      players: [session.id],
      invitations: [],
      game: null,
      preparedDeck: null,
      removedTen: false
    };
    this.rooms.set(room.id, room);
    session.roomId = room.id;
    this.cancelInvitesFor(session.id, 'busy');
    for (const opponent of opponents) {
      const invite = {
        id: randomUUID(),
        roomId: room.id,
        from: session.id,
        to: opponent.id,
        name: opponent.name,
        expiresAt: this.now() + 60000,
        status: 'pending'
      };
      this.invites.set(invite.id, invite);
      room.invitations.push(invite);
      this.sendInvitation(invite);
    }
    this.broadcastRoom(room);
  }

  sendInvitation(invite) {
    const room = this.rooms.get(invite.roomId);
    const host = this.sessions.get(room?.adminId);
    if (room && host)
      this.send(this.sessions.get(invite.to), {
        type: 'invitation',
        invitation: {
          id: invite.id,
          from: host.name,
          game: room.type,
          settings: room.settings,
          expiresAt: invite.expiresAt
        }
      });
  }

  resolveInvite(invite, status) {
    invite.status = status;
    this.invites.delete(invite.id);
    this.send(this.sessions.get(invite.to), { type: 'invitationRemoved', id: invite.id });
  }

  cancelInvitesFor(playerId, status) {
    const changed = new Set();
    for (const invite of this.invites.values())
      if (invite.to === playerId) {
        this.resolveInvite(invite, status);
        changed.add(invite.roomId);
      }
    for (const id of changed) if (this.rooms.has(id)) this.broadcastRoom(this.rooms.get(id));
  }

  respond(session, message) {
    const invite = this.invites.get(message.id);
    requireMove(invite && invite.to === session.id, 'That invitation is no longer available.');
    requireMove(invite.expiresAt > this.now(), 'That invitation has expired.');
    const room = this.rooms.get(invite.roomId);
    requireMove(room && !room.game, 'That game has already started.');
    requireMove(typeof message.accept === 'boolean', 'Accept or decline the invitation.');
    if (message.accept) {
      requireMove(!session.roomId, 'Leave your current room first.');
      requireMove(
        room.players.length < 6 && !room.removedTen,
        'That room is full or locked for two players.'
      );
      session.roomId = room.id;
      room.players.push(session.id);
    }
    this.resolveInvite(invite, message.accept ? 'accepted' : 'declined');
    if (message.accept) this.cancelInvitesFor(session.id, 'busy');
    this.broadcastRoom(room);
  }

  removeTen(room) {
    requireMove(
      !room.game && room.type === 'bluff' && room.players.length === 2 && !room.removedTen,
      'Remove 10 is only available once, before dealing two-player Bluff.'
    );
    room.preparedDeck = shuffle(makeDeck(room.settings.jokers)).slice(10);
    room.removedTen = true;
    // Removing ten commits the room to two players, so later acceptances cannot
    // silently turn a shortened two-player deck into a larger game.
    for (const invite of room.invitations)
      if (invite.status === 'pending') this.resolveInvite(invite, 'cancelled');
  }

  start(room) {
    requireMove(!room.game, 'The game has already started.');
    const players = room.players.map((id) => this.sessions.get(id));
    requireMove(
      players.length >= 2 && players.every((p) => p.connected),
      'At least two connected players are needed.'
    );
    room.game = engines[room.type].create(players, room.settings, this.now(), room.preparedDeck);
    room.preparedDeck = null;
    for (const invite of room.invitations)
      if (invite.status === 'pending') this.resolveInvite(invite, 'cancelled');
  }

  media(session, message) {
    const room = this.rooms.get(session.roomId);
    requireMove(room && room.players.includes(session.id), 'Join a room to use the call.');
    requireMove(
      ['joined', 'camera', 'microphone'].every((key) => typeof message[key] === 'boolean'),
      'Invalid call state.'
    );
    session.media = {
      joined: message.joined,
      camera: message.joined && message.camera,
      microphone: message.joined && message.microphone
    };
    this.broadcastRoom(room);
  }

  signal(session, message) {
    const other = this.sessions.get(message.to);
    const room = this.rooms.get(session.roomId);
    requireMove(
      room &&
        other &&
        other.id !== session.id &&
        room.players.includes(other.id) &&
        other.connected &&
        other.roomId === room.id &&
        session.media.joined &&
        other.media.joined,
      'Both players must join the same room call.'
    );
    const signal = message.signal;
    requireMove(
      signal && typeof signal === 'object' && !Array.isArray(signal),
      'Invalid call message.'
    );
    const description = signal.description;
    const candidate = signal.candidate;
    requireMove(Boolean(description) !== Boolean(candidate), 'Send one call message at a time.');
    requireMove(
      (description &&
        ['offer', 'answer'].includes(description.type) &&
        typeof description.sdp === 'string' &&
        description.sdp.length <= 48000) ||
        (candidate &&
          typeof candidate.candidate === 'string' &&
          candidate.candidate.length <= 4000),
      'Invalid call message.'
    );
    // Rebuild the message so an arbitrary object cannot be forwarded to a peer.
    const clean = description
      ? { description: { type: description.type, sdp: description.sdp } }
      : {
          candidate: {
            candidate: candidate.candidate,
            sdpMid: typeof candidate.sdpMid === 'string' ? candidate.sdpMid.slice(0, 100) : null,
            sdpMLineIndex: Number.isInteger(candidate.sdpMLineIndex)
              ? candidate.sdpMLineIndex
              : null,
            usernameFragment:
              typeof candidate.usernameFragment === 'string'
                ? candidate.usernameFragment.slice(0, 256)
                : null
          }
        };
    this.send(other, { type: 'signal', from: session.id, signal: clean });
  }

  leave(session) {
    const room = this.rooms.get(session.roomId);
    session.roomId = null;
    session.media = emptyMedia();
    if (!room) return;
    room.players = room.players.filter((id) => id !== session.id);
    if (room.game && room.game.phase !== 'ended') {
      if (room.type === 'bluff')
        bluff.end(room.game, `${session.name} left. Bluff ended without a winner.`);
      else poker.depart(room.game, session.id, this.now());
    }
    if (room.adminId === session.id) room.adminId = room.players[0];
    if (!room.game && room.removedTen) {
      room.removedTen = false;
      room.preparedDeck = null;
    }
    if (!room.players.length) {
      for (const invite of room.invitations)
        if (invite.status === 'pending') this.resolveInvite(invite, 'cancelled');
      this.rooms.delete(room.id);
    } else this.broadcastRoom(room);
    this.send(session, { type: 'room', room: null });
    this.broadcastLobby();
  }

  disconnect(peer) {
    const session = this.sessions.get(peer.sessionId);
    if (!session || session.peer !== peer) return;
    session.connected = false;
    session.disconnectedAt = this.now();
    session.media = emptyMedia();
    const room = this.rooms.get(session.roomId);
    if (room) this.broadcastRoom(room);
    this.broadcastLobby();
  }

  tick() {
    const now = this.now();
    for (const session of this.sessions.values())
      if (!session.connected && now - session.disconnectedAt >= 60000) {
        this.leave(session);
        this.cancelInvitesFor(session.id, 'offline');
        this.tokens.delete(session.token);
        this.sessions.delete(session.id);
      }
    for (const invite of this.invites.values())
      if (now >= invite.expiresAt) {
        this.resolveInvite(invite, 'expired');
        const room = this.rooms.get(invite.roomId);
        if (room) this.broadcastRoom(room);
      }
    for (const room of this.rooms.values())
      if (room.game && engines[room.type].tick(room.game, now)) this.broadcastRoom(room);
  }
}

module.exports = { GameHub, settingsFor };
