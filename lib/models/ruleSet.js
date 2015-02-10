RuleSet = function() {};

// RuleSet.prototype.newSpaces = function(spaces, oldSpaces) {
//   var newSpaces = [];
//   for(var i=0; i<spaces.length; i++) {
//     var unique = true;
//     for(var j=0; j<oldSpaces.length; j++) {
//       if (spaces[i].row == oldSpaces[j].row && spaces[i].column == oldSpaces[j].column) {
//         unique = false;
//         break;
//       }
//     }
//     if (unique) {
//       newSpaces.push(spaces[i]);
//     } 
//   }
//   return newSpaces;
// };

RuleSet.prototype.getAdjacent = function(space) {
  var adjacentSpaces = [];
  for(var i=0; i<4; i++) {
    var row = Math.round(Math.cos((i * Math.PI) / 2));
    var column = Math.round(Math.sin((i * Math.PI) / 2));
    adjacentSpaces.push({row: space.row+row, column: space.column + column});
  }
  
  adjacentSpaces = adjacentSpaces.filter(function(x){
    if(x.row >= 0 && x.row <19 && x.column >= 0 && x.column <19) {
      return x;
    }
  });
  return adjacentSpaces;
};

// RuleSet.prototype.countLiberties = function(space, position) {
//   var adjacentSpaces = this.getAdjacent(space);
//   for(var i=0; i<adjacentSpaces.length; i++) {
    
//   }
// };

// RuleSet.prototype.capture = function(move, position) {
//   var adjacentSpaces = this.getAdjacent(move);
//   for(var i=0; i<adjacentSpaces.length; i++) {
//     var space = position[adjacentSpaces[i].row][adjacentSpaces[i].column];
//     if(space.status != "empty" && space.status != move.status) {
//       this.countLiberties(position[space.row][space.column], position);
//     }
    
//     // console.log(space);
//   }
//   return []
// };