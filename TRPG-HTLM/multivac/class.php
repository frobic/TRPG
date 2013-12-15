<?php

class Game {
    
	var $turn;
	var $characters;
	
	function Game($turn,$characters) {
		$this->turn = $turn;
		$this->characters = $characters;
	}
	
}

class Characters {
	var $id, $owner, $hp, $nextTurn, $x, $y, $class;
	
	function Characters($id, $owner, $hp, $nextTurn, $x, $y, $class) {
		$this->id = $id;
		$this->owner = $owner;
		$this->hp = $hp;
		$this->nextTurn = $nextTurn;
		$this->x = $x;
		$this->y = $y;
		$this->class = $class;
	}	
}

?>