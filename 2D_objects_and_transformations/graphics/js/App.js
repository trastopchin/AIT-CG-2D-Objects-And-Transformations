/*
Tal Rastopchin
October 8, 2019

Adapted from Laszlo Szecsi's first homework starter code and
powerpoint slide instructions
*/

"use strict";
/* exported App */
class App{
  constructor(canvas, overlay) {
    this.canvas = canvas;
    this.overlay = overlay;

    // keep track of application input
    this.input = {};
    this.input.keysPressed = {};
    this.input.mouse = {};

    // store a reference to the OpenGL context
    this.gl = canvas.getContext("webgl2");

    // if the reference is null, browser does not support WebGL2
    if (this.gl === null) {
      throw new Error("Browser does not support WebGL2");
    }

    // ???
    this.gl.pendingResources = {};

    // add our scene
    this.scene = new Scene(this.gl);

    this.resize();
  }

  // match rendering resolution and viewport to the canvas size
  resize() {
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;

    // resize OpenGL context to new window size
    this.scene.resize(this.gl, this.canvas);
  }

  // make sure our pressed keys affect the keysPressed
  // make sure our mouse clicks and movements are stored
  registerEventHandlers() {
    document.onkeydown = (event) => {
      //jshint unused:false
    	const keyName = keyNames[event.keyCode];
    	this.input.keysPressed[keyName] = true;
    };
    document.onkeyup = (event) => {
      //jshint unused:false
      const keyName = keyNames[event.keyCode];
      this.input.keysPressed[keyName] = false;
    };
    this.canvas.onmousedown = (event) => {
      //jshint unused:false
        this.input.mouse.pressedDown = true;
        this.input.mouse.pressed = true;
        this.input.mouse.pressedEvent = true;
    };
    this.canvas.onmousemove = (event) => {
      //jshint unused:false
      this.input.mouse.x = event.x;
      this.input.mouse.y = event.y;
      this.input.mouse.movementX = event.movementX;
      this.input.mouse.movementY = event.movementY;
      event.stopPropagation();
    };
    this.canvas.onmouseout = (event) => {
      //jshint unused:false
    };
    this.canvas.onmouseup = (event) => {
      //jshint unused:false
      this.input.mouse.pressedDown = false;
      this.input.mouse.pressed = false;
    };
    window.addEventListener('resize', () => this.resize() );
    window.requestAnimationFrame( () => this.update() );
  }

  /* initialize the input states that we logically keep
  track of and update */
  initializeInputStates () {
    this.input.mouse.pressed = false;
    this.input.mouse.pressedDown = false;
    this.input.mouse.pressedEvent = false;
  }

  /* each frame we update the input states to keep track of
  properties like whether or not the mouse is clicked on this frame
  or whether or not it was held down */
  updateInputStates () {
    if (this.input.mouse.pressedDown && this.input.mouse.pressed && this.input.mouse.pressedEvent) {
      this.input.mouse.pressedEvent = false;
    }
    else if (this.input.mouse.pressedDown && this.input.mouse.pressed && !this.input.mouse.pressedEvent) {
      this.input.mouse.pressedDown = false;
    }
  }

  // animation frame update
  update() {
    // DEAL WITH THE BUTTON PRESS STATES
    this.updateInputStates();

    // process OpenGL pending resources
  	const pendingResourceNames = Object.keys(this.gl.pendingResources);
    if (pendingResourceNames.length === 0) {
      this.scene.update(this.gl, this.input);
      this.overlay.innerHTML = "Ready.";
    } else {
      this.overlay.innerHTML =
       `<font color="red">Loading: ${pendingResourceNames}</font>`;
    }

    // refresh window with a call to update
    window.requestAnimationFrame( () => this.update() );
  }
}

// entry point from HTML
window.addEventListener('load', () => {
  const canvas = document.getElementById("canvas");
  const overlay = document.getElementById("overlay");
  overlay.innerHTML = `<font color="red">Hello JavaScript!</font>`;

  const app = new App(canvas, overlay);
  app.registerEventHandlers();
});