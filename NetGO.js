if (Meteor.isClient) {
  $('document').ready(function() {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
  
    
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
