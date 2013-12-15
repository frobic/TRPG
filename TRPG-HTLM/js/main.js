// Code

map = new Array();
createGrid(8,8);
player = 1;

var characters = new Array();
var nextTurns = new Array();
var idToIndex = {};

newCharacter(1,0,0,1,"SCO",1,function(){displayCharacter(1)});
newCharacter(2,2,1,1,"GUE",2,function(){displayCharacter(2)});
newCharacter(3,7,6,2,"GUE",3,function(){displayCharacter(3)});
newCharacter(4,2,0,2,"SCO",4,function(){displayCharacter(4)});
newCharacter(5,3,2,1,"ARC",5,function(){displayCharacter(5)});


displayNextTurns();
loadTurn ();