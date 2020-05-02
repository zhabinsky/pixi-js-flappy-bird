const texture = PIXI.Texture.from ('assets/bluebird-downflap.png');
const group = new PIXI.display.Group (3, false);
const layer = new PIXI.display.Layer (group);
const container = new PIXI.Container ();

app.stage.addChild (container);
app.stage.addChild (layer);

const character = new PIXI.Sprite (texture);

container.addChild (character);

const width = appDimensions.ofWidth (0.15);
const height = width * 24 / 34;

const initialPosition = {
  x: appDimensions.ofWidth (0.5),
  y: appDimensions.ofHeight (0.5),
};

character.anchor.set (0.5);
character.parentGroup = group;
character.zIndex = 99;
character.width = width;
character.height = height;

character.x = initialPosition.x;
character.y = initialPosition.y;

let speed = 0;
let acceleration = 0;

export default (state, delta) => {
  if (!state.playing) {
    // user is not playing
    // quitting update function
    return;
  }

  character.y += delta;
};
