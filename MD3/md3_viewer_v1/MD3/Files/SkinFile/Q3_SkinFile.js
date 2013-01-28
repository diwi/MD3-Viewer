/**
 * project: ...
 * author: thomas diewald
 * date:   18.02.12
 */




function Q3_SkinFile( path, filename){

  if( !path || !filename){
    console.log ("(SkinFile) invalid path or filename");
  }

  this.path = path;
  this.filename = filename;
  this.total_file_path = this.path+this.filename;

  this.LOADED = false;

  // final arrays
  this.tag_names      = [];
  this.surface_names  = [];
  this.image_names    = [];
  this.image_paths    = [];

  this.content = null;

  this.onload = function(){};
  this.onerror = function(){
    console.log("ERROR while loading SKIN-file: "+this.total_file_path);
  };



//  var timer = new Date().getTime();
//  try{
//    this.content = Q3_SkinFile.loadFileContent(this.total_file_path);
//  } catch (exception){
//    console.log(exception);
//    throw exception;
//  }
//
//  try{
//    this.extractFileContent(this.content);
//  } catch (exception){
//    console.log(exception);
//    this.log();
//    throw exception;
//  }
//  this.loadingtime = new Date().getTime()-timer;


  this.LOADED = true;
  this.loadingtime = 0;
//  this.log();
}

Q3_SkinFile.prototype.load = function(obj, async){
  var _this = this;
  var XHR = new XMLHttpRequest();

  XHR.open("GET", _this.total_file_path, (async === undefined) || async );
  XHR.responseType = "text";
  XHR.onload = function (event) {
    var timer = new Date().getTime();
    try{
      _this.extractFileContent(XHR.responseText);
      _this.LOADED = true;
      _this.loadingtime = new Date().getTime()-timer;
      _this.onload();
    } catch (exception){
      console.log(exception);
      _this.log();
      throw exception;
    }
  };
  try{
    XHR.send(obj); //usually null
  } catch (exception){
//    console.log(exception);
    _this.onerror();
  }
}




Q3_SkinFile.prototype.extractFileContent = function(content) {
  var lines = content.split("\n");
  var expecting_image = false;
  for( var i = 0; i < lines.length; i++ ){
    var ln = lines[i];
    ln = ln.trim();
//    console.log(ln);
    var ln_tokens = ln.split(",");

    for( var j = 0; j < ln_tokens.length; j++){
      var token = ln_tokens[j].trim();

      if( token.length == 0 || DwString.startsWith(token, "//")){
        continue;
      }
      // add tag to list
      if( !expecting_image && DwString.startsWith(token, "tag_")){
        if( this.tag_names.indexOf(token) < 0){
          this.tag_names.push(token);
        }
      // add surface-name to list
      } else if( !expecting_image ){
        this.surface_names.push(token);
        expecting_image = true;
      // add surface-image to list
      } else if( expecting_image ){
        this.image_paths.push(token);
        var idx = token.lastIndexOf("/");
        var image_name = token.substring(token.lastIndexOf("/")+1);
        this.image_names.push(image_name);
        expecting_image = false;
      } else {
        console.log("--------------------------------problem------------------------------");
      }
    }
  }
  if (this.surface_names.length != this.image_paths.length ){
    throw ("(!CORRPUT SKIN-File!) number of surfaces != number of images");
  }
}



Q3_SkinFile.loadFileContent = function(path){
  var xhr = new XMLHttpRequest();
  xhr.open("GET", path, false);

  try{
    xhr.send(null);
  } catch(e){
    throw ("(SkinFile.loadFileContent) invalid file: "+path);
  }

  if (xhr.readyState === 4) {
    if (xhr.status === 0) { // TODO: 200
      return xhr.responseText;
    }
    throw( "(SkinFile.loadFileContent) xhr.status !== 200 ");
  }
  throw( "(SkinFile.loadFileContent) xhr.readyState !== 4 ");
}



Q3_SkinFile.prototype.getImageNameBySurfaceName = function( surface_name){
  var img_idx = this.getSurfaceNameIDX(surface_name);
  if( img_idx == -1)
    return null;
  return this.image_names[img_idx];
}
Q3_SkinFile.prototype.getImagePathBySurfaceName = function( surface_name){
  var img_idx = this.getSurfaceNameIDX(surface_name);
  if( img_idx == -1)
    return null;
  return this.image_paths[img_idx];
}

Q3_SkinFile.prototype.getSurfaceNameIDX = function( surface_name){
  return this.surface_names.indexOf(surface_name)
}





Q3_SkinFile.prototype.log = function(){
  console.log("--------------------- Skin_File -------------------------");
  console.log("(path) "+this.total_file_path);
  for(var i = 0; i < this.tag_names.length; i++ )
    console.log("(tag) "+this.tag_names[i]);
  for(var i = 0; i < this.surface_names.length; i++){
    var surf  = this.surface_names[i];
    var image = this.image_paths[i];
    var image_name = this.image_names[i];
    console.log("(surf) "+surf+", (image)"+image +", ("+image_name+")");
  }
  console.log("(...loading time ... "+this.loadingtime+" ms ");
  console.log("---------------------/ Skin_File -------------------------");
}
