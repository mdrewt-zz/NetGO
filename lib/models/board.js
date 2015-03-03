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

Board.prototype.coordsToLoc = function(coords) {
    return this.numToLetter(coords.column) + (coords.row + 1).toString();
};

Board.prototype.locToCoords = function(location) {
    return {row: parseInt(location.slice(1)) - 1, column: this.letterToNum(location[0]) };
};

Board.prototype.getNewSpace = function(location, changes) {
  var coords = this.locToCoords(location);
  coords = {row: coords.row + changes.row, column: coords.column + changes.column};
  if (coords.row < 0 || coords.row > 18) {
    return null;
  } else if (coords.column < 0 || coords.column > 18) {
    return null;
  } else {
    return this.coordsToLoc(coords);
  }
};

Board.prototype.getAdjacent = function(location) {
  var directions = [ 
    { row: 1, column: 0 },
    { row: 0, column: 1 },
    { row: -1, column: 0 },
    { row: 0, column: -1 } 
  ];
  var adjSpaces = {empty: [], white: [], black: []};
  for(var i=0; i<directions.length; i++) {
    var newLocation = this.getNewSpace(location, directions[i]);
    if (newLocation) {
        var adjSpace = this.position[newLocation];
        if (adjSpace) {
            adjSpaces[adjSpace.status].push(adjSpace);
        } else {
            adjSpaces.empty.push({location: newLocation, status: "empty"});
        }
    }
  }
  return adjSpaces;
};

Board.prototype.isEmpty = function(location) {
    return this.position[location].status == "empty";
};

Board.prototype.assignGroup = function(oldGroup, newGroup) {
    var groupSpaces = this.groups[oldGroup];

    for(var i=0; i<groupSpaces.length; i++) {
        this.position[groupSpaces[i].location].group = newGroup;
        this.groups[newGroup].push(this.position[groupSpaces[i].location]);
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
        console.log(this.getAdjacent(group[i].location).empty);
        spaces.empty.concat(this.getAdjacent(group[i].location).empty);
    }
    console.log(spaces);
};

Board.prototype.validateMove = function(location) {
    if(this.position[location]) { return false; }
    var spaces = this.getAdjacent(location);
    var opponent;
    if(this.turn() == "black") {
        opponent = "white";
    } else {
        opponent = "black";
    }
    for(var i=0; i<spaces[opponent].length; i++) {
        var group = this.groups[spaces[opponent][i].group];
        if(this.capturingMove(location, group)) {
            return true;
        }
    }
    if(spaces.empty.length < 1) { return false; }
    return true;
};

Board.prototype.addMove = function(coords) {
    var location = this.coordsToLoc(coords);
    if(this.validateMove(location)) {
        var newGroup = this.moveList.length;
        
        this.position[location] = {location: location};
        this.position[location].status = this.turn();
        this.position[location].group = newGroup;
        this.groups[newGroup] = [];
        this.groups[newGroup].push(this.position[location]);
        
        var adjacentStones = this.getAdjacent(location)[this.turn()];
        for(var i=0; i<adjacentStones.length; i++) {
            var oldGroup = adjacentStones[i].group;
            this.assignGroup(oldGroup, newGroup);
        }

        this.moveList.push(this.position[location]);
    }
};