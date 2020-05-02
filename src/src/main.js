import './init';
import './Application';

import Background from './Objects/Background';
import Ground from './Objects/Ground';
import Character from './Objects/Character';

import app from './Application';
import onClick from './utils/onClick';

const gameObjects = [Background, Ground, Character];

let state = getDefaultState ();

gameObjects.forEach (e => e.init (state));

app.ticker.add (delta => {
  // call every update function with game state object
  for (let i = 0; i < gameObjects.length; i++) {
    const newState = gameObjects[i].update (state, delta);

    if (newState) state = newState;
  }
});

function getDefaultState () {
  return {
    isPlaying: false,
    lost: false,
    playerPosition: {
      x: appDimensions.ofWidth (0.5),
      y: appDimensions.ofHeight (0.5),
    },
    playerSpeed: 0,
    playerSpeedJumped: appDimensions.constant (-11),
    gravityAcceleration: appDimensions.constant (0.6),
    groundSpeed: appDimensions.constant (-1),
    groundHeight: window.appDimensions.height * 0.12,
  };
}

onClick (event => {
  if (state.lost) {
    state = getDefaultState ();
    return;
  }

  const {isPlaying, playerSpeedJumped} = state;
  if (!isPlaying) state.isPlaying = true;
  state.playerSpeed = playerSpeedJumped;
});
