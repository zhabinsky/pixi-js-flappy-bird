import * as PIXI from 'pixi.js';

const texture = PIXI.Texture.from ('assets/background-day.png');
const group = new PIXI.display.Group (-1, false);
const layer = new PIXI.display.Layer (group);
const container = new PIXI.Container ();

const backgrounds = [];
const {width, height} = window.appDimensions;

app.stage.addChild (container);
app.stage.addChild (layer);

for (let i = 0; i < 2; i++) {
  const bg = new PIXI.Sprite (texture);
  backgrounds.push (bg);

  bg.x = width * i;
  bg.y = 0;
  bg.width = width;
  bg.height = height;

  // bg.zIndex = -1;
  bg.anchor.set (0);

  bg.parentGroup = group;

  container.addChild (bg);
}

app.ticker.add (delta => {
  for (let i = 0; i < backgrounds.length; i++) {
    const bg = backgrounds[i];

    bg.x -= 0.2 * delta;

    if (bg.x < -width) {
      bg.x += width * backgrounds.length;
    }
  }
});

export default group;
