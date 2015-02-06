var turn = function() {
  if (kifu.length % 2 == 0) {
    return "black";
  } else {
    return "white";
  }
};

$('document').ready(function() {
  goban = new Board(document.getElementById("canvas"));
  kifu = [];
  goban.renderBoard();
  
  goban.renderer.canvas.addEventListener("mousedown", function(e) {
    var rect = this.getBoundingClientRect();
    var x = Math.floor((e.pageX - rect.left)/40);
    var y = Math.floor((e.pageY - rect.top)/40);
    
    goban.drawStone(x, y, turn());
    kifu.push({row: x, column: y, player: turn()});
  });
  
});