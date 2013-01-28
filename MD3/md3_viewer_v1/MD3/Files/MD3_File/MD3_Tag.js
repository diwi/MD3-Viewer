/**
 * project: ...
 * author: thomas diewald
 * date:   16.02.12
 */

MD3_Tag.MAX_QPATH = 64;

MD3_Tag.log = false;

function MD3_Tag(md3_reader, parent_tag_frame, index){

  this.md3_reader = md3_reader;
  this.parent_tag_frame = parent_tag_frame;
  this.INDEX = index;

  var byter = md3_reader.byter;

  this._start_pos         = byter.getPos();
  this.STR_NAME           = byter.getString(0, MD3_Tag.MAX_QPATH, "\0");
  this.VEC3_ORIGIN        = byter.getFloat32Array(0, 3);
  this.VEC3_X_AXIS        = byter.getFloat32Array(0, 3);
  this.VEC3_Y_AXIS        = byter.getFloat32Array(0, 3);
  this.VEC3_Z_AXIS        = byter.getFloat32Array(0, 3);
  this._end_pos           = byter.getPos();

  // create matrix from tag axis and origin
  this.matrix = DwMat4.identity_new();
  DwMat4.setAxisXYZ_ref(this.matrix, this.VEC3_X_AXIS, this.VEC3_Y_AXIS, this.VEC3_Z_AXIS);
  DwMat4.setTranslation(this.matrix, this.VEC3_ORIGIN);

  // create inverted matrix (could be the transposed too )
  this.matrix_inv   = DwMat4.inverse_new(this.matrix);
  // create transposed matrix (faster to generate)
  this.matrix_trans = DwMat4.transpose_new(this.matrix);
  //TODO if transposed is ok, use it,....

//  console.log("-----mat inverse -----");
//  console.log(DwMat4.toStr(this.matrix_inv));
//  console.log("-----mat transpose -----");
//  console.log(DwMat4.toStr(this.matrix_trans));

  if( MD3_Tag.log )
    this.log();
}

MD3_Tag.prototype.log = function(){
  console.log("---------------------------- MD3_Tag["+this.INDEX+"] ----------------------------");
  console.log("    file: "+this.md3_reader.filename);
  console.log("    _start_pos         = "+this._start_pos                );
  console.log("     STR_NAME          = "+this.STR_NAME                  );
  console.log("     VEC3_ORIGIN       = "+DwVec3.toStr(this.VEC3_ORIGIN, 3) );
  console.log("     VEC3_ORIGIN       = "+DwVec3.toStr(this.VEC3_ORIGIN, 3) );
  console.log("     VEC3_X_AXIS       = "+DwVec3.toStr(this.VEC3_X_AXIS, 3) );
  console.log("     VEC3_Y_AXIS       = "+DwVec3.toStr(this.VEC3_Y_AXIS, 3) );
  console.log("     VEC3_Z_AXIS       = "+DwVec3.toStr(this.VEC3_Z_AXIS, 3) );
  console.log("    _end_pos           = "+this._end_pos                  );
  console.log("---------------------------/ MD3_Tag["+this.INDEX+"] ----------------------------");
}
MD3_Tag.prototype.getMatrix = function(){
  return this.matrix;
}
MD3_Tag.prototype.getMatrixInv = function(){
  return this.matrix_inv;
//  return this.matrix_trans;
}
