/**
 * project: ...
 * author: thomas diewald
 * date:   18.02.12
 */



function Q3_Object(gl, path, md3_filename, skin_filename, texturepool){
  this.gl            = gl;
  this.path          = path;
  this.md3_filename  = md3_filename;
  this.skin_filename = skin_filename;
  this.texturepool   = texturepool;

  this.frame_IDX_max = 0;
  this.frame_IDX_cur = 0;

  this.surfaces       = null;
  this.surfaces_count = 0;

  this.surface_vbo_list = [];
  this.texture_list     = [];

  this.MD3_FILE  = null;
  this.SKIN_FILE = null;

  this.onload = function(){};


  var _this = this;
  this.MD3_FILE = new MD3_File( path, md3_filename);
  this.MD3_FILE.onload = function(){

    _this.frame_IDX_max = _this.MD3_FILE.header.S32_NUM_FRAMES - 1;
    _this.frame_IDX_cur = 0;

    // build vbo's for surfaces
    _this.surfaces       = _this.MD3_FILE.surfaces;
    _this.surfaces_count = _this.MD3_FILE.surfaces.length;

    _this.surface_vbo_list = new Array(_this.surfaces_count);
    for(var i = 0; i < _this.surfaces_count; i++){
      _this.surface_vbo_list[i] = new Q3_surface_VBO(gl, _this.MD3_FILE, i);
    }

    // build texture array, ... init with null's
    _this.texture_list = new Array(_this.surfaces_count);
    for(var i = 0; i < _this.surfaces_count; i++){
      _this.texture_list[i] = null;
    }

    _this.SKIN_FILE = new Q3_SkinFile(path, _this.skin_filename); // returns null, on fail
    _this.SKIN_FILE.onload = function(){
      try{
        _this.applyTexturesFromSkinfile(_this.SKIN_FILE);
//      this.SKIN_FILE.log();
      } catch ( exception ){
        console.log( exception );
      }
    }

    try{
    _this.SKIN_FILE.load(null, true);
    }catch(exception){
      console.log(exception);
    }
    _this.onload(); //TODO: check if textures are needed for further processing
  }
//  this.MD3_FILE.load(null, true);
}


Q3_Object.prototype.load = function(){
  this.MD3_FILE.load(null, true);
}



Q3_Object.prototype.applyTexturesFromSkinfile = function(skinfile){
  for(var i = 0; i < this.surfaces_count; i++){
    var surface_name = this.surfaces[i].STR_NAME;
    var idx = skinfile.getSurfaceNameIDX(surface_name);
    if( idx >= 0 ){
      var img_name = skinfile.image_names[idx];
      var img_path = skinfile.image_paths[idx];
      var tex = null;
      if( this.texturepool ){
//        //TODO edit path, or assume path is in same dir as md3 and skinfile
        tex = this.texturepool.getTexture( this.path, img_name);
      } else {
        tex = new DwImage(this.gl, this.path, img_name);
      }
      this.texture_list[i] = tex;
    } else {
      console.log("(Q3_Object) no texture for current surface in skinfile listed!!")
    }
  }
}


Q3_Object.prototype.setCurrentFrameIDX = function(frame_IDX){
  this.frame_IDX_cur = frame_IDX;
  if( frame_IDX > this.frame_IDX_max ) this.frame_IDX_cur = this.frame_IDX_max;
  if( frame_IDX < 0                  ) this.frame_IDX_cur = 0
  return this.frame_IDX_cur;
}


Q3_Object.prototype.getTagByName = function(tag_name, frame_idx){
  if( !this.MD3_FILE.LOADED ){
    return null;
  }
  frame_idx = frame_idx || this.frame_IDX_cur;
  var tags = this.MD3_FILE.tag_frames[frame_idx].tags;
  for(  var i = 0; i < tags.length; i++){
    if(  tags[i].STR_NAME == tag_name)
      return tags[i];
  }
  return null;
}



Q3_Object.prototype.getNamesOfSurfaces = function(){
  var count = this.getNumberOfSurfaces();
  var names = new Array(count);
  for(var i = 0; i < count; i++){
    names[i] = this.surfaces[i].STR_NAME;
  }
  return names;
}
Q3_Object.prototype.getNamesOfTags = function(){
  if( !this.MD3_FILE.LOADED ){
    return null;
  }
  var count = this.getNumberOfTags();
  var names = new Array(count);
  for(var i = 0; i < count; i++){
    names[i] = this.MD3_FILE.tag_frames[0].tags[i].STR_NAME;
  }
  return names;
}


Q3_Object.prototype.getNumberOfFrames = function(){
  if( !this.MD3_FILE.frames )
    return 0;
  return this.MD3_FILE.frames.length;
}
Q3_Object.prototype.getNumberOfTags = function(){
  if( !this.MD3_FILE.tag_frames || this.MD3_FILE.tag_frames.length === 0)
    return 0;
  return this.MD3_FILE.tag_frames[0].tags.length;
}
Q3_Object.prototype.getNumberOfSurfaces = function(){
  if( !this.surfaces )
    return 0;
  return this.surfaces.length;
}


Q3_Object.prototype.delete = function(){
  for(var i = 0; i < this.surfaces_count; i++){
    var surface_vbo = this.surface_vbo_list[i];
    var tex         = this.texture_list[i];
    surface_vbo.delete();
  }
  this.path          = null;
  this.md3_filename  = null;
  this.skin_filename = null;
//  this.texturepool   = null;

  this.frame_IDX_max = 0;
  this.frame_IDX_cur = 0;

  this.surfaces       = null;
  this.surfaces_count = 0;

  this.surface_vbo_list = [];
  this.texture_list     = [];

  this.MD3_FILE  = null;
  this.SKIN_FILE = null;
}



Q3_Object.prototype.draw = function(shader, frame_IDX){
  if( frame_IDX )
    this.setCurrentFrameIDX(frame_IDX);

  for(var i = 0; i < this.surfaces_count; i++){
    var surface_vbo = this.surface_vbo_list[i];
    var tex         = this.texture_list[i];
    this.gl.bindTexture(this.gl.TEXTURE_2D, null);
    if( tex ){
      this.gl.bindTexture(this.gl.TEXTURE_2D, tex.HANDLE_TEX);
      this.gl.activeTexture(this.gl.TEXTURE0);
      shader.activeTexture(0);
//      shader.setDefaultColor([0, 0, 0, 0]);
    } else {
      shader.setDefaultColor([0.45, 0.45, 0.45, 1.00]);
    }
    if( surface_vbo ){
      surface_vbo.beginDraw(shader, this.frame_IDX_cur);
      surface_vbo.draw();
    }

  }
  this.gl.bindTexture(this.gl.TEXTURE_2D, null);
}


