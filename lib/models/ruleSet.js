RuleSet = function() {};

RuleSet.prototype.capture = function(move, position) {
  for(var i=0; i<4; i++) {
    var row = Math.round(Math.cos((i * Math.PI) / 2));
    var column = Math.round(Math.sin((i * Math.PI) / 2));
    
    if(position[row+move.row][column+move.column] != "empty" && position[row+move.row][column+move.column] != move.status) {
      RuleSet.countLiberties(position[row+move.row][column+move.column]);
    }
    
    console.log(row + ", " + column);
  }
};

RuleSet.prototype.countLiberties = function(space) {
  console.log("counting liberties for " + space.row + ", " + space.column);  
};