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
    // if (normalMap !== null) {
    //     this.mDye = new IllumRenderable(spriteTexture, normalMap);
    // } else {
    //     this.mDye = new LightRenderable(spriteTexture);
    // }
    this.mDye = new SpriteRenderable(this.rStand);
    this.mDye.setColor([0, 0, 0, 1]);  // tints red
    this.mDye.getXform().setPosition(atX, atY);
    this.mDye.getXform().setSize(3, 3);
    this.mDye.setElementPixelPositions(0,128,17,120);

    this.mlStanding = new SpriteRenderable(this.lStand);
    this.mlStanding.setColor([0, 0, 0, 1]);  // tints red
    this.mlStanding.getXform().setPosition(atX, atY);
    this.mlStanding.getXform().setSize(3, 3);
    this.mlStanding.setElementPixelPositions(0,128,17,120);

    this.mRRunning = new SpriteAnimateRenderable(this.rRun);
    this.mRRunning.setColor([0, 0, 0, 1]);
    this.mRRunning.getXform().setPosition(atX, atY);
    this.mRRunning.getXform().setZPos(5);
    this.mRRunning.getXform().setSize(3, 3);
    this.mRRunning.setSpriteSequence(120,0,
                                   128,100,
                                   6,
                                   0);
    this.mRRunning.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mRRunning.setAnimationSpeed(6);

    this.mLRunning = new SpriteAnimateRenderable(this.lRun);
    this.mLRunning.setColor([0, 0, 0, 1]);
    this.mLRunning.getXform().setPosition(atX, atY);
    this.mLRunning.getXform().setZPos(5);
    this.mLRunning.getXform().setSize(3, 3);
    this.mLRunning.setSpriteSequence(120,896,
                                   128,100,
                                   6,
                                   0);
    this.mLRunning.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
    this.mLRunning.setAnimationSpeed(6);

    this.mDropping = new SpriteRenderable(this.drop);
    this.mDropping.setColor([0, 0, 0, 1]);  // tints red
    this.mDropping.getXform().setPosition(atX, atY);
    this.mDropping.getXform().setSize(3, 3);
    this.mDropping.setElementPixelPositions(0,128,17,120);

    this.mRClimbing = new SpriteRenderable(this.rClimb);
    this.mRClimbing.setColor([0, 0, 0, 1]);  // tints red
    this.mRClimbing.getXform().setPosition(atX, atY);
    this.mRClimbing.getXform().setSize(2, 2);
    this.mRClimbing.setElementPixelPositions(16,48,0,64);

    this.mLClimbing = new SpriteRenderable(this.lClimb);
    this.mLClimbing.setColor([0, 0, 0, 1]);  // tints red
    this.mLClimbing.getXform().setPosition(atX, atY);
    this.mLClimbing.getXform().setSize(2, 2);
    this.mLClimbing.setElementPixelPositions(16,48,0,64);

    this.mRDashing = new SpriteRenderable(this.rDash);
    this.mRDashing.setColor([0, 0, 0, 1]);  // tints red
    this.mRDashing.getXform().setPosition(atX, atY);
    this.mRDashing.getXform().setSize(3, 3);
    this.mRDashing.setElementPixelPositions(0,128,0,128);

    this.mLDashing = new SpriteRenderable(this.lDash);
    this.mLDashing.setColor([0, 0, 0, 1]);  // tints red
    this.mLDashing.getXform().setPosition(atX, atY);
    this.mLDashing.getXform().setSize(3, 3);
    this.mLDashing.setElementPixelPositions(0,128,0,128);

    this.mRJumping = new SpriteAnimateRenderable(this.rJump);
    this.mRJumping.setColor([0, 0, 0, 1]);
    this.mRJumping.getXform().setPosition(atX, atY);
    this.mRJumping.getXform().setZPos(5);
    this.mRJumping.getXform().setSize(3, 3);
    this.mRJumping.setSpriteSequence(120,0,
                                   128,100,
                                   4,
                                   0);
    this.mRJumping.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateRight);
    this.mRJumping.setAnimationSpeed(30);

    this.mLJumping = new SpriteAnimateRenderable(this.lJump);
    this.mLJumping.setColor([0, 0, 0, 1]);
    this.mLJumping.getXform().setPosition(atX, atY);
    this.mLJumping.getXform().setZPos(5);
    this.mLJumping.getXform().setSize(3, 3);
    this.mLJumping.setSpriteSequence(120,384,
                                   128,100,
                                   4,
                                   0);
    this.mLJumping.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateLeft);
    this.mLJumping.setAnimationSpeed(30);


    GameObject.call(this, this.mDye);
    this.mJumpFlag = 0;
    this.mtimeout = 60;
    this.mdown = false;
    this.mHeroState = 0;
    this.isClimb = false;
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
    this.mRRunning.updateAnimation();
    this.mLRunning.updateAnimation();
    this.mRJumping.updateAnimation();
    this.mLJumping.updateAnimation();
    GameObject.prototype.update.call(this);
    var v = this.getPhysicsComponent().getVelocity();


    this.check(BarriarSet);
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W) && this.mJumpFlag === 1) {
        v[1] = 30;
        this.mJumpFlag = -1;
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W) && this.mJumpFlag === 0) {
        v[1] = 30;
        this.mJumpFlag = 1;
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.S)) {
        var tempv = v;
        this.mDye.getXform().setSize(3, 1.5);
        var r = new RigidRectangle(this.getXform(), 3, 1.5);
        r.setMass(0.7);  // less dense than Minions
        r.setRestitution(0.3);
        r.setColor([0, 1, 0, 0]);
        r.setDrawBounds(true);
        this.setPhysicsComponent(r);
        this.mdown = true;
        v = tempv;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        v[0] = -13;
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        this.mHeroState = 1;
        v[0] = 13;
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
      r.setColor([0, 1, 0, 0]);
      r.setDrawBounds(true);
      this.setPhysicsComponent(r);
      this.mtimeout = 60;
      this.mdown = false;
      v[0] = tempv;
    }
    if(Math.abs(v[0]) < 10 & Math.abs(v[1]) < 10){
      if(v[0]>=0){
        this.mHeroState = 0;
      } else {
        this.mHeroState = 1;
      }
    }
    if (Math.abs(v[0]) >= 10 & Math.abs(v[1]) < 10){
      if (v[0] >= 0){
        this.mHeroState = 2;
      } else {
        this.mHeroState = 3;
      }
    }
    if (v[1] <= -5){
      this.mHeroState = 4;
    }
    if(this.isClimb){
      if (v[0] >= 0){
        this.mHeroState = 5;
      } else {
        this.mHeroState = 6;
      }
    }
    if(this.mdown){
      if(v[0] >= 0){
        this.mHeroState = 7;
      } else {
        this.mHeroState = 8;
      }
    }
    if(Math.abs(v[0]) >= 10 & v[1] > 10){
      if(v[0] >= 0){
        this.mHeroState = 9;
      } else {
        this.mHeroState = 10;
      }
    }
    this.mlStanding.getXform().setPosition(this.mDye.getXform().getXPos(),this.mDye.getXform().getYPos());//1
    this.mRRunning.getXform().setPosition(this.mDye.getXform().getXPos(),this.mDye.getXform().getYPos());//2
    this.mLRunning.getXform().setPosition(this.mDye.getXform().getXPos(),this.mDye.getXform().getYPos());//3
    this.mDropping.getXform().setPosition(this.mDye.getXform().getXPos(),this.mDye.getXform().getYPos());//4
    this.mRClimbing.getXform().setPosition(this.mDye.getXform().getXPos(),this.mDye.getXform().getYPos());//5
    this.mLClimbing.getXform().setPosition(this.mDye.getXform().getXPos(),this.mDye.getXform().getYPos());//6
    this.mRDashing.getXform().setPosition(this.mDye.getXform().getXPos(),this.mDye.getXform().getYPos());//7
    this.mLDashing.getXform().setPosition(this.mDye.getXform().getXPos(),this.mDye.getXform().getYPos());//8
    this.mRJumping.getXform().setPosition(this.mDye.getXform().getXPos(),this.mDye.getXform().getYPos());//9
    this.mLJumping.getXform().setPosition(this.mDye.getXform().getXPos(),this.mDye.getXform().getYPos());//10
};

Hero.prototype.draw = function( aCamera ){
    if (this.mHeroState === 0){
      this.mDye.draw(aCamera);
    }
    if (this.mHeroState === 1){
      this.mlStanding.draw(aCamera);
    }
    if (this.mHeroState === 2){
      this.mRRunning.draw(aCamera);
    }
    if (this.mHeroState === 3){
      this.mLRunning.draw(aCamera);
    }
    if (this.mHeroState === 4){
      this.mDropping.draw(aCamera);
    }
    if (this.mHeroState === 5){
      this.mRClimbing.draw(aCamera);
    }
    if (this.mHeroState === 6){
      this.mLClimbing.draw(aCamera);
    }
    if (this.mHeroState === 7){
      this.mRDashing.draw(aCamera);
    }
    if (this.mHeroState === 8){
      this.mLDashing.draw(aCamera);
    }
    if (this.mHeroState === 9){
      this.mRJumping.draw(aCamera);
    }
    if (this.mHeroState === 10){
      this.mLJumping.draw(aCamera);
    }

};

Hero.prototype.check = function ( BarriarSet ){
  var v = this.getPhysicsComponent().getVelocity();
  var tBarriarSet = BarriarSet;
  var i;
  var xf = this.mDye.getXform();
  for (i = 0;i < tBarriarSet.size();i++){
    var Bxf = tBarriarSet.getObjectAt(i).getXform();
    if(tBarriarSet.getObjectAt(i).getFlag() === 0 )
      continue;
    if(tBarriarSet.getObjectAt(i).getFlag() === 1){
      if (xf.getYPos() > (Bxf.getYPos() - Bxf.getHeight()/2) &&
          xf.getYPos() < (Bxf.getYPos() + Bxf.getHeight()/2 + xf.getHeight()/2 )){
          if (Math.abs((xf.getXPos() - Bxf.getXPos())) <= ((xf.getWidth() + Bxf.getWidth())/2) &&
              Math.abs((xf.getXPos() - Bxf.getXPos())) > (Bxf.getWidth())/2){
              if(gEngine.Input.isKeyPressed(gEngine.Input.keys.W)){
                v[1] = 10;
                this.mJumpFlag = 0;
                this.isClimb = true;
              }
              else{
                this.isClimb = false;
              }
          }
      }
    }

    if(tBarriarSet.getObjectAt(i).getFlag() === 2 ){
    }

    if(tBarriarSet.getObjectAt(i).getFlag() === 3 ){

    }

    if(tBarriarSet.getObjectAt(i).getFlag() === 4 ){

    }
    if(tBarriarSet.getObjectAt(i).getFlag() === 5 ){
      if ( Math.abs((xf.getYPos() - Bxf.getYPos() ) ) < ((xf.getHeight() + Bxf.getHeight())/2) &&
      ( Math.abs((xf.getXPos() - Bxf.getXPos() ) ) < (xf.getWidth() + Bxf.getWidth())/2)) {
        gHp ++;
        tBarriarSet.removeFromSet(tBarriarSet.getObjectAt(i));
        continue;
      }
    }
    if(tBarriarSet.getObjectAt(i).getFlag() === 6 ){

    }
    if(tBarriarSet.getObjectAt(i).getFlag() === 7 ){
      if ( Math.abs((xf.getYPos() - Bxf.getYPos() ) ) < ((xf.getHeight() + Bxf.getHeight())/2) &&
      ( Math.abs((xf.getXPos() - Bxf.getXPos() ) ) < (xf.getWidth() + Bxf.getWidth())/2)) {
        gState = 2;
        break;
      }
    }

    if (this.mJumpFlag === -1 ){
      if (xf.getXPos() > (Bxf.getXPos() - Bxf.getWidth()/2) &&
          xf.getXPos() < (Bxf.getXPos() + Bxf.getWidth()/2)){
        if (xf.getYPos() > Bxf.getYPos()){
          if ((xf.getYPos() - Bxf.getYPos()) <= ((xf.getHeight() + Bxf.getHeight())/2)){
                this.mJumpFlag = 0;
          }
        }
      }
    }

  }
}
