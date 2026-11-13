import { TableCall } from './media.js';
import { VoiceDeclaration } from './voice.js';
import { BluffPhoneLayout } from './phone.js';
import { cardsForDrag, canDropCards } from './ranks.mjs';

const $ = (selector) => document.querySelector(selector);
const escape = (value) =>
  String(value ?? '').replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]
  );
const rankLabel = (rank) => ({ 0: '★', 1: 'A', 11: 'J', 12: 'Q', 13: 'K' })[rank] || String(rank);
const suitSymbol = (suit) =>
  ({ clubs: '♣', diamonds: '♦', hearts: '♥', spades: '♠', joker: '★' })[suit] || '';
const gameName = (type) => (type === 'poker' ? 'Texas Hold’em' : 'Bluff');
const storage = {
  get(key) {
    try {
      return sessionStorage.getItem(`cards.${key}`);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      sessionStorage.setItem(`cards.${key}`, value);
    } catch {}
  },
  remove(key) {
    try {
      sessionStorage.removeItem(`cards.${key}`);
    } catch {}
  }
};
const state = {
  me: null,
  room: null,
  players: [],
  selected: new Set(),
  invites: new Map(),
  cards: new Set(),
  order: [],
  offset: 0,
  online: false,
  submitting: false
};
let socket;
let reconnectDelay = 500;
let replaced = false;
let noticeTimer;
let drag = null;
let suppressClick = false;

function notify(message) {
  $('#notice').textContent = message;
  $('#notice').hidden = false;
  clearTimeout(noticeTimer);
  noticeTimer = setTimeout(() => {
    $('#notice').hidden = true;
  }, 6500);
}

function send(message) {
  if (socket?.readyState !== WebSocket.OPEN || !state.online) {
    notify('Reconnecting. Your seat is held for 60 seconds.');
    return false;
  }
  socket.send(JSON.stringify(message));
  return true;
}

const call = new TableCall(send, notify);
const phone = new BluffPhoneLayout();
const now = () => Date.now() + state.offset;
const voice = new VoiceDeclaration({
  game: () => state.room?.game,
  room: () => state.room,
  self: () => state.me?.id,
  now,
  localStream: () => call.local,
  submit: sendMove
});

function sendMove(command) {
  if (send(command))
    for (const button of document.querySelectorAll('[data-move]')) button.disabled = true;
}

function playSelection(ids = [...state.cards]) {
  const game = state.room?.game;
  if (!canDropCards(game, state.me?.id, ids, now())) {
    notify('Select 1–4 cards and wait for your turn.');
    return;
  }
  if (state.room.settings.voiceMode) voice.open(ids);
  else
    sendMove({
      type: 'move',
      action: 'play',
      cards: ids,
      rank: Number($('#claimRank')?.value),
      turnId: game.turnId
    });
}

function canChallenge(game = state.room?.game) {
  return (
    game?.type === 'bluff' &&
    ['playing', 'final'].includes(game.phase) &&
    !!game.lastPlay &&
    game.lastPlay.id !== state.me?.id &&
    now() < game.challengeDeadline
  );
}

function connect() {
  socket = new WebSocket(
    `${location.protocol === 'https:' ? 'wss:' : 'ws:'}//${location.host}/cards/ws`
  );
  socket.addEventListener('open', () => {
    state.online = true;
    reconnectDelay = 500;
    updateConnection();
    const token = storage.get('token');
    if (token) send({ type: 'resume', token });
  });
  socket.addEventListener('message', (event) => {
    let message;
    try {
      message = JSON.parse(event.data);
    } catch {
      return;
    }
    if (message.serverTime) state.offset = message.serverTime - Date.now();
    if (message.type === 'session') {
      state.me = message.player;
      state.submitting = false;
      storage.set('token', message.token);
      storage.set('name', state.me.name);
      $('#myName').textContent = state.me.name;
      $('#myName').hidden = false;
      $('#joinError').textContent = '';
      updateConnection();
      showScreen();
    } else if (message.type === 'lobby') {
      state.players = message.players;
      renderLobby();
    } else if (message.type === 'room') {
      const oldId = state.room?.id;
      const oldHand = state.room?.game?.handNumber;
      const hadGame = !!state.room?.game;
      state.room = message.room;
      if (
        oldId !== state.room?.id ||
        oldHand !== state.room?.game?.handNumber ||
        hadGame !== !!state.room?.game
      ) {
        state.order = [];
        state.cards.clear();
        $('#hand').dataset.handKey = '';
      }
      if (!state.room)
        state.invites.forEach((value, id) => {
          if (value.expiresAt <= Date.now() + state.offset) state.invites.delete(id);
        });
      renderRoom();
      showScreen();
      phone.sync(state.room);
      call.sync(state.room, state.me?.id);
      voice.sync(state.room);
    } else if (message.type === 'invitation') {
      state.invites.set(message.invitation.id, message.invitation);
      renderInvites(true);
    } else if (message.type === 'invitationRemoved') {
      state.invites.delete(message.id);
      renderInvites(false);
    } else if (message.type === 'signal') call.signal(message.from, message.signal);
    else if (message.type === 'replaced') {
      replaced = true;
      call.stop(false);
      voice.cancel();
      notify('This seat was opened in another tab. Reload to reconnect here.');
    } else if (message.type === 'error') {
      state.submitting = false;
      if (message.code === 'resumeExpired') {
        storage.remove('token');
        state.me = null;
        state.room = null;
        state.invites.clear();
        call.sync(null, null);
        phone.sync(null);
        voice.sync(null);
        $('#myName').hidden = true;
        showScreen();
        renderInvites(false);
      }
      if (!state.me) $('#joinError').textContent = message.error;
      else notify(message.error);
      updateConnection();
    }
  });
  socket.addEventListener('close', () => {
    state.online = false;
    state.submitting = false;
    call.suspend();
    voice.cancel();
    state.invites.clear();
    renderInvites(false);
    updateConnection();
    if (!replaced) {
      setTimeout(connect, reconnectDelay);
      reconnectDelay = Math.min(5000, reconnectDelay * 2);
    }
  });
  socket.addEventListener('error', () => {});
}

function updateConnection() {
  $('#connection').textContent = replaced
    ? 'Seat moved'
    : state.online
      ? '● Connected'
      : 'Reconnecting…';
  $('#connection').classList.toggle('offline', !state.online);
  $('#joinButton').disabled = !state.online || state.submitting;
  updateSelection();
  // Disabling stale buttons is only a convenience. The server still validates
  // every move, even if somebody edits these buttons in their browser.
  for (const button of document.querySelectorAll('[data-live]'))
    button.disabled = !state.online || button.dataset.allowed === 'false';
}

function showScreen() {
  document.body.classList.toggle('bluff-room', state.room?.type === 'bluff');
  $('#entry').hidden = !!state.me;
  $('#lobby').hidden = !state.me || !!state.room;
  $('#room').hidden = !state.me || !state.room;
}

function settingsText(type, settings) {
  return type === 'bluff'
    ? `${settings.rankMode === 'same' ? 'Same rank' : 'Same rank or one up/down'} · ${settings.jokers ? `${settings.jokers} wild joker${settings.jokers === 1 ? '' : 's'}` : 'No jokers'}${settings.voiceMode ? ' · Voice declarations' : ''}`
    : `${settings.startingChips.toLocaleString()} starting chips · ${settings.smallBlind}/${settings.bigBlind} blinds · Pretend chips`;
}

function renderLobby() {
  const available = new Set(
    state.players.filter((p) => p.id !== state.me?.id && p.status === 'available').map((p) => p.id)
  );
  for (const id of state.selected) if (!available.has(id)) state.selected.delete(id);
  $('#onlineCount').textContent = `${state.players.length} online`;
  $('#playersList').innerHTML = state.players.length
    ? state.players
        .map((player) => {
          const self = player.id === state.me?.id;
          const disabled = self || player.status !== 'available';
          return `<label class="player-row"><span class="avatar" aria-hidden="true">${escape(player.name[0].toUpperCase())}</span><span class="player-copy"><span class="player-name">${escape(player.name)}${self ? '<span class="you-label">you</span>' : ''}</span><span class="player-status"><br>${self ? 'Ready when you are' : escape(player.status === 'available' ? 'Available for a game' : player.status === 'playing' ? 'Playing' : 'At a table')}</span></span><input type="checkbox" data-player="${escape(player.id)}" aria-label="Challenge ${escape(player.name)}" ${disabled ? 'disabled' : ''} ${state.selected.has(player.id) ? 'checked' : ''}></label>`;
        })
        .join('')
    : '<p class="empty-list">Connecting to the lobby…</p>';
  updateSelection();
}

function updateSelection() {
  const count = state.selected.size;
  $('#selectionCount').textContent = count
    ? `${count} friend${count === 1 ? '' : 's'} selected`
    : 'Select at least one friend';
  $('#challengeButton').disabled = !state.online || count === 0;
}

function cardHtml(card, interactive = false) {
  const red = ['hearts', 'diamonds'].includes(card.suit);
  const name = card.rank === 0 ? 'Joker' : `${rankLabel(card.rank)} of ${card.suit}`;
  const inner = `<span class="corner">${rankLabel(card.rank)}</span><span class="suit" aria-hidden="true">${suitSymbol(card.suit)}</span><span class="bottom-corner" aria-hidden="true">${rankLabel(card.rank)}</span>`;
  return interactive
    ? `<button type="button" class="card ${red ? 'red' : ''} ${state.cards.has(card.id) ? 'selected' : ''}" data-card="${escape(card.id)}" aria-label="${escape(name)}" aria-pressed="${state.cards.has(card.id)}">${inner}</button>`
    : `<span class="card static ${red ? 'red' : ''}" role="img" aria-label="${escape(name)}">${inner}</span>`;
}

function playerName(id) {
  return state.room?.players.find((p) => p.id === id)?.name || 'A player';
}

function renderRoom() {
  const room = state.room;
  if (!room) return;
  const game = room.game;
  const isBluff = room.type === 'bluff';
  $('#bluffTools').hidden = !isBluff;
  $('#tableActivity').hidden = isBluff;
  $('#callPanel').hidden = isBluff;
  const mediaHost = $(isBluff ? '#bluffMediaControls' : '#pokerMediaControls');
  if ($('#mediaControls').parentNode !== mediaHost) mediaHost.append($('#mediaControls'));
  const adminHost = $(isBluff ? '#bluffAdminHost' : '#tableActivity');
  if ($('#adminControls').parentNode !== adminHost) adminHost.append($('#adminControls'));
  const admin = room.adminId === state.me.id;
  $('#roomTitle').textContent = gameName(room.type);
  $('#roomEyebrow').textContent = game
    ? game.phase === 'ended'
      ? 'UNTIL THE NEXT HAND'
      : room.type === 'poker'
        ? `HAND ${game.handNumber} · ${game.street.toUpperCase()}`
        : 'KEEP A STRAIGHT FACE'
    : 'YOUR TABLE IS FILLING UP';
  $('#roomSettings').textContent =
    `${settingsText(room.type, room.settings)}${room.removedTen ? ' · 10 cards removed' : ''}`;
  $('#waitingBar').hidden = !!game;
  const pending = room.invitations.filter((invite) => invite.status === 'pending');
  if (!game)
    $('#waitingBar').innerHTML =
      `<div><strong>${room.players.length}/6 players seated</strong>${pending.length ? `Waiting for ${escape(pending.map((i) => i.name).join(', '))}.` : 'Your players are here.'} ${admin ? 'Start when everyone is ready.' : `${escape(playerName(room.adminId))} will start the game.`}</div>${admin ? `<div class="waiting-actions">${room.type === 'bluff' && room.players.length === 2 ? `<button class="secondary" data-command="removeTen" data-live data-allowed="${!room.removedTen}" ${room.removedTen ? 'disabled' : ''}>${room.removedTen ? '✓ 10 cards removed' : 'Remove 10 random cards'}</button>` : ''}<button data-command="start" data-live data-allowed="${room.players.length >= 2 && room.players.every((p) => p.connected)}" ${room.players.length < 2 || room.players.some((p) => !p.connected) ? 'disabled' : ''}>Shuffle & deal →</button></div>` : ''}`;
  const ownIndex = room.players.findIndex((p) => p.id === state.me.id);
  const seats = room.players.slice(ownIndex).concat(room.players.slice(0, ownIndex));
  $('#tableStage').className = `table-stage players-${seats.length}`;
  $('#seats').className = `seats-${seats.length}`;
  if (isBluff) renderBluffSeats(seats, game, room);
  else
    $('#seats').innerHTML = seats
      .map((p, index) => {
        const stats = game?.players.find((value) => value.id === p.id);
        let description = !p.connected
          ? 'Reconnecting…'
          : !game
            ? 'Ready to play'
            : room.type === 'bluff'
              ? `${stats?.cardCount ?? 0} cards`
              : `${(stats?.stack ?? 0).toLocaleString()} chips${stats?.folded ? ' · Folded' : stats?.allIn ? ' · All-in' : ''}`;
        if (stats?.bet) description += ` · ${stats.bet} bet`;
        const badge = p.id === room.adminId ? ' ♧' : '';
        return `<div class="seat ${game?.turnPlayerId === p.id ? 'current' : ''} ${!p.connected ? 'offline' : ''}" data-position="${index}"><span class="avatar" aria-hidden="true">${escape(p.name[0].toUpperCase())}</span><div><div class="seat-name" title="${escape(p.name)}${p.id === room.adminId ? ' · Admin' : ''}">${escape(p.name)}${p.id === state.me.id ? ' (you)' : ''}${badge}${game?.dealerId === p.id ? ' Ⓓ' : ''}</div><div class="seat-stats">${escape(description)}</div></div>${game?.turnPlayerId === p.id ? '<span class="seat-dot" aria-label="Current turn"></span>' : ''}</div>`;
      })
      .join('');
  $('#tableCenter').innerHTML = centerHtml(room);
  $('#activityLog').innerHTML = (game?.log || room.invitations.map((i) => `${i.name}: ${i.status}`))
    .slice()
    .reverse()
    .map((text) => `<li>${escape(text)}</li>`)
    .join('');
  $('#adminControls').innerHTML =
    admin && game
      ? game.phase === 'ended'
        ? '<button class="secondary" data-command="reset" data-live>Play again</button>'
        : '<button class="danger" data-command="end" data-live>End game</button><span class="hint">You’re the table admin.</span>'
      : '';
  $('#handSection').hidden = !game;
  if (game) renderHand();
  renderMoves();
  updateTimer();
  updateConnection();
  if (isBluff) call.render();
}

function renderBluffSeats(seats, game, room) {
  const container = $('#seats');
  const keep = new Set(seats.map((player) => player.id));
  for (const seat of [...container.children]) if (!keep.has(seat.dataset.seatId)) seat.remove();
  seats.forEach((player, index) => {
    let seat = [...container.children].find((el) => el.dataset.seatId === player.id);
    if (!seat) {
      seat = document.createElement('div');
      seat.dataset.seatId = player.id;
      seat.innerHTML =
        '<div class="seat-media"></div><div class="seat-info"><div class="seat-name"></div><div class="seat-stats"></div></div>';
      container.append(seat);
    }
    seat.className = `seat ${game?.turnPlayerId === player.id ? 'current' : ''} ${!player.connected ? 'offline' : ''}`;
    seat.dataset.position = String(index);
    const name = seat.querySelector('.seat-name');
    name.textContent = `${player.name}${player.id === state.me.id ? ' (you)' : ''}${player.id === room.adminId ? ' ♧' : ''}`;
    name.title = player.name;
    const stats = game?.players.find((p) => p.id === player.id);
    seat.querySelector('.seat-stats').textContent = !player.connected
      ? 'Reconnecting…'
      : stats
        ? `${stats.cardCount} cards${game.turnPlayerId === player.id ? ' · Your turn'.replace('Your', player.id === state.me.id ? 'Your' : 'Their') : ''}`
        : 'Ready to play';
  });
}

function centerHtml(room) {
  const game = room.game;
  if (!game)
    return '<div class="table-caption">A TABLE FOR FRIENDS</div><h2>Good company.<br>Cards to follow.</h2><p class="hint">The admin will shuffle and deal.</p>';
  const ended = game.phase === 'ended';
  const result = game.result;
  if (room.type === 'bluff') {
    return `<div class="table-caption">${ended ? 'THAT’S A WRAP' : game.phase === 'final' ? 'FINAL CLAIM' : 'THE MIDDLE'}</div><h2>${ended ? (game.winnerId ? `${escape(playerName(game.winnerId))} wins!` : 'Game ended') : game.lastPlay ? `${game.lastPlay.count} × ${rankLabel(game.lastPlay.rank)}` : 'Choose a rank'}</h2>${result ? `<div class="reveal-cards">${result.cards.map((c) => cardHtml(c)).join('')}</div><p class="hint">${escape(result.text)}</p>` : `<div class="pile"><span class="card-back"></span><span class="card-back"></span><span class="pile-count">${game.pileCount}</span></div><p class="hint">${game.lastPlay ? `${escape(playerName(game.lastPlay.id))} made the last claim.` : 'Start a fresh pile with any rank.'}</p>`}${game.phase === 'final' ? `<p class="hint">${game.acceptedFinalIds.length}/${room.players.length - 1} opponents accepted.</p>` : ''}`;
  }
  return `<div class="table-caption">${ended ? 'MATCH COMPLETE' : game.phase === 'between' ? 'HAND COMPLETE' : game.street.toUpperCase()}</div>${ended ? `<h2>${game.winnerId ? `${escape(playerName(game.winnerId))} wins!` : 'Game ended'}</h2>` : ''}<div class="community">${game.board.map((c) => cardHtml(c)).join('')}${Array.from({ length: 5 - game.board.length }, () => '<span class="empty-card" aria-hidden="true"></span>').join('')}</div><span class="pot">${game.phase === 'between' || ended ? 'Next hand, fresh possibilities' : `Pot · ${game.pot.toLocaleString()}`}</span>${result ? `<p class="hint">${escape(result.text)}</p>${result.revealed.map((p) => `<div class="showdown-row">${escape(playerName(p.id))}<span class="reveal-cards">${p.cards.map((c) => cardHtml(c)).join('')}</span></div>`).join('')}` : ''}`;
}

function arrange(cards) {
  const suits = ['clubs', 'diamonds', 'hearts', 'spades', 'joker'];
  return cards
    .slice()
    .sort(
      (a, b) => (a.rank || 14) - (b.rank || 14) || suits.indexOf(a.suit) - suits.indexOf(b.suit)
    );
}

function renderHand(force = false) {
  const hand = state.room.game.hand;
  const available = new Map(hand.map((card) => [card.id, card]));
  state.order = state.order.filter((id) => available.has(id));
  const existing = new Set(state.order);
  state.order.push(...arrange(hand.filter((c) => !existing.has(c.id))).map((c) => c.id));
  for (const id of state.cards) if (!available.has(id)) state.cards.delete(id);
  const key = state.order.join(',');
  if (force || $('#hand').dataset.handKey !== key) {
    $('#hand').innerHTML = state.order.map((id) => cardHtml(available.get(id), true)).join('');
    $('#hand').dataset.handKey = key;
  }
  $('#handCount').textContent = `${hand.length} card${hand.length === 1 ? '' : 's'}`;
  phone.fitHand();
}

function liveButton(action, text, enabled = true, className = '') {
  return `<button type="button" class="${className}" data-move="${action}" data-live data-allowed="${enabled}" ${!enabled || !state.online ? 'disabled' : ''}>${text}</button>`;
}

function renderMoves() {
  const game = state.room?.game;
  const oldRank = Number($('#claimRank')?.value);
  const oldAmount = Number($('#raiseAmount')?.value);
  const controls = $('#moveControls');
  if (!game) {
    controls.innerHTML = '';
    return;
  }
  if (game.phase === 'ended') {
    controls.innerHTML =
      '<p class="move-message">Thanks for playing. Your admin can deal again, or you can head back to the lobby.</p>';
    return;
  }
  if (game.type === 'bluff') {
    let content = '';
    if (game.phase === 'final') {
      const accepted = game.acceptedFinalIds.includes(state.me.id);
      content =
        game.lastPlay.id === state.me.id
          ? '<p class="move-message">Your final claim is waiting for acceptance or a Bluff call.</p>'
          : liveButton(
              'acceptFinal',
              accepted ? 'Accepted' : 'Accept claim',
              !accepted,
              'secondary'
            );
    } else if (game.phase === 'reveal')
      content = '<p class="move-message">Cards revealed. The winner opens next.</p>';
    else if (game.turnPlayerId === state.me.id) {
      const chosenRank = game.legalRanks.includes(oldRank)
        ? oldRank
        : game.claimRank || game.legalRanks[0];
      const picker = state.room.settings.voiceMode
        ? ''
        : `<label>Rank<select id="claimRank">${game.legalRanks.map((rank) => `<option value="${rank}" ${rank === chosenRank ? 'selected' : ''}>${rankLabel(rank)}</option>`).join('')}</select></label>`;
      content = `${picker}${liveButton('play', `Play ${state.cards.size || ''} card${state.cards.size === 1 ? '' : 's'}`, canDropCards(game, state.me.id, [...state.cards], now()))}${liveButton('pass', 'Pass', now() < game.deadline, 'secondary')}`;
    } else
      content = `<p class="move-message">${escape(playerName(game.turnPlayerId))} is choosing their cards.</p>`;
    if (canChallenge(game))
      content += liveButton('bluff', 'Bluff <span data-challenge-clock></span>');
    controls.innerHTML = content;
  } else if (game.phase === 'between')
    controls.innerHTML = '<p class="move-message">The next hand will start automatically.</p>';
  else if (game.legal) {
    const legal = game.legal;
    const myStats = game.players.find((p) => p.id === state.me.id);
    controls.innerHTML = `${liveButton('fold', 'Fold', true, 'secondary')}${legal.canCheck ? liveButton('check', 'Check') : liveButton('call', `Call ${legal.call.toLocaleString()}${legal.call === myStats.stack ? ' · all-in' : ''}`)}${legal.canRaise ? `<label>${game.currentBet ? 'Raise to' : 'Bet'}<input id="raiseAmount" type="number" min="${Math.min(legal.minRaiseTo, legal.maxRaiseTo)}" max="${legal.maxRaiseTo}" step="1" value="${oldAmount >= legal.minRaiseTo && oldAmount <= legal.maxRaiseTo ? oldAmount : Math.min(legal.minRaiseTo, legal.maxRaiseTo)}"></label>${liveButton('raise', game.currentBet ? 'Raise' : 'Bet')}` : ''}${liveButton('allIn', `All-in · ${myStats.stack}`, legal.canAllIn, 'secondary')}`;
  } else
    controls.innerHTML = `<p class="move-message">${escape(playerName(game.turnPlayerId))} is making their move.</p>`;
}

function updateTimer() {
  voice.validate();
  const game = state.room?.game;
  const banner = $('#turnBanner');
  if (!game) {
    banner.textContent = 'A good hand starts with good company.';
    return;
  }
  if (game.phase === 'ended') {
    banner.textContent = game.log.at(-1);
    return;
  }
  const remaining = Math.max(0, Math.ceil((game.deadline - Date.now() - state.offset) / 1000));
  const label =
    game.phase === 'final'
      ? 'Final claim · accept or call Bluff'
      : game.phase === 'reveal'
        ? 'Next pile starts in'
        : game.phase === 'between'
          ? 'Next hand in'
          : game.turnPlayerId === state.me.id
            ? 'Your move'
            : `${playerName(game.turnPlayerId)}’s move`;
  banner.innerHTML = `<span>${escape(label)}</span><span class="timer ${remaining <= 5 ? 'urgent' : ''}">${remaining}s</span>`;
  if (game.type === 'bluff') {
    const challengeSeconds = Math.max(0, Math.ceil((game.challengeDeadline - now()) / 1000));
    for (const label of document.querySelectorAll('[data-challenge-clock]'))
      label.textContent = `· ${challengeSeconds}s`;
    const bluffButton = $('[data-move="bluff"]');
    if (bluffButton) bluffButton.hidden = !canChallenge(game);
  }
  if (remaining === 0)
    for (const button of document.querySelectorAll('[data-move]')) button.disabled = true;
}

function renderInvites(open) {
  const invites = [...state.invites.values()];
  $('#invitationsButton').hidden = !invites.length;
  $('#invitationsButton').textContent = `Invitations (${invites.length})`;
  $('#inviteList').innerHTML = invites
    .map(
      (invite) =>
        `<article class="invitation"><h3>${escape(invite.from)} challenged you</h3><p>${gameName(invite.game)} · ${escape(settingsText(invite.game, invite.settings))}</p><p class="invite-expiry" data-expires="${invite.expiresAt}"></p><div class="dialog-actions"><button class="secondary" data-invite="${escape(invite.id)}" data-accept="false">Decline</button><button data-invite="${escape(invite.id)}" data-accept="true">Take a seat →</button></div></article>`
    )
    .join('');
  if (!invites.length) $('#inviteDialog').close();
  else if (open && !$('#inviteDialog').open) $('#inviteDialog').showModal();
  updateInviteTimers();
}

function updateInviteTimers() {
  for (const label of document.querySelectorAll('[data-expires]')) {
    const remaining = Math.max(
      0,
      Math.ceil((Number(label.dataset.expires) - Date.now() - state.offset) / 1000)
    );
    label.textContent = remaining ? `Invitation expires in ${remaining}s` : 'Invitation expired';
    if (!remaining)
      for (const button of label.closest('article').querySelectorAll('button'))
        button.disabled = true;
  }
}

function showRules(type = state.room?.type || $('input[name="game"]:checked').value) {
  for (const name of ['bluff', 'poker']) {
    $(`#${name}Tab`).setAttribute('aria-selected', String(name === type));
    $(`#${name}Rules`).hidden = name !== type;
  }
  if (!$('#rulesDialog').open) $('#rulesDialog').showModal();
}

$('#joinForm').addEventListener('submit', (event) => {
  event.preventDefault();
  if (send({ type: 'join', name: $('#nickname').value })) {
    state.submitting = true;
    updateConnection();
  }
});
$('#nickname').value = storage.get('name') || '';
$('#playersList').addEventListener('change', (event) => {
  const input = event.target.closest('[data-player]');
  if (!input) return;
  if (input.checked && state.selected.size >= 5) {
    input.checked = false;
    notify('Choose up to five friends for a six-player table.');
    return;
  }
  if (input.checked) state.selected.add(input.dataset.player);
  else state.selected.delete(input.dataset.player);
  updateSelection();
});
$('#createForm').addEventListener('change', () => {
  const poker = $('input[name="game"]:checked').value === 'poker';
  $('#bluffSettings').hidden = poker;
  $('#pokerSettings').hidden = !poker;
  $('#moveDuration').textContent = poker ? '30 seconds' : '60 seconds';
});
$('#createForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const type = $('input[name="game"]:checked').value;
  const settings =
    type === 'bluff'
      ? {
          rankMode: $('#rankMode').value,
          jokers: Number($('#jokers').value),
          voiceMode: $('#voiceMode').checked
        }
      : {
          startingChips: Number($('#startingChips').value),
          smallBlind: Number($('#smallBlind').value),
          bigBlind: Number($('#bigBlind').value)
        };
  send({ type: 'create', game: type, settings, players: [...state.selected] });
});

let confirmAction = null;
$('#confirmDialog').addEventListener('close', () => {
  if ($('#confirmDialog').returnValue === 'confirm' && confirmAction) {
    if (confirmAction === 'leave') {
      call.stop(false);
      voice.cancel();
    }
    send({ type: confirmAction });
  }
  confirmAction = null;
});

document.addEventListener('click', (event) => {
  const close = event.target.closest('[data-close]');
  if (close) {
    $(`#${close.dataset.close}`).close();
    return;
  }
  const rule = event.target.closest('[data-rule]');
  if (rule) {
    showRules(rule.dataset.rule);
    return;
  }
  const invitation = event.target.closest('[data-invite]');
  if (invitation) {
    send({
      type: 'respond',
      id: invitation.dataset.invite,
      accept: invitation.dataset.accept === 'true'
    });
    return;
  }
  const card = event.target.closest('[data-card]');
  if (card) {
    if (suppressClick) {
      suppressClick = false;
      return;
    }
    const id = card.dataset.card;
    if (state.cards.has(id)) state.cards.delete(id);
    else if (state.cards.size < 4 || state.room?.type === 'poker') state.cards.add(id);
    else {
      notify('You can play up to four cards at a time.');
      return;
    }
    card.classList.toggle('selected', state.cards.has(id));
    card.setAttribute('aria-pressed', String(state.cards.has(id)));
    renderMoves();
    return;
  }
  const move = event.target.closest('[data-move]');
  if (move && state.room?.game) {
    if (move.dataset.move === 'play' && state.room.type === 'bluff') {
      playSelection();
      return;
    }
    const command = { type: 'move', action: move.dataset.move, turnId: state.room.game.turnId };
    if (command.action === 'play') {
      command.cards = [...state.cards];
      command.rank = Number($('#claimRank').value);
    }
    if (command.action === 'raise') command.amount = Number($('#raiseAmount').value);
    if (['bluff', 'acceptFinal'].includes(command.action))
      command.claimId = state.room.game.lastPlay?.claimId;
    sendMove(command);
    return;
  }
  const button = event.target.closest('[data-command]');
  if (!button) return;
  const command = button.dataset.command;
  if (command === 'rules') showRules();
  else if (command === 'arrange' && state.room?.game) {
    state.order = arrange(state.room.game.hand).map((c) => c.id);
    renderHand();
  } else if (command === 'leave' || command === 'end') {
    confirmAction = command;
    $('#confirmTitle').textContent = command === 'leave' ? 'Leave this table?' : 'End this game?';
    $('#confirmText').textContent =
      command === 'end'
        ? 'Everyone will see the result. Bets from an unfinished poker hand are returned.'
        : state.room?.game?.phase !== 'ended' && state.room?.type === 'bluff'
          ? 'Leaving ends this Bluff game for everyone.'
          : 'You’ll return to the lobby. If Poker is running, your current hand will be folded.';
    $('#confirmButton').textContent = command === 'leave' ? 'Leave table' : 'End game';
    $('#confirmDialog').returnValue = 'cancel';
    $('#confirmDialog').showModal();
  } else send({ type: command });
});

$('#invitationsButton').addEventListener('click', () => renderInvites(true));
$('#hand').addEventListener('keydown', (event) => {
  const card = event.target.closest('[data-card]');
  if (!card || !event.altKey || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
  event.preventDefault();
  const index = state.order.indexOf(card.dataset.card);
  const next = index + (event.key === 'ArrowLeft' ? -1 : 1);
  if (next < 0 || next >= state.order.length) return;
  [state.order[index], state.order[next]] = [state.order[next], state.order[index]];
  renderHand();
  [...$('#hand').children].find((el) => el.dataset.card === card.dataset.card)?.focus();
});

$('#hand').addEventListener('pointerdown', (event) => {
  const card = event.target.closest('[data-card]');
  if (!card || event.button !== 0) return;
  suppressClick = false;
  drag = {
    card,
    pointer: event.pointerId,
    x: event.clientX,
    y: event.clientY,
    active: false,
    table: false,
    bluff: state.room?.type === 'bluff',
    ids: cardsForDrag(card.dataset.card, [...state.cards]),
    originalOrder: state.order.slice(),
    originalSelected: [...state.cards]
  };
  card.setPointerCapture?.(event.pointerId);
});
$('#hand').addEventListener(
  'pointermove',
  (event) => {
    if (!drag || drag.pointer !== event.pointerId) return;
    const dx = Math.abs(event.clientX - drag.x);
    const dy = Math.abs(event.clientY - drag.y);
    if (!drag.active && (drag.bluff ? Math.hypot(dx, dy) < 8 : dx < 8)) return;
    if (!drag.active && !drag.bluff && dy > dx) {
      drag = null;
      return;
    }
    drag.active = true;
    drag.card.classList.add('dragging');
    event.preventDefault();
    const bounds = $('#hand').getBoundingClientRect();
    const felt = $('.felt');
    const table = felt.getBoundingClientRect();
    const overTable =
      event.clientX >= table.left &&
      event.clientX <= table.right &&
      event.clientY >= table.top &&
      event.clientY <= table.bottom;
    if (drag.bluff && (overTable || event.clientY < bounds.top - 12)) {
      drag.table = true;
      // Put cards back in their original slots while the group is above the table.
      for (const id of drag.originalOrder) {
        const node = [...$('#hand').children].find((el) => el.dataset.card === id);
        if (node) $('#hand').append(node);
      }
      if (!drag.ghost) {
        drag.ghost = document.createElement('div');
        drag.ghost.className = 'card-drop-ghost';
        drag.ghost.textContent = `${drag.ids.length} card${drag.ids.length === 1 ? '' : 's'}`;
        document.body.append(drag.ghost);
      }
      drag.ghost.style.left = `${event.clientX}px`;
      drag.ghost.style.top = `${event.clientY}px`;
      felt.classList.toggle(
        'drop-ready',
        overTable && canDropCards(state.room?.game, state.me?.id, drag.ids, now())
      );
    } else {
      drag.table = false;
      drag.ghost?.remove();
      drag.ghost = null;
      felt.classList.remove('drop-ready');
      const others = [...$('#hand').children].filter((card) => card !== drag.card);
      const before = others.find((card) => {
        const rect = card.getBoundingClientRect();
        return event.clientX < rect.left + rect.width / 2;
      });
      $('#hand').insertBefore(drag.card, before || null);
      if (event.clientX > bounds.right - 30) $('#hand').scrollLeft += 14;
      if (event.clientX < bounds.left + 30) $('#hand').scrollLeft -= 14;
    }
  },
  { passive: false }
);
function finishDrag(cancelled = false, event) {
  if (!drag) return;
  const saved = drag;
  drag = null;
  saved.card.classList.remove('dragging');
  saved.ghost?.remove();
  $('.felt').classList.remove('drop-ready');
  if (!saved.active) return;
  suppressClick = true;
  if (!saved.bluff) {
    state.order = [...$('#hand').children].map((card) => card.dataset.card);
    return;
  }
  const table = $('.felt').getBoundingClientRect();
  const overTable =
    event &&
    event.clientX >= table.left &&
    event.clientX <= table.right &&
    event.clientY >= table.top &&
    event.clientY <= table.bottom;
  const handBounds = $('#hand').getBoundingClientRect();
  const overHand = event && event.clientY >= handBounds.top && event.clientY <= handBounds.bottom;
  const play =
    !cancelled &&
    saved.table &&
    overTable &&
    canDropCards(state.room?.game, state.me?.id, saved.ids, now());
  state.order =
    !cancelled && !saved.table && overHand
      ? [...$('#hand').children].map((card) => card.dataset.card)
      : saved.originalOrder;
  state.cards = new Set(play ? saved.ids : saved.originalSelected);
  renderHand(true);
  renderMoves();
  if (play) playSelection(saved.ids);
}
$('#hand').addEventListener('pointerup', (event) => finishDrag(false, event));
$('#hand').addEventListener('pointercancel', () => finishDrag(true));
$('#hand').addEventListener('lostpointercapture', () => finishDrag(true));

setInterval(() => {
  if (state.room) updateTimer();
  updateInviteTimers();
}, 250);
window.addEventListener('pagehide', () => {
  call.stop(false);
  voice.dispose();
});
connect();
