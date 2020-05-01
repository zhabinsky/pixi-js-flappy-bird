const texture = PIXI.Texture.from ('assets/bluebird-downflap.png');
const group = new PIXI.display.Group (1, false);
const layer = new PIXI.display.Layer (group);
const container = new PIXI.Container ();

app.stage.addChild (container);
app.stage.addChild (layer);

const character = new PIXI.Sprite (texture);

character.anchor.set (0.5);

const width = appDimensions.ofWidth (0.15);
const height = width * 0.8;

character.x = appDimensions.ofWidth (0.5);
character.y = appDimensions.ofHeight (0.5);

character.zIndex = 99;

character.width = width;
character.height = height;
character.parentGroup = group;

container.addChild (character);

export default group;
