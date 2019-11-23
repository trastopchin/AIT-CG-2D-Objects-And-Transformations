/*
Tal Rastopchin
October 14, 2019

Adapted from Laszlo Szecsi's first homework starter code and
powerpoint slide instructions
*/

"use strict";
/* exported TriangleGeometry */
class TriangleGeometry extends Geometry {
  constructor (gl) {
    super(gl);
}

initializeVBAttributes () {
  	this.positionArray = [];
  	this.colorArray = [1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0];
  	this.indexArray = [0, 1, 2];

  	// compute triangle points parametrically
  	for (let i = 0; i < 3; i++) {
  		let theta = i / 3 * 2 * Math.PI;
  		this.positionArray.push(0.5 * Math.cos(theta), 0.5 * Math.sin(theta), 0);
  	}
  }

  // bounding circle of radius 0.5
  isInside (modelSpacePoint) {
  	return modelSpacePoint.length() < 0.5;
  }
}
