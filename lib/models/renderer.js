Renderer = function(canvas) {
  this.canvas = canvas
  this.context = canvas.getContext("2d");
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