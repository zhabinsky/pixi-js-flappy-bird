import './init';
import './Application';

import updateBackground from './Objects/Background';
import updateCharacter from './Objects/Character';
import app from './Application';

const updators = [updateBackground, updateCharacter];

let state = getDefaultState ();

app.ticker.add (delta => {
  // call every update function with game state object
  for (let i = 0; i < updators.length; i++) {
    const newState = updators[i] (state, delta);

    if (newState) state = newState;
  }
});

function getDefaultState () {
  return {
    playing: false,
    playerSpeed: 0,
    gravityAcceleration: 0.6,
    lost: false,
  };
}

function click () {
  if (!state.playing) {
    state.playing = true;
  }

  state.playerSpeed = -15;
}

window.addEventListener ('mousedown', click);
