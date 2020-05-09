import * as PIXI from 'pixi.js';

const texture = PIXI.Texture.from ('assets/base.png');
const group = new PIXI.display.Group (5, false);
const layer = new PIXI.display.Layer (group);
const container = new PIXI.Container ();

const backgrounds = [];
const {width, height} = window.sizes;

app.stage.addChild (container);
app.stage.addChild (layer);

const init = state => {
  const {groundHeight} = state;
  for (let i = 0; i < 3; i++) {
    const bg = new PIXI.Sprite (texture);

    bg.x = width * i;
    bg.y = height - groundHeight;
    bg.width = width;
    bg.height = groundHeight;
    bg.anchor.set (0);
    bg.parentGroup = group;

    container.addChild (bg);
    backgrounds.push (bg);
  }
};

const update = (state, delta) => {
  if (!state.isPlaying || state.lost) {
    // user is not isPlaying
    // not gonna move bg
    return;
  }

  for (let i = 0; i < backgrounds.length; i++) {
    const bg = backgrounds[i];

    bg.x += state.groundSpeed * delta;

    if (bg.x < -width) {
      bg.x += width * backgrounds.length;
    }
  }
};

export default {init, update};
