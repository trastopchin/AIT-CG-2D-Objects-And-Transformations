/*
Tal Rastopchin
October 14, 2019

Adapted from Laszlo Szecsi's first homework starter code and
powerpoint slide instructions
*/

"use strict";
/* exported TexturedQuadGeometry */
class TexturedQuadGeometry extends TexturedGeometry {

  constructor (gl) {
    super(gl);
  }

  initializeVBAttributes () {
    // initialize vertex buffer attribute arrays
    this.positionArray = [
      -1, -1, 0.5,
      -1,  1, 0.5,
      1,  -1, 0.5,
      1,  1, 0.5
    ];

    this.normalArray = [
      0, 0, 1,
      0, 0, 1,
      0, 0, 1,
      0, 0, 1
    ];
    
    this.texCoordArray = [
      0, 1,
      0, 0,
      1, 1,
      1, 0
    ];

    this.indexArray = [
      0, 1, 2,
      1, 2, 3
    ];
  }

  // bounding circle of radius 1
  isInside (modelSpacePoint) {
    return modelSpacePoint.length() < 1;
  }
}