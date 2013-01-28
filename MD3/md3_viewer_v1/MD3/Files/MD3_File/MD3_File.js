/**
 * project: ...
 * author: thomas diewald
 * date:   15.02.12
 */

MD3_File.log = false;

function MD3_File(path, filename ){
  this.path = path || "";
  this.filename = filename;
  this.total_file_path = this.path + this.filename;
  if( !this.filename ){
    throw new ("(MD3_File) invalid filename, can't load MD3-File: "+this.total_file_path);
  }

  this.LOADED = false;
  this.onload = function(){};
  this.onerror = function(){
    console.log("ERROR while loading MD3-file: "+this.total_file_path);
  };
}


MD3_File.prototype.load = function(obj, async){
//  async = !true;
  // make request
  var _this = this;
  var XHR = new XMLHttpRequest();
  XHR.open("GET", this.total_file_path, (async === undefined) || async );
  XHR.responseType = "arraybuffer";

  XHR.onload = function (event) {
    _this.loadFileContent(XHR.response);
    _this.LOADED = true;
    _this.onload();
  };


  try{
    XHR.send(null);
  } catch (exception){
//    console.log(exception);
    _this.onerror();
  }
}



MD3_File.prototype.loadFileContent = function(arraybuffer){
  var time_start = new Date().getTime();

  // initialize byte viewer
  this.byter = new Byter(arraybuffer);

  // check for errors before loading
  if( !this.byter.isValid() ) {
    throw ("  bytebuffer INVALID, ... stop READING MD3-FILE ...");
  }

  // get Header
  this.header = new MD3_Header(this);

  // get Frames
  this.byter.setPos(this.header.S32_OFS_FRAMES);
  this.frames = new Array( this.header.S32_NUM_FRAMES );
  for(var i = 0; i < this.frames.length; i++){
    this.frames[i] = new MD3_Frame(this, i);
  }
  // get Tag frames
  this.byter.setPos(this.header.S32_OFS_TAGS);
  this.tag_frames = new Array(this.header.S32_NUM_FRAMES);
  for(var i = 0; i < this.tag_frames.length; i++){
    this.tag_frames[i] = new MD3_TagFrame(this, i);
  }

  // get Surfaces
  this.byter.setPos(this.header.S32_OFS_SURFACES);
  this.surfaces = new Array(this.header.S32_NUM_SURFACES);
  for(var i = 0; i < this.surfaces.length; i++){
    this.surfaces[i] = new MD3_Surface(this, i);
  }


  var time_end = new Date().getTime();

    // check for error
  if( this.header.S32_OFS_EOF !=  this.byter.getPos() ){
    console.log(">> WARNING: not at OFS_EOF"+( this.header.S32_OFS_EOF - this.byter.getPos()));
    console.log(">> WARNING: file may be corrupt");
    throw ("(!CORRPUT MD3!)");
  } else {
    var size = this.byter.totalSize();
    this.loading_time = time_end - time_start;
    if( MD3_File.log ){
      console.log(">>> loaded MD3-File ("+this.loading_time+" ms, "+size+" bytes): \""+this.filename+"\"");
    }
  }
}



