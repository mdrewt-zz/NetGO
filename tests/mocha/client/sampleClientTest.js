if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    describe("Client initialization", function(){
      it("should have a Meteor version defined on client", function(){
        chai.assert(Meteor.release);
      });
      it("should respect equality on client", function(){
        chai.assert.equal(5,5);
      });
    });
  });
}