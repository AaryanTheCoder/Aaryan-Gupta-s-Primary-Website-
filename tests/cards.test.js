const assert = require('assert/strict');
const http = require('http');
const WebSocket = require('ws');
const { makeDeck, shuffle } = require('../src/pages/cards/deck');
const bluff = require('../src/pages/cards/bluff');
const poker = require('../src/pages/cards/poker');
const { GameHub, settingsFor } = require('../src/pages/cards/rooms');
const routes = require('../src/pages/cards/routes');

let checks = 0;
function test(name, fn) {
  try {
    fn();
    checks++;
  } catch (error) {
    error.message = `${name}: ${error.message}`;
    throw error;
  }
}
const people = (count) =>
  Array.from({ length: count }, (_, index) => ({ id: `p${index}`, name: `Player ${index}` }));
const bluffSettings = { rankMode: 'same', jokers: 0, voiceMode: false };
const pokerSettings = { startingChips: 1000, smallBlind: 10, bigBlind: 20 };
const chips = (game) => game.players.reduce((sum, p) => sum + p.stack + p.total, 0);
const current = (game) => game.players[game.turnIndex];
const move = (engine, game, action, extra = {}, now = 1000) =>
  engine.action(game, current(game).id, { action, turnId: game.turnId, ...extra }, now);
const card = (text) => {
  const suit = { s: 'spades', h: 'hearts', c: 'clubs', d: 'diamonds' }[text.at(-1)];
  const number = text.slice(0, -1);
  const rank = { A: 1, K: 13, Q: 12, J: 11, T: 10 }[number] || Number(number);
  return { id: `${suit}-${rank}`, rank, suit };
};
const cards = (text) => text.split(' ').map(card);

test('Deck and secure shuffle preserve all cards', () => {
  for (const jokers of [0, 1, 2]) {
    const deck = makeDeck(jokers);
    const original = deck.map((c) => c.id);
    const mixed = shuffle(deck);
    assert.equal(mixed.length, 52 + jokers);
    assert.equal(new Set(mixed.map((c) => c.id)).size, 52 + jokers);
    assert.deepEqual(new Set(mixed.map((c) => c.id)), new Set(original));
    assert.deepEqual(
      deck.map((c) => c.id),
      original
    );
  }
});

test('Settings reject bad numbers and rules', () => {
  assert.deepEqual(settingsFor('bluff'), bluffSettings);
  assert.deepEqual(settingsFor('poker'), pokerSettings);
  for (const jokers of [-1, 3, '2', NaN]) assert.throws(() => settingsFor('bluff', { jokers }));
  assert.throws(() => settingsFor('bluff', { rankMode: 'anything' }));
  assert.throws(() => settingsFor('bluff', { voiceMode: 'yes' }));
  assert.equal(settingsFor('bluff', { voiceMode: true }).voiceMode, true);
  for (const startingChips of [1.5, 0, Infinity, '1000', 1e15])
    assert.throws(() => settingsFor('poker', { startingChips }));
  assert.throws(() => settingsFor('poker', { bigBlind: 1000 }));
  assert.throws(() => settingsFor('poker', { smallBlind: 20, bigBlind: 10 }));
  assert.throws(() => settingsFor('other'));
});

test('Bluff deals evenly for every room size and joker setting', () => {
  for (let count = 2; count <= 6; count++)
    for (let jokers = 0; jokers <= 2; jokers++) {
      const game = bluff.create(people(count), { ...bluffSettings, jokers }, 0);
      const sizes = game.players.map((p) => p.hand.length);
      assert.ok(Math.max(...sizes) - Math.min(...sizes) <= 1);
      assert.equal(
        sizes.reduce((sum, n) => sum + n, 0),
        52 + jokers
      );
      assert.equal(new Set(game.players.flatMap((p) => p.hand.map((c) => c.id))).size, 52 + jokers);
      const view = bluff.view(game, 'p0');
      assert.equal(view.hand.length, sizes[0]);
      assert.ok(!JSON.stringify(view).includes(JSON.stringify(game.players[1].hand[0].id)));
      assert.ok(!Object.hasOwn(view, 'pile'));
    }
});

test('Bluff rejects illegal, duplicate, stale, and out-of-turn plays', () => {
  const game = bluff.create(people(2), bluffSettings, 0);
  const id = game.players[0].hand[0].id;
  assert.throws(() => bluff.action(game, 'p1', { action: 'pass', turnId: 1 }, 1));
  assert.throws(() => move(bluff, game, 'play', { cards: [id, id], rank: 1 }));
  assert.throws(() => move(bluff, game, 'play', { cards: [game.players[1].hand[0].id], rank: 1 }));
  assert.throws(() => move(bluff, game, 'play', { cards: [id], rank: 14 }));
  move(bluff, game, 'play', { cards: [id], rank: 5 });
  assert.throws(() =>
    bluff.action(game, 'p0', { action: 'bluff', claimId: game.lastPlay.claimId }, 1001)
  );
  assert.throws(() => bluff.action(game, 'p1', { action: 'bluff', turnId: 1 }, 1001));
  bluff.tick(game, 6000);
  assert.throws(() =>
    move(bluff, game, 'play', { cards: [game.players[1].hand[0].id], rank: 6 }, 6001)
  );
});

test('Bluff adjacency follows last claim and never wraps', () => {
  const game = bluff.create(people(3), { ...bluffSettings, rankMode: 'adjacent' }, 0);
  move(bluff, game, 'play', { cards: [current(game).hand[0].id], rank: 5 });
  bluff.tick(game, 6000);
  assert.deepEqual(bluff.legalRanks(game), [4, 5, 6]);
  move(bluff, game, 'play', { cards: [current(game).hand[0].id], rank: 6 }, 6001);
  bluff.tick(game, 11001);
  assert.deepEqual(bluff.legalRanks(game), [5, 6, 7]);
  game.claimRank = 1;
  assert.deepEqual(bluff.legalRanks(game), [1, 2]);
  game.claimRank = 13;
  assert.deepEqual(bluff.legalRanks(game), [12, 13]);
});

test('Correct Bluff call takes whole pile, reveals only latest play, and caller opens', () => {
  const game = bluff.create(people(3), bluffSettings, 0);
  game.players[0].hand = cards('2s 8s');
  game.players[1].hand = cards('3s 9s');
  game.players[2].hand = cards('4s Ts');
  move(bluff, game, 'play', { cards: ['spades-2'], rank: 2 });
  bluff.tick(game, 6000);
  move(bluff, game, 'play', { cards: ['spades-3'], rank: 2 }, 6001);
  bluff.action(game, 'p2', { action: 'bluff', claimId: game.lastPlay.claimId }, 6002);
  assert.equal(game.players[1].hand.length, 3);
  assert.deepEqual(
    game.result.cards.map((c) => c.id),
    ['spades-3']
  );
  assert.equal(game.pile.length, 0);
  bluff.tick(game, 9002);
  assert.equal(current(game).id, 'p2');
  assert.equal(bluff.legalRanks(game).length, 13);
});

test('Truthful last card and jokers win false calls; a lying last card cannot win', () => {
  for (const final of [card('As'), { id: 'joker-0', rank: 0, suit: 'joker' }]) {
    const game = bluff.create(people(2), bluffSettings, 0);
    game.players[0].hand = [final];
    move(bluff, game, 'play', { cards: [final.id], rank: 1 });
    assert.equal(game.phase, 'final');
    assert.equal(game.winnerId, null);
    bluff.action(game, 'p1', { action: 'bluff', claimId: game.lastPlay.claimId }, 1001);
    assert.equal(game.winnerId, 'p0');
    assert.equal(game.phase, 'ended');
  }
  const game = bluff.create(people(2), bluffSettings, 0);
  game.players[0].hand = cards('2s');
  move(bluff, game, 'play', { cards: ['spades-2'], rank: 1 });
  bluff.action(game, 'p1', { action: 'bluff', claimId: game.lastPlay.claimId }, 1001);
  assert.equal(game.winnerId, null);
  assert.equal(game.players[0].hand.length, 1);
  assert.equal(current(game).id, 'p1');
});

test('Bluff final card waits full window, and timeout passes discard the pile', () => {
  const game = bluff.create(people(2), bluffSettings, 0);
  game.players[0].hand = cards('2s');
  move(bluff, game, 'play', { cards: ['spades-2'], rank: 1 });
  assert.equal(bluff.tick(game, 60999), false);
  assert.equal(bluff.tick(game, 61000), true);
  assert.equal(game.winnerId, 'p0');
  const passes = bluff.create(people(3), bluffSettings, 0);
  move(bluff, passes, 'play', { cards: [current(passes).hand[0].id], rank: 8 });
  bluff.tick(passes, 61000);
  bluff.tick(passes, 121000);
  assert.equal(passes.pile.length, 0);
  assert.equal(passes.discarded.length, 1);
  assert.equal(current(passes).id, 'p0');
  assert.equal(passes.claimRank, null);
});

test('Bluff turns start immediately, last a minute, and challenges survive passes', () => {
  const game = bluff.create(people(4), bluffSettings, 0);
  assert.equal(game.deadline, 60000);
  move(bluff, game, 'play', { cards: [current(game).hand[0].id], rank: 5 }, 1000);
  assert.equal(current(game).id, 'p1');
  assert.equal(game.phase, 'playing');
  assert.equal(game.deadline, 61000);
  assert.equal(game.challengeDeadline, 61000);
  const claimId = game.lastPlay.claimId;
  const oldTurn = game.turnId;
  move(bluff, game, 'pass', {}, 15000);
  assert.equal(current(game).id, 'p2');
  assert.equal(game.deadline, 75000);
  assert.equal(game.challengeDeadline, 61000);
  // A non-current player can challenge the same claim even across a pass.
  bluff.action(game, 'p3', { action: 'bluff', claimId, turnId: oldTurn }, 20000);
  assert.equal(game.phase, 'reveal');
});

test('Challenge expiry does not restart a passed turn or remove its rank rule', () => {
  const game = bluff.create(people(4), bluffSettings, 0);
  move(bluff, game, 'play', { cards: [current(game).hand[0].id], rank: 5 }, 1000);
  const claimId = game.lastPlay.claimId;
  move(bluff, game, 'pass', {}, 30000);
  assert.equal(bluff.tick(game, 61000), true);
  assert.equal(current(game).id, 'p2');
  assert.equal(game.deadline, 90000);
  assert.equal(game.challengeDeadline, null);
  assert.deepEqual(bluff.legalRanks(game), [5]);
  assert.ok(game.pile.length);
  assert.throws(() => bluff.action(game, 'p1', { action: 'bluff', claimId }, 61001));
});

test('A replacement play invalidates old calls and gives the new claim a fresh minute', () => {
  const game = bluff.create(people(3), bluffSettings, 0);
  const total = game.players.flatMap((p) => p.hand).length;
  move(bluff, game, 'play', { cards: [current(game).hand[0].id], rank: 5 }, 1000);
  const oldClaim = game.lastPlay.claimId;
  move(bluff, game, 'play', { cards: [current(game).hand[0].id], rank: 5 }, 20000);
  assert.notEqual(game.lastPlay.claimId, oldClaim);
  assert.equal(game.challengeDeadline, 80000);
  assert.throws(() => bluff.action(game, 'p2', { action: 'bluff', claimId: oldClaim }, 21000));
  assert.equal(game.pile.length + game.players.flatMap((p) => p.hand).length, total);
  bluff.action(game, 'p0', { action: 'bluff', claimId: game.lastPlay.claimId }, 22000);
  assert.throws(() => bluff.action(game, 'p2', { action: 'bluff', claimId: oldClaim }, 22001));
  assert.equal(game.pile.length + game.players.flatMap((p) => p.hand).length, total);
});

test('Final claims can be accepted early, cannot accept themselves, and cannot be played over', () => {
  const game = bluff.create(people(3), bluffSettings, 0);
  game.players[0].hand = cards('Ks');
  move(bluff, game, 'play', { cards: ['spades-13'], rank: 13 }, 1000);
  const claimId = game.lastPlay.claimId;
  assert.equal(game.phase, 'final');
  assert.throws(() => bluff.action(game, 'p0', { action: 'acceptFinal', claimId }, 2000));
  assert.throws(() => bluff.action(game, 'p1', { action: 'pass', turnId: game.turnId }, 2000));
  assert.throws(() => bluff.action(game, 'p1', { action: 'acceptFinal', claimId: 'old' }, 2000));
  bluff.action(game, 'p1', { action: 'acceptFinal', claimId }, 2000);
  assert.equal(game.phase, 'final');
  assert.equal(bluff.view(game, 'p2').acceptedFinalIds.length, 1);
  assert.throws(() => bluff.action(game, 'p1', { action: 'acceptFinal', claimId }, 2001));
  bluff.action(game, 'p2', { action: 'acceptFinal', claimId }, 3000);
  assert.equal(game.phase, 'ended');
  assert.equal(game.winnerId, 'p0');
});

test('A correct call on a final claim cancels pending acceptances and returns the cards', () => {
  const game = bluff.create(people(3), bluffSettings, 0);
  game.players[0].hand = cards('2s');
  move(bluff, game, 'play', { cards: ['spades-2'], rank: 13 }, 1000);
  const claimId = game.lastPlay.claimId;
  bluff.action(game, 'p1', { action: 'acceptFinal', claimId }, 2000);
  bluff.action(game, 'p2', { action: 'bluff', claimId }, 3000);
  assert.equal(game.winnerId, null);
  assert.equal(game.players[0].hand.length, 1);
  assert.deepEqual(game.acceptedFinalIds, []);
  bluff.tick(game, 6000);
  assert.equal(current(game).id, 'p2');
});

test('Poker ranks every hand, wheels, kickers, and best five of seven', () => {
  const samples = [
    'As Kd 9h 5c 2s',
    'As Ah 9d 5c 2s',
    'As Ah 9d 9c 2s',
    'As Ah Ad 5c 2s',
    '9s 8h 7d 6c 5s',
    'As Js 9s 5s 2s',
    'As Ah Ad 5c 5s',
    'As Ah Ad Ac 2s',
    '9s 8s 7s 6s 5s'
  ];
  samples.forEach((text, index) => assert.equal(poker.evaluate(cards(text))[0], index));
  assert.deepEqual(poker.evaluate(cards('As 2h 3d 4c 5s')), [4, 5]);
  assert.ok(
    poker.compare(
      poker.evaluate(cards('6s 2h 3d 4c 5s')),
      poker.evaluate(cards('As 2h 3d 4c 5s'))
    ) > 0
  );
  assert.ok(
    poker.compare(
      poker.evaluate(cards('As Ah Kd 5c 2s')),
      poker.evaluate(cards('As Ah Qd 5c 2s'))
    ) > 0
  );
  assert.deepEqual(poker.evaluate(cards('As Ks Qs Js Ts 2h 3d')), [8, 14]);
  assert.deepEqual(poker.evaluate(cards('As Ah Ad Ks Kh Kd 2c')), [6, 14, 13]);
});

test('Heads-up blinds, all betting rounds, dealer rotation, and timeouts', () => {
  const game = poker.create(people(2), pokerSettings, 0);
  assert.equal(game.smallBlindId, 'p0');
  assert.equal(game.bigBlindId, 'p1');
  assert.equal(current(game).id, 'p0');
  assert.equal(poker.legal(game, 'p0').call, 10);
  move(poker, game, 'call');
  assert.equal(current(game).id, 'p1');
  move(poker, game, 'check');
  for (const street of ['flop', 'turn', 'river']) {
    assert.equal(game.street, street);
    assert.equal(current(game).id, 'p1');
    poker.tick(game, game.deadline);
    move(poker, game, 'check', {}, game.deadline - 1);
  }
  assert.equal(game.phase, 'between');
  assert.equal(chips(game), 2000);
  poker.tick(game, game.deadline);
  assert.equal(game.dealerIndex, 1);
  assert.equal(current(game).id, 'p1');
  poker.tick(game, game.deadline);
  assert.equal(game.phase, 'between');
  assert.equal(game.result.revealed.length, 0);
  assert.equal(chips(game), 2000);
});

test('Poker rejects stale moves and invalid raises without spending chips', () => {
  const game = poker.create(people(3), pokerSettings, 0);
  const original = chips(game);
  assert.throws(() => move(poker, game, 'check'));
  assert.throws(() => move(poker, game, 'raise', { amount: 30 }));
  assert.throws(() => move(poker, game, 'raise', { amount: 40.5 }));
  assert.throws(() => move(poker, game, 'raise', { amount: 5000 }));
  assert.equal(chips(game), original);
  const oldTurn = game.turnId;
  move(poker, game, 'raise', { amount: 100 });
  assert.throws(() =>
    poker.action(game, 'p0', { action: 'raise', amount: 200, turnId: oldTurn }, 1001)
  );
  assert.equal(poker.legal(game, current(game).id).minRaiseTo, 180);
  const view = poker.view(game, 'p1');
  assert.ok(!Object.hasOwn(view, 'deck'));
  assert.ok(!JSON.stringify(view).includes(JSON.stringify(game.players[0].hand[0].id)));
});

test('A short all-in does not reopen raising; a cumulative full raise does', () => {
  const game = poker.create(people(3), pokerSettings, 0);
  game.players[2].stack = 130;
  move(poker, game, 'raise', { amount: 100 });
  move(poker, game, 'call');
  move(poker, game, 'allIn');
  assert.equal(current(game).id, 'p0');
  assert.equal(poker.legal(game, 'p0').canRaise, false);
  assert.throws(() => move(poker, game, 'raise', { amount: 230 }));
  move(poker, game, 'call');
  move(poker, game, 'call');
  assert.equal(game.street, 'flop');

  const cumulative = poker.create(people(4), pokerSettings, 0);
  cumulative.players[0].stack = 130;
  cumulative.players[1].stack = 170;
  assert.equal(current(cumulative).id, 'p3');
  move(poker, cumulative, 'raise', { amount: 100 });
  move(poker, cumulative, 'allIn');
  move(poker, cumulative, 'allIn');
  move(poker, cumulative, 'call');
  assert.equal(current(cumulative).id, 'p3');
  assert.equal(poker.legal(cumulative, 'p3').canRaise, true);
  assert.equal(poker.legal(cumulative, 'p3').minRaiseTo, 260);
});

test('A short opening all-in does not reopen a check, and unacted players may raise', () => {
  const game = poker.create(people(4), pokerSettings, 0);
  while (game.street === 'preflop')
    move(poker, game, poker.legal(game, current(game).id).canCheck ? 'check' : 'call');
  assert.equal(current(game).id, 'p1');
  move(poker, game, 'check');
  game.players[2].stack = 10;
  move(poker, game, 'allIn');
  assert.equal(poker.legal(game, 'p3').canRaise, true);
  assert.equal(poker.legal(game, 'p3').minRaiseTo, 30);
  move(poker, game, 'call');
  move(poker, game, 'call');
  assert.equal(current(game).id, 'p1');
  assert.equal(poker.legal(game, 'p1').canRaise, false);
});

test('Transition to heads-up does not give the previous big blind a second big blind', () => {
  const game = poker.create(people(3), pokerSettings, 0);
  const previousBigBlind = game.bigBlindId;
  game.players[0].stack = 0;
  game.players.forEach((p) => {
    p.total = 0;
  });
  game.phase = 'between';
  game.deadline = 100;
  poker.tick(game, 100);
  assert.equal(game.smallBlindId, previousBigBlind);
  assert.notEqual(game.bigBlindId, previousBigBlind);
  assert.equal(current(game).id, game.smallBlindId);
});

function settlementFixture(totals, hands, board, folded = []) {
  const game = poker.create(people(totals.length), pokerSettings, 0);
  game.board = cards(board);
  game.street = 'river';
  game.currentBet = 0;
  game.players.forEach((p, index) => {
    p.stack = index === 0 ? 1 : 0;
    p.total = totals[index];
    p.bet = 0;
    p.folded = folded.includes(index);
    p.allIn = index !== 0;
    p.hand = cards(hands[index]);
  });
  game.pending = new Set(['p0']);
  game.turnIndex = 0;
  game.deadline = 30000;
  return game;
}

test('Poker awards side pots separately and returns unmatched bets', () => {
  const game = settlementFixture([100, 200, 300], ['As Ah', 'Qs Qh', 'Js Jh'], '2c 3d 7h 8s Kc');
  const total = chips(game);
  move(poker, game, 'check');
  assert.deepEqual(
    game.players.map((p) => p.stack),
    [301, 200, 100]
  );
  assert.deepEqual(
    game.result.pots.map((p) => [p.amount, p.winners]),
    [
      [300, ['p0']],
      [200, ['p1']]
    ]
  );
  assert.equal(chips(game), total);
});

test('Ties split pots; odd chip goes clockwise from dealer, suits do not rank', () => {
  const game = settlementFixture([5, 5, 5], ['2h 3h', '4d 5d', '6c 7c'], 'As Ks Qs Js Ts', [2]);
  move(poker, game, 'check');
  assert.deepEqual(
    game.players.map((p) => p.stack),
    [8, 8, 0]
  );
  assert.deepEqual(game.result.pots[0].winners, ['p1', 'p0']);
  assert.equal(game.result.pots[0].hand, 'Straight flush');
});

test('All-ins run out board and admin end refunds an unfinished hand', () => {
  const game = poker.create(people(2), pokerSettings, 0);
  move(poker, game, 'allIn');
  move(poker, game, 'call');
  assert.equal(game.board.length, 5);
  assert.ok(['ended', 'between'].includes(game.phase));
  assert.equal(chips(game), 2000);
  const unfinished = poker.create(people(3), pokerSettings, 0);
  move(poker, unfinished, 'raise', { amount: 250 });
  poker.end(unfinished, 'Admin ended');
  assert.deepEqual(
    unfinished.players.map((p) => p.stack),
    [1000, 1000, 1000]
  );
});

test('A short all-in blind only requires matching the actual bet when heads-up', () => {
  for (const shortStack of [5, 15]) {
    const game = poker.create(people(2), pokerSettings, 0);
    // Rotate the button next hand: p0 becomes the short big blind.
    game.players[0].stack = shortStack;
    game.players[1].stack = 1000;
    game.players.forEach((p) => {
      p.total = 0;
    });
    game.phase = 'between';
    game.deadline = 100;
    poker.tick(game, 100);
    if (shortStack === 5) {
      assert.notEqual(game.phase, 'playing');
      assert.equal(game.board.length, 5);
    } else {
      assert.equal(poker.legal(game, 'p1').call, 5);
      move(poker, game, 'call');
      assert.equal(game.board.length, 5);
    }
    assert.equal(chips(game), 1000 + shortStack);
  }
});

test('Departing poker players fold; remaining turn keeps its original deadline', () => {
  const game = poker.create(people(4), pokerSettings, 0);
  assert.equal(current(game).id, 'p3');
  const deadline = game.deadline;
  poker.depart(game, 'p1', 5000);
  assert.equal(current(game).id, 'p3');
  assert.equal(game.deadline, deadline);
  assert.equal(game.players[1].folded, true);
  poker.depart(game, 'p3', 6000);
  assert.notEqual(current(game).id, 'p3');
  assert.equal(chips(game), 4000);
});

test('Simulated poker games conserve chips/cards and only permit legal turns', () => {
  // Reproducible decisions; the actual deals still use the secure shuffle.
  let seed = 8472;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 2 ** 32;
  };
  for (let count = 2; count <= 6; count++) {
    const game = poker.create(people(count), pokerSettings, 0);
    let now = 1;
    for (let step = 0; step < 600 && game.phase !== 'ended'; step++) {
      assert.equal(chips(game), count * 1000);
      const allCards = [
        ...game.deck,
        ...game.burned,
        ...game.board,
        ...game.players.flatMap((p) => p.hand)
      ];
      assert.equal(allCards.length, 52);
      assert.equal(new Set(allCards.map((c) => c.id)).size, 52);
      if (game.phase === 'between') {
        now = game.deadline;
        poker.tick(game, now);
        continue;
      }
      const p = current(game);
      assert.ok(!p.folded && !p.allIn && !p.left && game.pending.has(p.id));
      const legal = poker.legal(game, p.id);
      const choice = random();
      const command =
        choice < 0.15 && legal.canAllIn
          ? 'allIn'
          : choice < 0.35
            ? 'fold'
            : legal.canCheck
              ? 'check'
              : 'call';
      now++;
      move(poker, game, command, {}, now);
    }
    assert.equal(chips(game), count * 1000);
  }
});

function lobbyFixture(count = 3) {
  let now = 100000;
  const hub = new GameHub({ now: () => now });
  const clients = [];
  for (let i = 0; i < count; i++) {
    const messages = [];
    const peer = hub.connect((message) => messages.push(JSON.parse(JSON.stringify(message))));
    hub.receive(peer, { type: 'join', name: `Friend ${i}` });
    const welcome = messages.find((m) => m.type === 'session');
    clients.push({ peer, messages, id: welcome.player.id, token: welcome.token });
  }
  const command = (index, message) => {
    clients[index].messages.length = 0;
    hub.receive(clients[index].peer, message);
    return clients[index].messages.find((m) => m.type === 'error');
  };
  const makeRoom = (type = 'bluff', targets = [1]) => {
    assert.equal(
      command(0, { type: 'create', game: type, players: targets.map((i) => clients[i].id) }),
      undefined
    );
    const room = [...hub.rooms.values()].at(-1);
    targets.forEach((index) => {
      const invite = [...hub.invites.values()].find(
        (invite) => invite.to === clients[index].id && invite.roomId === room.id
      );
      assert.equal(command(index, { type: 'respond', id: invite.id, accept: true }), undefined);
    });
    return room;
  };
  return {
    hub,
    clients,
    command,
    makeRoom,
    setTime(value) {
      now = value;
    },
    advance(ms) {
      now += ms;
      hub.tick();
    }
  };
}

test('Lobby nicknames normalize, are unique, and cannot be changed by another peer', () => {
  const { hub, clients, command } = lobbyFixture();
  const messages = [];
  const other = hub.connect((message) => messages.push(message));
  hub.receive(other, { type: 'join', name: '  friend   0 ' });
  assert.equal(messages.at(-1).type, 'error');
  hub.receive(other, { type: 'join', name: '\u200b' });
  assert.equal(messages.at(-1).type, 'error');
  assert.ok(command(0, { type: 'join', name: 'Replacement' }));
  assert.equal(hub.sessions.get(clients[0].id).name, 'Friend 0');
});

test('Multi-player invitations, decline, expiry, duplicate acceptance, and admin-only start', () => {
  const f = lobbyFixture(4);
  f.command(0, { type: 'create', game: 'poker', players: [f.clients[1].id, f.clients[2].id] });
  const room = [...f.hub.rooms.values()][0];
  const [first, second] = room.invitations;
  assert.equal(
    f.clients[3].messages.some((m) => m.type === 'invitation'),
    false
  );
  assert.ok(f.command(3, { type: 'respond', id: first.id, accept: true }));
  assert.equal(f.command(1, { type: 'respond', id: first.id, accept: true }), undefined);
  assert.ok(f.command(1, { type: 'respond', id: first.id, accept: true }));
  assert.ok(f.command(1, { type: 'start' }));
  f.command(2, { type: 'respond', id: second.id, accept: false });
  assert.equal(room.invitations[1].status, 'declined');
  assert.equal(f.command(0, { type: 'start' }), undefined);
  assert.equal(room.players.length, 2);
  assert.equal(room.game.type, 'poker');
  assert.ok(f.command(3, { type: 'move', action: 'fold', turnId: room.game.turnId }));

  const expiring = lobbyFixture(2);
  expiring.command(0, { type: 'create', game: 'bluff', players: [expiring.clients[1].id] });
  const invitation = [...expiring.hub.invites.values()][0];
  expiring.advance(60000);
  assert.equal(expiring.hub.invites.size, 0);
  assert.ok(expiring.command(1, { type: 'respond', id: invitation.id, accept: true }));
});

test('Accepting one competing invitation cancels the other and cannot join two rooms', () => {
  const f = lobbyFixture(3);
  f.command(0, { type: 'create', game: 'bluff', players: [f.clients[2].id] });
  f.command(1, { type: 'create', game: 'poker', players: [f.clients[2].id] });
  const [a, b] = [...f.hub.invites.values()];
  assert.equal(f.command(2, { type: 'respond', id: a.id, accept: true }), undefined);
  assert.ok(f.command(2, { type: 'respond', id: b.id, accept: true }));
  assert.equal(f.hub.sessions.get(f.clients[2].id).roomId, a.roomId);
  assert.equal(f.hub.rooms.get(b.roomId).players.length, 1);
});

test('Remove ten is private, single-use, before dealing, and locks to two players', () => {
  const f = lobbyFixture();
  f.command(0, {
    type: 'create',
    game: 'bluff',
    settings: { jokers: 2 },
    players: [f.clients[1].id, f.clients[2].id]
  });
  const room = [...f.hub.rooms.values()][0];
  f.command(1, { type: 'respond', id: room.invitations[0].id, accept: true });
  assert.ok(f.command(1, { type: 'removeTen' }));
  assert.equal(f.command(0, { type: 'removeTen' }), undefined);
  assert.equal(room.preparedDeck.length, 44);
  assert.ok(f.command(0, { type: 'removeTen' }));
  assert.equal(f.hub.invites.size, 0);
  const view = f.hub.roomView(room, f.clients[0].id);
  assert.ok(!Object.hasOwn(view, 'preparedDeck'));
  f.command(0, { type: 'start' });
  assert.equal(room.game.players[0].hand.length, 22);
  assert.equal(room.game.players[1].hand.length, 22);
  assert.ok(f.command(0, { type: 'removeTen' }));
});

test('Reconnect holds nickname and seat, resumes private hand, and expires after 60 seconds', () => {
  const f = lobbyFixture(3);
  const room = f.makeRoom('bluff', [1, 2]);
  f.command(0, { type: 'start' });
  const hand = room.game.players[0].hand.map((c) => c.id);
  f.hub.disconnect(f.clients[0].peer);
  assert.equal(f.hub.sessions.get(f.clients[0].id).connected, false);
  f.advance(30000);
  assert.equal(current(room.game).id, f.clients[0].id, 'A Bluff turn now lasts sixty seconds');
  const messages = [];
  const peer = f.hub.connect((message) => messages.push(JSON.parse(JSON.stringify(message))));
  f.hub.receive(peer, { type: 'resume', token: f.clients[0].token });
  assert.deepEqual(
    messages.find((m) => m.type === 'room').room.game.hand.map((c) => c.id),
    hand
  );
  f.hub.disconnect(peer);
  f.advance(60000);
  assert.equal(room.game.phase, 'ended');
  assert.equal(room.game.winnerId, null);
  assert.equal(room.adminId, f.clients[1].id);
  assert.ok(!f.hub.sessions.has(f.clients[0].id));
  f.hub.receive(
    f.hub.connect((message) => messages.push(message)),
    { type: 'resume', token: f.clients[0].token }
  );
  assert.equal(messages.at(-1).code, 'resumeExpired');
});

test('Hub filters private state and validates move versions', () => {
  for (const type of ['bluff', 'poker']) {
    const f = lobbyFixture(3);
    const room = f.makeRoom(type, [1, 2]);
    f.command(0, { type: 'start' });
    const view = f.hub.roomView(room, f.clients[0].id);
    const otherCard = room.game.players[1].hand[0].id;
    assert.ok(!JSON.stringify(view).includes(JSON.stringify(otherCard)));
    assert.ok(!JSON.stringify(view).includes(f.clients[1].token));
    assert.ok(f.command(0, { type: 'move', action: 'pass', turnId: -1 }));
  }
});

test('Media signaling is opt-in and restricted to current room members', () => {
  const f = lobbyFixture(3);
  const room = f.makeRoom();
  const offer = {
    type: 'signal',
    to: f.clients[1].id,
    signal: { description: { type: 'offer', sdp: 'test' } }
  };
  assert.ok(f.command(0, offer));
  for (const i of [0, 1])
    assert.equal(
      f.command(i, { type: 'media', joined: true, camera: false, microphone: false }),
      undefined
    );
  assert.equal(f.command(0, offer), undefined);
  assert.equal(f.clients[1].messages.at(-1).type, 'signal');
  assert.ok(f.command(2, offer));
  assert.ok(f.command(0, { ...offer, to: f.clients[2].id }));
  assert.ok(f.command(0, { ...offer, signal: { description: { type: 'script', sdp: 'x' } } }));
  assert.ok(
    f.command(0, {
      ...offer,
      signal: { description: { type: 'script', sdp: 'x' }, candidate: { candidate: 'x' } }
    })
  );
  assert.ok(f.command(0, { type: 'media', joined: true, camera: 'yes', microphone: false }));
  f.hub.disconnect(f.clients[1].peer);
  assert.equal(f.hub.sessions.get(f.clients[1].id).media.joined, false);
  assert.ok(f.command(0, offer));
  assert.equal(room.players.length, 2);
});

test('Leave/admin transfer/rematch and empty-room cleanup', () => {
  const f = lobbyFixture(3);
  const room = f.makeRoom('poker', [1, 2]);
  f.command(0, { type: 'start' });
  f.command(0, { type: 'leave' });
  assert.equal(room.adminId, f.clients[1].id);
  assert.equal(room.game.players[0].left, true);
  assert.equal(f.command(1, { type: 'end' }), undefined);
  assert.equal(f.command(1, { type: 'reset' }), undefined);
  assert.equal(room.game, null);
  assert.equal(f.command(1, { type: 'start' }), undefined);
  assert.equal(room.game.players.length, 2);
  f.command(1, { type: 'leave' });
  f.command(2, { type: 'leave' });
  assert.equal(f.hub.rooms.size, 0);
});

function route(url, method = 'GET') {
  const result = { headers: {}, body: '', status: 200 };
  const response = {
    setHeader(name, value) {
      result.headers[name.toLowerCase()] = value;
    },
    writeHead(status, headers = {}) {
      result.status = status;
      Object.entries(headers).forEach(([name, value]) => this.setHeader(name, value));
    },
    end(body) {
      result.body = body === undefined ? '' : String(body);
    }
  };
  routes.handle({ url, method }, response);
  return result;
}

test('Page/assets/HEAD, CSP, microphone policy, traversal, and invalid methods', () => {
  for (const url of ['/cards', '/cards/', '/cards?hello=1']) {
    const res = route(url);
    assert.equal(res.status, 200);
    assert.match(res.body, /A little table/);
    assert.match(res.headers['permissions-policy'], /microphone=\(self\)/);
    assert.match(res.headers['content-security-policy'], /script-src 'self'/);
  }
  for (const file of [
    'app.js',
    'media.js',
    'style.css',
    'bluff.css',
    'phone.js',
    'voice.js',
    'ranks.mjs',
    'rank-audio-worklet.js'
  ])
    assert.equal(route(`/cards/${file}`).status, 200);
  assert.equal(route('/cards', 'HEAD').body, '');
  assert.equal(route('/cards/app.js', 'HEAD').body, '');
  const modelHead = route('/cards/voice-assets/vosk-model-small-en-us-0.15.tar.gz', 'HEAD');
  assert.equal(modelHead.status, 200);
  assert.equal(modelHead.body, '');
  assert.ok(modelHead.headers['content-length'] > 40000000);
  assert.match(modelHead.headers['cache-control'], /immutable/);
  const workerHead = route('/cards/voice-assets/vosk-worker-0.0.8.js', 'HEAD');
  assert.match(workerHead.headers['content-security-policy'], /'wasm-unsafe-eval'/);
  assert.doesNotMatch(workerHead.headers['content-security-policy'], /'unsafe-eval'/);
  assert.doesNotMatch(route('/cards').headers['content-security-policy'], /wasm-unsafe-eval/);
  assert.equal(route('/cards', 'POST').status, 405);
  for (const file of [
    '../routes.js',
    '%2e%2e/server.js',
    'toString',
    '__proto__',
    'missing.js',
    'ws'
  ])
    assert.equal(route(`/cards/${file}`).status, 404);
});

test('WebSocket upgrade rejects unrelated/cross-origin requests', () => {
  let destroyed = false;
  let response = '';
  const socket = {
    write(text) {
      response += text;
    },
    destroy() {
      destroyed = true;
    }
  };
  assert.equal(routes.handleUpgrade({ url: '/elsewhere' }, socket, Buffer.alloc(0)), false);
  assert.equal(destroyed, false);
  for (const origin of [undefined, 'https://evil.example', 'null', 'file:///']) {
    assert.equal(
      routes.handleUpgrade(
        { url: '/cards/ws', headers: { origin, host: 'localhost:3000' } },
        socket,
        Buffer.alloc(0)
      ),
      true
    );
    assert.ok(destroyed);
    assert.match(response, /403/);
  }
});

async function socketSmoke() {
  const server = http.createServer((req, res) => routes.handle(req, res));
  server.on('upgrade', (req, socket, head) => {
    if (!routes.handleUpgrade(req, socket, head)) socket.destroy();
  });
  try {
    await new Promise((resolve, reject) => {
      server.once('error', reject);
      server.listen(0, '127.0.0.1', resolve);
    });
  } catch (error) {
    if (!['EPERM', 'EACCES'].includes(error.code)) throw error;
    console.log(
      'Cards socket smoke test skipped: localhost listen is blocked in this environment.'
    );
    return;
  }
  const clients = [];
  const port = server.address().port;
  try {
    // Verify the large model is streamed intact, rather than only checking its
    // filesystem copy. Browser recognition depends on this exact response.
    await new Promise((resolve, reject) => {
      const crypto = require('crypto');
      const manifest = require('../src/pages/cards/public/voice-assets/manifest.json');
      const hash = crypto.createHash('sha256');
      let bytes = 0;
      const req = http.get(
        `http://127.0.0.1:${port}/cards/voice-assets/vosk-model-small-en-us-0.15.tar.gz`,
        (res) => {
          assert.equal(res.statusCode, 200);
          assert.match(res.headers['cache-control'], /immutable/);
          res.on('data', (chunk) => {
            bytes += chunk.length;
            hash.update(chunk);
          });
          res.on('end', () => {
            try {
              assert.equal(bytes, Number(res.headers['content-length']));
              assert.equal(
                hash.digest('hex'),
                manifest.sha256['vosk-model-small-en-us-0.15.tar.gz']
              );
              resolve();
            } catch (error) {
              reject(error);
            }
          });
          res.on('error', reject);
        }
      );
      req.setTimeout(5000, () => req.destroy(new Error('Model download timed out.')));
      req.on('error', reject);
    });
    const open = async (name) => {
      const ws = new WebSocket(`ws://127.0.0.1:${port}/cards/ws`, {
        origin: `http://127.0.0.1:${port}`
      });
      clients.push(ws);
      const messages = [];
      ws.on('message', (data) => messages.push(JSON.parse(data.toString())));
      await new Promise((resolve, reject) => {
        ws.once('open', resolve);
        ws.once('error', reject);
      });
      ws.send(JSON.stringify({ type: 'join', name }));
      await until(() => messages.find((m) => m.type === 'session'));
      return { ws, messages, id: messages.find((m) => m.type === 'session').player.id };
    };
    const a = await open('Socket A');
    const b = await open('Socket B');
    a.ws.send(JSON.stringify({ type: 'create', game: 'bluff', players: [b.id] }));
    const invite = await until(() => b.messages.find((m) => m.type === 'invitation'));
    b.ws.send(JSON.stringify({ type: 'respond', id: invite.invitation.id, accept: true }));
    await until(() => a.messages.find((m) => m.type === 'room' && m.room?.players.length === 2));
    a.ws.send(JSON.stringify({ type: 'start' }));
    const started = await until(() => a.messages.find((m) => m.type === 'room' && m.room?.game));
    assert.equal(started.room.game.hand.length, 26);
    a.ws.send(
      JSON.stringify({
        type: 'move',
        action: 'play',
        cards: [started.room.game.hand[0].id],
        rank: 1,
        turnId: started.room.game.turnId
      })
    );
    const challenged = await until(() =>
      b.messages.find((m) => m.type === 'room' && m.room?.game?.lastPlay?.count === 1)
    );
    assert.equal(challenged.room.game.lastPlay.count, 1);
    assert.equal(challenged.room.game.lastPlay.cards, undefined);
    checks++;
    console.log('Cards live WebSocket smoke test passed.');
  } finally {
    clients.forEach((ws) => ws.terminate());
    await new Promise((resolve) => server.close(resolve));
  }
}

function until(read) {
  return new Promise((resolve, reject) => {
    const started = Date.now();
    const timer = setInterval(() => {
      const result = read();
      if (result) {
        clearInterval(timer);
        resolve(result);
      } else if (Date.now() - started > 4000) {
        clearInterval(timer);
        reject(new Error('Timed out waiting for card socket event.'));
      }
    }, 10);
  });
}

socketSmoke()
  .then(() => console.log(`Cards tests passed (${checks} groups, including simulated games).`))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
