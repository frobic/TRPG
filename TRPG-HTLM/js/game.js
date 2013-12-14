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
		nextTurns.push({"id":myChar.id,"tag":myChar.tag,"val":myChar.nt+(i+0.01)*myChar.cel,"own":myChar.own,"name":myChar.name});
	}
	map[x][y] = id;
	
	nextTurns.sort(function(a,b){return a.val-b.val})
	
	c = c || function() {}
	c();
}

function dfs (m,x,y,d,v,id) {
	if (d >= 0 && m[x] != undefined && m[x][y] != undefined && (map[x][y] == 0 || map[x][y] == id || v == 1) && m[x][y] == 0) {
		m[x][y] = v;
		m = dfs(m,x-1,y,d-1,v,id);
		m = dfs(m,x+1,y,d-1,v,id);
		m = dfs(m,x,y-1,d-1,v,id);
		m = dfs(m,x,y+1,d-1,v,id);
	}
	
	return m;
	
}

function actionsMap(id,c) {
	var temp = new Array();
	var cha = characters[idToIndex[id]];
	for (var i = 0 ; i < map.length ; i++) {
		temp[i] = new Array();
		for (var j = 0 ; j < map[0].length; j++)
			temp[i][j] = 0;
	}
	
	var x = cha.x;
	var y = cha.y;
	var rd = cha.rad;
	var rg = cha.range;
	
	temp = dfs(temp,x,y,rd,2,1);
	for (var i = 0 ; i < temp.length ; i++) {
		for (var j = 0 ; j < temp[0].length ; j++) {
			if (temp[i][j] == 2) {
				temp = dfs(temp,i-1,j,rg-1,1,id);
				temp = dfs(temp,i+1,j,rg-1,1,id);
				temp = dfs(temp,i,j-1,rg-1,1,id);
				temp = dfs(temp,i,j+1,rg-1,1,id);
			}
		}	
	}
	
	return temp;	
}

