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

Board.prototype.getAdjacent = function(space) {
  var adjacentSpaces = [];
  for(var i=0; i<4; i++) {
    var row = Math.round(Math.cos((i * Math.PI) / 2)) + space.row;
    var column = Math.round(Math.sin((i * Math.PI) / 2)) + space.column;
    if(row >= 0 && row < 19 && column >= 0 && column < 19) {
      adjacentSpaces.push(this.position[row][column]);
    }
  }
  
  return adjacentSpaces;
};