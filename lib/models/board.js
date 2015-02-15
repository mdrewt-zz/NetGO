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
  return this;
};

Board.prototype.toJson = function() {
  return  {
            position: this.position, 
            moveList: this.moveList,
            groups: this.groups
          };
};

Board.prototype.getAdjacent = function(row, column) {
  var adjacentSpaces = [];
  for(var i=0; i<4; i++) {
    var adjRow = Math.round(Math.cos((i * Math.PI) / 2)) + row;
    var adjColumn = Math.round(Math.sin((i * Math.PI) / 2)) + column;
    if(adjRow >= 0 && adjRow < 19 && AdjColumn >= 0 && AdjColumn < 19) {
      adjacentSpaces.push(this.position[adjRow][adjColumn]);
    }
  }
  
  return adjacentSpaces;
};

Board.prototype.isEmpty = function(row, column) {
  return this.position[row][column].status == "empty";
};

Board.prototype.assignGroup = function(oldGroup, newGroup) {
  var groupSpaces = this.groups[oldGroup];

  for(var i=0; i<groupSpaces.length; i++) {
    this.position[groupSpaces[i].row][groupSpaces[i].column].group = newGroup;
    this.groups[newGroup].push(this.position[groupSpaces[i].row][groupSpaces[i].column]);
  }
  
  delete this.groups[oldGroup];
};

Board.prototype.addMove = function(row, column) {
  if(!this.isEmpty(row, column)) { return null }
  var liberties = this.getAdjacent(row, column).filter(function(space){
    return space.status == "empty";  
  });
  if(liberties.length < 1) { return null }
};