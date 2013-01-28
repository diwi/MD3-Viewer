/**
 * project: ...
 * author: thomas diewald
 * date:   21.02.12
 */

function Q3_Weapon(gl, path, name, texturepool){
  this.gl   = gl;
  this.path = path;
  this.name = name; //name of the weapon
  this.texturepool = texturepool || new Q3_TexturePool(gl);

  this.weapon = new Q3_Object(this.gl, this.path, name+".md3",         name+".skin",        this.texturepool );
  this.hand   = new Q3_Object(this.gl, this.path, name+"_hand.md3",    name+"_hand.skin",   this.texturepool ); // just tags, not surfaces
  this.barrel = new Q3_Object(this.gl, this.path, name+"_barrel.md3",  name+"_barrel.skin", this.texturepool );
//  this.flash  = new Q3_Object(this.gl, this.path, name+"_flash.md3",   name+"_flash.skin",  this.texturepool );

  this.n_hand   = null;
  this.n_weapon = null;
  this.n_flash  = null;
  this.n_barrel = null;

  this.makeNodeSystem();
}


//Q3_Weapon.prototype.draw = function(shader, mat4_parent, md3_parent, frame_IDX){
//  this.weapon.setCurrentFrameIDX(frame_IDX);
//  this.hand  .setCurrentFrameIDX(frame_IDX);
//  this.barrel.setCurrentFrameIDX(frame_IDX);
//  this.flash .setCurrentFrameIDX(frame_IDX);
//
//
//  mat4_parent = DwMat4.copy_new(mat4_parent);
//  var mat3_normals = DwMat4.toMat3inverseTranspose_new(mat4_parent);
//
//  // HAND
////  this.applyMatrix(mat4_parent,  md3_parent, this.hand, "tag_weapon");
////  DwMat4.toMat3inverseTranspose_ref(mat4_parent, mat3_normals);
//
////  this.setMatrixUniforms(shader, mat3_normals, mat4_parent);
////  this.hand.draw(shader);
//
//
//  // WEAPON
//  this.applyMatrix(mat4_parent,  this.hand, this.weapon, "tag_weapon");
//  DwMat4.toMat3inverseTranspose_ref(mat4_parent, mat3_normals);
//
//  this.setMatrixUniforms(shader, mat3_normals, mat4_parent);
//  this.weapon.draw(shader);
//
//  // BARREL
//  this.applyMatrix(mat4_parent,  this.weapon, this.barrel, "tag_barrel");
//  DwMat4.toMat3inverseTranspose_ref(mat4_parent, mat3_normals);
//
//  this.setMatrixUniforms(shader, mat3_normals, mat4_parent);
//  this.barrel.draw(shader);
//
//}
//
//
//Q3_Weapon.prototype.setMatrixUniforms = function(shader, m3_normal, m4_modelview){
//  shader.setMat3_Normals   (m3_normal);
//  shader.setMat4_ModelView (m4_modelview);
//}
//
//Q3_Weapon.prototype.applyMatrix = function(mat4_parent, q3_parent, q3_current, tagname){
//  var tag_parent  = q3_parent .getTagByName(tagname);
//  var tag_current = q3_current.getTagByName(tagname);
//  var tag_mat4_parent      = tag_parent  ? tag_parent.matrix     : DwMat4.identity_new() ;
//  var tag_mat4_current_inv = tag_current ? tag_current.matrix_inv: DwMat4.identity_new() ;
//
//  DwMat4.mult_ref(mat4_parent, tag_mat4_parent,      mat4_parent);
//  DwMat4.mult_ref(mat4_parent, tag_mat4_current_inv, mat4_parent);
//  return mat4_parent;
//}




Q3_Weapon.prototype.makeNodeSystem = function (){
  this.n_hand   = new Q3_DepNode(this.hand  ); this.n_hand   .setParentNode(null,  null );
  this.n_weapon = new Q3_DepNode(this.weapon); this.n_weapon .setParentNode(this.n_hand,   "tag_weapon" );
//  this.n_flash  = new Q3_DepNode(this.flash ); this.n_flash  .setParentNode(this.n_weapon, "tag_flash"  );
  this.n_barrel = new Q3_DepNode(this.barrel); this.n_barrel .setParentNode(this.n_weapon, "tag_barrel" );
  this.n_hand.setAsTopLevelNode();
  this.node_system = this.n_hand.getTopLevelNode();
}





Q3_Weapon.prototype.getNodeSystem = function (){
  return this.node_system;
}
Q3_Weapon.prototype.getNodeHand = function (){
  return this.n_hand;
}
Q3_Weapon.prototype.getNodeWeapon = function (){
  return this.n_weapon;
}
Q3_Weapon.prototype.getNodeFlash = function (){
  return this.n_flash;
}
Q3_Weapon.prototype.getNodeBarrel = function (){
  return this.n_barrel;
}


Q3_Weapon.prototype.setHand = function( md3){
  this.hand = md3;
  this.n_hand.setObject(this.hand);
}
Q3_Weapon.prototype.setWeapon = function( md3){
  this.weapon = md3;
  this.n_weapon.setObject(this.weapon);
}
Q3_Weapon.prototype.setFlash = function( md3){
  this.flash = md3;
  this.n_flash.setObject(this.flash);
}
Q3_Weapon.prototype.setBarrel = function( md3){
  this.barrel = md3;
  this.n_barrel.setObject(this.barrel);
}


Q3_Weapon.prototype.getHand = function(){
  return this.hand;
}
Q3_Weapon.prototype.getWeapon = function(){
  return this.weapon;
}
Q3_Weapon.prototype.getFlash = function(){
  return this.flash;
}
Q3_Weapon.prototype.getBarrel = function(){
  return this.barrel;
}


Q3_Weapon.prototype.drawModel = function(  shader, frame_IDX, mat4_modelview ){
  this.node_system.updateNodeSystem(frame_IDX);
  this.node_system.drawChilds(shader, mat4_modelview);
}

