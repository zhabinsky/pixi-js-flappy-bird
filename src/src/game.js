import onClick from './utils/onClick';

// game objects:
import Background from './game-objects/Background';
import Ground from './game-objects/Ground';
import Character from './game-objects/Character';
import Tubes from './game-objects/Tubes';

let stats;
if (process.env.NODE_ENV === 'development') {
  const Stats = require ('stats.js');
  stats = new Stats ();
  stats.showPanel (0); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild (stats.dom);
}

const gameObjects = [Background, Ground, Character, Tubes];

let state = getDefaultState ();

// init game objects
gameObjects.forEach (e => e.init (state));

// call every update function with game state object
app.ticker.add (delta => {
  if (process.env.NODE_ENV === 'development') {
    stats.begin ();
  }

  /**
   * We divise delta time into n portions
   * and call update function multiple times
   * so that collision is detected faster
   */
  const n = 5;
  for (let it = 0; it < n; it++)
    for (let i = 0; i < gameObjects.length; i++)
      gameObjects[i].update (state, delta / n);

  if (process.env.NODE_ENV === 'development') {
    stats.end ();
  }
});

// returns initial app state
function getDefaultState () {
  return {
    isPlaying: false,
    lost: false,

    playerPosition: {
      x: sizes.ofWidth (0.5),
      y: sizes.ofHeight (0.5),
    },

    playerSpeed: 0,
    playerSpeedJumped: sizes.constant (-10),
    gravityAcceleration: sizes.constant (0.6),

    groundSpeed: sizes.constant (-4),
    groundHeight: window.sizes.height * 0.12,

    tubeWidth: sizes.ofWidth (0.14),
    tubeHeight: sizes.height / 2,
    tubeGap: sizes.ofHeight (0.24),
    tubeDistance: sizes.ofWidth (0.6),
  };
}

onClick (event => {
  if (state.lost) {
    state = getDefaultState ();

    Tubes.destroyAlltubes ();
    Tubes.init (state);

    return;
  }

  const {isPlaying, playerSpeedJumped} = state;
  if (!isPlaying) state.isPlaying = true;
  state.playerSpeed = playerSpeedJumped;
});
