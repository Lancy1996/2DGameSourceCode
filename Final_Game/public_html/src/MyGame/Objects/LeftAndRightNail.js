/* File: Nail.js
 *
 * Creates and initializes a ploatform object
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, TextureRenderable, RigidRectangle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function LeftAndRightNail(atX, atY,inColor,wide,type,dir/*,speed*/) {
    this.pHp = "assets/Hp.png";
    this.mNail = new SpriteRenderable(this.pHp);

    this.mNail.setColor(inColor);
    this.mNail.getXform().setPosition(atX, atY);
    this.mNail.getXform().setZPos(5);
    this.mNail.getXform().setSize(1,1);
    if(dir){
    this.rightBound = atX+wide;
    this.leftBound = atX;
  } else {
    this.rightBound = atX;
    this.leftBound = atX-wide;
  }
    this.dir = dir;
    this.mFlag = type;
    // this.mSpeed = speed;
                                // show each element for mAnimSpeed updates
    GameObject.call(this, this.mNail);

}
gEngine.Core.inheritPrototype(LeftAndRightNail, GameObject);

LeftAndRightNail.prototype.getFlag = function(){
  return this.mFlag;
}

// LeftAndRightNail.prototype.getSpeed = function(){
//   return this.mSpeed;
// };

LeftAndRightNail.prototype.update = function (){
  var xf = this.mNail.getXform();
  var speed = 0.1;
  if (this.dir){
    xf.incXPosBy(speed);
  } else {
    xf.incXPosBy(-speed);
  }
  if (xf.getXPos() >= this.rightBound ){
    this.dir = false;
  }
  if(xf.getXPos() <= this.leftBound ){
    this.dir = true;
  }
  var rigidShape = new RigidRectangle(xf,xf.getWidth() ,xf.getHeight());
  rigidShape.setMass(0);  // ensures no movements!
  rigidShape.setDrawBounds(true);
  rigidShape.setColor([1, 1, 1, 0]);
  this.setPhysicsComponent(rigidShape);
};
