/* File: Platform.js
 *
 * Creates and initializes a ploatform object
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, TextureRenderable, RigidRectangle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function LeftAndRightPlatform(atX, atY,inColor,wide,type,dir/*,speed*/) {
    this.mPlatform = new Renderable();

    this.mPlatform.setColor(inColor);
    this.mPlatform.getXform().setPosition(atX, atY);
    this.mPlatform.getXform().setZPos(5);
    this.mPlatform.getXform().setSize(30, 3.75);
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
    GameObject.call(this, this.mPlatform);

}
gEngine.Core.inheritPrototype(LeftAndRightPlatform, GameObject);

LeftAndRightPlatform.prototype.getFlag = function(){
  return this.mFlag;
}

// LeftAndRightPlatform.prototype.getSpeed = function(){
//   return this.mSpeed;
// };

LeftAndRightPlatform.prototype.update = function (){
  var xf = this.mPlatform.getXform();
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
