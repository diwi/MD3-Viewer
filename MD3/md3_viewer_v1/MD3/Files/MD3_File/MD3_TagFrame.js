/**
 * project: ...
 * author: thomas diewald
 * date:   16.02.12
 */

MD3_TagFrame.log = false;

function MD3_TagFrame(md3_reader, index){

  this.md3_reader = md3_reader;
  this.INDEX = index;

  var byter = md3_reader.byter;

  this._start_pos = byter.getPos();
  this._end_pos   = byter.getPos();

  if( MD3_TagFrame.log )
    this.log();

  // load Tags
  this.tags = new Array(this.md3_reader.header.S32_NUM_TAGS);
  for(var i = 0; i < this.tags.length; i++){
    this.tags[i] = new MD3_Tag(this.md3_reader, this, i);
  }


}

MD3_TagFrame.prototype.log = function(){
  console.log("---------------------------- MD3_TagFrame["+this.INDEX+"] ----------------------------");
  console.log("    file: "+this.md3_reader.filename);
  console.log("    _start_pos         = "+this._start_pos        );
  console.log("    _end_pos           = "+this._end_pos          );
  console.log("---------------------------/ MD3_TagFrame["+this.INDEX+"] ----------------------------");
}

