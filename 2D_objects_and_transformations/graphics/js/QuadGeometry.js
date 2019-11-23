/*
Tal Rastopchin
September 21, 2019

Adapted from Laszlo Szecsi's first homework starter code and
powerpoint slide instructions
*/

"use strict";
/* exported QuadGeometry */
class QuadGeometry extends Geometry {

  constructor (gl) {
    super(gl);
  }

  initializeVBAttributes () {
    // initialize vertex buffer attribute arrays
    this.positionArray = [
        -0.5, -0.5, 0.5,
        -0.5,  0.5, 0.5,
         0.5,  0.5, 0.5,
         0.5,  -0.5, 0.5
    ];
    
    this.colorArray = [
      0.0, 1.0, 1.0,
      1.0, 0.0, 1.0,
      1.0, 1.0, 0.0,
      0.0, 0.0, 0.0
    ];

    this.indexArray = [
      0, 1, 2,
      2, 3, 0
    ];
  }
}