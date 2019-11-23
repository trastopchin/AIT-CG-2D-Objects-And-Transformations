/*
Tal Rastopchin
October 1, 2019

Adapted from Laszlo Szecsi's first homework starter code and
powerpoint slide instructions
*/

"use strict";
/* exported Program */
class Program extends UniformProvider {
  constructor(gl, vertexShader, fragmentShader) {

    /* call UniformProvider super constructor. we are responsible
    for setting uniforms in the struct program (if there were any) */
    super("program");

    // attatches the shaders to the program
    this.gl = gl;
    this.sourceFileNames = {vs:vertexShader.sourceFileName, fs:fragmentShader.sourceFileName};
    this.glProgram = gl.createProgram();
    gl.attachShader(this.glProgram, vertexShader.glShader);
    gl.attachShader(this.glProgram, fragmentShader.glShader);

    // bind the vertex buffer attributes to the specified location
    gl.bindAttribLocation(this.glProgram, 0, 'vertexPosition');
    gl.bindAttribLocation(this.glProgram, 1, 'vertexColor');

    // compiles and links the shader program
    gl.linkProgram(this.glProgram);
    if (!gl.getProgramParameter(this.glProgram, gl.LINK_STATUS)) {
      throw new Error(`Could not link shaders [vertex shader: ${vertexShader.sourceFileName}]:[fragment shader: ${fragmentShader.sourceFileName}
       ${gl.getProgramInfoLog(this.glProgram)}`);
    }

    /* call UniformProvider method. Handles the shader program
    uniform reflection. Add a ProgramReflection instance managing
    our uniforms as the only child */
    this.addComponentsAndGatherUniforms(new ProgramReflection(gl, this.glProgram));
  }
}