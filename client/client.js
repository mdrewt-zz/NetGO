Meteor.subscribe("games", function(){});

var Games = new Meteor.Collection("games");
var game = Games.find();
goban = new Board();
var gobanDep = new Deps.Dependency();

Template.boardView.helpers({
    rows: function() {
        var rows = [];
        for(var i=0; i<19; i++) {
            rows.push({value: 19 - i});
        }
        return rows;
    },
    columns: function() {
        var columns = [];
        for(var i=0; i<19; i++) {
            columns.push({value: String.fromCharCode(65 + i)});
        }
        return columns;
    }
});

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
        var row = 18 - Math.floor((e.clientY - rect.top)/40);
        var column = Math.floor((e.clientX - rect.left)/40);
        goban.addMove({row: row, column: column});
        Games.update(goban._id, {$set: goban.toJson()});
        gobanDep.changed();
    });
    
});