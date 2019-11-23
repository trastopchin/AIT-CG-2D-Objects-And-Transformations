/*
Tal Rastopchin
September 21, 2019

Adapted from Laszlo Szecsi's first homework starter code and
powerpoint slide instructions
*/

"use strict";
/* exported HeartGeometry */
class HeartGeometry extends Geometry {
  constructor (gl) {
    super(gl);
  }

  initializeVBAttributes () {
    // initialize vertex buffer attribute arrays
    this.positionArray = [0.0, 0.0, 0.0];
    this.colorArray = [1.0, 1.0, 1.0];
    this.indexArray = [];

      // resolution
      const resolution = 128;

      for (let i = 0; i < resolution; i++) {
        // compute triangle vertex positions
        const theta = i / resolution * 2 * Math.PI;

        const x = (16 * Math.pow(Math.sin(theta), 3)) / 16 / 2;
        const y = (13 * Math.cos(theta) - 5 * Math.cos(2 * theta) - 2 * Math.cos(3 * theta) - Math.cos(4 * theta)) / 16 / 2;

        this.positionArray.push(x, y, 0.5);

        // compute triangle indices
        if (i < resolution - 1) {
          this.indexArray.push(0, i+1, i+2);
        }
        else {
          this.indexArray.push(0, i+1, 1);
        }

        // assign color
        this.colorArray.push(1.0, 0.5, 0.5);
      }
  }
}