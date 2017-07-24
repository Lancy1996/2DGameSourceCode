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

function MyGame() {
    this.mHero = null;
    this.mCamera = null;
    this.mBackGround = null;
    this.mPlatform = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {

};

MyGame.prototype.unloadScene = function () {

};

MyGame.prototype.initialize = function () {
  this.mCamera = new Camera(
    [0,0],
    100,
    [0,0,1280,720]
  );

  this.mHero = new Hero(0,0);

  this.mPlatform = new Platform(0,-20);

  this.mBackGround = new Renderable();
  this.mBackGround.setColor([1 , 1 , 1 , 1]);
  this.mBackGround.getXform().setPosition(0,0);
  this.mBackGround.getXform().setSize(50,50);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9 , 0.9 , 0.9, 1]);
    this.mCamera.setupViewProjection();

    this.mHero.draw(this.mCamera);
    this.mPlatform.draw(this.mCamera);
    this.mBackGround.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    this.mHero.update();
    this._physicsSimulation();
};
