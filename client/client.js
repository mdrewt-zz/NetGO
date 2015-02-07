Games = new Meteor.Collection("games")
Template.boardView.helpers({
  'row': function() {
    return
  }
});

$('document').ready(function() {
  var goban = new Board(document.getElementById("canvas"));
  goban.renderBoard();
  
  goban.renderer.canvas.addEventListener("mousedown", function(e) {
    var rect = this.getBoundingClientRect();
    var x = Math.floor((e.clientX - rect.left)/40);
    var y = Math.floor((e.clientY - rect.top)/40);
    
    Meteor.call('addMove', {row: x, column: y}, function(error, result) {
      if (error) {
        console.log("The error is " + error);
      }
    });
  });
  
  Meteor.call('loadGame', function(error, result) {
    console.log("error: " + error);
    console.log("result: " + JSON.stringify(result));
    
    var game = result;
    goban.drawPosition(game.kifu)
  });
  
  Meteor.subscribe("games", function(result){
    console.log(result);
  });
});