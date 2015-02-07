var Games = new Meteor.Collection("games");

Meteor.startup(function () {
  // Games.remove({});
  if (Games.find({}).count() == 0) {
    var game = {kifu: []};
    Games.insert(game);
  }
});

Meteor.publish("games", function() {
  return Games.find().fetch();
});

Meteor.methods({
  loadGame: function() {
    return Games.find().fetch()[0];
  },
  addMove: function(move) {
    var g = Games.find().fetch()[0];
    if (g.kifu.length % 2 == 1) {
      move.player = "white";
    } else {
      move.player = "black";
    }
    g.kifu.push(move);
    Games.update({_id: g._id}, {$set: {kifu: g.kifu}})
  }
});