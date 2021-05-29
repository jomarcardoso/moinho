const { fromEvent } = rxjs;
const { scan } = rxjs.operators;
const buttons = document.querySelectorAll('button');

function listen(button) {
  fromEvent(button, 'click')
    .pipe(scan(() => true, false))
    .subscribe(piece => piece && button.classList.add('checked'));
}

buttons.forEach(listen);