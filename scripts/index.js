/**
 * @typedef {Object} Player
 * @property {number} quantityRemaingPieces
 * @property {number} quantityEnemyPieces
 */

/**
 * @typedef {Object} Game
 * @property {string[]} positions
 * @property {player} nextPlayer
 * @property {Player} p1
 * @property {Player} p2
 */

const { fromEvent, Observable, Subject } = rxjs;
const { scan, map, partition } = rxjs.operators;
const elButtons = document.querySelectorAll('button');
const elP1RemaingPieces = document.querySelectorAll(
  '[data-remaining-piece-p1]',
);
const elP2RemaingPieces = document.querySelectorAll(
  '[data-remaining-piece-p2]',
);

/** @enum {string} */
const players = {
  ONE: 'p1',
  TWO: 'p2',
  NONE: '',
};

/** @type {Game} */
const GAME = {
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
  nextPlayer: players.ONE,
  p1: {
    quantityEnemyPieces: 0,
    quantityRemaingPieces: 9,
  },
  p2: {
    quantityEnemyPieces: 0,
    quantityRemaingPieces: 9,
  },
};

const subject = new Subject();

Array.from(elButtons).forEach((elButton) => {
  fromEvent(elButton, 'click').subscribe(subject);
});

// const gameStates$ = subject.pipe(
//   scan(
//     /**
//      * @param {Game[]} state
//      * @param {event} event
//      * */
//     (state = [], event) => {
//       const lastState = state[state.length - 1];
//       const index = event.target.dataset.position;
//     },
//   [GAME],
//   )
// )

// const [put$, move$] = partition(subject, () => )

const game$ = subject.pipe(
  scan(
    /**
     * @param {Game[]} state
     * @param {event} event
     * */
    (state = [], event) => {
      const lastState = state[state.length - 1];
      const index = event.target.dataset.position;
      const positions = [...lastState.positions];

      if (
        positions[index] !== players.NONE ||
        (lastState.p1.quantityRemaingPieces === 0 &&
          lastState.p2.quantityRemaingPieces === 0)
      ) {
        return [...state];
      }

      const { nextPlayer } = lastState;
      const p1 = { ...lastState.p1 };
      const p2 = { ...lastState.p2 };

      positions[index] = nextPlayer;

      /** @type {Game} */
      const newState = {
        positions,
        nextPlayer: nextPlayer === players.ONE ? players.TWO : players.ONE,
        p1: {
          ...p1,
          quantityRemaingPieces:
            nextPlayer === players.ONE
              ? p1.quantityRemaingPieces - 1
              : p1.quantityRemaingPieces,
        },
        p2: {
          ...p2,
          quantityRemaingPieces:
            nextPlayer === players.TWO
              ? p2.quantityRemaingPieces - 1
              : p2.quantityRemaingPieces,
        },
      };

      return [...state, newState];
    },
    [GAME],
  ),
);

function createRemainingPieceSubscription(elPiece, index = 0) {
  /** @param {Game[]} game */
  function subscription(game = []) {
    const state = game[game.length - 1];

    if (
      state.nextPlayer === players.TWO &&
      state.p1.quantityRemaingPieces < index + 1
    ) {
      elPiece.classList.remove('p1');
    }

    if (
      state.nextPlayer === players.ONE &&
      state.p2.quantityRemaingPieces < index + 1
    ) {
      elPiece.classList.remove('p2');
    }
  }

  return subscription;
}

function createDotSubscription(elButton, index = 0) {
  /** @param {Game[]} game */
  function subscription(game = []) {
    const state = game[game.length - 1];

    if (state.positions[index] === players.ONE) {
      elButton.classList.add(`checked-${players.ONE}`);
    }

    if (state.positions[index] === players.TWO) {
      elButton.classList.add(`checked-${players.TWO}`);
    }
  }

  return subscription;
}

const currentPlayer = game$.subscribe({
  /** @param {Game[]} game */
  next: (game) => {
    const state = game[game.length - 1];
    const elCurrentPlayer = document.querySelector('[data-current-player]');

    elCurrentPlayer.innerHTML = state.nextPlayer;
  },
});

elButtons.forEach((elButton, index) => {
  game$.subscribe({
    next: createDotSubscription(elButton, index),
  });
});

elP1RemaingPieces.forEach((elPiece, index) => {
  game$.subscribe({
    next: createRemainingPieceSubscription(elPiece, index),
  });
});

elP2RemaingPieces.forEach((elPiece, index) => {
  game$.subscribe({
    next: createRemainingPieceSubscription(elPiece, index),
  });
});
