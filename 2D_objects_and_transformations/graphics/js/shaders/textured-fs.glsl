/*
Tal Rastopchin
October 14, 2019

Adapted from Laszlo Szecsi's first homework starter code and
powerpoint slide instructions
*/

Shader.source[document.currentScript.src.split('js/shaders/')[1]] = `#version 300 es 
  precision highp float;

  in vec2 texCoord;

  out vec4 fragmentColor;

  uniform struct {
    sampler2D colorTexture;
    vec2 scale;
    vec2 offset;
  } material;

  void main(void) {

  	vec2 newTexCoord = vec2(0, 0);
  	newTexCoord.y = texCoord.y * material.scale.y + material.offset.y;
  	newTexCoord.x = texCoord.x * material.scale.x + material.offset.x;

  	fragmentColor = texture(material.colorTexture, newTexCoord);
  }
`;