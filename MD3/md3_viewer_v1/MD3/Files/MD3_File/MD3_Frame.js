/**
 * project: ...
 * author: thomas diewald
 * date:   16.02.12
 */




MD3_Frame.STR_NAME_MAX_LENGTH = 16;
MD3_Frame.log = false;


function MD3_Frame(md3_reader, index){

  this.md3_reader = md3_reader;
  this.INDEX = index;

  var byter = md3_reader.byter;

  // TODO: update values for models exported from gmax
  this._start_pos         = byter.getPos();
  this.VEC3_MIN_BOUNDS    = byter.getFloat32Array(0, 3);
  this.VEC3_MAX_BOUNDS    = byter.getFloat32Array(0, 3);
  this.VEC3_LOCAL_ORIGIN  = byter.getFloat32Array(0, 3);
  this.F32_RADIUS         = byter.getFloat32Value(0);
  this.STR_NAME           = byter.getString(0, MD3_Frame.STR_NAME_MAX_LENGTH, "\0");
  this._end_pos           = byter.getPos();

  this.bb_size = [  this.VEC3_MAX_BOUNDS[0] -  this.VEC3_MIN_BOUNDS[0],
                    this.VEC3_MAX_BOUNDS[1] -  this.VEC3_MIN_BOUNDS[1],
                    this.VEC3_MAX_BOUNDS[2] -  this.VEC3_MIN_BOUNDS[2] ];
  if( MD3_Frame.log )
    this.log();
}

MD3_Frame.prototype.log = function(){
  console.log("---------------------------- MD3_Frame["+this.INDEX+"] ----------------------------");
  console.log("    file: "+this.md3_reader.filename);
  console.log("    _start_pos         = "+this._start_pos                       );
  console.log("     VEC3_MIN_BOUNDS   = "+DwVec3.toStr(this.VEC3_MIN_BOUNDS  , 3 ) );
  console.log("     VEC3_MAX_BOUNDS   = "+DwVec3.toStr(this.VEC3_MAX_BOUNDS  , 3 ) );
  console.log("     bb_size           = "+DwVec3.toStr(this.bb_size          , 3 ) );
  console.log("     VEC3_LOCAL_ORIGIN = "+DwVec3.toStr(this.VEC3_LOCAL_ORIGIN, 3 ) );
  console.log("     F32_RADIUS        = "+this.F32_RADIUS                       );
  console.log("     STR_NAME          = "+this.STR_NAME                         );
  console.log("    _end_pos           = "+this._end_pos                         );
  console.log("---------------------------/ MD3_Frame["+this.INDEX+"] ----------------------------");
}
