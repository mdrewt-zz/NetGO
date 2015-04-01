groupModule = (function () {
  "use strict";
  var groups = {};

  function createGroup(id) {
    groups[id] = [];
    return groups[id];
  }

  function getGroup(id) {
    if (!groups[id]) {
      createGroup(id);
    }
    return groups[id];
  }

  function addToGroup(id, stone) {
    var group = getGroup(id);
    group.push(stone);
    return group;
  }

  function deleteGroup(id) {
    delete groups[id];
  }

  function addGroups(oldID, newID) {
    var newGroup, oldGroup, i;
    newGroup = getGroup(newID);
    oldGroup = getGroup(oldID);
    for (i=0; i<oldGroup.length; i++) {
      newGroup.push(oldGroup[i]);
    }
    deleteGroup(oldID); // This may not be good
    return newGroup;
  }

  return {
    getGroup: getGroup,
    addToGroup: addToGroup,
    deleteGroup: deleteGroup,
    addGroups: addGroups
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