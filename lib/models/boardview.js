var Board = function(canvas) {
  this.canvas = canvas;
  this.context = canvas.getContext("2d");
  this.renderer = new Renderer(this.context);
  this.kifu = [];
  this.stones = [];
};

Board.prototype.drawGrid = function() {
  this.context.lineWidth = 2;
  this.context.fillStyle = "black";
  var spacing = Math.floor(this.canvas.width / 19);
  var offset = Math.floor(spacing / 2);
  
  for (var i=0; i<19; i++) {
    drawLine(i*spacing+offset, offset, i*spacing+offset, 19*spacing-offset);
    drawLine(offset, i*spacing+offset, 19*spacing-offset, i*spacing+offset);
  }
}

Board.prototype.drawStars = function() {
  this.context.lineWidth = 2;
  this.context.fillStyle = "black";
  var spacing = Math.floor(this.canvas.width / 19);
  var offset = Math.floor(spacing / 2);
  
  for (var i=0; i<9; i++) {
    var row = Math.floor(i/3);
    var column = i%3;
    drawCircle(row*6*spacing+(4*spacing-offset), column*6*spacing+(4*spacing-offset), 4);
  }
};

Board.prototype.renderBoard = function() {
  
};