/**
 * project: ...
 * glsl shader file
 * author: thomas diewald
 * date:   23.02.12
 */
 
 
precision mediump float;

uniform sampler2D UN_SAMP2D_RENDERING;
uniform sampler2D UN_SAMP2D_NORMAL_Z;

uniform float UN_FLOAT_CAM_FAR;
uniform float UN_FLOAT_CAM_NEAR;
uniform float UN_FLOAT_DOF_DISTANCE;
uniform float UN_FLOAT_DOF_STRENGTH;
uniform vec2  UN_VEC2_VIEWPORT_SIZE;

//const float CAM_FAR      = 1000.0;
//const float CAM_NEAR     = 25.0;
//const float DOF_DISTANCE = 120.0;
//const float DOF_STRENGTH = 500.0;
//const vec2 VIEWPORT_SIZE = vec2(    800.0,     600.0);
//const vec2 VIEWPORT_SIZE = vec2(    1920.0,     1200.0);
float CAM_FAR       = UN_FLOAT_CAM_FAR;
float CAM_NEAR      = UN_FLOAT_CAM_NEAR;
float DOF_DISTANCE  = UN_FLOAT_DOF_DISTANCE;
float DOF_STRENGTH  = UN_FLOAT_DOF_STRENGTH;
vec2 VIEWPORT_SIZE  = UN_VEC2_VIEWPORT_SIZE;

vec2 VIEWPORT_SIZE_INV = 1.0/VIEWPORT_SIZE;
float CAM_FAR_INV      = 1.0/CAM_FAR;

varying vec2 VRY_VEC2_ST;


void main(void)
{

  vec4 tex_render_color = texture2D (UN_SAMP2D_RENDERING, VRY_VEC2_ST);
  vec4 tex_geometry     = texture2D (UN_SAMP2D_NORMAL_Z, VRY_VEC2_ST);

  float depth = tex_geometry.a; // (positive values) CAMERA NEAR to CAMERA FAR

  float off_dis = abs(DOF_DISTANCE - depth) * CAM_FAR_INV;
  off_dis = off_dis * off_dis * DOF_STRENGTH;
  off_dis = clamp(off_dis, 0.0,  2.5);

  vec2 stepp_off = VIEWPORT_SIZE_INV * off_dis;
  vec4 color_sum = vec4(0.0);

  const int loop_max = 5;
  float loop_max_h = float((loop_max/2));
  float counter = 0.0; //float(loop_max*loop_max);

  vec2 kernel_st;
  kernel_st.y = -stepp_off.y * loop_max_h;
  for(int y = 0; y < loop_max; y++){
    kernel_st.x = -stepp_off.x * loop_max_h;
    for(int x = 0; x < loop_max; x++){
      vec2 st = VRY_VEC2_ST + kernel_st;
      kernel_st.x += stepp_off.x;
      color_sum += texture2D (UN_SAMP2D_RENDERING, st );
      counter++;
    }
    kernel_st.y += stepp_off.y;
  }
  color_sum /= counter;


//  vec2 st;
//  kernel_st.y = -stepp_off.y * loop_max_h;
//  kernel_st.x = -stepp_off.x * loop_max_h;
//
//  color_sum += texture2D (UN_SAMP2D_RENDERING, VRY_VEC2_ST + kernel_st ); kernel_st.x += stepp_off.x;
//  color_sum += texture2D (UN_SAMP2D_RENDERING, VRY_VEC2_ST + kernel_st ); kernel_st.x += stepp_off.x;
//  color_sum += texture2D (UN_SAMP2D_RENDERING, VRY_VEC2_ST + kernel_st ); kernel_st.x += stepp_off.x;
//  color_sum += texture2D (UN_SAMP2D_RENDERING, VRY_VEC2_ST + kernel_st ); kernel_st.x += stepp_off.x;
//  color_sum += texture2D (UN_SAMP2D_RENDERING, VRY_VEC2_ST + kernel_st );
//  kernel_st.y += stepp_off.y;
//  kernel_st.x = -stepp_off.x * loop_max_h;
//
//  color_sum += texture2D (UN_SAMP2D_RENDERING, VRY_VEC2_ST + kernel_st ); kernel_st.x += stepp_off.x;
//  color_sum += texture2D (UN_SAMP2D_RENDERING, VRY_VEC2_ST + kernel_st ); kernel_st.x += stepp_off.x;
//  color_sum += texture2D (UN_SAMP2D_RENDERING, VRY_VEC2_ST + kernel_st ); kernel_st.x += stepp_off.x;
//  color_sum += texture2D (UN_SAMP2D_RENDERING, VRY_VEC2_ST + kernel_st ); kernel_st.x += stepp_off.x;
//  color_sum += texture2D (UN_SAMP2D_RENDERING, VRY_VEC2_ST + kernel_st );
//  kernel_st.y += stepp_off.y;
//  kernel_st.x = -stepp_off.x * loop_max_h;
//
//  color_sum += texture2D (UN_SAMP2D_RENDERING, VRY_VEC2_ST + kernel_st ); kernel_st.x += stepp_off.x;
//  color_sum += texture2D (UN_SAMP2D_RENDERING, VRY_VEC2_ST + kernel_st ); kernel_st.x += stepp_off.x;
//  color_sum += texture2D (UN_SAMP2D_RENDERING, VRY_VEC2_ST + kernel_st ); kernel_st.x += stepp_off.x;
//  color_sum += texture2D (UN_SAMP2D_RENDERING, VRY_VEC2_ST + kernel_st ); kernel_st.x += stepp_off.x;
//  color_sum += texture2D (UN_SAMP2D_RENDERING, VRY_VEC2_ST + kernel_st );
//  kernel_st.y += stepp_off.y;
//  kernel_st.x = -stepp_off.x * loop_max_h;
//
//  color_sum += texture2D (UN_SAMP2D_RENDERING, VRY_VEC2_ST + kernel_st ); kernel_st.x += stepp_off.x;
//  color_sum += texture2D (UN_SAMP2D_RENDERING, VRY_VEC2_ST + kernel_st ); kernel_st.x += stepp_off.x;
//  color_sum += texture2D (UN_SAMP2D_RENDERING, VRY_VEC2_ST + kernel_st ); kernel_st.x += stepp_off.x;
//  color_sum += texture2D (UN_SAMP2D_RENDERING, VRY_VEC2_ST + kernel_st ); kernel_st.x += stepp_off.x;
//  color_sum += texture2D (UN_SAMP2D_RENDERING, VRY_VEC2_ST + kernel_st );
//  kernel_st.y += stepp_off.y;
//  kernel_st.x = -stepp_off.x * loop_max_h;
//
//  color_sum += texture2D (UN_SAMP2D_RENDERING, VRY_VEC2_ST + kernel_st ); kernel_st.x += stepp_off.x;
//  color_sum += texture2D (UN_SAMP2D_RENDERING, VRY_VEC2_ST + kernel_st ); kernel_st.x += stepp_off.x;
//  color_sum += texture2D (UN_SAMP2D_RENDERING, VRY_VEC2_ST + kernel_st ); kernel_st.x += stepp_off.x;
//  color_sum += texture2D (UN_SAMP2D_RENDERING, VRY_VEC2_ST + kernel_st ); kernel_st.x += stepp_off.x;
//  color_sum += texture2D (UN_SAMP2D_RENDERING, VRY_VEC2_ST + kernel_st );
//  kernel_st.y += stepp_off.y;
//  kernel_st.x = -stepp_off.x * loop_max_h;


//  color_sum /= counter;

  gl_FragColor = color_sum;


}


