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
    this.kBackGround = "assets/Levelone.json";
    this.mHero = null;
    this.mCamera = null;
    this.mCameraAll = null;
    this.mBarriarSet = new GameObjectSet();
    this.mMainView = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
  gEngine.TextFileLoader.loadTextFile(this.kBackGround, gEngine.TextFileLoader.eTextFileType.eTextFile);
};

MyGame.prototype.unloadScene = function () {
    gEngine.TextFileLoader.unloadTextFile(this.kBackGround);
};

MyGame.prototype.initialize = function () {
  var jsonString = gEngine.ResourceMap.retrieveAsset(this.kBackGround);
  // two way to change a json to js object
  var sceneInfo = JSON.parse(jsonString);
  this.mCamera = new Camera(
    [4,5],
    40,
    [0,0,1280,720]
  );

  this.mCameraAll = new Camera(
    [50,50],
    100,
    [1080,520,200,200]
  );

  this.mHero = new Hero(4,5);

  var i,obj;
  for (i = 0;i < 18;i++){
    if(sceneInfo.Square[i].Tag === sceneInfo.Type.UDPlatform){
      obj = new UpAndDownPlatform(sceneInfo.Square[i].Pos[0],sceneInfo.Square[i].Pos[1],sceneInfo.Square[i].Color,sceneInfo.Square[i].High);
      obj.getXform().setSize(sceneInfo.Square[i].Width,sceneInfo.Square[i].Height);
      obj.getXform().setRotationInDegree(sceneInfo.Square[i].Rotation);
      var rigidShape = new RigidRectangle(obj.getXform(), sceneInfo.Square[i].Width, sceneInfo.Square[i].Height);
      rigidShape.setMass(0);  // ensures no movements!
      rigidShape.setDrawBounds(true);
      rigidShape.setColor([1, 1, 1, 0]);
      obj.setPhysicsComponent(rigidShape);
      this.mBarriarSet.addToSet(obj);
    }
    else {
      obj = new Platform(sceneInfo.Square[i].Pos[0],sceneInfo.Square[i].Pos[1],sceneInfo.Square[i].Color);
      obj.getXform().setSize(sceneInfo.Square[i].Width,sceneInfo.Square[i].Height);
      obj.getXform().setRotationInDegree(sceneInfo.Square[i].Rotation);
      var rigidShape = new RigidRectangle(obj.getXform(), sceneInfo.Square[i].Width, sceneInfo.Square[i].Height);
      rigidShape.setMass(0);  // ensures no movements!
      rigidShape.setDrawBounds(true);
      rigidShape.setColor([1, 1, 1, 0]);
      obj.setPhysicsComponent(rigidShape);
      this.mBarriarSet.addToSet(obj);
    }
  }
};



// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9 , 0.9 , 0.9, 1]);

    this.mCamera.setupViewProjection();
    this.mHero.draw(this.mCamera);
    this.mBarriarSet.draw(this.mCamera);

    this.mCameraAll.setupViewProjection();
    this.mHero.draw(this.mCameraAll);
    this.mBarriarSet.draw(this.mCameraAll);

};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    var deltaR = 1.2;
    this.mCamera.update();
    this.mHero.update(this.mBarriarSet);
    this.mBarriarSet.update();
    this.mCamera.panWith(this.mHero.getXform(), 0.5);
    // var xform = this.mGoal.getXform();
    // xform.incRotationByDegree(deltaR);
    // var WC = this.mCamera.getWCCenter();
    // if ((this.mHero.getXform().getXPos() < (WC[0] - this.mCamera.getWCWidth()/2)) | (this.mHero.getXform().getXPos() > (WC[0] + this.mCamera.getWCWidth()/2))){
    //   this.mCamera.panTo(this.mHero.getXform().getXPos(),this.mHero.getXform().getYPos());
    // }
    // if ((this.mHero.getXform().getYPos() < (WC[1] - this.mCamera.getHeight()/2)) | (this.mHero.getXform().getYPos() > (WC[1] + this.mCamera.getWCHeight()/2))){
    //   this.mCamera.panTo(this.mHero.getXform().getXPos(),this.mHero.getXform().getYPos());
    // }
    this._physicsSimulation();
};
