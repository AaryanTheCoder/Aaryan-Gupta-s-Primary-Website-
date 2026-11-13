// One spoken rank becomes one number. Never guess a rank from unrelated text.
export const RANK_NAMES = [
  'Ace',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Jack',
  'Queen',
  'King'
];
const aliases = [
  ['ace', 'aces', 'one', 'ones', '1'],
  ['two', 'twos', '2'],
  ['three', 'threes', '3'],
  ['four', 'fours', '4'],
  ['five', 'fives', '5'],
  ['six', 'sixes', '6'],
  ['seven', 'sevens', '7'],
  ['eight', 'eights', '8'],
  ['nine', 'nines', '9'],
  ['ten', 'tens', '10'],
  ['jack', 'jacks', 'eleven', '11'],
  ['queen', 'queens', 'twelve', '12'],
  ['king', 'kings', 'thirteen', '13']
];
const ranks = new Map(aliases.flatMap((words, index) => words.map((word) => [word, index + 1])));
export const RANK_GRAMMAR = [...ranks.keys()]
  .filter((word) => /^[a-z]+$/.test(word))
  .concat('[unk]');

export function parseRank(text, legalRanks) {
  if (typeof text !== 'string') return null;
  const rank = ranks.get(
    text
      .normalize('NFKC')
      .trim()
      .toLowerCase()
      .replace(/[.!?]$/, '')
  );
  return rank && legalRanks.includes(rank) ? rank : null;
}

export function cardsForDrag(draggedId, selectedIds) {
  return selectedIds.includes(draggedId) ? selectedIds.slice() : [draggedId];
}

export function canDropCards(game, selfId, ids, now) {
  return (
    !!game &&
    game.type === 'bluff' &&
    game.phase === 'playing' &&
    game.turnPlayerId === selfId &&
    now < game.deadline &&
    ids.length >= 1 &&
    ids.length <= 4 &&
    new Set(ids).size === ids.length &&
    ids.every((id) => game.hand.some((card) => card.id === id))
  );
}
