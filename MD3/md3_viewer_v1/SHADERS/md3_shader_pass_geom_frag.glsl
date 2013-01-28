/**
 * project: ...
 * glsl shader file
 * author: thomas diewald
 * date:   23.02.12
 */
 
 
precision mediump float;

//uniform samplerCube SAMPCUBE_ENV_REFLECTION;
uniform sampler2D UN_SAMP_TEXTURE;

uniform mat3 UN_MAT3_NORMALS;
uniform mat4 UN_MAT4_PROJECTION;
uniform mat4 UN_MAT4_MODELVIEW;


uniform vec4 UN_VEC4_DEFAULT_COL;// = vec4 (0.35, 0.35, 0.35, 1.0);

varying vec4 VRY_VEC4_EYESPACE_POS;
varying vec3 VRY_VEC3_NORMAL;
varying vec2 VRY_VEC2_TEXCOORD;



//-----------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------
void main ( void ){
  vec4 v4_tex_col = texture2D (UN_SAMP_TEXTURE, VRY_VEC2_TEXCOORD);
  gl_FragColor = vec4(VRY_VEC3_NORMAL.xyz, -VRY_VEC4_EYESPACE_POS.z);
}

