groupModule = (function () {
  "use strict";
  
  // Groups will be stored as an object with the {LOCATION : [stone1, stone2... stoneN]} format
  var groups = {};

  // Create an empty group of stones.
  function createGroup(id) {
    groups[id] = [];
    return groups[id];
  }

  // Returns the array of stones in a group
  function getGroup(id) {
    if (!groups[id]) {
      createGroup(id);
    }
    return groups[id];
  }

  // Adds a stone to the group
  function addToGroup(id, stone) {
    var group = getGroup(id);
    group.push(stone); // validate that stone.group == id?
    return group;
  }

  // Removes a group
  // Should be done to old groups after combining them or capturing them.
  function deleteGroup(id) {
    delete groups[id];
  }

  // 
  function addGroups(oldID, newID) {
    var newGroup, oldGroup, i;
    newGroup = getGroup(newID);
    oldGroup = getGroup(oldID);
    for (i=0; i<oldGroup.length; i++) {
      newGroup.push(oldGroup[i]); // Javascript uses pointers so overwriting group[newID] should be unnecessary
    }
    deleteGroup(oldID);
    return newGroup;
  }
  
  function reset() {
    groups = {};
  }

  // The public interface for interacting with the groups object
  return {
    getGroup: getGroup,
    addToGroup: addToGroup,
    deleteGroup: deleteGroup,
    addGroups: addGroups,
    reset: reset
  };

}());

// tests

// console.log(groupModule.getGroup("1").constructor === Array);
// console.log(groupModule.getGroup("1").length === 0);
// console.log(groupModule.addToGroup("1", {location: "A1"}).length === 1);
// console.log(groupModule.getGroup("1").length === 1);
// groupModule.addToGroup("2", {location: "B1"});
// groupModule.addGroups("1", "2");
// console.log(groupModule.getGroup("1").length === 0);
// console.log(groupModule.getGroup("2").length === 2);
// groupModule.deleteGroup("2")
// console.log(groupModule.getGroup("2").length === 0);