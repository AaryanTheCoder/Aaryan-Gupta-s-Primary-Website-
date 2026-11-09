const { randomInt } = require('crypto');

const SUITS = ['clubs', 'diamonds', 'hearts', 'spades'];

function makeDeck(jokers = 0) {
  const cards = SUITS.flatMap((suit) =>
    Array.from({ length: 13 }, (_, index) => ({
      id: `${suit}-${index + 1}`,
      rank: index + 1,
      suit
    }))
  );
  for (let i = 0; i < jokers; i++) cards.push({ id: `joker-${i}`, rank: 0, suit: 'joker' });
  return cards;
}

// Fisher–Yates gives every ordering an equal chance. crypto.randomInt avoids
// using a predictable browser seed to decide anybody's hand.
function shuffle(cards) {
  const result = cards.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function requireMove(condition, message) {
  if (!condition) throw new Error(message);
}

function addLog(game, text) {
  game.log.push(text);
  game.log = game.log.slice(-25);
}

module.exports = { SUITS, makeDeck, shuffle, requireMove, addLog };
