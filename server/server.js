var Games = new Meteor.Collection("games");

Meteor.startup(function () {
  Games.remove({});
  if (Games.find({}).count() == 0) {
    var game = {position: [], moveList: []};
    for (var i=0; i<19; i++) {
      game.position[i] = [];
      for (var j=0; j<19; j++) {
        game.position[i][j] = {row: i, column: j, status: "empty"};
      }
    }
    Games.insert(game);
  }
});

Meteor.publish("games", function() {
  return Games.find();
});