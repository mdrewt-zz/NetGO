// Helper to deal with navigating between locations on the board.

navModule = (function () {
  "use strict";

  // Since we're storing the column as a letter we need to have methods to translate between A-S and 0-18
  // Could also use an array using the index and the indexOf() method
  function numberToLetter(num) {
    return String.fromCharCode(num + 65);
  }

  function letterToNumber(str) {
    return str.charCodeAt(0) - 65;
  }

  // In comes {row: 1, column: 0} out goes "A2"
  function coordsToString(coords) {
    return numberToLetter(coords.column) + (coords.row + 1).toString();
  }

  // In comes "A2" out goes {row: 1, column: 0}
  function stringToCoords(str) {
    return {column: letterToNumber(str[0]), row: parseInt(str.slice(1)) - 1};
  }

  // Returns a new location relative to the location it's given
  // i.e. getNewSpace("A10", {row: -5, column: 1}) returns "B5"
  function getNewSpace(location, changes) {
    var coords, legalCoords;

    coords = stringToCoords(location);
    coords.row += changes.row;
    coords.column += changes.column;
    // Not sure why this is commented.... figure out later
    legalCoords = true; //coords.row >= 0 || coords.row <= 18 || coords.column >= 0 || coords.column <= 18;

    return legalCoords ? coordsToString(coords) : null;
  }

  // Returns an array containing the 4 (or 3, or 2) adjacent space IDs
  function getAdjacent(location) {
    var adjSpaces, directions, i, newSpace;
    adjSpaces = [];
    directions = [
      { row: 1, column: 0 },
      { row: 0, column: 1 },
      { row: -1, column: 0 },
      { row: 0, column: -1 }
    ];
    for (i=0; i<directions.length; i++) {
      newSpace = getNewSpace(location, directions[i]); // Depends on LegalChords in getNewSpace() to filter out invalid locations
      if (newSpace) {
        adjSpaces.push(newSpace);
      }
    }
    return adjSpaces;
  }

  // Interface for dealing with space IDs ("A1", "D10")
  return {
    coordsToString: coordsToString,
    stringToCoords: stringToCoords,
    getAdjacent: getAdjacent
  };

}());

// tests

// console.log(navModule.coordsToString({row: 10, column: 1}) === "B11");
// console.log(navModule.stringToCoords("B11").row === 10);
// console.log(navModule.stringToCoords("B11").column === 1);
// console.log(JSON.stringify(navModule.getAdjacent("B2")) === JSON.stringify(["B3","C2","B1","A2"]))
// console.log(navModule.getAdjacent("A1").length == 2) // Make sure only valid locations are returned.

// console.log(navModule.getAdjacent("B2").map(boardModule.getStone))