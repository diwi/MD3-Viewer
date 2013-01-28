/**
 * project: ...
 * author: thomas diewald
 * date:   17.02.12
 */



function Q3_surface_shader(gl){
  this.gl = gl;
  var _this = this;

  _this.shader = new DwShader(gl, "", "SHADERS/md3_shader_vert.glsl", "SHADERS/md3_shader_frag.glsl");
  _this.shader.onload = function(){
    _this.saveShaderLocations();
  }
  _this.shader.load(null);
}

Q3_surface_shader.prototype.saveShaderLocations = function(){
  var gl = this.gl;
  gl.useProgram(this.shader.HANDLE_program);
  {
    this.IN_VEC3_POSITION    = gl.getAttribLocation (this.shader.HANDLE_program,  "IN_VEC3_POSITION"   );
    this.IN_VEC3_NORMAL      = gl.getAttribLocation (this.shader.HANDLE_program, "IN_VEC3_NORMAL"      );
    this.IN_VEC2_ST          = gl.getAttribLocation (this.shader.HANDLE_program,  "IN_VEC2_ST"         );

    this.UN_MAT3_NORMALS     = gl.getUniformLocation(this.shader.HANDLE_program,  "UN_MAT3_NORMALS"    );
    this.UN_MAT4_PROJECTION  = gl.getUniformLocation(this.shader.HANDLE_program,  "UN_MAT4_PROJECTION" );
    this.UN_MAT4_MODELVIEW   = gl.getUniformLocation(this.shader.HANDLE_program,  "UN_MAT4_MODELVIEW"  );
    this.UN_MAT4_MODELWORLD  = gl.getUniformLocation(this.shader.HANDLE_program,  "UN_MAT4_MODELWORLD" );

    this.UN_SAMP_TEXTURE     = gl.getUniformLocation(this.shader.HANDLE_program,  "UN_SAMP_TEXTURE"    );
    this.UN_VEC4_DEFAULT_COL = gl.getUniformLocation(this.shader.HANDLE_program,  "UN_VEC4_DEFAULT_COL");
    this.UN_VEC4_ES_LIGHT_1  = gl.getUniformLocation(this.shader.HANDLE_program,  "UN_VEC4_ES_LIGHT_1" );
    this.UN_VEC4_ES_LIGHT_2  = gl.getUniformLocation(this.shader.HANDLE_program,  "UN_VEC4_ES_LIGHT_2" );
    this.UN_VEC4_ES_LIGHT_3  = gl.getUniformLocation(this.shader.HANDLE_program,  "UN_VEC4_ES_LIGHT_3" );
    this.UN_BOOL_MIRRORPASS  = gl.getUniformLocation(this.shader.HANDLE_program,  "UN_BOOL_MIRRORPASS" );
  }
  gl.useProgram(null);
//  console.log("attribute location: IN_VEC3_POSITION          = "+this.IN_VEC3_POSITION);
//  console.log("attribute location: IN_VEC3_NORMAL            = "+this.IN_VEC3_NORMAL);
//  console.log("attribute location: IN_VEC2_TEXCOORDS         = "+this.IN_VEC2_TEXCOORDS);
//
//  console.log("uniform   location: UN_MAT3_NORMALS           = "+this.UN_MAT3_NORMALS);
//  console.log("uniform   location: UN_MAT4_PROJECTION        = "+this.UN_MAT4_PROJECTION);
//  console.log("uniform   location: UN_MAT4_MODELVIEW         = "+this.UN_MAT4_MODELVIEW);
//  console.log("uniform   location: UN_MAT4_MODELWORLD        = "+this.UN_MAT4_MODELWORLD);
//  console.log("uniform   location: UN_SAMP_TEXTURE           = "+this.UN_SAMP_TEXTURE);
//
//  console.log("uniform   location: UN_VEC4_ES_LIGHT_1        = "+this.UN_VEC4_ES_LIGHT_1);
//  console.log("uniform   location: UN_VEC4_ES_LIGHT_2        = "+this.UN_VEC4_ES_LIGHT_2);
//  console.log("uniform   location: UN_VEC4_ES_LIGHT_3        = "+this.UN_VEC4_ES_LIGHT_3);
//  console.log("uniform   location: UN_BOOL_MIRRORPASS        = "+this.UN_BOOL_MIRRORPASS);
}
Q3_surface_shader.prototype.delete = function(){
  this.shader.delete();
  this.shader = null;
}

Q3_surface_shader.prototype.setMat4_Projection = function(MAT4){
  this.gl.uniformMatrix4fv( this.UN_MAT4_PROJECTION, false, MAT4);
}

Q3_surface_shader.prototype.setMat4_ModelView = function(MAT4){
  this.gl.uniformMatrix4fv( this.UN_MAT4_MODELVIEW, false, MAT4);
}
Q3_surface_shader.prototype.setMat4_ModelWorld = function(MAT4){
//  console.log(DwMat4.toStr(MAT4, 2));
  this.gl.uniformMatrix4fv( this.UN_MAT4_MODELWORLD, false, MAT4);
}
Q3_surface_shader.prototype.setMat3_Normals = function(MAT3){
  this.gl.uniformMatrix3fv( this.UN_MAT3_NORMALS, false, MAT3);
}

Q3_surface_shader.prototype.activeTexture = function(tex_loc){
  this.gl.uniform1i(this.UN_SAMP_TEXTURE, tex_loc);
}
Q3_surface_shader.prototype.setMirrored = function(bool){
  this.gl.uniform1i(this.UN_BOOL_MIRRORPASS, bool);
}
Q3_surface_shader.prototype.setDefaultColor = function(VEC4){
  this.gl.uniform4fv( this.UN_VEC4_DEFAULT_COL, VEC4);
}

Q3_surface_shader.prototype.setVec4_Light = function(idx, VEC4){
  switch(idx ){
    case 1: this.gl.uniform4fv( this.UN_VEC4_ES_LIGHT_1, VEC4); break;
    case 2: this.gl.uniform4fv( this.UN_VEC4_ES_LIGHT_2, VEC4); break;
    case 3: this.gl.uniform4fv( this.UN_VEC4_ES_LIGHT_3, VEC4); break;
  }
}

Q3_surface_shader.prototype.bind = function(){
  this.gl.useProgram(this.shader.HANDLE_program);
}

Q3_surface_shader.prototype.unbind = function(){
  this.gl.useProgram(null);
}
