/**
 * project: ...
 * author: thomas diewald
 * date:   19.02.12
 */


function Q3_TexturePool(gl){
  this.gl = gl;
  this.tex_list = new Array(0);
}


Q3_TexturePool.prototype.getTexture = function ( path, filename){
  var len = this.tex_list.length;
  for(var i = 0; i < len; i++){
    var tex = this.tex_list[i];
    if( path == tex.path && filename == tex.filename){
      return tex;
    }
  }
  var tex = new DwImage( this.gl, path, filename);
  this.tex_list.push(tex);
  return tex;
}


Q3_TexturePool.prototype.delete = function (){
//  console.log("deleting textures: "+this.tex_list.length);
  var len = this.tex_list.length;
  for(var i = 0; i < len; i++){
    var tex = this.tex_list[i];
    tex.delete();
  }
  this.tex_list = [];
}



