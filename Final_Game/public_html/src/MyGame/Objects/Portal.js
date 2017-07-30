/* File: Platform.js
 *
 * Creates and initializes a ploatform object
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, TextureRenderable, RigidRectangle */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Portal(atX, atY,inColor,type,end) {
    this.mPlatform = new Renderable();
    this.mPlatform.setColor(inColor);
    this.mPlatform.getXform().setPosition(atX, atY);
    this.mPlatform.getXform().setZPos(5);
    this.mPlatform.getXform().setSize(30, 3.75);
                                // show each element for mAnimSpeed updates
    GameObject.call(this, this.mPlatform);
    this.mFlag = type;
    this.mPortEnd = end;
}
gEngine.Core.inheritPrototype(Platform, GameObject);

Portal.prototype.getFlag = function(){
  return this.mFlag;
}

Portal.prototype.getEnd = function(){
  return this.mPortEnd;
}
