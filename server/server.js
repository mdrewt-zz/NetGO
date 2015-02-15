var Games = new Meteor.Collection("games");

Meteor.startup(function () {
  Games.remove({});
  if (Games.find({}).count() == 0) {
    var game = new Board();
    Games.insert(game.toJson);
  }
});

Meteor.publish("games", function() {
  return Games.find();
});