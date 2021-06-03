/**
 * @typedef {Object} Game
 * @property {string[]} positions
 * @property {player} nextPlayer
 */

const { fromEvent, Observable, Subject } = rxjs;
const { scan, map } = rxjs.operators;
const elButtons = document.querySelectorAll('button');

/** @enum {string} */
const players = {
  ONE: 'p1',
  TWO: 'p2',
  NONE: 'NONE',
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
};

const subject = new Subject();

Array.from(elButtons).forEach((elButton) => {
  fromEvent(elButton, 'click').subscribe(subject);
});

const game$ = subject.pipe(
  scan(
    (state = [], event) => {
      const lastState = state[state.length - 1];
      const index = event.target.dataset.position;
      const positions = [...lastState.positions];
      const { nextPlayer } = lastState;

      positions[index] = nextPlayer;

      /** @type {Game} */
      const newState = {
        positions,
        nextPlayer: nextPlayer === players.ONE ? players.TWO : players.ONE,
      };

      return [...state, newState];
    },
    [GAME],
  ),
);

function createDotSubscription(index = 0) {
  const elButton = elButtons[index];

  /** @param {Game[]} game */
  return (game = []) => {
    const state = game[game.length - 1];

    if (state.positions[index] === players.ONE) {
      elButton.classList.add(`checked-${players.ONE}`);
    }

    if (state.positions[index] === players.TWO) {
      elButton.classList.add(`checked-${players.TWO}`);
    }
  };
}

const currentPlayer = game$.subscribe({
  /** @param {Game[]} game */
  next: (game) => {
    const state = game[game.length - 1];
    const elCurrentPlayer = document.querySelector('[data-current-player]');

    elCurrentPlayer.innerHTML = state.nextPlayer
  }
});

const dot0Subscriber = game$.subscribe({
  next: createDotSubscription(0),
});

const dot1Subscriber = game$.subscribe({
  next: createDotSubscription(1),
});

const dot2Subscriber = game$.subscribe({
  next: createDotSubscription(2),
});

const dot3Subscriber = game$.subscribe({
  next: createDotSubscription(3),
});

const dot4Subscriber = game$.subscribe({
  next: createDotSubscription(4),
});

const dot5Subscriber = game$.subscribe({
  next: createDotSubscription(5),
});

const dot6Subscriber = game$.subscribe({
  next: createDotSubscription(6),
});

const dot7Subscriber = game$.subscribe({
  next: createDotSubscription(7),
});

const dot8Subscriber = game$.subscribe({
  next: createDotSubscription(8),
});

const dot9Subscriber = game$.subscribe({
  next: createDotSubscription(9),
});

const dot10Subscriber = game$.subscribe({
  next: createDotSubscription(10),
});

const dot11Subscriber = game$.subscribe({
  next: createDotSubscription(11),
});

const dot12Subscriber = game$.subscribe({
  next: createDotSubscription(12),
});

const dot13Subscriber = game$.subscribe({
  next: createDotSubscription(13),
});

const dot14Subscriber = game$.subscribe({
  next: createDotSubscription(14),
});

const dot15Subscriber = game$.subscribe({
  next: createDotSubscription(15),
});

const dot16Subscriber = game$.subscribe({
  next: createDotSubscription(16),
});

const dot17Subscriber = game$.subscribe({
  next: createDotSubscription(17),
});

const dot18Subscriber = game$.subscribe({
  next: createDotSubscription(18),
});

const dot19Subscriber = game$.subscribe({
  next: createDotSubscription(19),
});

const dot20Subscriber = game$.subscribe({
  next: createDotSubscription(20),
});

const dot21Subscriber = game$.subscribe({
  next: createDotSubscription(21),
});

const dot22Subscriber = game$.subscribe({
  next: createDotSubscription(22),
});

const dot23Subscriber = game$.subscribe({
  next: createDotSubscription(23),
});