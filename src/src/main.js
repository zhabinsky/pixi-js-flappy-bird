import './init';
import './Application';

import Background from './Objects/Background';
import Ground from './Objects/Ground';
import Character from './Objects/Character';
import Tubes from './Objects/Tubes';

import app from './Application';
import onClick from './utils/onClick';
import Stats from 'stats.js';

const stats = new Stats ();
stats.showPanel (0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild (stats.dom);

const gameObjects = [Background, Ground, Character, Tubes];

let state = getDefaultState ();

gameObjects.forEach (e => e.init (state));

// call every update function with game state object
app.ticker.add (delta => {
  stats.begin ();

  /**
   * We divise delta time into n portions
   * and call update function multiple times
   * so that collision is detected faster
   */
  const n = 10;

  for (let it = 0; it < n; it++)
    for (let i = 0; i < gameObjects.length; i++)
      gameObjects[i].update (state, delta / n);

  stats.end ();
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
    playerSpeedJumped: appDimensions.constant (-10),
    gravityAcceleration: appDimensions.constant (0.6),

    groundSpeed: appDimensions.constant (-4),
    groundHeight: window.appDimensions.height * 0.12,

    tubeWidth: appDimensions.ofWidth (0.14),
    tubeHeight: appDimensions.height / 2,
    tubeGap: appDimensions.ofHeight (0.24),
    tubeDistance: appDimensions.ofWidth (0.6),
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
