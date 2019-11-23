/*
Tal Rastopchin
October 1, 2019

Adapted from Laszlo Szecsi's first homework starter code and
powerpoint slide instructions
*/

"use strict";
/* exported Material */
class Material extends UniformProvider {
	constructor(gl, program) { 
		/* tell superclass the struct name the uniforms in
		we provide */
	    super("material");

	    /* add program as child component let it add new
	    properties to the constructed object reflecting the
	    uniforms in struct material */
	    this.addComponentsAndGatherUniforms(program);

	    /* wrap object into a Proxy so that we do not break
	    (only warn) if a non-existent property is set */
	    return onlyWarnOnMissingPropertyAccess(this);
	  }
}