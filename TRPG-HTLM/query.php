<?php
session_start();

include "multivac/config.php";
include "multivac/class.php";
include "multivac/bdd.php";
include "multivac/game.php";

if ($_POST['type'] == "loadgame") {
	$r = array();
	$r["p"] = $_SESSION['player'];
	
	$size = get_game_size();
	
	$r["m"] = $size[0];
	$r["n"] = $size[1];
	
	$r["characters"] = get_characters();
	
	echo json_encode($r);
}
else if ($_POST['type'] == "wait") {
	echo get_future_events($_POST['turn']);
}
else if ($_POST['type'] == "action") {
	$turn = get_turn();
	if ($_POST['action'] == "attack") {
		move_character($_POST['source'],$_POST['x'],$_POST['y']);
		attack_character($_POST['source'],$_POST['target']);
		$eventquery = 'moveChar('.$_POST['source'].','.$_POST['x'].','.$_POST['y'].');';
		$eventquery .= 'attackChar('.$_POST['source'].','.$_POST['target'].');';
		$eventquery .= 'newTurn();';		
	}
	else if ($_POST['action'] == "skip") {
		move_character($_POST['source'],$_POST['x'],$_POST['y']);
		$eventquery = 'moveChar('.$_POST['source'].','.$_POST['x'].','.$_POST['y'].');';
		$eventquery .= 'newTurn();';		
	}
	add_event($turn,$eventquery);
	
	echo "OK";
	
}
?>
