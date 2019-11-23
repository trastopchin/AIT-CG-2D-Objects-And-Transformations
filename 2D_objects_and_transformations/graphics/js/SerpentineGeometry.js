/*
Tal Rastopchin
September 21, 2019

Adapted from Laszlo Szecsi's first homework starter code and
powerpoint slide instructions
*/

"use strict";
/* exported SerpentineGeometry */
class SerpentineGeometry extends Geometry {

  constructor (gl) {
    super(gl);
  }

  initializeVBAttributes () {

    const red = [1, 0, 0];
    const green = [0, 1, 0];
    const blue = [0, 0, 1];

    const colors = [red, blue, green];

    this.positionArray = [];
    this.colorArray = [];
    this.indexArray = [];

    this.numQuads = 64;
    this.length = 1;
    this.quadHeight = 0.1;
    this.period = 2 * 2 * Math.PI;
    this.amplitude = 0.1;

    const quadWidth = this.length / this.numQuads;
    const uMin = 0 - this.length / 2;

    for (let i = 0; i < this.numQuads; i++) {
   		const x = i * quadWidth + uMin;

   		// base case -> create one quad
   		if (i === 0) {
   			this.positionArray.push(x, - this.quadHeight / 2 + this.amplitude * Math.sin(x * this.period), 0.5);
   			this.positionArray.push(x, + this.quadHeight / 2 + this.amplitude * Math.sin(x * this.period), 0.5);
   			this.positionArray.push(x + quadWidth, - this.quadHeight / 2 + this.amplitude * Math.sin((x + quadWidth) * this.period), 0.5);
   			this.positionArray.push(x + quadWidth, + this.quadHeight / 2 + this.amplitude * Math.sin((x + quadWidth) * this.period), 0.5);

   			this.colorArray.push(...red, ...red, ...green, ...green);

   			this.indexArray.push(0, 1, 2);
   			this.indexArray.push(2, 1, 3);
   		}
   		// general case -> add two vertices and create a new quad
   		else {
   			this.positionArray.push(x + quadWidth, - this.quadHeight / 2 + this.amplitude * Math.sin((x + quadWidth) * this.period), 0.5);
   			this.positionArray.push(x + quadWidth, + this.quadHeight / 2 + this.amplitude * Math.sin((x + quadWidth) * this.period), 0.5);

   			this.colorArray.push(...colors[i % colors.length]);
   			this.colorArray.push(...colors[i % colors.length]);

   			this.indexArray.push(2*i, 2*i+1, 2*i+2);
   			this.indexArray.push(2*i+2, 2*i+1, 2*i+3);
   		}
    }
  }
}