Board = function() {
  this.position = [];
  this.moveList = [];
  this.groups = {};
  
  for (var i=0; i<19; i++) {
    this.position[i] = [];
    for (var j=0; j<19; j++) {
      this.position[i][j] = {row: i, column: j, status: "empty", group: null};
    }
   }
};

Board.prototype.fromJson = function(json) {
  for (var x in json) {
    this[x] = json[x];
  }
};

Board.prototype.toJson = function() {
  return  {
            position: this.position, 
            moveList: this.moveList,
            groups: this.groups
          };
};