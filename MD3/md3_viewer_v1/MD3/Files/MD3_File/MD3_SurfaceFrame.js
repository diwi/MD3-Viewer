/**
 * project: ...
 * author: thomas diewald
 * date:   17.02.12
 */



MD3_SurfaceFrame.log = false;

MD3_SurfaceFrame.MD3_XYZ_SCALE       = 64;
MD3_SurfaceFrame.MD3_XYZ_SCALE_inv   = 1/MD3_SurfaceFrame.MD3_XYZ_SCALE;
MD3_SurfaceFrame.TWO_PI              = Math.PI*2;
MD3_SurfaceFrame.TWO_PI_div_0xFF     = MD3_SurfaceFrame.TWO_PI/0xFF;
MD3_SurfaceFrame.TWO_PI_div_0xFF_inv = 1/MD3_SurfaceFrame.TWO_PI_div_0xFF_inv;

function MD3_SurfaceFrame(md3_reader, parent_surface, index){

  this.md3_reader = md3_reader;
  this.parent_surface = parent_surface;
  this.INDEX = index;

  var byter = md3_reader.byter;

  this.num_vertices =  this.parent_surface.S32_NUM_VERTS;

  this._start_pos         = byter.getPos();
  this.xyz_normals        = byter.getInt16Array(0, this.num_vertices*4);
  this._end_pos           = byter.getPos();

  // bounding box
  var max = Number.MAX_VALUE;
  var min = Number.MIN_VALUE;

  this.bb_minXYZ = [max, max, max];
  this.bb_maxXYZ = [min, min, min];
  this.bb_size   = [0, 0, 0];

  // generate final vertice-buffer, used for vbo
  this.vertexbuffer_xyzn = new Float32Array(this.num_vertices * 6); // (v1x, x1y, v1z), (n1x, n1y, n1z), (v2x, x2y, ...

  this.generateVertexBuffer();
  this.generateBoundingBox();

  if( MD3_SurfaceFrame.log )
    this.log();

}


MD3_SurfaceFrame.prototype.log = function(){
  console.log("---------------------------- MD3_SurfaceFrame["+this.INDEX+"] ----------------------------");
  console.log("    file: "+this.md3_reader.filename                          );
  console.log("    _start_pos         = "+this._start_pos                    );
  console.log("    _end_pos           = "+this._end_pos                      );
  console.log("---------------------------/ MD3_SurfaceFrame["+this.INDEX+"] ----------------------------");
}

MD3_SurfaceFrame.prototype.generateVertexBuffer = function(){
  for(var i = 0; i < this.num_vertices; i++){

    ////// get data from  this.xyz_normals;
    var idx_src = i*4;
    var x = this.xyz_normals[idx_src+0];
    var y = this.xyz_normals[idx_src+1];
    var z = this.xyz_normals[idx_src+2];
    var n = this.xyz_normals[idx_src+3];

    ////// apply new values to this.vertexbuffer_xyzn
    var idx_dst = i*6;
    // new vertex xyz
    var x_new = x*MD3_SurfaceFrame.MD3_XYZ_SCALE_inv;
    var y_new = y*MD3_SurfaceFrame.MD3_XYZ_SCALE_inv;
    var z_new = z*MD3_SurfaceFrame.MD3_XYZ_SCALE_inv;

    this.vertexbuffer_xyzn[idx_dst+0] = x_new;
    this.vertexbuffer_xyzn[idx_dst+1] = y_new;
    this.vertexbuffer_xyzn[idx_dst+2] = z_new;

    // new vertex normal
    var lat = ((n >> 8) & 0xFF) * MD3_SurfaceFrame.TWO_PI_div_0xFF;
    var lng = ((n >> 0 )& 0xFF) * MD3_SurfaceFrame.TWO_PI_div_0xFF;

    var nx_new = (Math.cos ( lat ) * Math.sin ( lng ));
    var ny_new = (Math.sin ( lat ) * Math.sin ( lng ));
    var nz_new = (Math.cos ( lng ));
    this.vertexbuffer_xyzn[idx_dst+3] = nx_new;
    this.vertexbuffer_xyzn[idx_dst+4] = ny_new;
    this.vertexbuffer_xyzn[idx_dst+5] = nz_new;
  }
}


MD3_SurfaceFrame.prototype.generateBoundingBox = function(){
  for(var i = 0; i < this.num_vertices; i++){
    var idx = i*6;
    var x = this.vertexbuffer_xyzn[idx+0];
    var y = this.vertexbuffer_xyzn[idx+1];
    var z = this.vertexbuffer_xyzn[idx+2];

    if( this.bb_minXYZ[0] > x) this.bb_minXYZ[0] = x;
    if( this.bb_minXYZ[1] > y) this.bb_minXYZ[1] = y;
    if( this.bb_minXYZ[2] > z) this.bb_minXYZ[2] = z;

    if( this.bb_maxXYZ[0] < x) this.bb_maxXYZ[0] = x;
    if( this.bb_maxXYZ[1] < y) this.bb_maxXYZ[1] = y;
    if( this.bb_maxXYZ[2] < z) this.bb_maxXYZ[2] = z;
  }

  this.bb_size[0] = this.bb_maxXYZ[0] - this.bb_minXYZ[0];
  this.bb_size[1] = this.bb_maxXYZ[1] - this.bb_minXYZ[1];
  this.bb_size[2] = this.bb_maxXYZ[2] - this.bb_minXYZ[2];
}
