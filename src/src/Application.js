const appDimensions = {
  width: document.getElementById ('container').clientWidth,
  height: document.getElementById ('container').clientHeight,
};

appDimensions.ofWidth = scale => appDimensions.width * scale;
appDimensions.ofHeight = scale => appDimensions.height * scale;

const app = new PIXI.Application ({
  ...appDimensions,
  backgroundColor: 0x1099bb,
  view: document.querySelector ('#scene'),
  resolution: window.devicePixelRatio || 1,
});

app.stage = new PIXI.display.Stage ();
app.stage.sortableChildren = true;

window.app = app;

window.appDimensions = appDimensions;

export default app;
