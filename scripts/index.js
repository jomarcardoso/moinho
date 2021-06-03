const { fromEvent, Observable, Subject } = rxjs;
const { scan, map } = rxjs.operators;
const buttons = document.querySelectorAll('button');

const players = {
  ONE: 'p1',
  TWO: 'p2',
  NONE: 'NONE',
};

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
  nextPlayer: players.ONE
}

const subject = new Subject();

const dot0Observable = fromEvent(buttons[0], 'click').subscribe(subject);
const dot1Observable = fromEvent(buttons[1], 'click').subscribe(subject);
const dot2Observable = fromEvent(buttons[2], 'click').subscribe(subject);

const game$ = subject.pipe(scan((state = [], event) => {
  const lastState = state[state.length - 1];
  const index = event.target.dataset.position;
  const positions = [...lastState.positions];
  const { nextPlayer } = lastState;

  positions[index] = nextPlayer;

  const newState = {
    positions,
    nextPlayer: nextPlayer === players.ONE ? players.TWO : players.ONE,
  };

  return [...state, newState];
}, [GAME]));

const currentPlayer = game$.subscribe({
  // next: (e) => console.log('j', e),
})

const dot0Subscriber = game$.subscribe({
  next: (game = []) => {
    const state = game[game.length - 1];
    const button = document.querySelector('[data-position="0"]');

    if (state.positions[0] === players.ONE) {
      button.classList.add(`checked-${players.ONE}`)
    }

    if (state.positions[0] === players.TWO) {
      button.classList.add(`checked-${players.TWO}`)
    }
  }
});

const dot1Subscriber = game$.subscribe({
  next: (game = []) => {
    const state = game[game.length - 1];
    const button = document.querySelector('[data-position="1"]');

    if (state.positions[1] === players.ONE) {
      button.classList.add(`checked-${players.ONE}`)
    }

    if (state.positions[1] === players.TWO) {
      button.classList.add(`checked-${players.TWO}`)
    }
  }
});

const dot2Subscriber = game$.subscribe({
  next: (game = []) => {
    const state = game[game.length - 1];
    const button = document.querySelector('[data-position="2"]');

    console.log(state.positions[2], players.ONE)

    if (state.positions[2] === players.ONE) {
      button.classList.add(`checked-${players.ONE}`)
    }

    if (state.positions[2] === players.TWO) {
      button.classList.add(`checked-${players.TWO}`)
    }
  }
});

// function generateBoardDots(quantity) {
//   const array = [];

//   for(i = 0; i < quantity; i++) {
//     array.push({
//       player: players.NONE,
//       button: buttons[i],
//     });
//   }

//   return array;
// }

// const boardDots = generateBoardDots(24);

// const observable = fromEvent(buttons, 'click');

// let currentPlayer = players.ONE;

// const subject = new Subject();
// const observable = fromEvent(buttons, 'click')

// observable
//   .pipe(
//     scan((acc, curr) => {
//       console.log(curr);

//       return [...acc, curr]
//     }, buttons)
//   )

// function createDotsSubscribers() {
//   buttons.forEach((button) => {
//     subject.subscribe({
//       next: (e) => {
//         const currentPosition = e.target.dataset.position;

//         if (currentPosition === button.dataset.position) {
//           button.classList.add(`checked-${currentPlayer}`)
//           boardDots[currentPosition] = { player: currentPlayer };

//           if (currentPlayer === players.ONE) {
//             currentPlayer = players.TWO;
//           } else {
//             currentPlayer = players.ONE;
//           }
//         }
//       }
//     })
//   })
// }

// createDotsSubscribers();

// observable.subscribe(subject);