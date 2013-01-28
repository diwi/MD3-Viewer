/**
 * project: ...
 * glsl shader file
 * author: thomas diewald
 * date:   23.02.12
 */
 
 
precision mediump float;

uniform sampler2D UN_SAMP_TEXTURE;
varying vec2 VRY_VEC2_ST;

void main(void)
{
  vec4 tex_col = texture2D (UN_SAMP_TEXTURE, VRY_VEC2_ST);
  gl_FragColor = tex_col;
}


