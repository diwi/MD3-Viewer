/**
 * project: ...
 * glsl shader file
 * author: thomas diewald
 * date:   23.02.12
 */
 
 
precision mediump float;

attribute vec3 IN_VEC3_POSITION; // object space
attribute vec3 IN_VEC3_NORMAL;   // object space
attribute vec2 IN_VEC2_ST;       // object space

uniform mat3 UN_MAT3_NORMALS;    // transform normals to viewspace
uniform mat4 UN_MAT4_PROJECTION; // transform from viewspace to screenspace
uniform mat4 UN_MAT4_MODELVIEW;  // transform from wordlspace to viewspace
uniform mat4 UN_MAT4_MODELWORLD; // transform from objectspace to wordlspace

varying vec4 VRY_VEC4_EYESPACE_POS;
varying vec4 VRY_VEC4_WORLDSPACE_POS;
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
  VRY_VEC4_WORLDSPACE_POS = v4_pos_world;
  gl_Position           = v4_pos_screen;
}
