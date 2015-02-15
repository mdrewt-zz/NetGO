// RuleSet = function() {};

// RuleSet.prototype.getAdjacent = function(space) {
//   var adjacentSpaces = [];
//   for(var i=0; i<4; i++) {
//     var row = Math.round(Math.cos((i * Math.PI) / 2));
//     var column = Math.round(Math.sin((i * Math.PI) / 2));
//     adjacentSpaces.push({row: space.row+row, column: space.column + column});
//   }
  
//   adjacentSpaces = adjacentSpaces.filter(function(x){
//     if(x.row >= 0 && x.row <19 && x.column >= 0 && x.column <19) {
//       return x;
//     }
//   });
//   return adjacentSpaces;
// };