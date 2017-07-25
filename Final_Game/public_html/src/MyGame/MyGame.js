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
    this.kBackGround = "assets/Level1.png";
    this.mHero = null;
    this.mCamera = null;
    this.mCameraAll = null;
    this.mBackGround = null;
    this.mPlatform = null;
    this.mBarriar = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
  gEngine.Textures.loadTexture(this.kBackGround);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kBackGround);
};

MyGame.prototype.initialize = function () {
  this.mCamera = new Camera(
    [0,0],
    100,
    [0,0,1280,720]
  );

  this.mCameraAll = new Camera(
    [0,0],
    100,
    [960,520,200,200]
  );

  this.mHero = new Hero(0,0);
  this.mPlatform = new Platform(0,-20);
  this.mBarriar = new Platform(20,-10);

  this.mBackGround = new TextureRenderable(this.kBackGround);
  this.mBackGround.setColor([1 , 1 , 1 , 0]);
  this.mBackGround.getXform().setPosition(0,0);
  this.mBackGround.getXform().setSize(50,50);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9 , 0.9 , 0.9, 1]);
    this.mCamera.setupViewProjection();

    this.mBackGround.draw(this.mCamera);
    this.mBarriar.draw(this.mCamera);
    this.mHero.draw(this.mCamera);
    this.mPlatform.draw(this.mCamera);

    this.mCameraAll.setupViewProjection();
    this.mBackGround.draw(this.mCameraAll);
    this.mBarriar.draw(this.mCameraAll);
    this.mHero.draw(this.mCameraAll);
    this.mPlatform.draw(this.mCameraAll);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    this.mHero.update();
    this.mCamera.setWCCenter(this.mHero.getXform().getXPos(),this.mHero.getXform().getYPos());
    this._physicsSimulation();
};
