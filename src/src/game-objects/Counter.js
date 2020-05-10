import PIXI from '../pixi';

const textures = new Array (10)
  .fill ()
  .map ((_, i) => PIXI.Texture.from (`assets/${i}.png`));

const group = new PIXI.display.Group (9, false);
const layer = new PIXI.display.Layer (group);
const container = new PIXI.Container ();

const letterHeight = sizes.ofWidth (0.11);
const letterWidth = letterHeight / 1.45;
container.x = sizes.ofWidth (0.1 / 3);
container.y = container.x;

app.stage.addChild (container);
app.stage.addChild (layer);

const init = state => {};

let score = -1;
const update = (state, delta) => {
  if (state.score === score) return;
  score = state.score;

  /**
   * Destroy prev score sprites
   */
  container.children.forEach (a => a.destroy ());
  container.removeChildren ();

  const scoreString = String (score);

  for (let i = 0; i < scoreString.length; i++) {
    const char = scoreString[i];
    const sprite = new PIXI.Sprite (textures[Number (char)]);
    sprite.x = i * (letterWidth * 1.1);
    sprite.width = letterWidth;
    sprite.height = letterHeight;
    sprite.parentGroup = group;

    container.addChild (sprite);
  }
};

export default {init, update};
