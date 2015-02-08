RuleSet = function() {};

RuleSet.prototype.capture = function(move, position) {
  for(var i=0; i<4; i++) {
    row = Math.cos(i * Math.PI / 2);
    column = Math.sin(i * Math.PI / 2);
    
    console.log(row + ", " + column);
  }
};