/*
Tal Rastopchin
Octber 14, 2019

Adapted from Laszlo Szecsi's first homework starter code and
powerpoint slide instructions
*/

"use strict";
/* exported Geometry */
class Geometry {
	constructor (gl) {
		this.gl = gl;

		// declare vertex buffer attribute array properties
		this.positionArray = null;
		this.colorArray = null;
		this.indexArray = null;

		this.initializeVBAttributes();

		this.createPositionBuffer();
		this.createColorBuffer();
		this.createIndexBuffer();

		this.createAndBindVAO();

		this.enablePositionBuffer();
		this.enableColorBuffer();

		this.unbindVAO();
	}

	// overriden in child classes to specify the specific geometry
	initializeVBAttributes () {}

	// creates and fills the position buffer from the position array
	createPositionBuffer () {
		if (this.positionArray === null) {
			console.log("positionArray uninitialized");
		}

		const gl = this.gl;

		// allocate space for a buffer
		this.positionBuffer = gl.createBuffer();

		// bind current buffer to perform operations on it
    	gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

    	// fill current buffer with vertex information
    	gl.bufferData(gl.ARRAY_BUFFER,
    		new Float32Array(this.positionArray),
    		gl.STATIC_DRAW);
	}

	// creates and fills the color buffer from the color array
	createColorBuffer () {
		if (this.colorArray === null) {
			console.log("colorArray uninitialized");
		}

		const gl = this.gl;
		this.colorBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER,
    		new Float32Array(this.colorArray),
    		gl.STATIC_DRAW);
	}

	// creates and fills the index buffer from the index array
	createIndexBuffer () {
		if (this.indexArray === null) {
			console.log("indexArray uninitialized");
		}

		const gl = this.gl;
		this.indexBuffer = gl.createBuffer();
	    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
	    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
	      new Uint16Array(this.indexArray),
	      gl.STATIC_DRAW);
	}

	// creates and binds the vertex array object
	createAndBindVAO () { 
		const gl = this.gl;
    	this.inputLayout = gl.createVertexArray();
    	gl.bindVertexArray(this.inputLayout);
	}

	// enables the position buffer in the VAO
	enablePositionBuffer () {
		const gl = this.gl;
		gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

		// enable the vertex position buffer as the 0th attribute
	    gl.enableVertexAttribArray(0);

	    // explain to OpenGL how to parse the vertex position buffer
	    gl.vertexAttribPointer(0,
	      3, gl.FLOAT, // three pieces of float
	      false, // do not normalize (make unit length)
	      0, // tightly packed
	      0 // data starts at array start
    	);
	}

	// enables the color buffer in the VAO
	enableColorBuffer () {
		const gl = this.gl;
		gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
	    gl.enableVertexAttribArray(1);
	    gl.vertexAttribPointer(1,
	      3, gl.FLOAT,
	      false,
	      0,
	      0
	    );
	}

	// unbinds the VAO
	unbindVAO () {
		const gl = this.gl;
		gl.bindVertexArray(null);
	}

	// draws the geometry
	draw() {
		const gl = this.gl;

		// select the current vertex buffer input specification
		gl.bindVertexArray(this.inputLayout);

		// select the index buffer as the current gl.ELEMENT_ARRAY_BUFFer
    	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);  

    	/* draws our geometry
    	gl.TRIANGLES -> interpret elements as triangles
    	this.newIndices.length -> how many indices comprise our triangles */
    	gl.drawElements(gl.TRIANGLES, this.indexArray.length, gl.UNSIGNED_SHORT, 0);
	}

	/* Takes a model space point and determines whether or not that
	point is inside or outside of the geometry.
	*/
	isInside(modelSpacePoint) {
		// jshint unused:vars
		return false;
	}
}