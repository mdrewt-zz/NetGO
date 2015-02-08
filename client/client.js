Meteor.subscribe("games", function(){});

Games = new Meteor.Collection("games")
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
    tempGame.position[x][y].status = turn(tempGame.moveList);
    tempGame.moveList.push(tempGame.position[x][y]);
    console.log(tempGame);
    Games.update(tempGame._id, {$set: {position: tempGame.position, moveList: tempGame.moveList}});
    
  });
});