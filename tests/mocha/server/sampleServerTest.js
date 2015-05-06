if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    describe("Server initialization", function(){
      it("should have a Meteor version defined on server", function(){
        chai.assert(Meteor.release);
      });
      it("should respect equality on server", function(){
        chai.assert.equal(5,5);
      });
    });
  });
}
