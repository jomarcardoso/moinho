/**
 * @param {Game[]} state
 * @param {event} event
 * @returns {Game[]}
 * */
moinho.movePieces = (state = [], event) => {
  const { PlayerId } = moinho;
  const lastState = state[state.length - 1];
  const newState = {...lastState};
  const index = Number(event.target.dataset.position);
  const { nextPlayer } = lastState;

  if (!newState.selectedPiece) {
    newState.selectedPiece = index + 1;
  } else {
    const positions = [...lastState.positions];

    positions[index] = lastState.nextPlayer;
    positions[newState.selectedPiece - 1] = PlayerId.NONE;
    newState.nextPlayer = nextPlayer === PlayerId.ONE ? PlayerId.TWO : PlayerId.ONE;
    newState.selectedPiece = 0;
    newState.positions = positions;
  }

  return [...state, newState];
}