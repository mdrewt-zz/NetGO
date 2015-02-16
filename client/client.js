Meteor.subscribe("games", function(){});

var Games = new Meteor.Collection("games");
var game = Games.find();
goban = new Board();
var gobanDep = new Deps.Dependency();

Template.info.helpers({
  turn: function() { 
    gobanDep.depend();
    return goban.turn(); 
  }
});

$('document').ready(function() {
  
  var renderer = new Renderer(document.getElementById("canvas"));
  
  Tracker.autorun(function() {
    renderer.renderBoard();
    renderer.drawPosition(goban.fromJson(game.fetch()[0]));
  });
  
  renderer.canvas.addEventListener("mousedown", function(e) {
    var rect = this.getBoundingClientRect();
    var row = Math.floor((e.clientY - rect.top)/40);
    var column = Math.floor((e.clientX - rect.left)/40);
    goban.addMove(row, column);
    Games.update(goban._id, {$set: goban.toJson()});
    gobanDep.changed();
  });
  
});