const sizes = {
  width: document.getElementById ('container').clientWidth,
  height: document.getElementById ('container').clientHeight,
};

sizes.ofWidth = scale => sizes.width * scale;
sizes.ofHeight = scale => sizes.height * scale;
sizes.constant = value => value * sizes.height / 700;

const app = new PIXI.Application ({
  ...sizes,
  backgroundColor: 0x1099bb,
  view: document.querySelector ('#scene'),
  resolution: window.devicePixelRatio || 1,
});

app.stage = new PIXI.display.Stage ();
app.stage.sortableChildren = true;

window.app = app;
window.sizes = sizes;

export default app;
