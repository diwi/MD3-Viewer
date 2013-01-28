/**
 * project: ...
 * author: thomas diewald
 * date:   16.02.12
 */





MD3_Shader.MAX_QPATH = 64;

MD3_Shader.log = false;

function MD3_Shader(md3_reader, parent_surface, index){

  this.md3_reader = md3_reader;
  this.parent_surface = parent_surface;
  this.INDEX = index;

  var byter = md3_reader.byter;

  this._start_pos         = byter.getPos();
  this.STR_NAME           = byter.getString(0, MD3_Shader.MAX_QPATH, "\0");
  this.S32_SHADER_INDEX   = byter.getInt32Value(0);
  this._end_pos           = byter.getPos();


  if( MD3_Shader.log )
    this.log();
}

MD3_Shader.prototype.log = function(){
  console.log("---------------------------- MD3_Shader["+this.INDEX+"] ----------------------------");
  console.log("    file: "+this.md3_reader.filename             );
  console.log("    _start_pos         = "+this._start_pos       );
  console.log("     STR_NAME          = "+this.STR_NAME         );
  console.log("     S32_SHADER_INDEX  = "+this.S32_SHADER_INDEX );
  console.log("    _end_pos           = "+this._end_pos         );
  console.log("---------------------------/ MD3_Shader["+this.INDEX+"] ----------------------------");
}


