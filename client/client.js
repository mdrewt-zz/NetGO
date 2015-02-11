Meteor.subscribe("games", function(){});

rules = new RuleSet();
Games = new Meteor.Collection("games");
game = Games.find();

Template.boardView.helpers({
  'game': function() {
    return Games.find();
  }
});

var turn = function(moveList) {
  if (moveList.length % 2 == 0 ) {
    return "black";
  } else {
    return "white";
  }
};

$('document').ready(function() {
  var rules = new RuleSet();
  var goban = new Board(document.getElementById("canvas"));
  goban.renderBoard();
  
  Tracker.autorun(function() {
    goban.drawPosition(game);
  });
  
  goban.renderer.canvas.addEventListener("mousedown", function(e) {
    var rect = this.getBoundingClientRect();
    var x = Math.floor((e.clientX - rect.left)/40);
    var y = Math.floor((e.clientY - rect.top)/40);
    
    var tempGame = game.fetch()[0];
    // console.log(rules.capture({row: x, column: y, status: turn(tempGame.moveList)}, tempGame.position));
    
    if (tempGame.position[x][y].status == "empty") {
      var turnNum = tempGame.moveList.length;
      tempGame.position[x][y].status = turn(tempGame.moveList);
      tempGame.position[x][y].group = turnNum;
      
      tempGame.groups[turnNum] = [];
      tempGame.groups[turnNum].push(tempGame.position[x][y]);
      
      var adjacentSpaces = rules.getAdjacent(tempGame.position[x][y]);
      for(var i=0; i<adjacentSpaces.length; i++) {
        if(tempGame.position[adjacentSpaces[i].row][adjacentSpaces[i].column].status ==  tempGame.position[x][y].status) {
          var oldGroup = tempGame.position[adjacentSpaces[i].row][adjacentSpaces[i].column].group;
          var groupSpaces = tempGame.groups[oldGroup];
          
          // console.log("Groups: ");
          // console.log(tempGame.groups);
          // console.log("\noldGroup: ");
          // console.log(oldGroup);
          // console.log("\ngroupSpaces: ")
          // console.log(groupSpaces)
          
          // console.log()

          for(var j=0; j<groupSpaces.length; j++) {
            // console.log(j)
            // console.log(groupSpaces[j].row)
            // console.log(groupSpaces[j].column)
            tempGame.position[groupSpaces[j].row][groupSpaces[j].column].group = tempGame.position[x][y].group;
            tempGame.groups[turnNum].push(tempGame.position[groupSpaces[j].row][groupSpaces[j].column]);
          }
          delete tempGame.groups[oldGroup];
        }
      }
      
      tempGame.moveList.push(tempGame.position[x][y]);
      Games.update(tempGame._id, {$set: {position: tempGame.position, moveList: tempGame.moveList, groups: tempGame.groups}});
    } else {
      console.log("You can't go there.");
    }
    
  });
});