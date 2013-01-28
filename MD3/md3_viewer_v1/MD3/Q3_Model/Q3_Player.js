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

  this.onload = function(){};

  var _this = this;

  this.head.onload  = function(){_this.upper.load();}
  this.upper.onload = function(){_this.lower.load();}
  this.lower.onload = function(){_this.makeNodeSystem(); _this.onload(); }
}

Q3_Player.prototype.load = function( ){
  this.head.load();
}


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


Q3_Player.prototype.drawModel = function( shader, frame_IDX, mat4_modelview, mat4_modelworld ){
  if( !this.node_system )
    return;
  this.node_system.getTopLevelNode().mat4_transformation = mat4_modelworld;
  this.node_system.updateNodeSystem(frame_IDX);
  this.node_system.drawNodeSystem(shader, mat4_modelview, mat4_modelworld);
}

Q3_Player.prototype.delete = function( ){
  if(this.head  ) this.head .delete();
  if(this.upper ) this.upper.delete();
  if(this.lower ) this.lower.delete();
  this.head  = null;
  this.upper = null;
  this.lower = null;
  this.node_system = null;
  this.n_lower = null;
  this.n_upper = null;
  this.n_head  = null;
}
