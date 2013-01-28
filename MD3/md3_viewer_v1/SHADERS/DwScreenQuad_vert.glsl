/**
 * project: ...
 * glsl shader file
 * author: thomas diewald
 * date:   23.02.12
 */
 
 
precision mediump float;

attribute vec3 IN_VEC3_POSITION;
attribute vec2 IN_VEC2_ST;

uniform mat4 UN_MAT4_PROJECTION;

varying vec2 VRY_VEC2_ST;


void main(void)
{
  VRY_VEC2_ST     = IN_VEC2_ST;
  gl_Position     = UN_MAT4_PROJECTION * vec4(IN_VEC3_POSITION, 1.0);
}
