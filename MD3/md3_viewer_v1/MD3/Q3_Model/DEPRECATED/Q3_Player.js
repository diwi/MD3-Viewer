/**
 * project: ...
 * author: thomas diewald
 * date:   20.02.12
 */


function Q3_Player(gl, path, team, texturepool){
  this.gl          = gl;
  this.path        = path;
  this.team        = team;
  this.texturepool = texturepool || new Q3_TexturePool(gl);

  this.head  = new Q3_Object(this.gl, this.path, "head.md3" ,  "head_" +this.team+".skin", this.texturepool );
  this.upper = new Q3_Object(this.gl, this.path, "upper.md3",  "upper_"+this.team+".skin", this.texturepool );
  this.lower = new Q3_Object(this.gl, this.path, "lower.md3",  "lower_"+this.team+".skin", this.texturepool );

  this.weapon = null;

  this.node_system = null;
  this.n_lower = null;
  this.n_upper = null;
  this.n_head  = null;

  this.makeNodeSystem();
}

//
//Q3_Player.prototype.draw = function(shader, mat4_mv, frame_IDX){
////  this.lower.setCurrentFrameIDX(frame_IDX);
////  this.upper.setCurrentFrameIDX(frame_IDX);
////  this.head .setCurrentFrameIDX(frame_IDX);
//
//  mat4_mv = DwMat4.copy_new(mat4_mv);
//  var mat3_normals = DwMat4.toMat3inverseTranspose_new(mat4_mv);
//
//  this.setMatrixUniforms(shader, mat3_normals, mat4_mv);
//  this.lower.draw(shader, frame_IDX);
//
//  this.applyMatrix(mat4_mv,  this.lower, this.upper, "tag_torso");
//  DwMat4.toMat3inverseTranspose_ref(mat4_mv, mat3_normals);
//
//  this.setMatrixUniforms(shader, mat3_normals, mat4_mv);
//  this.upper.draw(shader, frame_IDX);
//
//
//  this.applyMatrix(mat4_mv, this.upper, this.head, "tag_head");
//  DwMat4.toMat3inverseTranspose_ref(mat4_mv, mat3_normals);
//
//  this.setMatrixUniforms(shader, mat3_normals, mat4_mv);
//  this.head.draw(shader, frame_IDX);
//}
//
//
//Q3_Player.prototype.setMatrixUniforms = function(shader, m3_normal, m4_modelview){
//  shader.setMat3_Normals   (m3_normal);
//  shader.setMat4_ModelView (m4_modelview);
//}
//
//Q3_Player.prototype.applyMatrix = function(mat4_parent, q3_parent, q3_current, tagname){
//  var tag_parent  = q3_parent .getTagByName(tagname);
//  var tag_current = q3_current.getTagByName(tagname);
//  var tag_mat4_parent      = tag_parent  ? tag_parent.matrix     : DwMat4.identity_new() ;
//  var tag_mat4_current_inv = tag_current ? tag_current.matrix_inv: DwMat4.identity_new() ;
//
//  DwMat4.mult_ref(mat4_parent, tag_mat4_parent,      mat4_parent);
//  DwMat4.mult_ref(mat4_parent, tag_mat4_current_inv, mat4_parent);
//  return mat4_parent;
//}
//
//
//
//
//
//
//






Q3_Player.prototype.setHead = function( md3){
  this.head = md3;
  this. n_head.setObject(this.head);
}
Q3_Player.prototype.setUpper = function( md3){
  this.upper = md3;
  this.n_upper.setObject(this.upper);
}
Q3_Player.prototype.setLower = function( md3){
  this.lower = md3;
  this.n_lower.setObject(this.lower);
}

Q3_Player.prototype.getHead = function(){
  return this.head;
}
Q3_Player.prototype.getUpper = function(){
  return this.upper;
}
Q3_Player.prototype.getLower = function(){
  return this.lower;
}


Q3_Player.prototype.setWeapon = function( weapon){
  this.weapon = weapon;
  if( this.weapon !== null && this.weapon.getNodeSystem() !== null){
    this.weapon.getNodeSystem().getTopLevelNode().setParentNode(this.n_upper, "tag_weapon");
  }
}
Q3_Player.prototype.getWeapon = function(){
  return this.weapon;
}

//Q3_Player.prototype.getAnimations = function(){
//  return animations;
//}



Q3_Player.prototype.makeNodeSystem = function(){
  this.n_lower  = new Q3_DepNode(this.lower ); this.n_lower  .setParentNode(null,  null  );
  this.n_upper  = new Q3_DepNode(this.upper ); this.n_upper  .setParentNode(this.n_lower,  "tag_torso"  );
  this.n_head   = new Q3_DepNode(this.head  ); this.n_head   .setParentNode(this.n_upper,  "tag_head"   );
//
  this.n_lower.setAsTopLevelNode();
  this.node_system = this.n_head.getTopLevelNode();
}

Q3_Player.prototype.getNodeSystem = function(){
  return this.node_system;
}
Q3_Player.prototype.getNodeHead = function(){
  return this.n_head;
}
Q3_Player.prototype.getNodeUpper = function(){
  return this.n_upper;
}
Q3_Player.prototype.getNodeLower = function(){
  return this.n_lower;
}


Q3_Player.prototype.drawModel = function( shader, frame_IDX, mat4_modelview ){
  this.node_system.updateNodeSystem(frame_IDX);
  this.node_system.drawChilds(shader, mat4_modelview);
}
