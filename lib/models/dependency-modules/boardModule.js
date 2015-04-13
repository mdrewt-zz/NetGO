// The boardModule is used to store the positions of stones
// Stones have a location, a color (-1 = white, 0 = empty, 1 = black), and a group that they belong to

boardModule = (function () {
  "use strict";
  
  // The board is an object with the format {LOCATION : STONE}
  var board = {};
  
  // This function returns true if a location exists on the board
  function legalLocation(location) {
    var column, row, columnCheck, rowCheck;
    column = location[0];
    row = parseInt(location.slice(1));
    columnCheck = column >= "A" && column <= "S";
    rowCheck = row >= 1 && row <= 19;
    return columnCheck && rowCheck;
  }

  // Creates a stone object if the location is valid.
  // If no color is included then the location is empty and thus has no group to belong to
  function createStone(location, color, group) {
    var stone;
    color = color || 0; // validate color? [-1,0,1]
    if (legalLocation(location)) { // else throw error?
      stone = {location: location, color: color, group: group};
      board[location] = stone;
      return stone;
    }
  }

  // Looks up a stone on the board, if it doesn't exist it creates it
  function getStone(location) {
    return board[location] || createStone(location, 0, null);
  }

  // Returns an array of all the stones currently on the board.
  // It clones the stones so the copies can be changed without affecting the original
  // I forget the reason why having clones was important... but there was one!
  function allStones() {
    var stoneArr, x;
    stoneArr = [];
    for (x in board) {
      stoneArr.push(JSON.parse(JSON.stringify(board[x]))); // cloning
    }
    return stoneArr;
  }

  // Uses an options argument to make changes to a stone at a certain location
  // i.e. updateStone("A1", {group: 6}) changes the group property on the A4 stone to 6
  function updateStone(location, options) {
    var stone, x;
    stone = getStone(location);
    for (x in options) {
      stone[x] = options[x]; // validate options?
    }
    return board[location];
  }

  // Removes a stone from the board
  function deleteStone(location) {
    delete board[location];
  }
  
  function reset() {
    board = {};
  }

  // This is the public interface. The only way to interact with the board is through these functions.
  return  {
            createStone: createStone,
            getStone: getStone,
            allStones: allStones,
            updateStone: updateStone,
            deleteStone: deleteStone,
            clearBoard: reset
          };

}());

// tests

// boardModule.createStone("A1");
// console.log(typeof boardModule.createStone("B1") === "object");
// console.log(boardModule.createStone("C1").location === "C1");
// console.log(boardModule.createStone("D1").color === 0);
// console.log(boardModule.createStone("E1", 1, 1).color === 1);
// console.log(boardModule.createStone("F1", 1, 1).group === 1);
// console.log(boardModule.createStone("A0") === undefined);
// console.log(boardModule.createStone("a5") === undefined);
// console.log(typeof boardModule.getStone("E1") === "object");
// console.log(boardModule.getStone("E1").color === 1);
// console.log(boardModule.getStone("E1").group === 1);
// console.log(typeof boardModule.getStone("G1") === "object");
// console.log(boardModule.allStones().constructor == Array);
// console.log(typeof boardModule.allStones()[0] === "object");
// console.log(boardModule.allStones().length == 7);
// console.log(boardModule.updateStone("A1", {color: 1, group: 2}));
// console.log(boardModule.getStone("A1"));
// boardModule.deleteStone("A1");
// console.log(boardModule.allStones().length == 6);