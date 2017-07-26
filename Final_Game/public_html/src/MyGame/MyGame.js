/*
 * File: MyGame.js
 * This is the logic of our game.
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

var gHp = 3;
var gState = 0;

function MyGame() {
  this.klevelone = "assets/Levelone.json";
  this.rRun = "assets/rRun.png";//
  this.lRun = "assets/lRun.png";//

  this.rStand = "assets/rStand.png";//
  this.lStand = "assets/lStand.png";//

  this.drop = "assets/Drop.png";//

  this.rClimb = "assets/rClimb.png";//
  this.lClimb = "assets/lClimb.png";//

  this.rDash = "assets/rDash.png";
  this.lDash = "assets/lDash.png";

  this.rJump = "assets/rJump.png";//
  this.lJump = "assets/lJump.png";//

  this.animate = null;
  this.mCamera = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
  gEngine.TextFileLoader.loadTextFile(this.klevelone, gEngine.TextFileLoader.eTextFileType.eTextFile);
    gEngine.Textures.loadTexture(this.rRun);
    gEngine.Textures.loadTexture(this.lRun);
    gEngine.Textures.loadTexture(this.rStand);
    gEngine.Textures.loadTexture(this.lStand);
    gEngine.Textures.loadTexture(this.drop);
    gEngine.Textures.loadTexture(this.rClimb);
    gEngine.Textures.loadTexture(this.lClimb);
    gEngine.Textures.loadTexture(this.rDash);
    gEngine.Textures.loadTexture(this.lDash);
    gEngine.Textures.loadTexture(this.rJump);
    gEngine.Textures.loadTexture(this.lJump);
};

MyGame.prototype.unloadScene = function () {
  gState ++;
  if (gState === 1){
    var nextLevel = new Levelone();
  }
  gEngine.Core.startScene(nextLevel);
};

MyGame.prototype.initialize = function () {
    this.animate = new SpriteAnimateRenderable(this.rRun);
    this.animate.setColor([1,1,1,0]);
    this.animate.getXform().setPosition(0,0);
    this.animate.getXform().setSize(10,10);
    this.animate.setSpriteSequence(128,0 ,
                                   128,128,
                                   6,
                                   0);
    this.animate.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.animate.setAnimationSpeed(8);
    this.mCamera = new Camera([0,0],
      10,
      [200,200,200,200]
    );
    this.mCamera.setBackgroundColor([0.9 , 0.9, 0.9 , 0]);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9 , 0.9 , 0.9, 1]);
    this.mCamera.setupViewProjection();
    this.animate.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
  this.animate.updateAnimation();
  if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
  gEngine.GameLoop.stop();
  }
};

MyGame.prototype._selectCharacter = function () {

};
