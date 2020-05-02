const texture = PIXI.Texture.from ('assets/bluebird-downflap.png');
const group = new PIXI.display.Group (3, false);
const layer = new PIXI.display.Layer (group);
const container = new PIXI.Container ();

app.stage.addChild (container);
app.stage.addChild (layer);

const player = new PIXI.Sprite (texture);

container.addChild (player);

const width = appDimensions.ofWidth (0.15);
const height = width * 24 / 34;

const init = state => {
  player.anchor.set (0.5);
  player.parentGroup = group;
  player.zIndex = 99;
  player.width = width;
  player.height = height;

  player.x = state.playerPosition.x;
  player.y = state.playerPosition.y;
};

const checkCollision = (state, delta) => {
  const playerBottom = player.y + height / 2;
  const groundStart = window.appDimensions.height - state.groundHeight;

  if (playerBottom >= groundStart) {
    state.lost = true;
  }
};

const update = (state, delta) => {
  if (!state.isPlaying || state.lost) {
    // user is not isPlaying
    // quitting update function
  } else {
    state.playerSpeed += delta * state.gravityAcceleration;
    state.playerPosition.y += state.playerSpeed * delta;
    checkCollision (state, delta);
  }

  player.x = state.playerPosition.x;
  player.y = state.playerPosition.y;
};

export default {update, init};
