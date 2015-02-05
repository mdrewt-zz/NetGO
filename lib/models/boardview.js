var drawLine = function(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
};

captureStone = function(x, y) {
  context.clearRect (x*40, y*40, 40, 40);
  drawLine(x*40, y*40+20, x*40+40, y*40+20);
  drawLine(x*40+20, y*40, x*40+20, y*40+40);
}; //BUGBUG doesn't redraw sides corners or stars correctly