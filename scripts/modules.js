/**
 * @typedef { import("./types").Game } Game
 */

const moinho = {}
/** @enum {string} */
moinho.PlayerId = {
  ONE: 'p1',
  TWO: 'p2',
  NONE: '',
};

/** @type {Game} */
moinho.GAME = {
  positions: [
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ],
  nextPlayer: moinho.PlayerId.ONE,
  p1: {
    quantityEnemyPieces: 0,
    quantityRemaingPieces: 9,
  },
  p2: {
    quantityEnemyPieces: 0,
    quantityRemaingPieces: 9,
  },
  selectedPiece: 0,
};