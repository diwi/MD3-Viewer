/**
 * project: ...
 * author: thomas diewald
 * date:   16.02.12
 */

MD3_Surface.MAX_QPATH         = 64;
MD3_Surface.MD3_MAX_SHADERS   = 256;
MD3_Surface.MD3_MAX_VERTS     = 4096;
MD3_Surface.MD3_MAX_TRIANGLES = 8192;

MD3_Surface.log = false;

function MD3_Surface(md3_reader, index){

  this.md3_reader = md3_reader;
  this.INDEX = index;

  var byter = md3_reader.byter;

  this._start_pos         = byter.getPos();
  this.STR_IDENT          = byter.getString(0, 4);
  this.STR_NAME           = byter.getString(0, MD3_Surface.MAX_QPATH, "\0");
  this.S32_FLAGS          = byter.getInt32Value(0);
  this.S32_NUM_FRAMES     = byter.getInt32Value(0);
  this.S32_NUM_SHADERS    = byter.getInt32Value(0);
  this.S32_NUM_VERTS      = byter.getInt32Value(0);
  this.S32_NUM_TRIANGLES  = byter.getInt32Value(0);
  this.S32_OFS_TRIANGLES  = byter.getInt32Value(0);
  this.S32_OFS_SHADERS    = byter.getInt32Value(0);
  this.S32_OFS_ST         = byter.getInt32Value(0);
  this.S32_OFS_XYZNORMAL  = byter.getInt32Value(0);
  this.S32_OFS_END        = byter.getInt32Value(0);
  this._end_pos           = byter.getPos();


  if( MD3_Surface.log )
    this.log();

  if( this.S32_NUM_FRAMES !=   this.md3_reader.header.S32_NUM_FRAMES     )  throw ("(!CORRPUT MD3!) number of frames incorrect = "+  this.S32_NUM_FRAMES);
  if( this.S32_NUM_SHADERS   < 0 | this.S32_NUM_SHADERS   > this.MD3_MAX_SHADERS   )  throw ("(!CORRPUT MD3!) S32_NUM_SHADERS = "+  this.S32_NUM_SHADERS  +" ... min/max = 0/"+MD3_Surface.MD3_MAX_SHADERS);
  if( this.S32_NUM_VERTS     < 0 | this.S32_NUM_VERTS     > this.MD3_MAX_VERTS     )  throw ("(!CORRPUT MD3!) S32_NUM_VERTS = "+    this.S32_NUM_VERTS    +" ... min/max = 0/"+MD3_Surface.MD3_MAX_VERTS);
  if( this.S32_NUM_TRIANGLES < 0 | this.S32_NUM_TRIANGLES > this.MD3_MAX_TRIANGLES )  throw ("(!CORRPUT MD3!) S32_NUM_TRIANGLES = "+this.S32_NUM_TRIANGLES+" ... min/max = 0/"+MD3_Surface.MD3_MAX_TRIANGLES);

  this.pos_shaders    = this._start_pos + this.S32_OFS_SHADERS;
  this.pos_triangles  = this._start_pos + this.S32_OFS_TRIANGLES;
  this.pos_texcoords  = this._start_pos + this.S32_OFS_ST;
  this.pos_xyznormals = this._start_pos + this.S32_OFS_XYZNORMAL;


  // get Shaders for current surface
  byter.setPos(this.pos_shaders);
  this.shaders = new Array(this.S32_NUM_SHADERS);
  for(var i = 0; i < this.S32_NUM_SHADERS; i++)
    this.shaders[i] = new MD3_Shader(this.md3_reader, this, i);


  // get Triangle Indices for current surface
  byter.setPos(this.pos_triangles);
  var num_indices = this.S32_NUM_TRIANGLES*3;

  this.S32_3_INDICES  = byter.getInt32Array(0, num_indices);

  this.Uint16_3_INDICES = new Uint16Array(num_indices);
//  console.log("this.Uint16_3_INDICES = "+this.Uint16_3_INDICES.length);
  for(var i = 0; i < num_indices; i++){
    this.Uint16_3_INDICES[i] = this.S32_3_INDICES[i];
  }

  // get texcoords for current surface
  byter.setPos(this.pos_texcoords);
  this.S32_2_ST     = byter.getFloat32Array(0, this.S32_NUM_VERTS*2);


  // get Vertices (XYZ, NORMAL) for each frame of current surface
  byter.setPos(this.pos_xyznormals);
  this.surface_frames = new Array(this.S32_NUM_FRAMES);
  for(var i = 0; i < this.S32_NUM_FRAMES; i++)
    this.surface_frames[i] = new MD3_SurfaceFrame(this.md3_reader, this, i);

  if( (this.S32_OFS_END+this._start_pos) != byter.getPos()){
    throw ("(!CORRPUT MD3!): surface size (number of bytes) incorrect");
  }
}


MD3_Surface.prototype.log = function(){
  console.log("---------------------------- MD3_Surface["+this.INDEX+"] ----------------------------");
  console.log("    file: "+this.md3_reader.filename);
  console.log("    _start_pos         = "+this._start_pos        );
  console.log("     STR_IDENT         = "+ this.STR_IDENT        );
  console.log("     STR_NAME          = "+ this.STR_NAME         );
  console.log("     S32_FLAGS         = "+ this.S32_FLAGS        );
  console.log("     S32_NUM_FRAMES    = "+ this.S32_NUM_FRAMES   );
  console.log("     S32_NUM_SHADERS   = "+ this.S32_NUM_SHADERS  );
  console.log("     S32_NUM_VERTS     = "+ this.S32_NUM_VERTS    );
  console.log("     S32_NUM_TRIANGLES = "+ this.S32_NUM_TRIANGLES);
  console.log("     S32_OFS_TRIANGLES = "+ this.S32_OFS_TRIANGLES);
  console.log("     S32_OFS_SHADERS   = "+ this.S32_OFS_SHADERS  );
  console.log("     S32_OFS_ST        = "+ this.S32_OFS_ST       );
  console.log("     S32_OFS_XYZNORMAL = "+ this.S32_OFS_XYZNORMAL);
  console.log("     S32_OFS_END       = "+ this.S32_OFS_END      );
  console.log("    _end_pos           = "+this._end_pos          );
  console.log("---------------------------/ MD3_Surface["+this.INDEX+"] ----------------------------");
}

