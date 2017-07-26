/* File: Platform.js
 *
 * Creates and initializes a ploatform object
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, TextureRenderable, RigidRectangle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function UpAndDownPlatform(atX, atY,inColor) {
    this.mPlatform = new Renderable();

    this.mPlatform.setColor(inColor);
    this.mPlatform.getXform().setPosition(atX, atY);
    this.mPlatform.getXform().setZPos(5);
    this.mPlatform.getXform().setSize(30, 3.75);
    this.uperBound = atY+7;
    this.lowerBound = atY;
    this.dir = true;
                                // show each element for mAnimSpeed updates
    GameObject.call(this, this.mPlatform);

}
gEngine.Core.inheritPrototype(UpAndDownPlatform, GameObject);

UpAndDownPlatform.prototype.update = function (){
  var xf = this.mPlatform.getXform();
  var speed = 0.05;
  if (this.dir){
    xf.incYPosBy(speed);
  } else {
    xf.incYPosBy(-speed);
  }
  if (xf.getYPos() >= this.uperBound ){
    this.dir = false;
  }
  if(xf.getYPos() <= this.lowerBound ){
    this.dir = true;
  }
  var rigidShape = new RigidRectangle(xf,xf.getWidth() ,xf.getHeight());
  rigidShape.setMass(0);  // ensures no movements!
  rigidShape.setDrawBounds(true);
  rigidShape.setColor([1, 1, 1, 0]);
  this.setPhysicsComponent(rigidShape);
};
