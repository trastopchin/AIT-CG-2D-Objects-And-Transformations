/*
Tal Rastopchin
October 14, 2019

Adapted from Laszlo Szecsi's first homework starter code and
powerpoint slide instructions
*/

Shader.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es

  in vec4 vertexPosition;
  in vec4 vertexNormal;
  in vec2 vertexTexCoord;

  out vec2 texCoord;

  uniform struct {
    mat4 modelMatrix;
  } gameObject;

  uniform struct {
    mat4 viewProjMatrix;
  } camera;

  void main(void) {
    gl_Position = vertexPosition * gameObject.modelMatrix * camera.viewProjMatrix;

    texCoord = vertexTexCoord;
  }
`;