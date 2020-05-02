import * as PIXI from 'pixi.js';

const texture = PIXI.Texture.from ('assets/pipe-green.png');
const group = new PIXI.display.Group (4, false);
const layer = new PIXI.display.Layer (group);
const container = new PIXI.Container ();

app.stage.addChild (container);
app.stage.addChild (layer);

const tubes = [];

const createTube = (state, x) => {
  const {tubeHeight, tubeWidth, tubeGap, groundHeight} = state;

  const {height} = appDimensions;

  if (!x) {
    x = tubes[tubes.length - 1].top.x + state.tubeDistance;
  }

  const yMin = height - groundHeight - tubeHeight;
  const yMax = tubeHeight + tubeGap;
  const y = yMin + (yMax - yMin) * Math.random ();

  const btm = new PIXI.Sprite (texture);
  const top = new PIXI.Sprite (texture);

  btm.anchor.set (0.5, 0);
  top.anchor.set (0.5, 0);

  top.angle = 180;

  top.width = tubeWidth;
  top.height = tubeHeight;
  btm.width = tubeWidth;
  btm.height = tubeHeight;

  btm.parentGroup = group;
  top.parentGroup = group;

  container.addChild (btm);
  container.addChild (top);

  const setPosition = (x, y) => {
    if (x) {
      btm.x = x;
      top.x = x;
    }
    if (y) {
      btm.y = y;
      top.y = y - tubeGap;
    }
  };

  const dispose = () => {
    container.removeChild (btm);
    container.removeChild (top);

    btm.destroy ();
    top.destroy ();

    tubes.splice (tubes.indexOf (theTube), 1);
  };

  const theTube = {
    setPosition,
    btm,
    top,
    dispose,
  };

  tubes.push (theTube);
  setPosition (x, y);
};

const init = state => {
  createTube (state, appDimensions.width * 1.3);
  for (let i = 0; i < 5; i++) {
    createTube (state);
  }
};

const update = (state, delta) => {
  if (!state.isPlaying || state.lost) {
    // user is not isPlaying
    // not gonna move tubes
    return;
  }

  let tubeGone = null;

  for (let i = 0; i < tubes.length; i++) {
    const tube = tubes[i];

    if (tube.top.x <= -state.tubeWidth / 2) tubeGone = tube;

    tube.setPosition (tube.top.x + state.groundSpeed * delta);
  }

  if (tubeGone) {
    tubeGone.dispose ();
    createTube (state);
  }
};

export default {init, update};