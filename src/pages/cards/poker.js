const { makeDeck, shuffle, requireMove, addLog } = require('./deck');

const HAND_NAMES = [
  'High card',
  'One pair',
  'Two pair',
  'Three of a kind',
  'Straight',
  'Flush',
  'Full house',
  'Four of a kind',
  'Straight flush'
];

function compare(a, b) {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if ((a[i] || 0) !== (b[i] || 0)) return (a[i] || 0) - (b[i] || 0);
  }
  return 0;
}

function fiveCardScore(cards) {
  const ranks = cards.map((c) => (c.rank === 1 ? 14 : c.rank)).sort((a, b) => b - a);
  const counts = new Map();
  ranks.forEach((rank) => counts.set(rank, (counts.get(rank) || 0) + 1));
  const groups = [...counts].sort((a, b) => b[1] - a[1] || b[0] - a[0]);
  const flush = cards.every((c) => c.suit === cards[0].suit);
  let straight = counts.size === 5 && ranks[0] - ranks[4] === 4 ? ranks[0] : 0;
  if (ranks.join(',') === '14,5,4,3,2') straight = 5;
  if (flush && straight) return [8, straight];
  if (groups[0][1] === 4) return [7, groups[0][0], groups[1][0]];
  if (groups[0][1] === 3 && groups[1][1] === 2) return [6, groups[0][0], groups[1][0]];
  if (flush) return [5, ...ranks];
  if (straight) return [4, straight];
  if (groups[0][1] === 3) return [3, groups[0][0], ...groups.slice(1).map((g) => g[0])];
  if (groups[0][1] === 2 && groups[1][1] === 2)
    return [2, ...groups.slice(0, 2).map((g) => g[0]), groups[2][0]];
  if (groups[0][1] === 2) return [1, groups[0][0], ...groups.slice(1).map((g) => g[0])];
  return [0, ...ranks];
}

// There are only 21 groups of five in seven cards. Trying every group is small,
// easy to understand, and also allows playing all five community cards.
function evaluate(cards) {
  requireMove(
    cards.length >= 5 && cards.length <= 7,
    'Poker needs five to seven cards to evaluate.'
  );
  let best = null;
  for (let a = 0; a < cards.length - 4; a++)
    for (let b = a + 1; b < cards.length - 3; b++)
      for (let c = b + 1; c < cards.length - 2; c++)
        for (let d = c + 1; d < cards.length - 1; d++)
          for (let e = d + 1; e < cards.length; e++) {
            const score = fiveCardScore([cards[a], cards[b], cards[c], cards[d], cards[e]]);
            if (!best || compare(score, best) > 0) best = score;
          }
  return best;
}

const active = (p) => !p.left && p.stack > 0;
const inHand = (p) => !p.folded;
const canAct = (p) => !p.folded && !p.allIn && !p.left;

function nextIndex(game, after, predicate) {
  for (let step = 1; step <= game.players.length; step++) {
    const index = (after + step) % game.players.length;
    if (predicate(game.players[index])) return index;
  }
  return -1;
}

function create(players, settings, now) {
  const game = {
    type: 'poker',
    settings,
    players: players.map((p) => ({
      id: p.id,
      name: p.name,
      stack: settings.startingChips,
      hand: [],
      total: 0,
      bet: 0,
      left: false
    })),
    dealerIndex: -1,
    turnIndex: -1,
    turnId: 0,
    deadline: null,
    handNumber: 0,
    phase: 'playing',
    board: [],
    burned: [],
    deck: [],
    pending: new Set(),
    log: [],
    result: null,
    winnerId: null
  };
  startHand(game, now);
  return game;
}

function pay(player, amount) {
  const paid = Math.min(player.stack, amount);
  player.stack -= paid;
  player.bet += paid;
  player.total += paid;
  player.allIn = player.stack === 0;
}

function startHand(game, now) {
  const remaining = game.players.filter(active);
  if (remaining.length < 2) {
    end(
      game,
      remaining.length ? `${remaining[0].name} wins the match!` : 'No players remain.',
      remaining[0]?.id || null
    );
    return;
  }
  game.handNumber++;
  game.phase = 'playing';
  game.result = null;
  game.street = 'preflop';
  game.board = [];
  game.burned = [];
  game.deck = shuffle(makeDeck());
  game.currentBet = game.settings.bigBlind;
  game.minRaise = game.settings.bigBlind;
  const previousBigBlind = game.players.findIndex((p) => p.id === game.bigBlindId && active(p));
  game.dealerIndex =
    remaining.length === 2 && game.lastHandCount > 2 && previousBigBlind !== -1
      ? previousBigBlind
      : nextIndex(game, game.dealerIndex, active);
  game.lastHandCount = remaining.length;
  for (const p of game.players) {
    p.hand = [];
    p.bet = 0;
    p.total = 0;
    p.folded = !active(p);
    p.allIn = false;
    p.acted = false;
    p.reopenAt = 0;
  }
  let dealIndex = game.dealerIndex;
  for (let round = 0; round < 2; round++) {
    for (let count = 0; count < remaining.length; count++) {
      dealIndex = nextIndex(game, dealIndex, inHand);
      game.players[dealIndex].hand.push(game.deck.pop());
    }
  }
  const smallIndex =
    remaining.length === 2 ? game.dealerIndex : nextIndex(game, game.dealerIndex, inHand);
  const bigIndex = nextIndex(game, smallIndex, inHand);
  game.smallBlindId = game.players[smallIndex].id;
  game.bigBlindId = game.players[bigIndex].id;
  pay(game.players[smallIndex], game.settings.smallBlind);
  pay(game.players[bigIndex], game.settings.bigBlind);
  game.pending = new Set(game.players.filter(canAct).map((p) => p.id));
  addLog(
    game,
    `Hand ${game.handNumber}. ${game.players[game.dealerIndex].name} has the dealer button.`
  );
  progress(game, bigIndex, now);
}

function setTurn(game, index, now) {
  game.turnIndex = index;
  game.turnId++;
  game.deadline = now + 30000;
}

function progress(game, after, now) {
  if (game.players.filter(inHand).length <= 1) {
    settle(game, now);
    return;
  }
  for (const p of game.players) if (!canAct(p)) game.pending.delete(p.id);
  const actionable = game.players.filter(canAct);
  if (actionable.length === 1) {
    // A lone player need only match the actual all-in bets. In particular, a
    // short big blind must not force a pointless call followed by a refund.
    game.currentBet = Math.max(...game.players.filter(inHand).map((p) => p.bet));
    if (actionable[0].bet >= game.currentBet) game.pending.clear();
  }
  if (game.pending.size) {
    setTurn(
      game,
      nextIndex(game, after, (p) => game.pending.has(p.id)),
      now
    );
    return;
  }
  if (game.street === 'river') {
    settle(game, now);
    return;
  }
  game.burned.push(game.deck.pop());
  const count = game.street === 'preflop' ? 3 : 1;
  for (let i = 0; i < count; i++) game.board.push(game.deck.pop());
  game.street = { preflop: 'flop', flop: 'turn', turn: 'river' }[game.street];
  game.currentBet = 0;
  game.minRaise = game.settings.bigBlind;
  for (const p of game.players) {
    p.bet = 0;
    p.acted = false;
    p.reopenAt = 0;
  }
  game.pending = new Set(game.players.filter(canAct).map((p) => p.id));
  // All-in players need no more decisions: deal the remaining board and settle.
  if (game.pending.size <= 1) game.pending.clear();
  progress(game, game.dealerIndex, now);
}

function legal(game, playerId) {
  const p = game.players.find((player) => player.id === playerId);
  if (game.phase !== 'playing' || game.players[game.turnIndex]?.id !== playerId || !p || !canAct(p))
    return null;
  const owed = Math.max(0, game.currentBet - p.bet);
  const opponentCanBet = game.players.some((other) => other.id !== playerId && canAct(other));
  const reopened = !p.acted || game.currentBet >= p.reopenAt;
  return {
    canCheck: owed === 0,
    call: Math.min(owed, p.stack),
    canFold: true,
    canRaise: opponentCanBet && reopened && p.bet + p.stack > game.currentBet,
    minRaiseTo: game.currentBet === 0 ? game.settings.bigBlind : game.currentBet + game.minRaise,
    maxRaiseTo: p.bet + p.stack,
    canAllIn: p.bet + p.stack <= game.currentBet || (opponentCanBet && reopened)
  };
}

function action(game, playerId, move, now) {
  requireMove(move.turnId === game.turnId, 'That move has expired. Please use the current turn.');
  requireMove(now < game.deadline, 'Your turn has expired.');
  const options = legal(game, playerId);
  requireMove(options, 'It is not your turn.');
  const p = game.players[game.turnIndex];
  const oldBet = game.currentBet;
  let description;
  if (move.action === 'fold') {
    p.folded = true;
    description = 'folded';
  } else if (move.action === 'check') {
    requireMove(options.canCheck, 'You must call or fold to stay in this hand.');
    description = 'checked';
  } else if (move.action === 'call') {
    requireMove(options.call > 0, 'There is no bet to call.');
    pay(p, options.call);
    description = `called ${options.call}${p.allIn ? ' (all-in)' : ''}`;
  } else if (['bet', 'raise', 'allIn'].includes(move.action)) {
    const target = move.action === 'allIn' ? options.maxRaiseTo : move.amount;
    requireMove(
      Number.isSafeInteger(target) && target > p.bet && target <= options.maxRaiseTo,
      'Enter a valid whole-chip amount.'
    );
    if (target <= oldBet) {
      requireMove(move.action === 'allIn', 'A raise must exceed the current bet.');
    } else {
      requireMove(options.canRaise, 'Betting has not reopened, or no opponent can call a raise.');
      requireMove(
        target >= options.minRaiseTo || target === options.maxRaiseTo,
        `Raise to at least ${options.minRaiseTo}, or go all-in.`
      );
    }
    pay(p, target - p.bet);
    description =
      target > oldBet
        ? `${oldBet ? 'raised to' : 'bet'} ${target}${p.allIn ? ' (all-in)' : ''}`
        : 'called all-in';
  } else throw new Error('Unknown poker move.');

  game.pending.delete(p.id);
  if (p.bet > oldBet) {
    const increase = p.bet - oldBet;
    const fullRaise = increase >= game.minRaise;
    game.currentBet = p.bet;
    if (fullRaise) game.minRaise = increase;
    for (const other of game.players) {
      if (other.id !== p.id && canAct(other) && (fullRaise || other.bet < game.currentBet))
        game.pending.add(other.id);
    }
  }
  p.acted = true;
  // Even somebody who checked must face a full bet before raising again.
  // Several short all-ins can add up to reopen that player's betting.
  p.reopenAt = game.currentBet + game.minRaise;
  addLog(game, `${p.name} ${description}.`);
  progress(game, game.turnIndex, now);
}

function settle(game, now) {
  const contenders = game.players.filter(inHand);
  const scores = new Map();
  if (contenders.length > 1)
    for (const p of contenders) scores.set(p.id, evaluate([...p.hand, ...game.board]));
  const levels = [...new Set(game.players.map((p) => p.total).filter(Boolean))].sort(
    (a, b) => a - b
  );
  let previous = 0;
  const pots = [];
  for (const level of levels) {
    const donors = game.players.filter((p) => p.total >= level);
    const share = level - previous;
    const amount = share * donors.length;
    previous = level;
    const eligible = donors.filter(inHand);
    // A bet nobody matched comes back, even if its owner later disconnected.
    if (donors.length === 1 || !eligible.length) {
      donors.forEach((p) => {
        p.stack += share;
      });
      continue;
    }
    let winners = eligible;
    if (eligible.length > 1) {
      let best = scores.get(eligible[0].id);
      for (const p of eligible) if (compare(scores.get(p.id), best) > 0) best = scores.get(p.id);
      winners = eligible.filter((p) => compare(scores.get(p.id), best) === 0);
    }
    // Odd chips go clockwise from the dealer, never by suit or socket order.
    winners.sort(
      (a, b) =>
        ((game.players.indexOf(a) - game.dealerIndex - 1 + game.players.length) %
          game.players.length) -
        ((game.players.indexOf(b) - game.dealerIndex - 1 + game.players.length) %
          game.players.length)
    );
    winners.forEach((p, index) => {
      p.stack += Math.floor(amount / winners.length) + (index < amount % winners.length ? 1 : 0);
    });
    pots.push({
      amount,
      winners: winners.map((p) => p.id),
      hand: scores.has(winners[0].id)
        ? HAND_NAMES[scores.get(winners[0].id)[0]]
        : 'Everyone else folded'
    });
  }
  game.result = {
    pots,
    revealed: contenders.length > 1 ? contenders.map((p) => ({ id: p.id, cards: p.hand })) : [],
    text:
      pots
        .map(
          (pot) =>
            `${pot.winners.map((id) => game.players.find((p) => p.id === id).name).join(' & ')} won ${pot.amount} (${pot.hand}).`
        )
        .join(' ') || 'Unmatched chips returned.'
  };
  for (const p of game.players) {
    p.total = 0;
    p.bet = 0;
  }
  addLog(game, game.result.text);
  game.phase = 'between';
  game.turnId++;
  game.turnIndex = -1;
  game.deadline = now + 6000;
  if (game.players.filter(active).length <= 1) {
    const winner = game.players.find(active);
    end(game, winner ? `${winner.name} wins the match!` : 'The match ended.', winner?.id || null);
  }
}

function depart(game, playerId, now) {
  const p = game.players.find((player) => player.id === playerId);
  if (!p || p.left) return;
  p.left = true;
  p.folded = true;
  game.pending.delete(p.id);
  addLog(game, `${p.name} left the table.`);
  if (game.phase === 'playing') {
    const current = game.players[game.turnIndex];
    const oldDeadline = game.deadline;
    progress(game, game.turnIndex, now);
    if (game.phase === 'playing' && current?.id !== playerId && game.pending.has(current?.id)) {
      game.turnIndex = game.players.indexOf(current);
      game.deadline = oldDeadline;
    }
  } else if (game.phase === 'between' && game.players.filter(active).length <= 1) {
    const winner = game.players.find(active);
    end(game, winner ? `${winner.name} wins the match!` : 'The match ended.', winner?.id || null);
  }
}

function end(game, reason, winnerId = null) {
  // Ending a hand early refunds its bets instead of silently losing chips.
  for (const p of game.players) {
    p.stack += p.total;
    p.total = 0;
    p.bet = 0;
  }
  game.phase = 'ended';
  game.deadline = null;
  game.turnId++;
  game.winnerId = winnerId;
  addLog(game, reason);
}

function tick(game, now) {
  if (game.deadline === null || now < game.deadline) return false;
  if (game.phase === 'between') startHand(game, now);
  else if (game.phase === 'playing') {
    const p = game.players[game.turnIndex];
    // Use the same validation as a button click, with the instant just before
    // expiry. The server clock, rather than a browser timer, makes the move.
    action(
      game,
      p.id,
      { action: legal(game, p.id).canCheck ? 'check' : 'fold', turnId: game.turnId },
      game.deadline - 1
    );
    if (game.deadline !== null) game.deadline = now + (game.phase === 'between' ? 6000 : 30000);
  }
  return true;
}

function view(game, playerId) {
  return {
    type: 'poker',
    phase: game.phase,
    street: game.street,
    handNumber: game.handNumber,
    turnId: game.turnId,
    deadline: game.deadline,
    turnPlayerId: game.players[game.turnIndex]?.id || null,
    winnerId: game.winnerId,
    dealerId: game.players[game.dealerIndex]?.id,
    smallBlindId: game.smallBlindId,
    bigBlindId: game.bigBlindId,
    board: game.board,
    pot: game.players.reduce((sum, p) => sum + p.total, 0),
    currentBet: game.currentBet,
    players: game.players.map((p) => ({
      id: p.id,
      stack: p.stack,
      bet: p.bet,
      folded: p.folded,
      allIn: p.allIn,
      left: p.left,
      cardCount: p.hand.length
    })),
    hand: game.players.find((p) => p.id === playerId)?.hand || [],
    legal: legal(game, playerId),
    result: game.result,
    log: game.log
  };
}

module.exports = {
  create,
  action,
  tick,
  view,
  end,
  depart,
  evaluate,
  fiveCardScore,
  compare,
  legal,
  HAND_NAMES
};
