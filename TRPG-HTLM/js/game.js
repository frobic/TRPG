var cP1 = [25,150,25];
var cP2 = [25,150,25];

function character(id,x,y,own,type,nt)
{
	this.id=id;
	this.x=x;
	this.y=y;
	this.own=own;
	this.nt=nt;
	if (type == "GUE") {
		this.att=5;
		this.hp=10;
		this.hpmax=15;
		this.cel=30;
		this.tag = "GUE";
		this.rad = 1;
		this.range = 1;
		this.name = "Guerrier"
	}
	else if (type == "SCO") {
		this.att=3;
		this.hp=6;
		this.hpmax=10;
		this.cel=20;
		this.tag = "SCO";
		this.rad = 2;
		this.range = 1;
		this.name = "Eclaireur"
	}
	function setHp (x) {
		this.hp = x
	}
}


function newCharacter(id,x,y,own,type,nt,c) {
	characters.push(new character(id,x,y,own,type,nt));
	var myChar = characters[characters.length-1];
	idToIndex[id] = characters.length-1;
	
	for (var i = 0 ; i < 20 ; i++) {
		nextTurns.push({"id":myChar.id,"tag":myChar.tag,"val":myChar.nt+(i+0.01)*myChar.cel,"own":myChar.own});
	}
	map[x][y] = id;
	
	nextTurns.sort(function(a,b){return a.val-b.val})
	
	c = c || function() {}
	c();
}

function actionsMap(id,c) {
	var cha = characters[idToIndex[id]];
}

