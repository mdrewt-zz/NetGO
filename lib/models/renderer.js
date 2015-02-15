Renderer = function(canvas) {
  this.canvas = canvas;
  this.context = canvas.getContext("2d");
  this.spaceWidth = Math.floor(this.canvas.width / 19);
  this.offset = Math.floor(this.spaceWidth / 2);
};

Renderer.prototype.spacesToPixels = function(x) {
  return x * this.spaceWidth + this.offset;
};

Renderer.prototype.horizontalPath = function(lineIndex) {
  return  {
            x1: this.spacesToPixels(lineIndex),
            y1: this.spacesToPixels(0), 
            x2: this.spacesToPixels(lineIndex), 
            y2: this.spacesToPixels(18)
          };
};

Renderer.prototype.verticalPath = function(lineIndex) {
  return  {
            x1: this.spacesToPixels(0),
            y1: this.spacesToPixels(lineIndex), 
            x2: this.spacesToPixels(18), 
            y2: this.spacesToPixels(lineIndex)
          };
};

Renderer.prototype.drawLine = function(coords) {
  this.context.beginPath();
  this.context.moveTo(coords.x1, coords.y1);
  this.context.lineTo(coords.x2, coords.y2);
  this.context.stroke();
};

Renderer.prototype.drawCircle = function(coords) {
  this.context.fillStyle = coords.fillColor;
  this.context.beginPath();
  this.context.arc(coords.x, coords.y, coords.radius, 0, 2*Math.PI);
  this.context.closePath();
  this.context.fill();
  this.context.stroke();
};

Renderer.prototype.drawGrid = function() {
  this.context.lineWidth = 2;
  this.context.fillStyle = "black";
  
  for (var i=0; i<19; i++) {
    this.drawLine(this.verticalPath(i));
    this.drawLine(this.horizontalPath(i));
  }
};

Renderer.prototype.drawStars = function() {
  this.context.lineWidth = 2;
  
  for (var i=0; i<9; i++) {
    var row = Math.floor(i/3);
    var column = i%3;
    var star =  {
                  x: this.spacesToPixels(row*6+3), 
                  y: this.spacesToPixels(column*6+3), 
                  radius: 4, 
                  fillColor: "black"
                };
                
    this.drawCircle(star);
  }
};

Renderer.prototype.drawStone = function(column, row, status) {
  if (status != "empty") {
    var stone = {
                  x: this.spacesToPixels(row), 
                  y: this.spacesToPixels(column), 
                  radius: Math.round(this.spaceWidth/2)-1,
                  fillColor: status
                };
                
    this.drawCircle(stone);
  }
};

Renderer.prototype.renderBoard = function() {
  this.drawGrid();
  this.drawStars();
};

Renderer.prototype.drawPosition = function(game) {
  try {
    var position = game.position;
    for (var i=0; i<19; i++) {
      for(var j=0; j<19; j++) {
        this.drawStone(i, j, position[i][j].status);
      }
    }
  } catch(err) {}
};