/**
 * project: ...
 * glsl shader file
 * author: thomas diewald
 * date:   23.02.12
 */
 
 

precision mediump float;

varying vec3 VRY_VEC3_COLOR;

void main(void)
{
  gl_FragColor = vec4(VRY_VEC3_COLOR, 1.0);
}


