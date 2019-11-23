/*
Tal Rastopchin
October 14, 2019

Adapted from Laszlo Szecsi's first homework starter code and
powerpoint slide instructions
*/

"use strict";

const Texture2D = function(gl, mediaFileUrl) {
	// add to pending list (no drawing until list is empty)
	gl.pendingResources[mediaFileUrl] = ++gl.pendingResources[mediaFileUrl] || 1; 
	this.mediaFileUrl = mediaFileUrl; 

	// create WebGL texture resource
	this.glTexture = gl.createTexture(); 

	// create HTML image element (as if on webpage)
	this.image = new Image(); 

	// call method loaded when ready
	this.image.onload = () => { this.loaded(gl); }; 
	// trigger loading image
	this.image.src = mediaFileUrl; 
};

Texture2D.prototype.loaded = function(gl){ 
	gl.bindTexture(gl.TEXTURE_2D, this.glTexture);

	// upload image to GPU to mipmap level 0
	gl.texImage2D(gl.TEXTURE_2D, 0,
		gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);

	// set bilinear filtering for magnification
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER,
		gl.LINEAR);

	// set trilinear filtering (mipmapping)
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
		gl.LINEAR_MIPMAP_LINEAR);

	// compute mipmap levels >0
	gl.generateMipmap(gl.TEXTURE_2D);

	gl.bindTexture(gl.TEXTURE_2D, null);

	// remove from pending resources
	if( --gl.pendingResources[this.mediaFileUrl] === 0 ) { 
		delete gl.pendingResources[this.mediaFileUrl]; 
	} 
};
