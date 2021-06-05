/**
 * @typedef { import("./types").Player } Player
 * @typedef { import("./types").Game } Game
 */
(() => {
  const { putPieces, PlayerId } = moinho;
  const { fromEvent, Subject } = rxjs;
  const { scan } = rxjs.operators;
  const elButtons = document.querySelectorAll('button');
  const elP1RemaingPieces = document.querySelectorAll(
    '[data-remaining-piece-p1]',
  );
  const elP2RemaingPieces = document.querySelectorAll(
    '[data-remaining-piece-p2]',
  );

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
    nextPlayer: PlayerId.ONE,
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
        console.log(state);
        const lastState = state[state.length - 1];
        const noneRemainingPieces = !(lastState.p1.quantityRemaingPieces + lastState.p2.quantityRemaingPieces);

        if (noneRemainingPieces) return [...state];

        return putPieces(state, event);
      },
      [GAME],
    ),
  );

  /** @param {Game[]} game */
  function updateRemainingPieces(game) {
    function exec(elPiece, index) {
      const state = game[game.length - 1];

      if (
        state.nextPlayer === PlayerId.TWO &&
        state.p1.quantityRemaingPieces < index + 1
      ) {
        elPiece.classList.remove('p1');
      }

      if (
        state.nextPlayer === PlayerId.ONE &&
        state.p2.quantityRemaingPieces < index + 1
      ) {
        elPiece.classList.remove('p2');
      }
    }

    elP1RemaingPieces.forEach(exec);
    elP2RemaingPieces.forEach(exec);
  }

  /** @param {Game[]} game */
  function updateDots(game = []) {
    elButtons.forEach((elButton, index) => {
      const state = game[game.length - 1];

      if (state.positions[index] === PlayerId.ONE) {
        elButton.classList.add(`checked-${PlayerId.ONE}`);
      }

      if (state.positions[index] === PlayerId.TWO) {
        elButton.classList.add(`checked-${PlayerId.TWO}`);
      }
    });
  }

  function createUpdateCurrentPlayer() {
    const elCurrentPlayer = document.querySelector('[data-current-player]');

    /** @param {Game[]} game */
    function exec(game) {
      const state = game[game.length - 1];


      elCurrentPlayer.innerHTML = state.nextPlayer;
    }

    return exec;
  };

  const updateCurrentPlayer = createUpdateCurrentPlayer();

  game$.subscribe({
    /** @param {Game[]} game */
    next: (game) => {
      updateDots(game);
      updateCurrentPlayer(game);
      updateRemainingPieces(game);
    }
  });
})();
