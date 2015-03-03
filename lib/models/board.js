Board = function() {
    this.position = {};
    this.moveList = [];
    this.groups = {};
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

Board.prototype.numToLetter = function(num) {
  return String.fromCharCode(65 + num);
};

Board.prototype.letterToNum = function(letter) {
  return letter.charCodeAt(0) - 65;
};

Board.prototype.coordsToSpace = function(coords) {
  return this.numToLetter(coords.row) + coords.column.toString();
};

Board.prototype.spaceToCoords = function(space) {
  return {row: this.letterToNum(space[0]), column: parseInt(space.slice(1)) - 1};
};

Board.prototype.getNewSpace = function(space, changes) {
  var coords = this.spaceToCoords(space);
  coords = {row: coords.row + changes.row, column: coords.column + changes.column};
  if (coords.row < 0 || coords.row > 18) {
    return null;
  } else if (coords.column < 0 || coords.column > 18) {
    return null;
  } else {
    return coordsToSpace(coords);
  }
};

Board.prototype.getAdjacent = function(space) {
  var directions = [ 
    { row: 1, column: 0 },
    { row: 0, column: 1 },
    { row: -1, column: 0 },
    { row: 0, column: -1 } 
  ];
  var adjSpaces = {empty: [], white: [], black: []};
  for(var i=0; i<adjSpaces.length; i++) {
    var adjSpace = this.position[this.getNewSpace(space, directions[i])];
    adjSpaces[space.status].push(adjSpace);
  }
  return adjSpaces;
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

Board.prototype.turn = function() {
    if (this.moveList.length % 2 == 0 ) {
        return "black";
    } else {
        return "white";
    }
};

Board.prototype.capturingMove = function(space, group) {
    var spaces = {white: [], black: [], empty: []};
    for (var i=0; i<group.length; i++) {
        console.log(this.getAdjacent(group[i].row, group[i].column).empty);
        spaces.empty.concat(this.getAdjacent(group[i].row, group[i].column).empty);
    }
    console.log(spaces);
};

Board.prototype.validateMove = function(stone) {
    if(!this.isEmpty(stone.row, stone.column)) { return false }
    var spaces = this.getAdjacent(stone.row, stone.column);
    var opponent;
    if(stone.status == "black") {
        opponent = "white";
    } else {
        opponent = "black";
    }
    for(var i=0; i<spaces[opponent].length; i++) {
        var group = this.groups[spaces[opponent][i].group];
        if(this.capturingMove(stone, group)) {
            return true;
        }
    }
    if(spaces.empty.length < 1) { return false }
    return true;
};

Board.prototype.addMove = function(row, column) {
    var stone = this.position[row][column];
    if(this.validateMove(stone)) { 
        var newGroup = this.moveList.length;
        
        this.position[row][column].status = this.turn();
        this.position[row][column].group = newGroup;
        this.groups[newGroup] = [];
        this.groups[newGroup].push(this.position[row][column]);
        
        var adjacentStones = this.getAdjacent(row, column)[this.turn()];
        for(var i=0; i<adjacentStones.length; i++) {
            var oldGroup = adjacentStones[i].group;
            this.assignGroup(oldGroup, newGroup);
        }

        this.moveList.push(this.position[row][column]);
    }
};