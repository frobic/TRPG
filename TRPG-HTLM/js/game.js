var cP1 = [25,150,25];
var cP2 = [25,150,25];

function loadGame() {
	
	$.post( "query.php", { type: "loadgame" }, function(g) {
		player = parseInt(g.p);
		map = new Array();
		retour = g;
		createGrid (parseInt(g.n),parseInt(g.m));
		for (var i = 0 ; i < g.characters.length ; i++) {
			newCharacter (parseInt(g.characters[i].id),parseInt(g.characters[i].x),parseInt(g.characters[i].y),parseInt(g.characters[i].own),g.characters[i].type,parseFloat(g.characters[i].nt))
			characters[characters.length-1].setHp(parseInt(g.characters[i].hp))
			displayCharacter(parseInt(g.characters[i].id))
		}
		displayNextTurns();
		loadTurn ();
	}, "json");
}

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
	this.att=stats[type].att;
	this.hp=stats[type].hp;
	this.hpmax=stats[type].hpmax;
	this.cel=stats[type].cel;
	this.tag = stats[type].tag;
	this.rad = stats[type].rad;
	this.range = stats[type].range;
	this.name = stats[type].name;
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
	
	for (var i = 0 ; i < 15 ; i++)
		nextTurns.push({"id":myChar.id,"tag":myChar.tag,"val":myChar.nt+i*myChar.cel,"own":myChar.own,"name":myChar.name});
	map[x][y] = id;
	
	nextTurns.sort(function(a,b){return a.val-b.val})
	
	c = c || function() {}
	c();
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

function dfs (m,x,y,d,v,id) {
	if (d >= 0 && m[x] != undefined && m[x][y] != undefined && (map[x][y] == 0 || map[x][y] == id || v == 1) && m[x][y] <= v) {
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
	displayOrders();
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
	victory()
	cha = characters[idToIndex[nextTurns[0].id]]
	nextTurns.push({"id":cha.id,"tag":cha.tag,"val":cha.nt+15*cha.cel,"own":cha.own,"name":cha.name});
	characters[idToIndex[nextTurns[0].id]].nt = cha.nt + cha.cel
	nextTurns.splice(0, 1)
	displayNextTurns()
	displayActionsMap(nextTurns[0].id)
}

function orderAttack () {
	cha = characters[idToIndex[nextTurns[0].id]]
	characters[idToIndex[nextTurns[0].id]].fx = cha.x
	characters[idToIndex[nextTurns[0].id]].fy = cha.y
	attackChar(cha.id,cha.target)
	newTurn()
}

function orderSkip () {
	cha = characters[idToIndex[nextTurns[0].id]]
	characters[idToIndex[nextTurns[0].id]].fx = cha.x
	characters[idToIndex[nextTurns[0].id]].fy = cha.y
	newTurn()
}

function numberAlive(p) {
	var temp = 0
	for (var i = 0 ; i < characters.length ; i++) {
		if (characters[i].hp != 0 && characters[i].own == p) {temp++}
	}
	return temp
}

function victory() {
	var p = nextTurns[0].own
	if (numberAlive(3-p) == 0) {
		$('#toPlay').text("Victoire du joueur "+p);
		$("#menu").empty()
		}
}

