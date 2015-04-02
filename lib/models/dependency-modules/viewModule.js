// This Module is responsible for rendering the board and stones inside a canvas

viewModule = (function () {
  "use strict";
  var canvas, context, width, offset;
  
  // Give it a canvas to draw on
  // IMPROVEMENT -- one canvas for the board, one for the stones, then layer them over each other
  function init(canvasDOM) {
    canvas = canvasDOM;
    context = canvas.getContext("2d");
    width = Math.floor(canvas.width / 19);
    offset = Math.floor(width / 2);
  }

  // Takes in a row/collumn and returns the distance in pixels
  function coordToPixels(coord) {
    return coord * width + offset;
  }

  // Returns the coordinates for a horizontal line going accross the board
  function horizontalPath(row) {
    return  {
              x1: coordToPixels(0),
              y1: coordToPixels(row),
              x2: coordToPixels(18),
              y2: coordToPixels(row)
            };
  }

  // Returns the coordinates for a vertical line going accross the board
  function verticalPath(column) {
    return  {
              x1: coordToPixels(column),
              y1: coordToPixels(0),
              x2: coordToPixels(column),
              y2: coordToPixels(18)
            };
  }
  
  // Clears the board
  // Currently will have to clear and re-render the entire board after stone captures
  function clearBoard() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  // Draws a line from (x1, y1) to (x2, y2)
  function drawLine(coords) {
    context.beginPath();
    context.moveTo(coords.x1, coords.y1);
    context.lineTo(coords.x2, coords.y2);
    context.stroke();
  }

  // Draws a circle and fills it in
  function drawCircle(coords) {
    context.fillStyle = coords.fillColor;
    context.beginPath();
    context.arc(coords.x, coords.y, coords.radius, 0, 2*Math.PI);
    context.closePath();
    context.fill();
    context.stroke();
  }

  // Creates 19 by 19 lines in a grid
  function drawGrid() {
    var i;
    context.lineWidth = 2;
    context.fillStyle = "black";
    
    for (i=0; i<19; i++) {
      drawLine(verticalPath(i));
      drawLine(horizontalPath(i));
    }
  }

  // Draws 9 smaller circles on points in the grid for the star points
  function drawStars() {
    var i, row, column, star;

    context.lineWidth = 1;
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

  // Renders a single stone
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

  // Renders just the stones
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

  // Renders the Grid, Stars, and Stones
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