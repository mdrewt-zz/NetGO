if (Meteor.isClient) {
  $('document').ready(function() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    context.lineWidth = 2;
    context.fillStyle = "black";
    
    for (var i=0; i<19; i++) {
      context.beginPath();
      context.moveTo(i*40+20, 20);
      context.lineTo(i*40+20, 740);
      context.stroke();
      
      context.beginPath();
      context.moveTo(20, i*40+20);
      context.lineTo(740, i*40+20);
      context.stroke();
    }
    
    for (var i=0; i<9; i++) {
      var row = Math.floor(i/3);
      var column = i%3
      
      context.beginPath();
      context.arc(row*240+140, column*240+140, 4, 0, 2*Math.PI);
      context.closePath();
      context.fill();
      context.stroke();
    }
    
  });
  
  Template.boardView.helpers({
    draw: function() {
      
    }
  });
 
}

if (Meteor.isServer) {
  Meteor.startup(function () {

  });
}
