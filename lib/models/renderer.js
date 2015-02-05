var Renderer = function(canvas) {
  this.canvas = canvas
  this.context = canvas.getContext("2d");
};

Renderer.prototype.drawLine = function(x1, y1, x2, y2) {
  this.context.beginPath();
  this.context.moveTo(x1, y1);
  this.context.lineTo(x2, y2);
  this.context.stroke();
};

Renderer.prototype.drawCircle = function(x, y, radius) {
  this.context.beginPath();
  this.context.arc(x, y, radius, 0, 2*Math.PI);
  this.context.closePath();
  this.context.fill();
  this.context.stroke();
};