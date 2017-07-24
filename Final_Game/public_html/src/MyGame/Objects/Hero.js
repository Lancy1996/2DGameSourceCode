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
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(atX, atY);
    this.mDye.getXform().setZPos(5);
    this.mDye.getXform().setSize(5, 5);
    GameObject.call(this, this.mDye);
    var r = new RigidRectangle(this.getXform(), 5, 5);
    r.setMass(0.7);  // less dense than Minions
    r.setRestitution(0.3);
    r.setColor([0, 1, 0, 1]);
    r.setDrawBounds(true);
    this.setPhysicsComponent(r);
}
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.update = function () {
    // control by WASD
    GameObject.prototype.update.call(this);
    var xform = this.getXform();
    var v = this.getPhysicsComponent().getVelocity();
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W)) {
        v[1] = 30;
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.S)) {
        v[1] = -30;
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.A)) {
        v[0] = -20;
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.D)) {
        v[0] = 20;
    }
};
