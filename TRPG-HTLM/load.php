<?php
session_start();
include("multivac/allincludes.php");
if ($_POST['reset']) {
	start_new_game();
}
?>

<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>Pick Your Player</title>
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width">

	<link rel="stylesheet" href="css/normalize.min.css">
	<link rel="stylesheet" href="css/main.css">

	<script src="js/vendor/modernizr-2.6.2.min.js"></script>
</head>
	<body>
		<!--[if lt IE 7]>
			<p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
		<![endif]-->
		<div class="corpus">
			
			<form action="load.php" method="POST">
				<input type="hidden" name="player" value="1">
				<input type="submit" value="Joueur 1">
			</form>
			<form action="load.php" method="POST">
				<input type="hidden" name="player" value="2">
				<input type="submit" value="Joueur 2">
			</form>
			<form action="load.php" method="POST">
				<input type="hidden" name="reset" value="1">
				<input type="submit" value="Reset">
			</form>
		</div>
	
		<script src="js/vendor/jquery-1.10.1.min.js"></script>
		<script src="js/plugins.js"></script>
	</body>
</html>
