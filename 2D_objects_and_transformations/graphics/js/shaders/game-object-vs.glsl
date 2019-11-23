/*
Tal Rastopchin
October 14, 2019

Adapted from Laszlo Szecsi's first homework starter code and
powerpoint slide instructions
*/

Shader.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es
  in vec4 vertexPosition; // vertex position attribute from vb
  in vec4 vertexColor; // vertex color attribute from vb

  out vec4 color; // output vertex color
  out vec4 position; // output vertex position

  uniform struct {
    mat4 modelMatrix;
  } gameObject;

  uniform struct {
    mat4 viewProjMatrix;
  } camera;

  void main(void) {
    gl_Position = vertexPosition * gameObject.modelMatrix * camera.viewProjMatrix;

    color = vertexColor;
    position = vertexPosition;
  }
`;