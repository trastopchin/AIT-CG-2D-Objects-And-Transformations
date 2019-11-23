/*
Tal Rastopchin
September 21, 2019

Adapted from Laszlo Szecsi's first homework starter code and
powerpoint slide instructions
*/

"use strict";
/* exported StarGeometry */
class StarGeometry extends Geometry {

  constructor(gl) {
    super(gl);
  }

  initializeVBAttributes () {
        this.positionArray = [0.0, 0.0, 0.0];
    this.colorArray = [0.0, 0.0, 0.0];
    this.indexArray = [];

    const numVertices = 10;
    const radius = 0.5;

    for (let i = 0; i < numVertices; i++) {
      // compute triangle vertex positions
      const theta = i / numVertices * 2 * Math.PI;
      
      let currentRadius = radius;
      if (i % 2 === 0) {
        currentRadius = radius / 2;
      }
      
      const x = currentRadius * Math.cos(theta);
      const y = currentRadius * Math.sin(theta);

      this.positionArray.push(x, y, 0.5);

      // compute triangle indices
      if (i < numVertices - 1) {
        this.indexArray.push(0, i+1, i+2);
      }
      else {
        this.indexArray.push(0, i+1, 1);
      }

      this.colorArray.push(1.0, 1.0, 1.0);
    }
  }
}
