enum PlayerId {
  ONE = 'p1',
  TWO = 'p2',
  NONE = '',
};

/**
 * @typedef {Object} Player
 * @property {number} quantityRemaingPieces
 * @property {number} quantityEnemyPieces
 */
export interface Player {
  quantityRemaingPieces: number;
  quantityEnemyPieces: number;
}

/**
 * @typedef {Object} Game
 * @property {string[]} positions
 * @property {player} nextPlayer
 * @property {Player} p1
 * @property {Player} p2
 */
export interface Game {
  position: Array<string>;
  nextPlayer: PlayerId;
  p1: Player;
  p2: Player;
}