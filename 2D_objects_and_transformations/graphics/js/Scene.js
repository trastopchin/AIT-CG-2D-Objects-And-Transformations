/*
Tal Rastopchin
October 24, 2019

Adapted from Laszlo Szecsi's first homework starter code and
powerpoint slide instructions
*/

"use strict";
/* exported Scene */
class Scene extends UniformProvider {
  constructor(gl) {
    // register scene to uniform provider ???
    super("scene");

    this.gl = gl;

    this.initializeShaderPrograms();
    this.initializeMaterials();
    this.initializeGeometries();
    this.initializeMeshes();

    this.initializeCamera();
    this.initializeTimeProperties();
    this.initializeUserInput();

    this.initializeGameObjects();

    // add this list to the components linked to the uniforms ???
    this.addComponentsAndGatherUniforms(...this.shaderPrograms);
  }

  // given a program name, vs shader name, and fs name, create, compile, and add property
  initializeShaderProgram (newProgramName, vertexShaderFilename, fragmentShaderFilename) {
    const gl = this.gl;
    const vertexShader = new Shader(gl, gl.VERTEX_SHADER, vertexShaderFilename);
    const fragmentShader = new Shader(gl, gl.FRAGMENT_SHADER, fragmentShaderFilename);
    const newShaderProgram = new Program(gl, vertexShader, fragmentShader);

    // add shader program as scene propery
    this[newProgramName] = newShaderProgram;

    // add shader program to list of shader programs
    this.shaderPrograms.push(newShaderProgram);
  }

  // given a program name, vs shader name, and fs name, create, compile, and add property
  initializeTexturedShaderProgram (newProgramName, vertexShaderFilename, fragmentShaderFilename) {
    const gl = this.gl;
    const vertexShader = new Shader(gl, gl.VERTEX_SHADER, vertexShaderFilename);
    const fragmentShader = new Shader(gl, gl.FRAGMENT_SHADER, fragmentShaderFilename);
    const newShaderProgram = new TexturedProgram(gl, vertexShader, fragmentShader);

    // add shader program as scene propery
    this[newProgramName] = newShaderProgram;

    // add shader program to list of shader programs
    this.shaderPrograms.push(newShaderProgram);
  }

  // creates and compiles all of the shader programs needed for this scene
  initializeShaderPrograms () {
    this.shaderPrograms = [];
    this.initializeShaderProgram("solidProgram", "game-object-vs.glsl", "solid-fs.glsl");
    this.initializeShaderProgram("hypnoProgram", "game-object-vs.glsl", "hypno-fs.glsl");
    this.initializeTexturedShaderProgram("texturedProgram", "textured-vs.glsl", "textured-fs.glsl");
  }

  // creates all of our materials
  initializeMaterials () {
    const gl = this.gl;

    this.cyanMaterial = new Material(gl, this.solidProgram);
    this.cyanMaterial.solidColor.set(0, 1, 1);

    this.magentaMaterial = new Material(gl, this.solidProgram);
    this.magentaMaterial.solidColor.set(1, 0, 1);

    this.yellowMaterial = new Material(gl, this.solidProgram);
    this.yellowMaterial.solidColor.set(1, 1, 0);

    this.cyanYellowHypnoMaterial = new Material(gl, this.hypnoProgram);
    this.cyanYellowHypnoMaterial.width = 0.05;
    this.cyanYellowHypnoMaterial.firstColor.set(0, 1, 1);
    this.cyanYellowHypnoMaterial.secondColor.set(1, 1, 0);

    this.selectedMaterial = new Material(gl, this.solidProgram);
    this.selectedMaterial.solidColor.set(1, 1 , 1);

    this.activeMaterial = new Material(gl, this.solidProgram);
    this.activeMaterial.solidColor.set(1, 1, 0);

    // texture code
    this.texturedMaterial = new Material(gl, this.texturedProgram);
    this.myTexture = new Texture2D(gl, "media/boom.png");
    this.texturedMaterial.colorTexture.set(this.myTexture);
    this.texturedMaterial.scale.set(1/6, 1/6);
    this.texturedMaterial.offset.set(0, 0);
  }

  // create all of our geometries
  initializeGeometries () {
    this.triangleGeometry = new TriangleGeometry(this.gl);
    this.quadGeometry = new QuadGeometry(this.gl);
    this.serpentineGeometry = new SerpentineGeometry(this.gl);
    this.heartGeometry = new HeartGeometry(this.gl);

    // texture code
    this.texturedQuadGeometry = new TexturedQuadGeometry(this.gl);
  }

  // creates all of our meshes
  initializeMeshes () {
    this.triangleMesh = new Mesh(this.cyanYellowHypnoMaterial, this.triangleGeometry);
    this.quadMesh = new Mesh(this.magentaMaterial, this.quadGeometry);

    // texture code
    this.texturedQuadMesh = new Mesh(this.texturedMaterial, this.texturedQuadGeometry);
  }

  // creates all of our game objects
  initializeGameObjects () {
    this.gameObjects = [];
    
    
    const minCoord = -0.75;
    const maxCoord = 0.75;
    const deltaCoord = maxCoord - minCoord;
    const numQuads = 4;
    for (let i = 0; i < numQuads; i++) {
      for (let j = 0; j < numQuads; j++) {
        const newTriangle = new GameObject(this.triangleMesh);
        newTriangle.position.set(minCoord + deltaCoord * i / (numQuads-1), minCoord + deltaCoord * j / (numQuads-1), 0);
        newTriangle.scale.set(0.5, 0.5, 1);
        this.gameObjects.push(newTriangle);
      }
    }
    
  }

  // initializes the scene camera
  initializeCamera () {
    this.camera = new OrthoCamera(...this.shaderPrograms);
    this.camera.update();
  }

  // initializes relevant time properties
  initializeTimeProperties () {
    this.timeAtThisFrame = new Date().getTime();
    this.timeAtFirstFrame = new Date().getTime();
    this.timeAtLastFrame = this.timeAtFirstFrame;

    // time and deltaTime are local scene properties
    // we set the dynamically created t and dt in the update frame
    this.time = 0;
    this.deltatime = 0;
  }

  // updates the relevant time properties each frame
  updateTimeProperties () {
    this.timeAtThisFrame = new Date().getTime();

    // divide by 1000 to get it into seconds
    this.time = (this.timeAtThisFrame - this.timeAtFirstFrame) / 1000.0;

    this.deltaTime = (this.timeAtThisFrame - this.timeAtLastFrame) / 1000.0;
    this.timeAtLastFrame = this.timeAtThisFrame;

    // update and set our scene time uniforms
    this.t = this.time / 10;
    this.dt = this.deltaTime;
  }

  // initializes the properties used to handle user input
  initializeUserInput () {
    // we keep track of all selected objects and an active object
    this.selectedGameObjects = [];
    this.activeGameObject = null;

    // we have a set of possible input states
    this.userInput = {};
    this.userInput.states = {};
    this.userInput.states.idle = true;
    this.userInput.states.grabbing = false; // -> translate operation
    this.userInput.states.rotating = false; // -> rotate operation
  }

  // updates the input properties needed to handle user input
  updateUserInput (input) {
    this.userInput.originalMouseWorldPosition = this.getMouseWorldPosition(input);
  }

  /* Sets newState as the current input state. Sets the
  newState property of this.userInput.states to true and sets
  every other property of this.userInput.states to false */
  updateUserInputState (newState) {
    for (const state in this.userInput.states) {
      if (state !== newState) {
        this.userInput.states[state] = false;
      }
    }
    this.userInput.states[newState] = true;
  }

  /* Given the screen space pixel coordinates mouseX and mouseY
  of the mouse position return the corresponding world space
  position. */
  mouseToWorldPosition (mouseX, mouseY) {
    const screenSpacePosition = new Vec4(mouseX, mouseY, 0, 1);
    screenSpacePosition.mul(this.camera.screenToWorldMatrix);
    return new Vec3(screenSpacePosition.x, screenSpacePosition.y, 0);
  }

  // gets the mouse world position
  getMouseWorldPosition (input) {
    return this.mouseToWorldPosition(input.mouse.x, input.mouse.y);
  }

  getMouseWorldMovement (input) {
    const mouseWorldPosition = this.getMouseWorldPosition(input);
    const newMouseWorldPosition = this.mouseToWorldPosition(input.mouse.x + input.mouse.movementX, input.mouse.y + input.mouse.movementY);
    return newMouseWorldPosition.minus(mouseWorldPosition);
  }

  // determines whether or not the mouse is over a GameObject
  queryOperation (input) {
    const mouseWorldPosition = this.getMouseWorldPosition(input);
    for (const gameObject of this.gameObjects) {
      if (gameObject.isInside(mouseWorldPosition) && gameObject.selected) {
        return true;
      }
    }
    return false;
  }

  // attempts to select a gameObject
  selectionOperation (input) {
    const mouseWorldPosition = this.getMouseWorldPosition(input);

    let query = false;

    // query all GameObjects
    for (const gameObject of this.gameObjects) {
      if (gameObject.isInside(mouseWorldPosition)) {

        // query is true and set the active GameObject
        query = true;
        this.activeGameObject = gameObject;

        // if gameObject is under mouse and not already selected
        if (!gameObject.selected) {

          // select the game object and save its current transform
          gameObject.select();
          this.selectedGameObjects.push(gameObject);
          gameObject.applyCurrentTransform();
        }
      }
    }

    // if the mouse is over no GameObject, deselect selection
    if (!query) {
      this.activeGameObject = null;
      while (this.selectedGameObjects.length !== 0) {
        const gameObject = this.selectedGameObjects.pop();
        gameObject.deselect();
      }
    }
  }

  // deletes the current selection
  deletionOperation () {
    // sets the active object to null
    this.activeGameObject = null;

    /* pop each of the selected objects out of the selected-
    GameObjects array and splice them out of the gameObjects
    array. NOTE: this is inefficient, as for each selected
    object we traverse the entire array of gameObjects. Is there
    a better way to do this ? Can we use a sameObjects map instead 
    of our gameObjects array? */
    while (this.selectedGameObjects.length !== 0) {
      const selectedGameObject = this.selectedGameObjects.pop();
      for (let i = 0; i < this.gameObjects.length; i++) {
        if (this.gameObjects[i] === selectedGameObject) {
          this.gameObjects.splice(i, 1);
          break;
        }
      }   
    }
  }

  // handles selection and GameObject operations
  handleIdleStateOperations (input) {
    if (input.mouse.pressedDown) {
      this.updateUserInput(input);
      this.selectionOperation(input);
    }
    else if (input.keysPressed.G) {
      this.updateUserInput(input);
      this.updateUserInputState("grabbing");
    }
    else if (input.keysPressed.R) {
      this.updateUserInput(input);
      this.updateUserInputState("rotating");
    }
    else if (input.keysPressed.BACK_SPACE) {
      this.deletionOperation();
    }
  }

  // handles the keyboard input Camera operations
  handleCameraOperations (input) {
    if (input.keysPressed.Z) {
      this.camera.zoomIn(0.02);
    }
    if (input.keysPressed.X) {
      this.camera.zoomOut(0.02);
    }
    if (input.keysPressed.I) {
      this.camera.panVertical(0.02);
    }
    if (input.keysPressed.J) {
      this.camera.panHorizontal(-0.02);
    }
    if (input.keysPressed.K) {
      this.camera.panVertical(-0.02);
    }
    if (input.keysPressed.L) {
      this.camera.panHorizontal(0.02);
    }
  }

  // performs the idle program state CHANGED
  idleState (input) {
    this.handleIdleStateOperations(input);
    this.handleCameraOperations(input);
  }

  // applies the translation operation to our selection
  applyCurrentTransforms() {
    for (const selectedGameObject of this.selectedGameObjects) {
      selectedGameObject.applyCurrentTransform();
    }
  }

  // moves each of the selected GameObjects
  mouseGrabOperation (input) {
    const currentMouseWorldPosition = this.getMouseWorldPosition(input);
    const offset = currentMouseWorldPosition.minus(this.userInput.originalMouseWorldPosition);
    for (const gameObject of this.selectedGameObjects) {
      gameObject.translate(offset);
    }
  }

  // performs the mouse grabbing program state
  grabbingState (input) {
    this.mouseGrabOperation(input);

    if (input.mouse.pressedDown) {
      this.updateUserInputState("idle");
      this.applyCurrentTransforms();
    }
  }

  /* Rotates each of the selected GameObjects about
  the active object */
  mouseRotateOperation (input) {
    const mouseWorldPosition = this.getMouseWorldPosition(input);

    const currentRotationLocation = mouseWorldPosition.minus(this.activeGameObject.position);
    const originalRotationLocation = this.userInput.originalMouseWorldPosition.minus(this.activeGameObject.position);

    for (const gameObject of this.selectedGameObjects) {
      const theta1 = Math.atan2(currentRotationLocation.x, currentRotationLocation.y);
      const theta2 = Math.atan2(originalRotationLocation.x, originalRotationLocation.y);
      const deltaAngle = theta2 - theta1;
      gameObject.rotateAbout(this.activeGameObject.position, deltaAngle);
    }
  }

  // performs the mouse rotating program state
  rotatingState (input) {
    this.mouseRotateOperation(input);

    if (input.mouse.pressedDown) {
      this.updateUserInputState("idle");
      this.applyCurrentTransforms();
    }
  }

  // handles object selection
  handleUserInput (input) {
    if (this.userInput.states.idle) {
      this.idleState(input);
    }
    else if (this.userInput.states.grabbing) {
      this.grabbingState(input);
    }
    else if (this.userInput.states.rotating) {
      this.rotatingState(input);
    }
  }

  // moves and updates each of our GameObjects
  moveAndUpdateGameObjects (input) {
    for (let gameObject of this.gameObjects) {
      gameObject.move(this, input);
      gameObject.update();
    }
  }

  // draws each of our gameObjects
  drawGameObjects () {
    for (let gameObject of this.gameObjects) {
      if (gameObject !== this.avatar) {
        this.drawGameObject(gameObject);
      }
    }
  }

  // draw a given game object depending on whether or not it's selected
  drawGameObject (gameObject) {
    if (!gameObject.selected && this.activeGameObject !== gameObject) {
      // pass scene to draw method so that that they can take values
      // for the per-scene uniforms like scene.time
      gameObject.draw(this, this.camera);
    }
    else if (gameObject.selected && this.activeGameObject !== gameObject) {
      gameObject.using(this.selectedMaterial).draw(this, this.camera);
    }
    else if (gameObject.selected && this.activeGameObject === gameObject) {
      gameObject.using(this.activeMaterial).draw(this, this.camera);
    }
  }

  // clear the screen; set alpha blending ?
  clear() {
    const gl = this.gl;
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  }

  /* Updates the scene time properties, clears the screen,
  handles user input, moves and updates GameObjects accordingly,
  updates the camera accordingly, and then draws all of the
  GameObjects to the screen. */
  update(gl, input) {
    //jshint bitwise:false
    //jshint unused:false
    this.updateTimeProperties();
    this.clear();
    this.handleUserInput(input);


    this.texturedMaterial.offset.add(1 / 6, (this.index % 6 === 5) / 6);
    this.index++;
    

    this.moveAndUpdateGameObjects(input);
    this.camera.update();
    this.drawGameObjects();
  }

  /* Sets camera aspect ratio and screen size according to
  the canvas width and height */
  resize(gl, canvas) {
    gl.viewport(0, 0, canvas.width, canvas.height);

    this.camera.setAspectRatio(canvas.clientWidth / canvas.clientHeight);
    this.camera.setScreenSize(canvas.clientWidth, canvas.clientHeight);
  }

  /* Makes a given GameObject's move function have simple
  game physics.
  */
  avatarMove (avatar) {
    avatar.velocity = new Vec3(0, 0, 0);
    avatar.speed = 10;
    avatar.move = function (t, dt, keysPressed) {
      const force = new Vec3(Math.cos(this.orientation), Math.sin(this.orientation), 0).mul(this.speed * dt);
      if (keysPressed.UP) {
        this.velocity.add(force);
      }
      if (keysPressed.DOWN) {
        this.velocity.add(force.mul(-1));
      }
      /*
      if (keysPressed.RIGHT) {
        this.velocity.x += this.speed * dt;
      }
      if (keysPressed.LEFT) {
        this.velocity.x -= this.speed * dt;
      }
      */

      /*
      // wrap avatar
      if (this.position.y > 1) {
        this.position.y = -1;
      }
      if (this.position.y < -1) {
        this.position.y = 1;
      }
      if (this.position.x > 1) {
        this.position.x = -1;
      }
      if (this.position.x < -1) {
        this.position.x = 1;
      }*/

      this.position.addScaled(dt, this.velocity);
      this.velocity.mul(0.97);

      this.scale.set(1 + 0.1 * Math.sin(t), 1 + 0.1 * Math.sin(t), 1);

      if (keysPressed.A) {
        this.orientation += dt * Math.PI;
      }
      else if (keysPressed.D) {
        this.orientation -= dt * Math.PI;
      }
    };
  }
}
