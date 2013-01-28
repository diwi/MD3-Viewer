/**
 * project: ...
 * author: thomas diewald
 * date:   17.02.12
 */


function Q3_surface_VBO(gl, MD3_file, surface_idx){
  this.gl = gl;
//  this.MD3_file = MD3_file;
  this.surface_idx = surface_idx;

  this.MD3_surface = MD3_file.surfaces[surface_idx];

  this.num_of_frames   = this.MD3_surface.S32_NUM_FRAMES;
  this.num_of_indices  = this.MD3_surface.Uint16_3_INDICES.length;
  this.num_of_vertices = this.MD3_surface.S32_NUM_VERTS;

//  console.log("this.num_of_frames   = "+this.num_of_frames);
//  console.log("this.num_of_indices  = "+this.num_of_indices);
//  console.log("this.num_of_vertices = "+this.num_of_vertices);

  // save references of the used bufers
  this.buffer_Int16_indices     = this.MD3_surface.Uint16_3_INDICES;
  this.buffer_Float32_texcoords = this.MD3_surface.S32_2_ST;

  this.buffer_Float32_vertices = new Array( this.num_of_vertices );
  for(var i = 0; i <this.num_of_frames; i++ ){
    this.buffer_Float32_vertices[i] = this.MD3_surface.surface_frames[i].vertexbuffer_xyzn;
  }



  this.active_frame_IDX = 0;

  // create vbo-buffer ... INDICES
  this.HANDLE_vbo_indices       = gl.createBuffer();

  // create vbo-buffers ... VERTICES (1 array for each frame)
  this.HANDLE_vbo_vertices_xyzn = new Array( this.num_of_vertices);
  for(var i = 0; i <this.num_of_frames; i++ ){
    this.HANDLE_vbo_vertices_xyzn[i] = gl.createBuffer();
  }
  // create vbo-buffer ... TEXCOORDS
  this.HANDLE_vbo_texcoords_st  = gl.createBuffer();

  this.fillVBOs();

}



Q3_surface_VBO.prototype.fillVBOs = function(){
  var gl = this.gl;
  var handle, data, size;

  // INDICES
  handle = this.HANDLE_vbo_indices;
  data   = this.buffer_Int16_indices;
  size   = this.num_of_indices * 2; // 2... int 16
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, handle);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, size, gl.STATIC_DRAW);
  gl.bufferSubData(gl.ELEMENT_ARRAY_BUFFER,  0, data );


  // VERTICES
  for(var i = 0; i <this.num_of_frames; i++ ){
    handle = this.HANDLE_vbo_vertices_xyzn[i];
    data   = this.buffer_Float32_vertices[i];
    size   = this.num_of_vertices * 6 * 4; // 6=(vx,vy,vz)+(nx,ny,z); 4=Float32
    gl.bindBuffer(gl.ARRAY_BUFFER, handle);
    gl.bufferData(gl.ARRAY_BUFFER, size, gl.STATIC_DRAW);
    gl.bufferSubData(gl.ARRAY_BUFFER,  0, data );
//    console.log("size = "+size);
//    console.log("data.length = "+data.length);
  }

  // TEXCOORDS
  handle = this.HANDLE_vbo_texcoords_st;
  data   = this.buffer_Float32_texcoords;
  size   = this.num_of_vertices * 2 * 4; // 2=(tx,ty); 4=Float32
  gl.bindBuffer(gl.ARRAY_BUFFER, handle);
  gl.bufferData(gl.ARRAY_BUFFER, size, gl.STATIC_DRAW);
  gl.bufferSubData(gl.ARRAY_BUFFER,  0, data );
//    console.log("size = "+size);
//    console.log("data.length = "+data.length);

  gl.bindBuffer(gl.ARRAY_BUFFER, null);
}

Q3_surface_VBO.prototype.delete = function(){
  this.gl.deleteBuffer(this.HANDLE_vbo_indices);
  this.HANDLE_vbo_indices = null;

  this.HANDLE_vbo_vertices_xyzn = new Array( this.num_of_vertices);
  for(var i = 0; i <this.HANDLE_vbo_vertices_xyzn.length; i++ ){
    this.gl.deleteBuffer(this.HANDLE_vbo_vertices_xyzn[i]);
    this.HANDLE_vbo_vertices_xyzn[i] = null;
  }
  this.HANDLE_vbo_vertices_xyzn = [];
}


Q3_surface_VBO.prototype.beginDraw = function(shader, frame_idx){
//  if( frame_idx >= this.num_of_frames){
//    frame_idx = this.num_of_frames-1;
//  }

  this.frame_index_out_of_bounds = false;
  var gl = this.gl;
  this.active_frame_IDX = frame_idx;

  var handle_xyzn =  this.HANDLE_vbo_vertices_xyzn[frame_idx];
  var handle_st   =  this.HANDLE_vbo_texcoords_st;

  var shader_loc_xyz  = shader.IN_VEC3_POSITION;
  var shader_loc_n    = shader.IN_VEC3_NORMAL;
  var shader_loc_st   = shader.IN_VEC2_ST;

  // VERTICES
  gl.bindBuffer(gl.ARRAY_BUFFER, handle_xyzn);
  gl.vertexAttribPointer(shader_loc_xyz, 3, gl.FLOAT, false, 24,  0 );
  gl.vertexAttribPointer(shader_loc_n,   3, gl.FLOAT, false, 24, 12 );
  gl.enableVertexAttribArray(shader_loc_xyz);
  gl.enableVertexAttribArray(shader_loc_n);

  // TEXCOORDS
  gl.bindBuffer(gl.ARRAY_BUFFER, handle_st);
  if( shader_loc_st >= 0) gl.vertexAttribPointer(shader_loc_st, 2, gl.FLOAT, false, 8,  0 );
  if( shader_loc_st >= 0) gl.enableVertexAttribArray(shader_loc_st);

}


Q3_surface_VBO.prototype.draw = function(){
  var gl = this.gl;
  // INDICES

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.HANDLE_vbo_indices);
  gl.drawElements(gl.TRIANGLES, this.num_of_indices, gl.UNSIGNED_SHORT, 0);
  gl.flush();
}


Q3_surface_VBO.prototype.endDraw = function(shader){
  var gl = this.gl;
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  if( shader.IN_VEC3_POSITION  >= 0 )gl.disableVertexAttribArray(shader.IN_VEC3_POSITION );
  if( shader.IN_VEC3_NORMAL    >= 0 )gl.disableVertexAttribArray(shader.IN_VEC3_NORMAL  );
  if( shader.IN_VEC2_ST        >= 0 )gl.disableVertexAttribArray(shader.IN_VEC2_ST);
}


