Board = function(canvas) {
  this.renderer = new Renderer(canvas);
  this.spacing = Math.floor(this.renderer.canvas.width / 19);
  this.offset = Math.floor(this.spacing / 2);
  this.stones = [];
};


// I though this was a good idea at first, now I think it just complicates things
Board.prototype.calculatePath = function(obj) {
  switch(obj.type) {
    case "yLine":
      return {
                x1: obj.index * this.spacing + this.offset, 
                y1: this.offset, 
                x2: obj.index * this.spacing + this.offset, 
                y2: 19*this.spacing-this.offset
             };
    case "xLine":
      return {
                x1: this.offset, 
                y1: obj.index * this.spacing + this.offset, 
                x2: 19*this.spacing-this.offset,
                y2: obj.index * this.spacing + this.offset,
             };
    case "circle":
      return {
                x: obj.x * this.spacing + this.offset, 
                y: obj.y * this.spacing + this.offset, 
                radius: obj.radius || this.offset - 2,
                fillColor: obj.color,
             };
  }
};

Board.prototype.drawGrid = function() {
  this.renderer.context.lineWidth = 2;
  this.renderer.context.fillStyle = "black";
  
  for (var i=0; i<19; i++) {
    this.renderer.drawLine(this.calculatePath({type: "xLine", index: i}));
    this.renderer.drawLine(this.calculatePath({type: "yLine", index: i}));
  }
}

Board.prototype.drawStars = function() {
  this.renderer.context.lineWidth = 2;
  
  for (var i=0; i<9; i++) {
    var row = Math.floor(i/3);
    var column = i%3;
    var star = {type: "circle", x: row*6+3, y: column*6+3, radius: 4, color: "black"};
    this.renderer.drawCircle(this.calculatePath(star));
  }
};

Board.prototype.drawStone = function(x, y, status) {
  if (status != "empty") {
    var stone = {type:"circle", x: x, y: y, color: status};
    this.renderer.drawCircle(this.calculatePath(stone));
  }
};

Board.prototype.drawPosition = function(board) {
  var position = board.fetch()[0];
  if (position) {
    if (position.position) {
      position = position.position;
    }
  }
  if (position) {
    for (var i=0; i<19; i++) {
      for(var j=0; j<19; j++) {
        this.drawStone(i, j, position[i][j].status);
      }
    }
  }
};

Board.prototype.renderBoard = function() {
  this.drawGrid();
  this.drawStars();
};