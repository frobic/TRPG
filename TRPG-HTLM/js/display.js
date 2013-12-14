function createGrid (n,m) {
	
	// Crée une grille vide de taille n x m
	
	var grid = document.getElementById("grid");
	
	while (grid.firstChild) {
	  grid.removeChild(grid.firstChild);
	}
	
	var fragment = document.createElement("tbody");
	for (i = 0; i < n; i++) {
		map[i] = new Array();
	    var tr = document.createElement("tr");
		for (j = 0; j < m; j++) {
			map[i][j] = 0;
	    	var td = document.createElement("td");
			tr.appendChild(td);
		}
	    fragment.appendChild(tr);
	}
	grid.appendChild(fragment);
}



function displayCharacter(chaid,c) {
	
	var cha = characters[idToIndex[chaid]];
	var sprite = $(document.createElement('span')).addClass("player"+cha.own).text(cha.tag);
	
	$("#grid tr:eq("+cha.x+") td:eq("+cha.y+")").append(sprite);
	mouseOverGridSpan(sprite);
	c = c || function() {}
	c();
}

function loadNextTurns(c) {
	var sideTurns = document.getElementById("sideTurns");
	
	while (sideTurns.firstChild) {
	  sideTurns.removeChild(sideTurns.firstChild);
	}
	
	var fragment = document.createDocumentFragment();
	for (i = 0; i < 20; i++) {
	    var div = document.createElement("div");
		div.className = "player"+nextTurns[i].own;
		div.innerHTML = nextTurns[i].tag;
	    fragment.appendChild(div);
	}
	sideTurns.appendChild(fragment);	
	
	c = c || function() {}
	c();
}

function displayCard(cha,pos,c) { 
	var p = $(document.createElement('p'))
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

function mouseOverGridSpan(s) {
	s.mouseover( function() {
		var y = $(this).parent()[0].cellIndex
		var x = $(this).parent().parent()[0].rowIndex
		var chaid = map[x][y];
		if (chaid != 0) {
			var cha = characters[idToIndex[chaid]]
			displayCard(cha,"Right");
			//actionsMap(chaid);
		}
	})
}
