import PIXI from './pixi';

const width = document.getElementById ('container').clientWidth;
const height = document.getElementById ('container').clientHeight;

const app = new PIXI.Application ({
  width,
  height,
  backgroundColor: 0x1099bb,
  view: document.querySelector ('#scene'),
  resolution: window.devicePixelRatio || 1,
});

app.stage = new PIXI.display.Stage ();
app.stage.sortableChildren = true;

window.app = app;
window.sizes = {
  width,
  height,
  ofWidth (scale) {
    return this.width * scale;
  },
  ofHeight (scale) {
    return this.height * scale;
  },
  constant (value) {
    return this.height / 700 * value;
  },
};

export default app;
