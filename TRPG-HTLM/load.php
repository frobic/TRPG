<?php
session_start();

include "multivac/config.php";
include "multivac/class.php";
include "multivac/bdd.php";
include "multivac/game.php";

if (isset($_POST['reset'])) {
	start_new_game();
	header('Location: game.html');
}
else if (isset($_POST['player'])) {
	$_SESSION['player'] = $_POST['player'];
	header('Location: game.html');
}
?>
