viewModule = (function () {
  "use strict";
  var canvas, context, width, offset;

  function init(canvasDOM) {
    canvas = canvasDOM;
    context = canvas.getContext("2d");
    width = Math.floor(canvas.width / 19);
    offset = Math.floor(width / 2);
  }

  function coordToPixels(coord) {
    return coord * width + offset;
  }

  function horizontalPath(row) {
    return  {
              x1: coordToPixels(0),
              y1: coordToPixels(row),
              x2: coordToPixels(18),
              y2: coordToPixels(row)
            };
  }

  function verticalPath(column) {
    return  {
              x1: coordToPixels(column),
              y1: coordToPixels(0),
              x2: coordToPixels(column),
              y2: coordToPixels(18)
            };
  }

  function clearBoard() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  function drawLine(coords) {
    context.beginPath();
    context.moveTo(coords.x1, coords.y1);
    context.lineTo(coords.x2, coords.y2);
    context.stroke();
  }

  function drawCircle(coords) {
    context.fillStyle = coords.fillColor;
    context.beginPath();
    context.arc(coords.x, coords.y, coords.radius, 0, 2*Math.PI);
    context.closePath();
    context.fill();
    context.stroke();
  }

  function drawGrid() {
    var i;
    context.lineWidth = 2;
    context.fillStyle = "black";
    
    for (i=0; i<19; i++) {
      drawLine(verticalPath(i));
      drawLine(horizontalPath(i));
    }
  }

  function drawStars() {
    var i, row, column, star;

    context.lineWidth = 2;
    for (i=0; i<9; i++) {
      row = Math.floor(i/3);
      column = i%3;
      star =  {
                x: coordToPixels(row*6+3), 
                y: coordToPixels(column*6+3), 
                radius: 4, 
                fillColor: "black"
              };
                              
      drawCircle(star);
    }
  }

  function drawStone(row, column, color) {
    var stone;
    context.lineWidth = 1;
    if (color !== "empty") {
      stone = {
                  x: coordToPixels(column), 
                  y: coordToPixels(18 - row), 
                  radius: offset-1,
                  fillColor: color
              };
                                
      drawCircle(stone);
    }
  }

  function drawPosition(stones) {
    var i, stone, coords;
    try {
      for(i=0; i<stones.length; i++) {
        stone = stones[i];
        coords = stone.location;
        drawStone(coords.row, coords.column, stone.color);
      }
    } catch(err) {
      // handle error
    }
  }

  function renderBoard(stones) {
    stones = stones || [];
    clearBoard();
    drawGrid();
    drawStars();
    drawPosition(stones);
  }

  return {
    init: init,
    renderBoard: renderBoard
  };

}());