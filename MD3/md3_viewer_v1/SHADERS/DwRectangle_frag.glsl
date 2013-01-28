/**
 * project: ...
 * glsl shader file
 * author: thomas diewald
 * date:   23.02.12
 */
 
 
precision mediump float;

uniform sampler2D UN_SAMP_TEXTURE;

uniform mat4 UN_MAT4_PROJECTION;
uniform mat4 UN_MAT4_MODELVIEW;

varying vec3 VRY_VEC3_NORMAL;
varying vec3 VRY_VEC3_COLOR;
varying vec2 VRY_VEC2_ST;

void main(void)
{

  vec2 tc = VRY_VEC2_ST ; ///2.0 + 0.25;
  vec4 tex_col = texture2D (UN_SAMP_TEXTURE, tc);


//  gl_FragColor = vec4 (VRY_VEC3_COLOR, 1.0);
//  gl_FragColor = vec4 (tex_col.xyz, 1.0);
//  gl_FragColor = tex_col;
  gl_FragColor = tex_col;

//  vec2 fg = gl_FragCoord.xy / vec2(800.0, 600.0);
//  gl_FragColor = vec4(fg.x, fg.y, 0.0, 1.0);
//  gl_FragColor = vec4 (VRY_VEC2_ST.x, VRY_VEC2_ST.y, 0.0, 1.0);

//  if( VRY_VEC2_ST.s < 0.25 ){
//    gl_FragColor = vec4 (1.0, 0.0, 0.0, 1.0);
//  }
}


