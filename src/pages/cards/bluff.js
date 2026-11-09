const { makeDeck, shuffle, requireMove, addLog } = require('./deck');

function create(players, settings, now, preparedDeck) {
  const deck = preparedDeck || shuffle(makeDeck(settings.jokers));
  const game = {
    type: 'bluff',
    settings,
    players: players.map((p) => ({ id: p.id, name: p.name, hand: [] })),
    phase: 'playing',
    turnIndex: 0,
    turnId: 1,
    deadline: now + 30000,
    pile: [],
    discarded: [],
    claimRank: null,
    lastPlay: null,
    passes: 0,
    result: null,
    winnerId: null,
    log: ['Cards dealt. The admin chooses the opening rank.']
  };
  deck.forEach((card, index) => game.players[index % players.length].hand.push(card));
  return game;
}

function end(game, reason, winnerId = null) {
  game.phase = 'ended';
  game.deadline = null;
  game.turnId++;
  game.winnerId = winnerId;
  addLog(game, reason);
}

function nextTurn(game, index, now) {
  game.turnIndex = index;
  game.phase = 'playing';
  game.turnId++;
  game.deadline = now + 30000;
}

function legalRanks(game) {
  if (game.claimRank === null) return Array.from({ length: 13 }, (_, i) => i + 1);
  return game.settings.rankMode === 'adjacent'
    ? [game.claimRank - 1, game.claimRank, game.claimRank + 1].filter(
        (rank) => rank >= 1 && rank <= 13
      )
    : [game.claimRank];
}

function action(game, playerId, move, now) {
  requireMove(move.turnId === game.turnId, 'That move has expired. Please use the current turn.');
  const player = game.players.find((p) => p.id === playerId);
  requireMove(player, 'You are not in this game.');

  if (move.action === 'bluff') {
    requireMove(game.phase === 'challenge' && now < game.deadline, 'The Bluff window has closed.');
    requireMove(game.lastPlay.id !== playerId, 'You cannot call Bluff on yourself.');
    const last = game.lastPlay;
    const lied = last.cards.some((card) => card.rank !== 0 && card.rank !== last.rank);
    const loser = lied ? game.players.find((p) => p.id === last.id) : player;
    const winner = lied ? player : game.players.find((p) => p.id === last.id);
    loser.hand.push(...game.pile);
    game.result = {
      cards: last.cards,
      text: `${player.name} called Bluff. ${lied ? 'It was a bluff!' : 'The cards were truthful.'} ${loser.name} takes ${game.pile.length} cards.`
    };
    addLog(game, game.result.text);
    game.pile = [];
    game.lastPlay = null;
    game.claimRank = null;
    game.passes = 0;
    game.turnIndex = game.players.indexOf(winner);
    game.turnId++;
    if (!winner.hand.length) end(game, `${winner.name} wins!`, winner.id);
    else {
      game.phase = 'reveal';
      game.deadline = now + 3000;
    }
    return;
  }

  requireMove(game.phase === 'playing' && now < game.deadline, 'Wait for the next turn.');
  requireMove(game.players[game.turnIndex].id === playerId, 'It is not your turn.');
  if (move.action === 'pass') {
    pass(game, now);
    return;
  }
  requireMove(move.action === 'play', 'Unknown Bluff move.');
  requireMove(
    Array.isArray(move.cards) &&
      move.cards.length >= 1 &&
      move.cards.length <= 4 &&
      new Set(move.cards).size === move.cards.length,
    'Select 1–4 different cards.'
  );
  requireMove(
    Number.isInteger(move.rank) && legalRanks(game).includes(move.rank),
    'Choose an allowed rank.'
  );
  const cards = move.cards.map((id) => player.hand.find((card) => card.id === id));
  requireMove(cards.every(Boolean), 'You can only play cards from your hand.');
  const selected = new Set(move.cards);
  player.hand = player.hand.filter((card) => !selected.has(card.id));
  game.pile.push(...cards);
  game.lastPlay = { id: playerId, cards, rank: move.rank };
  game.claimRank = move.rank;
  game.passes = 0;
  game.result = null;
  game.phase = 'challenge';
  game.turnId++;
  game.deadline = now + 5000;
  addLog(
    game,
    `${player.name} claimed ${cards.length} × ${rankLabel(move.rank)}. Call Bluff now, or let it stand.`
  );
}

function pass(game, now) {
  addLog(game, `${game.players[game.turnIndex].name} passed.`);
  game.passes++;
  let next = (game.turnIndex + 1) % game.players.length;
  if (game.lastPlay && game.passes >= game.players.length - 1) {
    next = game.players.findIndex((p) => p.id === game.lastPlay.id);
    game.discarded.push(...game.pile);
    game.pile = [];
    game.lastPlay = null;
    game.claimRank = null;
    game.passes = 0;
    addLog(
      game,
      `Everyone else passed. Pile discarded; ${game.players[next].name} chooses a new rank.`
    );
  }
  nextTurn(game, next, now);
}

function tick(game, now) {
  if (game.deadline === null || now < game.deadline) return false;
  if (game.phase === 'challenge') {
    const last = game.players[game.turnIndex];
    if (!last.hand.length) end(game, `${last.name} wins!`, last.id);
    else nextTurn(game, (game.turnIndex + 1) % game.players.length, now);
  } else if (game.phase === 'reveal') nextTurn(game, game.turnIndex, now);
  else if (game.phase === 'playing') pass(game, now);
  return true;
}

function rankLabel(rank) {
  return { 1: 'A', 11: 'J', 12: 'Q', 13: 'K' }[rank] || String(rank);
}

// This is the only Bluff object that may leave the server. In particular,
// neither the face-down pile nor the opponents' cards are included.
function view(game, playerId) {
  return {
    type: game.type,
    phase: game.phase,
    turnId: game.turnId,
    deadline: game.deadline,
    turnPlayerId: game.phase === 'playing' ? game.players[game.turnIndex].id : null,
    winnerId: game.winnerId,
    pileCount: game.pile.length,
    claimRank: game.claimRank,
    lastPlay: game.lastPlay
      ? { id: game.lastPlay.id, rank: game.lastPlay.rank, count: game.lastPlay.cards.length }
      : null,
    players: game.players.map((p) => ({ id: p.id, cardCount: p.hand.length })),
    hand: game.players.find((p) => p.id === playerId)?.hand || [],
    legalRanks: legalRanks(game),
    result: game.result,
    log: game.log
  };
}

module.exports = { create, action, tick, view, end, legalRanks };
