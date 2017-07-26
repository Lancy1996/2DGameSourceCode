/* File: Hero.js
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Hero(atX, atY) {
    this.kDelta = 0.3;
    // if (normalMap !== null) {
    //     this.mDye = new IllumRenderable(spriteTexture, normalMap);
    // } else {
    //     this.mDye = new LightRenderable(spriteTexture);
    // }
    this.mDye = new Renderable();
    this.mDye.setColor([0, 1, 0, 1]);
    this.mDye.getXform().setPosition(atX, atY);
    this.mDye.getXform().setZPos(5);
    this.mDye.getXform().setSize(3, 3);
    GameObject.call(this, this.mDye);
    this.mJumpFlag = 0;
    this.mtimeout = 60;
    this.mdown = false;
    var r = new RigidRectangle(this.getXform(), 3, 3);
    r.setMass(0.7);  // less dense than Minions
    r.setRestitution(0.3);
    r.setColor([0, 1, 0, 0]);
    r.setDrawBounds(true);
    this.setPhysicsComponent(r);
}
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.update = function (BarriarSet) {
    // control by WASD
    GameObject.prototype.update.call(this);
    var xform = this.getXform();
    var v = this.getPhysicsComponent().getVelocity();
    var tBarriarSet = BarriarSet;
    var i;
    // if (this.mJumpFlag === -1 && v[1] === -0.915750927725525){ //获取停止信号
    //   this.mJumpFlag = 0;
    //
    if (this.mJumpFlag === -1 ){
      for (i = 0;i < tBarriarSet.size();i++){
        if (this.mDye.getXform().getXPos() > (BarriarSet.getObjectAt(i).getXform().getXPos() - tBarriarSet.getObjectAt(i).getXform().getWidth()/2) &&
            this.mDye.getXform().getXPos() < (tBarriarSet.getObjectAt(i).getXform().getXPos() + tBarriarSet.getObjectAt(i).getXform().getWidth()/2)){
          if (this.mDye.getXform().getYPos() > tBarriarSet.getObjectAt(i).getXform().getYPos()){
            if ((this.mDye.getXform().getYPos() - tBarriarSet.getObjectAt(i).getXform().getYPos()) <= ((this.mDye.getXform().getHeight() + tBarriarSet.getObjectAt(i).getXform().getHeight())/2)){
                  this.mJumpFlag = 0;
            }
          }
        }
      }
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W) && this.mJumpFlag === 1) {
        v[1] = 30;
        this.mJumpFlag = -1;
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W) && this.mJumpFlag === 0) {
        v[1] = 30;
        this.mJumpFlag = 1;
    }
    for (i = 0;i < tBarriarSet.size();i++){
      if (this.mDye.getXform().getYPos() > (BarriarSet.getObjectAt(i).getXform().getYPos() - tBarriarSet.getObjectAt(i).getXform().getHeight()/2) &&
          this.mDye.getXform().getYPos() < (tBarriarSet.getObjectAt(i).getXform().getYPos() + tBarriarSet.getObjectAt(i).getXform().getHeight()/2)){
          if (Math.abs((this.mDye.getXform().getXPos() - tBarriarSet.getObjectAt(i).getXform().getXPos())) <= ((this.mDye.getXform().getWidth() + tBarriarSet.getObjectAt(i).getXform().getWidth())/2)){
                this.mJumpFlag = 0;
          }
      }
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.S)) {
        var tempv = v[0];
        this.mDye.getXform().setSize(3, 1.5);
        var r = new RigidRectangle(this.getXform(), 3, 1.5);
        r.setMass(0.7);  // less dense than Minions
        r.setRestitution(0.3);
        r.setColor([0, 1, 0, 1]);
        r.setDrawBounds(true);
        this.setPhysicsComponent(r);
        this.mdown = true;
        v[0] = tempv;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        v[0] = -15;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        v[0] = 15;
    }
    if (!gEngine.Input.isKeyPressed(gEngine.Input.keys.A) && v[0] < 0) {
        v[0] += 0.2;
    }
    if (!gEngine.Input.isKeyPressed(gEngine.Input.keys.D) && v[0] > 0 ) {
        v[0] -= 0.2;
    }
    if (this.mdown){
      this.mtimeout --;
      if (this.mtimeout === 0)
        this.mdown = false;
    }
    if (this.mtimeout === 0){
      var tempv = v[0];
      this.mDye.getXform().setSize(3, 3);
      var r = new RigidRectangle(this.getXform(),3, 3);
      r.setMass(0.7);  // less dense than Minions
      r.setRestitution(0.3);
      r.setColor([0, 1, 0, 1]);
      r.setDrawBounds(true);
      this.setPhysicsComponent(r);
      this.mtimeout = 60;
      this.mdown = false;
      v[0] = tempv;
    }
};
