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
  	vec3 position;
  	vec3 scale;
  } transform;

  uniform struct {
    float time;
    float radius;
  } waving;

  void main(void) {
    gl_Position = vertexPosition;

    gl_Position.xyz *= transform.scale;
    gl_Position.xyz += transform.position;

    vec3 waveOffset = waving.radius * vec3(sin(waving.time + float(gl_VertexID)), cos(waving.time + float(gl_VertexID)), 0);

    gl_Position.xyz += waveOffset;

    color = vertexColor;
    position = vertexPosition;
  }
`;