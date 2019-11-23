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
  	float width;
  	vec4 firstColor;
  	vec4 secondColor;
  } material;

  uniform struct {
    float t;
    float dt;
  } scene;

  void main(void) {
  	float dist = sqrt(position.x * position.x + position.y * position.y) - scene.t;
  	float scaleValue = 2.0 / material.width;

  	if (mod(scaleValue * dist, 2.0) < 1.0) {
    	fragmentColor = material.firstColor;
    }
    else {
    	fragmentColor = material.secondColor;
    }
  }
`;