if (Meteor.isClient) {
  $('document').ready(function() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    context.lineWidth = 2;
    
    for (var i=0; i < 19; i++) {
      context.beginPath();
      context.moveTo(i*40 + 20, 20);
      context.lineTo(i*40 + 20, 740);
      context.stroke();
      
      context.beginPath();
      context.moveTo(20, i*40 + 20);
      context.lineTo(740, i*40 + 20);
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
