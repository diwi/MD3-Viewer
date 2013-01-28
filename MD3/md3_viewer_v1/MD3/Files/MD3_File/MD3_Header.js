/**
 * project: ...
 * author: thomas diewald
 * date:   15.02.12
 */

MD3_Header.MAX_QPATH        = 64;
MD3_Header.MAX_IDENT        = 4;
MD3_Header.MD3_MAX_FRAMES   = 1024;
MD3_Header.MD3_MAX_TAGS     = 16;
MD3_Header.MD3_MAX_SURFACES = 32;

MD3_Header.log = false;

function MD3_Header(md3_reader){
  this.md3_reader = md3_reader;

  var byter = md3_reader.byter;

  this._start_pos        = byter.getPos();
  this.IDENT             = byter.getString    (0, MD3_Header.MAX_IDENT);
  this.VERSION           = byter.getInt32Value(0);
  this.NAME              = byter.getString    (0, MD3_Header.MAX_QPATH, "\0");
  this.S32_FLAGS         = byter.getInt32Value(0);
  this.S32_NUM_FRAMES    = byter.getInt32Value(0);
  this.S32_NUM_TAGS      = byter.getInt32Value(0);
  this.S32_NUM_SURFACES  = byter.getInt32Value(0);
  this.S32_NUM_SKINS     = byter.getInt32Value(0);
  this.S32_OFS_FRAMES    = byter.getInt32Value(0);
  this.S32_OFS_TAGS      = byter.getInt32Value(0);
  this.S32_OFS_SURFACES  = byter.getInt32Value(0);
  this.S32_OFS_EOF       = byter.getInt32Value(0);
  this._end_pos          = byter.getPos();

  if( MD3_Header.log )
    this.log();

  if( this.S32_NUM_FRAMES   < 1 || this.S32_NUM_FRAMES   > this.MD3_MAX_FRAMES)  throw ("(!CORRPUT MD3!) S32_NUM_FRAMES = "+  this.S32_NUM_FRAMES  +" ... min/max = 1/"+MD3_Header.MD3_MAX_FRAMES);
  if( this.S32_NUM_TAGS     < 0 || this.S32_NUM_TAGS     > this.MD3_MAX_TAGS)    throw ("(!CORRPUT MD3!) S32_NUM_TAGS = "+    this.S32_NUM_TAGS    +" ... min/max = 0/"+MD3_Header.MD3_MAX_TAGS);
  if( this.S32_NUM_SURFACES < 0 || this.S32_NUM_SURFACES > this.MD3_MAX_SURFACES)throw ("(!CORRPUT MD3!) S32_NUM_SURFACES = "+this.S32_NUM_SURFACES+" ... min/max = 0/"+MD3_Header.MD3_MAX_SURFACES);

  if( this.S32_OFS_EOF != byter.totalSize())
    throw ("(!CORRPUT MD3!) FILE_SIZE incorrect: expected '"+this.S32_OFS_EOF +" bytes', but got '"+byter.totalSize()+" bytes'");
}



MD3_Header.prototype.log = function(){
  console.log("---------------------------- MD3_Header ----------------------------");
  console.log("    file: "+this.md3_reader.filename);
  console.log("    _start_pos         = "+this._start_pos      );
  console.log("     IDENT             = "+this.IDENT           );
  console.log("     VERSION           = "+this.VERSION         );
  console.log("     NAME              = "+this.NAME            );
  console.log("     S32_FLAGS         = "+this.S32_FLAGS       );
  console.log("     S32_NUM_FRAMES    = "+this.S32_NUM_FRAMES  );
  console.log("     S32_NUM_TAGS      = "+this.S32_NUM_TAGS    );
  console.log("     S32_NUM_SURFACES  = "+this.S32_NUM_SURFACES);
  console.log("     S32_NUM_SKINS     = "+this.S32_NUM_SKINS   );
  console.log("     S32_OFS_FRAMES    = "+this.S32_OFS_FRAMES  );
  console.log("     S32_OFS_TAGS      = "+this.S32_OFS_TAGS    );
  console.log("     S32_OFS_SURFACES  = "+this.S32_OFS_SURFACES);
  console.log("     S32_OFS_EOF       = "+this.S32_OFS_EOF     );
  console.log("    _end_pos           = "+this._end_pos        );
  console.log("---------------------------/ MD3_Header ----------------------------");
}
