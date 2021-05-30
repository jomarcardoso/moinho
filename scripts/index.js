const { fromEvent, Observable, Subject } = rxjs;
const { scan } = rxjs.operators;
const buttons = document.querySelectorAll('button');

const players = {
  ONE: 'p1',
  TWO: 'p2',
  NONE: 'NONE',
};

function generateBoardDots(quantity) {
  const array = [];

  for(i = 0; i < quantity; i++) {
    array.push({
      player: players.NONE
    })
  }

  return array;
}

const boardDots = generateBoardDots(24);
let currentPlayer = players.ONE;

const subject = new Subject();
const observable = fromEvent(buttons, 'click')

function createDotsSubscribers() {
  buttons.forEach((button) => {
    subject.subscribe({
      next: (e) => {
        const currentPosition = e.target.dataset.position;
        if (currentPosition === button.dataset.position) {
          button.classList.add(`checked-${currentPlayer}`)
          boardDots[currentPosition] = { player: currentPlayer };

          if (currentPlayer === players.ONE) {
            currentPlayer = players.TWO;
          } else {
            currentPlayer = players.ONE;
          }
        }
      }
    })
  })
}

createDotsSubscribers();

observable.subscribe(subject);