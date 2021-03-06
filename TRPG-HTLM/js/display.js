function createGrid (n,m) {
	
	// Crée une grille vide de taille n x m, initialise la map et bind une fonction sur le td
	
	var grid = $('#grid')
	
	grid.empty();
	
	var fragment = $(document.createElement("tbody"));
	for (i = 0; i < n; i++) {
		map[i] = new Array();
	    var tr = $(document.createElement("tr"));
		for (j = 0; j < m; j++) {
			map[i][j] = 0;
	    	var td = $(document.createElement("td"));
			mouseClickGrid(td);
			tr.append(td);
		}
	    fragment.append(tr);
	}
	grid.append(fragment);
}

function displayCharacter(chaid,c) {
	
	// Affiche un personnage sur la carte, bind un mouseover sur lui
	
	var cha = characters[idToIndex[chaid]];
	var sprite = $(document.createElement('span')).addClass("player"+cha.own).text(cha.tag);
	
	$("#grid tr:eq("+cha.x+") td:eq("+cha.y+")").append(sprite);
	mouseOverGridSpan(sprite);
	c = c || function() {}
	c();
}

function displayNextTurns(c) {
	
	// Affiche le menu des prochains tours
	
	var sideTurns = $("#sideTurns");
	sideTurns.empty()
	
	for (i = 0; i < 15; i++) {
	    var div = $(document.createElement("div"));
		div.addClass("player"+nextTurns[i].own);
		div.text(nextTurns[i].name);
	    sideTurns.append(div);
		mouseOverNextTurn(div,i);
	}
		
	c = c || function() {}
	c();
}

function displayCard(chaid,pos,c) {
	
	// Affiche la fiche de caractère, pos : Left ou Right
	
	var cha = characters[idToIndex[chaid]];
	var p = $(document.createElement('p')).addClass("player"+cha.own)
	var ligne = $(document.createElement('span')).text(""+cha.name+" (Joueur "+cha.own+")").append('<br />');
		p.append(ligne);
	var ligne = $(document.createElement('span')).text("PV : "+cha.hp).append('<br />');
		p.append(ligne);
	var ligne = $(document.createElement('span')).text("Dégâts : "+cha.att).append('<br />');
		p.append(ligne);
	
	$("#cb"+pos).empty();
	$("#cb"+pos).append(p);
	
	c = c || function() {}
	c();
}

function displayActionsMap(chaid,c) {
	
	// Affiche la carte des mouvements, attaque d'un personnage
	
	var actmap = actionsMap(chaid);
	var cha = characters[idToIndex[chaid]];
	for (i = 0; i < map.length; i++) {
		for (j = 0; j < map[0].length; j++) {
			$("#grid tr:eq("+i+") td:eq("+j+")").removeClass()
			if (map[i][j] > 0) {adv = characters[idToIndex[map[i][j]]].own} else {adv = cha.own}
			if (actmap[i][j] == 1 && adv != cha.own) {
				$("#grid tr:eq("+i+") td:eq("+j+")").addClass("fight")
			}
			else if (actmap[i][j] == 1) {
				$("#grid tr:eq("+i+") td:eq("+j+")").addClass("att"+cha.own) 
			}
			else if (actmap[i][j] == 2) {
				$("#grid tr:eq("+i+") td:eq("+j+")").addClass("move"+cha.own) 
			}
		}
		$("#grid tr:eq("+cha.fx+") td:eq("+cha.fy+")").removeClass();
		$("#grid tr:eq("+cha.fx+") td:eq("+cha.fy+")").addClass("position");
	}
	
	c = c || function() {}
	c();
}

function displayMoveChar(xd,yd,x,y,c) {
	
	// Déplace le personnage sur la carte (visuel seulement)
	
	$("#grid td").removeClass();
	var temp = $("#grid tr:eq("+xd+") td:eq("+yd+")");
	$("#grid tr:eq("+x+") td:eq("+y+")").append(temp.children()[0]);
	
	c = c || function() {}
	c();
	
}


function displayTitle(i,c) {
	
	// Affiche le message en haut de la grille
	
	$('#toPlay').text("Tour du joueur "+i);
	
	c = c || function() {}
	c();
}


function displayOrders() {
	
	// Affiche le menu des actions disponnibles.
	
	$("#menu").empty();
	var cha = characters[idToIndex[nextTurns[0].id]];
	if (player == nextTurns[0].own) {
		var button = $(document.createElement('button')).text("Tour suivant").click(function () {orderSkip()});
		$("#menu").append(button);
		if (cha.target != -1 && characters[idToIndex[cha.target]].own != player) {
			button = $(document.createElement('button')).text("Attaquer").click(function () {orderAttack()});
			$("#menu").append(button);
		}
	}
}

function removeChar (chaid) {
	
	// Enlève le personnage de la map, et des prochains tours
	
	cha = characters[idToIndex[chaid]]
	map[cha.x][cha.y] = 0;
	$("#grid tr:eq("+cha.x+") td:eq("+cha.y+")").empty();
	for(var i = nextTurns.length - 1; i >= 0; i--) {
		if (nextTurns[i].id == cha.id) {
			nextTurns.splice(i, 1);
		}
	}
	displayNextTurns()
}


function mouseOverGridSpan(s) {
	
	// Fonction de passage sur un personnage, affiche la carte des actions possibles du personnage
	
	s.mouseover( function() {
		var y = $(this).parent()[0].cellIndex
		var x = $(this).parent().parent()[0].rowIndex
		var chaid = map[x][y];
		if (chaid != 0) {
			var cha = characters[idToIndex[chaid]]
			displayCard(cha.id,"Right");
			displayActionsMap(chaid);
		}
	})
	s.mouseout(function() {
		displayActionsMap(nextTurns[0].id);
	})
}

function mouseClickGrid(s) {
	
	// Fonction bind sur le click d'une case, déplace le personnage si autorisé et propose le menu d'actions si attaque
	
	s.click( function() {
		var y = $(this)[0].cellIndex
		var x = $(this).parent()[0].rowIndex
		var cha = characters[idToIndex[nextTurns[0].id]]
		var chaid = idToIndex[nextTurns[0].id];
		characters[chaid].target = -1;
		if (nextTurns[0].own == player) {
			aM = actionsMap(nextTurns[0].id);
			if (aM[x][y]==2) {
				moveChar(cha.id,x,y);
				displayActionsMap(nextTurns[0].id);
			}
			if (aM[x][y]==1 && map[x][y] != 0) {
				characters[chaid].target = map[x][y];
				var distanceCase = bfs(cha.x,cha.y,cha.rad,cha.id);
				var caseTouchable = bfs(x,y,cha.range);
				var xp = cha.x
				var yp = cha.y
				var temp = cha.rad+1
				for (i = 0; i < map.length; i++) {
					for (j = 0; j < map[0].length; j++) {
						if (caseTouchable[i][j] == 1 && temp > distanceCase[i][j] && distanceCase[i][j] != -1) {
							xp = i
							yp = j
							temp = distanceCase[i][j]
						}
					}
				}
				moveChar(cha.id,xp,yp);
				displayActionsMap(nextTurns[0].id);
			}
		}
		displayOrders();
	})
}

function mouseOverNextTurn(s,rank) {
	
	// Affiche la Action map correspondante au personnage ainsi que sa fiche.
	
	s.mouseover( function() {
		var chaid = nextTurns[rank].id
		if (chaid != 0) {
			var cha = characters[idToIndex[chaid]]
			displayCard(cha.id,"Right");
			displayActionsMap(chaid);
		}
	})
	s.mouseout(function() {
		displayActionsMap(nextTurns[0].id);
	})
}