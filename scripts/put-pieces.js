/**
 * @param {Game[]} state
 * @param {event} event
 * @returns {Game[]}
 * */
moinho.putPieces = (state = [], event) => {
  const { PlayerId } = moinho;
  const lastState = state[state.length - 1];
  const index = event.target.dataset.position;
  const positions = [...lastState.positions];

  if (
    positions[index] !== PlayerId.NONE ||
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
    nextPlayer: nextPlayer === PlayerId.ONE ? PlayerId.TWO : PlayerId.ONE,
    p1: {
      ...p1,
      quantityRemaingPieces:
        nextPlayer === PlayerId.ONE
          ? p1.quantityRemaingPieces - 1
          : p1.quantityRemaingPieces,
    },
    p2: {
      ...p2,
      quantityRemaingPieces:
        nextPlayer === PlayerId.TWO
          ? p2.quantityRemaingPieces - 1
          : p2.quantityRemaingPieces,
    },
  };

  return [...state, newState];
};