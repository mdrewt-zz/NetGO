var numToLetter = function(num) {
  return String.fromCharCode(65 + num);
};

var letterToNum = function(letter) {
  return letter.charCodeAt(0) - 65;
};

var coordsToSpace = function(coords) {
  return numToLetter(coords.row) + coords.column.toString();
};