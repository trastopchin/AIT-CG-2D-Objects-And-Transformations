/*
Tal Rastopchin
October 14, 2019

Adapted from Laszlo Szecsi's first homework starter code and
powerpoint slide instructions
*/

"use strict";
/* exported OrthoCamera */
class OrthoCamera extends UniformProvider {
	constructor(... programs) {
		super("camera");

		// camera position and orientation info
		this.position = new Vec2(0, 0);
		this.rotation = 0;

		// the bounds of the window are (-1, 1), (-1, 1)
		this.windowSize = new Vec2(2, 2);
		this.screenSize = new Vec2(0, 0);

		// create view projection matrix property and set to identity matrix
		this.viewProjMatrix = new Mat4();
		this.viewProjMatrix.set();

		// create screenToDeviceMatrix
		this.screenToWorldMatrix = new Mat4();
		this.screenToWorldMatrix.set();

		this.addComponentsAndGatherUniforms(...programs);
	}

	// computes the view projection matrix
	update () {
		this.updateViewProjMatrix();
		this.updateScreenToWorldMatrix();
	}

	/* Computes the view projection matrix. we compute the inverse
	matrix of the following transforms: Pixel coordinate space ->
	normalized device coordinate space; NDC space -> world space.
	*/
	updateViewProjMatrix () {
		this.viewProjMatrix.set();
	
		this.viewProjMatrix.scale(0.5);
		this.viewProjMatrix.scale(this.windowSize);
		this.viewProjMatrix.rotate(this.rotation);
		this.viewProjMatrix.translate(this.position);

		this.viewProjMatrix.invert();
	}

	/* Computes the screen space pixel coordinate to world space
	matrix. We do this by transforming the rectangular region
	[0, clientWidth] x [0, -clientHeight] representing the screen
	space pixel coordinates into the rectangular region [-1, 1] x
	[-1, 1] representing the normalized device coordinates. Then,
	we can apply the inverse of the view projection matrix to
	transform our normalized device space coordinate into a world
	space coordinate.
	*/
	updateScreenToWorldMatrix () {
		this.screenToWorldMatrix.set();

		// Screen space -> NDC space
		this.screenToWorldMatrix.scale(2 / this.clientWidth, -2 / this.clientHeight);
		this.screenToWorldMatrix.translate(-1, 1);

		// NDC space -> world space
		this.screenToWorldMatrix.scale(0.5);
		this.screenToWorldMatrix.scale(this.windowSize);
		this.screenToWorldMatrix.rotate(this.rotation);
		this.screenToWorldMatrix.translate(this.position);
	}

	// sets the aspect ratio
	setAspectRatio(ar) {
		this.windowSize.x = this.windowSize.y * ar;
		this.update();
	}

	// sets the screen size
	setScreenSize(clientWidth, clientHeight) {
		this.clientWidth = clientWidth;
		this.clientHeight = clientHeight;
		this.update();
	}

	// zooms in by the specified factor
	zoomIn (factor) {
		this.windowSize.mul(1 - factor);
	}

	// zooms out by the specified factor
	zoomOut (factor) {
		this.windowSize.mul(1 + factor);
	}

	/* pans vertically by the specified factor in relation to
	window size y */
	panVertical (factor) {
		this.position.y += factor * this.windowSize.y;
	}

	/* pans horizontally up by the specified factor in relation
	 to window size y */
	panHorizontal (factor) {
		this.position.x += factor * this.windowSize.y;
	}
}