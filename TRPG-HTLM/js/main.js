// Code

map = new Array();
createGrid(8,8);

var characters = new Array();
var nextTurns = new Array();
var idToIndex = {};

newCharacter(1,0,0,1,"SCO",1,function(){displayCharacter(1)});
newCharacter(2,0,1,2,"SCO",2,function(){displayCharacter(2)});
newCharacter(3,7,6,1,"GUE",3,function(){displayCharacter(3)});
newCharacter(4,7,7,2,"GUE",4,function(){displayCharacter(4)});

loadNextTurns();
