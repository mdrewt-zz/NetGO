navModule = (function () {
  "use strict";

  function numberToLetter(num) {
    return String.fromCharCode(num + 65);
  }

  function letterToNumber(str) {
    return str.charCodeAt(0) - 65;
  }

  function coordsToString(coords) {
    return numberToLetter(coords.column) + (coords.row + 1).toString();
  }

  function stringToCoords(str) {
    return {column: letterToNumber(str[0]), row: parseInt(str.slice(1)) - 1};
  }

  function getNewSpace(location, changes) {
    var coords, legalCoords;

    coords = stringToCoords(location);
    coords.row += changes.row;
    coords.column += changes.column;
    legalCoords = true; //coords.row < 0 || coords.row > 18 || coords.column < 0 || coords.column > 18;

    return legalCoords ? coordsToString(coords) : null;
  }

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
      newSpace = getNewSpace(location, directions[i]);
      if (newSpace) {
        adjSpaces.push(newSpace);
      }
    }
    return adjSpaces;
  }

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

// console.log(navModule.getAdjacent("B2").map(boardModule.getStone))