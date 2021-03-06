import PIXI from '../pixi';
import Tubes from './Tubes';

const texture = PIXI.Texture.from ('assets/bluebird-downflap.png');
const group = new PIXI.display.Group (3, false);
const layer = new PIXI.display.Layer (group);
const container = new PIXI.Container ();

app.stage.addChild (container);
app.stage.addChild (layer);

const player = new PIXI.Sprite (texture);

container.addChild (player);

const width = sizes.ofWidth (0.13);
const height = width * 24 / 34;

const init = state => {
  player.anchor.set (0.5, 0);
  player.parentGroup = group;
  player.width = width;
  player.height = height;

  player.x = state.playerPosition.x;
  player.y = state.playerPosition.y;
};

const checkCollision = (state, delta) => {
  // Ground collision check
  const playerBottom = player.y + height / 2;
  const groundStart = window.sizes.height - state.groundHeight;

  if (playerBottom >= groundStart) state.lost = true;

  // Tubes collision check
  const tubes = Tubes.getTubes ();

  const spriteBounds = player.getBounds (false);
  const characterRect = {
    left: spriteBounds.left,
    right: spriteBounds.right,
    top: spriteBounds.top,
    bottom: spriteBounds.bottom,
  };

  const m = 0.2;

  characterRect.right -= player.width * m;
  characterRect.left += player.width * m;
  characterRect.top += player.height * m;
  characterRect.bottom -= player.height * m;

  const n = 3; // gonna check collision with first three tubes only

  for (let i = 0; i < n; i++) {
    const tube = tubes[i];

    if (!tube) continue;

    if (tube.checkCollision (characterRect)) state.lost = true;
  }
};

const update = (state, delta) => {
  if (!state.isPlaying || state.lost) {
    // user is not isPlaying
    // quitting update function
  } else {
    state.playerSpeed += delta * state.gravityAcceleration;
    state.playerPosition.y += state.playerSpeed * delta;

    if (state.playerPosition.y < 0) {
      state.playerPosition.y = 0;
      state.playerSpeed = 0;

      // disallow jumping above the screen
    }

    checkCollision (state, delta);
  }

  player.x = state.playerPosition.x;
  player.y = state.playerPosition.y;
};

export default {update, init};
