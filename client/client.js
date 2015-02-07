Meteor.subscribe("games", function(){});

Games = new Meteor.Collection("games")
game = Games.find();

Template.boardView.helpers({
  'game': function() {
    return Games.find();
  }
});

// Template.boardView.events({
//   'click .empty': function() {
//     var tempGame = game.fetch()[0];
//     // console.log(tempGame);
//     tempGame.position[this.row][this.column].status = "black";
//     // console.log(tempGame);
//     // Meteor.call('addMove', tempGame)
//     Games.update(tempGame._id, {$set: {position: tempGame.position}});
//     // console.log(Games.find().fetch()[0]);
//   }
// });

var turn = function() {
  
};

$('document').ready(function() {
  var goban = new Board(document.getElementById("canvas"));
  goban.renderBoard();
  
  goban.renderer.canvas.addEventListener("mousedown", function(e) {
    var rect = this.getBoundingClientRect();
    var x = Math.floor((e.clientX - rect.left)/40);
    var y = Math.floor((e.clientY - rect.top)/40);
    
    var tempGame = game.fetch()[0];
    tempGame.position[x][y].status = "black";
    Games.update(tempGame._id, {$set: {position: tempGame.position}});
    
    // Meteor.call('addMove', {row: x, column: y}, function(error, result) {
    //   if (error) {
    //     console.log("The error is " + error);
    //   }
    // });
  });
  
  // Meteor.call('loadGame', function(error, result) {
  //   console.log("error: " + error);
  //   console.log("result: " + JSON.stringify(result));
    
  //   var game = result;
  Tracker.autorun(function() {
    goban.drawPosition(game);
  });
  // });
});