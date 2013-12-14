function createGrid (n,m) {
	
	// Crée une grille vide de taille n x m
	
	var grid = document.getElementById("grid");
	
	while (grid.firstChild) {
	  grid.removeChild(grid.firstChild);
	}
	
	var fragment = document.createDocumentFragment();
	for (i = 0; i < n; i++) {
	    var tr = document.createElement("tr");
		for (j = 0; j < m; j++) {
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

function displayCard() { }