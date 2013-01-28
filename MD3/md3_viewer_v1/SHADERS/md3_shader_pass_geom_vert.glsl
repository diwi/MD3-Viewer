/**
 * project: ...
 * glsl shader file
 * author: thomas diewald
 * date:   23.02.12
 */
 
 
precision mediump float;

attribute vec3 IN_VEC3_POSITION;
attribute vec3 IN_VEC3_NORMAL;
attribute vec2 IN_VEC2_ST;

uniform mat3 UN_MAT3_NORMALS;
uniform mat4 UN_MAT4_PROJECTION;
uniform mat4 UN_MAT4_MODELVIEW;
uniform mat4 UN_MAT4_MODELWORLD;

varying vec4 VRY_VEC4_EYESPACE_POS;
varying vec3 VRY_VEC3_NORMAL;
varying vec2 VRY_VEC2_TEXCOORD;

void main ( void )
{
  vec4 v4_pos_object = vec4 ( IN_VEC3_POSITION, 1.0 );
  vec4 v4_pos_world  = UN_MAT4_MODELWORLD * v4_pos_object;
  vec4 v4_pos_view   = UN_MAT4_MODELVIEW  * v4_pos_world;
  vec4 v4_pos_screen = UN_MAT4_PROJECTION * v4_pos_view;

  VRY_VEC3_NORMAL       = UN_MAT3_NORMALS * IN_VEC3_NORMAL;
  VRY_VEC2_TEXCOORD     = IN_VEC2_ST;
  VRY_VEC4_EYESPACE_POS = v4_pos_view;
  gl_Position           = v4_pos_screen;
}
