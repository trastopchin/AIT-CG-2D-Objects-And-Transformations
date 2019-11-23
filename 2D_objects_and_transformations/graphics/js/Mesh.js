/*
Tal Rastopchin
October 3, 2019

Directly taken from Laszlo Szecsi's first homework starter code
*/

"use strict"; 
/* exported Mesh */
class Mesh extends UniformProvider {
	constructor(material, geometry) {
		super("mesh");

    // store references to the material and geometry
    this.material = material;
    this.geometry = geometry;

		this.addComponentsAndGatherUniforms(material, geometry);
	}

  /* Takes a model space point and determines whether or not that
  point is inside or outside of the geometry corresponding to this
  mesh.
  */
  isInside(modelSpacePoint) {
  	return this.geometry.isInside(modelSpacePoint);
  }
}