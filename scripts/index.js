const { fromEvent, Observable, Subject } = rxjs;
const { scan, map } = rxjs.operators;
const buttons = document.querySelectorAll('button');

const players = {
  ONE: 'p1',
  TWO: 'p2',
  NONE: 'NONE',
};

const subject = new Subject();

const dot0Observable = fromEvent(buttons[0], 'click').subscribe(subject);
const dot1Observable = fromEvent(buttons[1], 'click').subscribe(subject);
const dot2Observable = fromEvent(buttons[2], 'click').subscribe(subject);

const currentPlayer = subject.subscribe({
  next: (e) => console.log(e),
})

const dot0Subscriber = subject.subscribe({
  next: (e) => console.log(e)
});

const dot1Subscriber = subject.subscribe({
  next: (e) => console.log(e)
});

const dot2Subscriber = subject.subscribe({
  next: (e) => console.log(e)
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