Renderer = function(canvas) {
  this.canvas = canvas
  this.context = canvas.getContext("2d");
  
  this.spacing = Math.floor(this.renderer.canvas.width / 19);
  this.offset = Math.floor(this.spacing / 2);
};

Renderer.prototype.drawLine = function(obj) {
  this.context.beginPath();
  this.context.moveTo(obj.x1, obj.y1);
  this.context.lineTo(obj.x2, obj.y2);
  this.context.stroke();
};

Renderer.prototype.drawCircle = function(obj) {
  this.context.fillStyle = obj.fillColor;
  this.context.beginPath();
  this.context.arc(obj.x, obj.y, obj.radius, 0, 2*Math.PI);
  this.context.closePath();
  this.context.fill();
  this.context.stroke();
};

Renderer.prototype.calculatePath = function(obj) {
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

Renderer.prototype.drawGrid = function() {
  this.context.lineWidth = 2;
  this.context.fillStyle = "black";
  
  for (var i=0; i<19; i++) {
    this.drawLine(this.calculatePath({type: "xLine", index: i}));
    this.drawLine(this.calculatePath({type: "yLine", index: i}));
  }
}