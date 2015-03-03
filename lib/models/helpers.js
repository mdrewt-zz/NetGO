var numToLetter = function(num) {
  return String.fromCharCode(65 + num);
};

var letterToNum = function(letter) {
  return letter.charCodeAt(0) - 65;
};

var coordsToSpace = function(coords) {
  return numToLetter(coords.row) + coords.column.toString();
};

var spaceToCoords = function(space) {
  return {row: letterToNum(space[0]), column: parseInt(space.slice(1)) - 1};
};

var getNewSpace = function(space, changes) {
  var coords = spaceToCoords(space);
  coords = {row: coords.row + changes.row, column: coords.column + changes.column};
  if (coords.row < 0 || coords.row > 18) {
    return null;
  } else if (coords.column < 0 || coords.column > 18) {
    return null;
  } else {
    return coordsToSpace(coords);
  }
}