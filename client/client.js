var drawLine = function(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
};

var drawCircle = function(x, y, radius) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2*Math.PI);
  context.closePath();
  context.fill();
  context.stroke();
}

var drawBoard = function() {
  context.lineWidth = 2;
  context.fillStyle = "black";
  
  for (var i=0; i<19; i++) {
    drawLine(i*40+20, 20, i*40+20, 740);
    drawLine(20, i*40+20, 740, i*40+20);
  }
  
  for (var i=0; i<9; i++) {
    var row = Math.floor(i/3);
    var column = i%3;
    drawCircle(row*240+140, column*240+140, 4);
  }
};

var placeStone = function(x, y, color) {
  context.fillStyle = color;
  drawCircle(x*40+20, y*40+20, 18);
  kifu.push({row: x, column: y, player: color})
}

var turn = function() {
  if (kifu.length % 2 == 0) {
    return "black";
  } else {
    return "white";
  }
};

var updateBoard = function() {
  for (var i=0; i<kifu.length; i++) {
    placeStone(kifu[i].row, kifu[i].column, kifu[i].player);
  }
};

var createBoard = function() {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  kifu = [];
  drawBoard();
  updateBoard();
  
  canvas.addEventListener("mousedown", function(e) {
    var rect = canvas.getBoundingClientRect();
    var x = Math.floor((e.pageX - rect.left)/40);
    var y = Math.floor((e.pageY - rect.top)/40);
    placeStone(x, y, turn())
    console.log("You clicked " + x + ", " + y + "!");
  });
};

$('document').ready(function() {
  createBoard();
});