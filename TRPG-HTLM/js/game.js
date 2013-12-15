var cP1 = [25,150,25];
var cP2 = [25,150,25];

function character(id,x,y,own,type,nt)
{
	this.id=id;
	this.x=x;
	this.y=y;
	this.fx = x;
	this.fy = y;
	this.target = -1;
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
	this.setHp=setHp;
	
	function move (x,y) {
		this.x = x;
		this.y = y;
	}
	this.move=move;
}


function newCharacter(id,x,y,own,type,nt,c) {
	characters.push(new character(id,x,y,own,type,nt));
	var myChar = characters[characters.length-1];
	idToIndex[id] = characters.length-1;
	
	for (var i = 0 ; i < 15 ; i++) {
		nextTurns.push({"id":myChar.id,"tag":myChar.tag,"val":myChar.nt+(i+0.01)*myChar.cel,"own":myChar.own,"name":myChar.name});
	}
	map[x][y] = id;
	
	nextTurns.sort(function(a,b){return a.val-b.val})
	
	c = c || function() {}
	c();
}

function dfs (m,x,y,d,v,id) {
	if (d >= 0 && m[x] != undefined && m[x][y] != undefined && (map[x][y] == 0 || map[x][y] == id || v == 1) && m[x][y] < v) {
		m[x][y] = v;
		m = dfs(m,x-1,y,d-1,v,id);
		m = dfs(m,x+1,y,d-1,v,id);
		m = dfs(m,x,y-1,d-1,v,id);
		m = dfs(m,x,y+1,d-1,v,id);
	}
	return m;
}

function bfs (x,y,l,id) {
	var m = new Array();
	for (var i = 0 ; i < map.length ; i++) {
		m[i] = new Array();
		for (var j = 0 ; j < map[0].length; j++)
			m[i][j] = -1;
	}
	if (id != undefined) {
		var queue = new Array();
		queue.push([x,y,0]);
		var c = queue.shift();
		while(c && c[2] < l+1) {
			if (m[c[0]] != undefined && m[c[0]][c[1]] != undefined && m[c[0]][c[1]] == -1 && (map[c[0]][c[1]] == 0 || map[c[0]][c[1]] == id)) {
				m[c[0]][c[1]] = c[2];
				if (m[c[0]-1] != undefined && m[c[0]-1][c[1]] != undefined && m[c[0]-1][c[1]] == -1 && (map[c[0]-1][c[1]] == 0 || map[c[0]-1][c[1]] == id)) { queue.push([c[0]-1,c[1],c[2]+1]) }
				if (m[c[0]+1] != undefined && m[c[0]+1][c[1]] != undefined && m[c[0]+1][c[1]] == -1 && (map[c[0]+1][c[1]] == 0 || map[c[0]+1][c[1]] == id)) { queue.push([c[0]+1,c[1],c[2]+1]) }
				if (m[c[0]][c[1]-1] != undefined && m[c[0]][c[1]-1] == -1 && (map[c[0]][c[1]-1] == 0 || map[c[0]][c[1]-1] == id)) {queue.push([c[0],c[1]-1,c[2]+1]) }
				if (m[c[0]][c[1]+1] != undefined && m[c[0]][c[1]+1] == -1 && (map[c[0]][c[1]+1] == 0 || map[c[0]][c[1]+1] == id)) {queue.push([c[0],c[1]+1,c[2]+1]) }
			}
			queue.sort(function(a,b){return a[2]-b[2]});
			c = queue.shift();
		}
	}
	else {
		var queue = new Array();
		queue.push([x,y,0]);
		var c = queue.shift();
		while(c && c[2] < l+1) {
			if (m[c[0]] != undefined && m[c[0]][c[1]] != undefined && m[c[0]][c[1]] == -1) {
				m[c[0]][c[1]] = 1;
				if (m[c[0]-1] != undefined && m[c[0]-1][c[1]] != undefined && m[c[0]-1][c[1]] == -1) { queue.push([c[0]-1,c[1],c[2]+1]) }
				if (m[c[0]+1] != undefined && m[c[0]+1][c[1]] != undefined && m[c[0]+1][c[1]] == -1) { queue.push([c[0]+1,c[1],c[2]+1]) }
				if (m[c[0]][c[1]-1] != undefined && m[c[0]][c[1]-1] == -1) {queue.push([c[0],c[1]-1,c[2]+1]) }
				if (m[c[0]][c[1]+1] != undefined && m[c[0]][c[1]+1] == -1) {queue.push([c[0],c[1]+1,c[2]+1]) }
			}
			queue.sort(function(a,b){return a[2]-b[2]});
			c = queue.shift();
		}	
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
	
	var x = cha.fx;
	var y = cha.fy;
	var rd = cha.rad;
	var rg = cha.range;
	
	temp = dfs(temp,x,y,rd,2,id);
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

function moveChar (id,x,y,c) {
	cha = characters[idToIndex[id]]
	map[cha.x][cha.y] = 0
	displayMoveChar(cha.x,cha.y,x,y);
	cha.move(x,y)
	map[x][y] = cha.id
	
	c = c || function() {}
	c();
}

function loadTurn () {
	displayActionsMap(nextTurns[0].id);
	displayCard(nextTurns[0].id,"Left");
	displayTitle(nextTurns[0].own);
}

function attackChar (idatt,idadv,c) {
	cha = characters[idToIndex[idatt]]
	adv = characters[idToIndex[idadv]]
	adv.setHp(Math.max(adv.hp - cha.att,0))
	if (adv.hp == 0) {removeChar(idadv)}
	
	c = c || function() {}
	c();
}

function newTurn () {
	nextTurns.splice(0, 1)
	displayNextTurns()
}

function orderAttack () {
	cha = characters[idToIndex[nextTurns[0].id]]
	characters[idToIndex[nextTurns[0].id]].fx = cha.x
	characters[idToIndex[nextTurns[0].id]].fy = cha.y
	attackChar(cha.id,target)
	newTurn()
}

function orderSkip () {
	cha = characters[idToIndex[nextTurns[0].id]]
	characters[idToIndex[nextTurns[0].id]].fx = cha.x
	characters[idToIndex[nextTurns[0].id]].fy = cha.y
	newTurn()
}
