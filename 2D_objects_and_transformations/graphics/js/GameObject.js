/*
Tal Rastopchin
October 14, 2019

Adapted from Laszlo Szecsi's first homework starter code and
powerpoint slide instructions
*/

"use strict"; 
/* exported GameObject */
class GameObject extends UniformProvider {
  constructor(mesh) {
    // parameterizes super class with struct name that we are responsible for
    super("gameObject");
    // super ("gameObject", "gameObjectFS"); another possibility

    // store a reference to mesh
    this.mesh = mesh;

    // model matrix
    this.position = new Vec3(0, 0, 0); 
    this.orientation = 0; 
    this.scale = new Vec3(1, 1, 1);

    // copy of the model matrix for user input transformation operations
    this.tempPosition = this.position.clone();
    this.tempOrientation = this.orientation;
    this.tempScale = this.scale.clone();

    // create model matrix property and set to idenity matrix
    this.modelMatrix = new Mat4();
    this.modelMatrix.set();

    // keep track of its inverse too!
    this.modelMatrixInverse = this.modelMatrix.clone();

    // keep track of whether or not this GameObject is selected
    this.selected = false;
  
    this.addComponentsAndGatherUniforms(mesh);
  }

  /* updates the position, orientation, and scale of our GameObject.
  keeps track of the inverse of the model matrix too. */
  update () {
  	this.modelMatrix.set();
    this.modelMatrix.scale(this.scale);
    this.modelMatrix.rotate(this.orientation);
    this.modelMatrix.translate(this.position);

    this.modelMatrixInverse = this.modelMatrix.clone().invert();
  }

  // moves the GameObject according to input
  move () {
    //console.warn("WARNING" + this + " : not implemented move method");
  }

  // selection and deselection methods
  select () {
    this.selected = true;
  }
  deselect () {
    this.selected = false;
  }

  /* Given a point in world space, convert that point into this
  GameObject's model space by applying the invserse of the model
  matrix.

  TODO: get around vector conversion by using xy01mul method
  */
  worldToModelSpace(worldSpacePoint) {
    const worldSpacePointCopy = new Vec4(worldSpacePoint.x, worldSpacePoint.y, worldSpacePoint.z, 1);
    worldSpacePointCopy.mul(this.modelMatrixInverse);
    return new Vec3(worldSpacePointCopy.x, worldSpacePointCopy.y, worldSpacePoint.z);
  }

  /* Determines whether or not a given world space point is inside the
  geometry belonging to the mesh belonging to this GameObject.
  */
  isInside (worldSpacePoint) {
    return this.mesh.isInside(this.worldToModelSpace(worldSpacePoint));
  }

  /* Translates the GameObject by the specified offset, with respect
  to the temporary position, orientation, and scale.
  */
  translate (offset) {
    this.position = this.tempPosition.plus(offset);
  }

  /* Rotates the GameObject around the given origin by the specified
  angle theta, with respect to the temporary position, orientation, and
  scale.
  */
  rotateAbout (origin, theta) {
    let tempOrigin = this.tempPosition.minus(origin);
    tempOrigin = tempOrigin.xyz1times(new Mat4().set().rotate(theta));
    tempOrigin.add(origin);
    this.position = tempOrigin;
    this.orientation = this.tempOrientation + theta;
  }

  /* Copies the values of the position, orientation, and scale properties
  into each of the tempPosition, tempOrientation, and tempScale
  properties. We use this method so that when we want a user to translate
  or scale a selection, we can apply the current transform, compute the
  offset from the prior transform, and only apply this offset when the user
  is happy with their operation.
  */
  applyCurrentTransform () {
    this.tempPosition.set(this.position);
    this.tempOrientation = this.orientation;
    this.tempScale.set(this.scale);
  }
}
