/**
 * project: ...
 * author: thomas diewald
 * date:   18.02.12
 */


function Q3_surface_TEX(gl, tex_path, tex_image, image_pool){
  this.gl = gl;
  this.tex_image = tex_image;
  this.tex_path  = tex_path;

  this.image_pool = image_pool; // maybe undefined!

  var _this = this;

  this.HANDLE_texture = gl.createTexture();

  this.image = new Image();
  this.image.src = tex_path + tex_image;
  console.log("tex_path = "+this.image.src);
  this.image.onload = function() {
    handleTextureLoaded(_this.image, _this.HANDLE_texture);
  }
}


Q3_surface_TEX.prototype.loadImage = function(){
  var img = new DwImage(gl, path, filename);

}



function handleTextureLoaded(image, texture) {
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  gl.generateMipmap(gl.TEXTURE_2D);
  gl.bindTexture(gl.TEXTURE_2D, null);
  console.log("hi");
}
