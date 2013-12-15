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
?>
