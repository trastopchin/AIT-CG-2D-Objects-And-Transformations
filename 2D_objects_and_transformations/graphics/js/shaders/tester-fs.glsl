/*
Tal Rastopchin
October 14, 2019

Adapted from Laszlo Szecsi's first homework starter code and
powerpoint slide instructions
*/

Shader.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es 
  precision highp float;

  in vec4 color; // received from VS via RS
  in vec4 position; // received from VS via RS

  out vec4 fragmentColor;

  uniform struct {
    float time;
  } params;

  void main(void) {
    params.time;
    fragmentColor = color;
  }
`;