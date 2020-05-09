import * as PIXI from 'pixi.js';
import attachDisplayProperty from './pixi-display';

attachDisplayProperty (PIXI);

window.PIXI = PIXI;

export default PIXI;
