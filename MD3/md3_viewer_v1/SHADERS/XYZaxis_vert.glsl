/**
 * project: ...
 * glsl shader file
 * author: thomas diewald
 * date:   23.02.12
 */
 
 
precision mediump float;

attribute vec3 IN_VEC3_POSITION;
attribute vec3 IN_VEC3_COLOR;

uniform mat4 UN_MAT4_PROJECTION;
uniform mat4 UN_MAT4_MODELVIEW;

varying vec3 VRY_VEC3_COLOR;


void main(void)
{
  VRY_VEC3_COLOR = IN_VEC3_COLOR;
  gl_Position    = UN_MAT4_PROJECTION * UN_MAT4_MODELVIEW * vec4(IN_VEC3_POSITION, 1.0);
}

