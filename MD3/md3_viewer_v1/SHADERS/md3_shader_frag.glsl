/**
 * project: ...
 * glsl shader file
 * author: thomas diewald
 * date:   23.02.12
 */
 
 
precision mediump float;

//uniform samplerCube SAMPCUBE_ENV_REFLECTION;
uniform sampler2D UN_SAMP_TEXTURE;

//uniform mat3 UN_MAT3_NORMALS;
//uniform mat4 UN_MAT4_PROJECTION;
//uniform mat4 UN_MAT4_MODELVIEW;
//uniform mat4 UN_MAT4_MODELWORLD;

uniform vec4 UN_VEC4_ES_LIGHT_1;
uniform vec4 UN_VEC4_ES_LIGHT_2;
uniform vec4 UN_VEC4_ES_LIGHT_3;
uniform vec4 UN_VEC4_DEFAULT_COL;// = vec4 (0.35, 0.35, 0.35, 1.0);
uniform bool UN_BOOL_MIRRORPASS;


varying vec4 VRY_VEC4_EYESPACE_POS;
varying vec4 VRY_VEC4_WORLDSPACE_POS;
varying vec3 VRY_VEC3_NORMAL;
varying vec2 VRY_VEC2_TEXCOORD;

vec4 v4_pointlight1_intensity = vec4 (1.0, 1.0, 1.0, 1.0);
vec4 v4_pointlight2_intensity = vec4 (1.0, 1.0, 1.0, 1.0);
vec4 v4_pointlight3_intensity = vec4 (1.0, 1.0, 1.0, 1.0);

vec4  v4_ambient_intensity = vec4 (0.15, 0.15, 0.15, 1.0);
//vec4  v4_ambient_intensity = vec4 (0.0, 0.0, 0.0, 1.0);
//vec4  v4_specular_color = vec4 (1.0, 1.0, 1.0, 1.0);
vec4  v4_specular_color = vec4 (.6, .6, .5, 1.0);
float f_specular_factor = 150.0;


bool b_use_squaredist =  true ;
float lightAttenuation = 1.0/1000000.0;

// point light results, diffuse, specular
vec4 p1_diff, p1_spec;
vec4 p2_diff, p2_spec;
vec4 p3_diff, p3_spec;


vec4 ApplyLightIntensity( in vec3 v3_pointlight_pos, in vec4 v4_pointlight_intensity){
  vec3 v3_vertex_to_light  =   VRY_VEC4_EYESPACE_POS.xyz -  v3_pointlight_pos  ;
  float light_distance_sqr = dot (v3_vertex_to_light, v3_vertex_to_light);

  float distFactor = b_use_squaredist ? light_distance_sqr : sqrt(light_distance_sqr);
  distFactor *= lightAttenuation;
  v4_pointlight_intensity.xyz  /=  1.0 + distFactor;

  return v4_pointlight_intensity ;
}

void vertexColFromPointlight( in vec3 v3_view_dir,  in vec3 normal, in vec3 v3_pointlight_pos, in vec4 v4_pointlight_intensity, out vec4 diff, out vec4 spec) {
  // DIFFUSE
  // direction: vertex-to-light
  vec3 v3_dir_to_light =  normalize ( v3_pointlight_pos - VRY_VEC4_EYESPACE_POS.xyz);
  // cos-angle: vertex-normal to vertex-to-light
  float f_light_incidence_cos_angle = clamp ( dot (normal, v3_dir_to_light), 0.0, 1.0);

  vec4 initensity = ApplyLightIntensity(v3_pointlight_pos, v4_pointlight_intensity);
  diff = f_light_incidence_cos_angle * initensity; // diffuse_term

  // SPECULAR
  // reflected direction:  vertex-normal to vertex-to-light
  vec3  v3_reflect_dir    = reflect (v3_dir_to_light, normal);
  // // cos-angle: PHONG term ... vertex-to-eye to reflected direction
  float f_phong_term      = clamp ( dot (v3_view_dir, v3_reflect_dir), 0.0, 1.0);
  f_phong_term            = f_light_incidence_cos_angle != 0.0 ? pow ( f_phong_term, f_specular_factor) : 0.0;
  
  spec = v4_specular_color * f_phong_term * initensity; // specular_term
}


void main ( void ){
  // since WegbGL offers no glClipPlane, i have to fake the clipping
  float z_val = VRY_VEC4_WORLDSPACE_POS.z;
  if(UN_BOOL_MIRRORPASS ){
    if( z_val > 0.0 ){
      discard ;
    }
  }else {
    if( z_val < 0.0 ){
      discard ;
    }
  }

  vec4 v4_tex_col = texture2D (UN_SAMP_TEXTURE, VRY_VEC2_TEXCOORD);

  // direction: vertex-to-eye
  vec3 v3_view_direction = normalize (VRY_VEC4_EYESPACE_POS.xyz);
  // vertex normal
  vec3 v3_normal =  normalize (VRY_VEC3_NORMAL);

  vertexColFromPointlight( v3_view_direction, v3_normal, UN_VEC4_ES_LIGHT_1.xyz, v4_pointlight1_intensity,  p1_diff, p1_spec );
  vertexColFromPointlight( v3_view_direction, v3_normal, UN_VEC4_ES_LIGHT_2.xyz, v4_pointlight2_intensity,  p2_diff, p2_spec );
  vertexColFromPointlight( v3_view_direction, v3_normal, UN_VEC4_ES_LIGHT_3.xyz, v4_pointlight3_intensity,  p3_diff, p3_spec );

  vec4 AMBIENT_TEX = v4_tex_col * v4_ambient_intensity;
  vec4 v4_out_col =
      + p1_spec + p1_diff * v4_tex_col
      + p2_spec + p2_diff * v4_tex_col
      + p3_spec + p3_diff * v4_tex_col
      + AMBIENT_TEX
      ;

// in case no texture is bound, UN_VEC4_DEFAULT_COL is used as color
// therefore its necessary to set UN_VEC4_DEFAULT_COL to e.g. vec4 (0.35, 0.35, 0.35, 1.0);
// if a texture is bound, UN_VEC4_DEFAULT_COL has to be vec4 (0, 0, 0, 0);
  vec4 AMBIENT_DEFAULT = UN_VEC4_DEFAULT_COL * v4_ambient_intensity;
  v4_out_col +=
      + p1_spec+ p1_diff * UN_VEC4_DEFAULT_COL
      + p2_spec+ p2_diff * UN_VEC4_DEFAULT_COL
      + p3_spec+ p3_diff * UN_VEC4_DEFAULT_COL
      + AMBIENT_DEFAULT
      ;

  if( z_val < 0.0 ){
    v4_out_col = clamp (v4_out_col, 0.0, 1.0);
    v4_out_col.xyz*=0.75;
    v4_out_col.xyz /= (-z_val/20.0 + 1.0);
    v4_out_col.xyz -= 0.1;
  }

  gl_FragColor = v4_out_col;


  // FOG - experimenting ...
//  float density = 0.000005;
//  float LOG2 = 1.442695;
//  float z = gl_FragCoord.z/gl_FragCoord.w;
//
//  float fogfactor = exp2 (-density*density*z*z*LOG2);
//  fogfactor = clamp (fogfactor, 0.0, 1.0);
//  v4_out_col.xyz *= fogfactor;

  vec4 fog_col = vec4(0.0, 0.0, 0.0, 1.0);
  float density = 0.000002;
  const float LOG2 = 1.442695;
  float z = gl_FragCoord.z / gl_FragCoord.w;
  float fogFactor = exp2 ( -density *density *z*z*z*z *LOG2 );
  fogFactor = clamp (fogFactor, 0.0, 1.0);
//  gl_FragData[0] = mix(fog_col, v4_out_col, fogFactor );
  gl_FragColor = mix(fog_col, v4_out_col, fogFactor );

}

