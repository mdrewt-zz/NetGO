var Board = function(canvas) {
  this.canvas = canvas;
  this.context = canvas.getContext("2d");
  this.renderer = new Renderer(context);
  this.kifu = [];
  this.stones = [];
};

Board.prototype.renderBoard = function() {
  
};