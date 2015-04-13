var gameModule = (function (board, groups, view, nav) {
  "use strict";
  var turnCount, playerTurn;
  
  function init(canvasDOM) {
    turnCount = 0;
    playerTurn = 1;
    view.init(canvasDOM);
    view.renderBoard();
    board.reset();
    groups.reset();
  }

  function toggleTurn() {
    turnCount += 1;
    playerTurn *= -1;
    return playerTurn;
  }

  function color(value) {
    var color = ["white", "empty", "black"][value + 1];
    return color
  }

  function filterLiberties(liberties, space) {
    liberties = liberties.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
    if (liberties.indexOf(space.location) > -1) {
      liberties.splice(liberties.indexOf(3),1);
    }
    return liberties;
  }

  function getLiberties(space) {
    var liberties = [];
    var adjSpaces1 = nav.getAdjacent(space.location).map(board.getStone);

    for(var x=0; x<adjSpaces1.length; x++) {

      if(true) {
        var group = groups.getGroup(space.group);
        for(var i=0; i<group.length; i++) {
          var adjSpaces2 = nav.getAdjacent(group[i].location).map(board.getStone);
          for(var j=0; j<adjSpaces.length; j++) {
            if (adjSpaces[j].color == 0) {
              liberties.push(adjSpaces[j].location); //what about push if liberties.indexOf == -1
            }
          }
        }
      }

    }
  }

  function validMove(space) {
    var isEmpty, hasLiberties;
    isEmpty = space.color === 0;
    hasLiberties = getLiberties.length > 0;
  }

  function playMove() {
    // TODO
  }

  function getPotentialMove(coords) {
    var location, space;
    location = nav.coordsToString(coords);
    space = board.getStone(location);
    if (validMove(space)) {
      // TODO
    };
  }
  
  return {
    getPotentialMove: getPotentialMove
  };
})(boardModule, groupModule, viewModule, navModule);