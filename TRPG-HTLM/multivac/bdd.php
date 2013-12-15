<?php

function reset_game($n,$m) {
    $query = "UPDATE trpg_games SET `turn` = 0, `n` = $n, `m` = $m WHERE `id` = 1";
	mysql_query($query) or die(mysql_error());
    $query = "DELETE FROM trpg_characters";
	mysql_query($query);
	$query = "DELETE FROM trpg_events";
	mysql_query($query);
}

function add_character($x,$y,$hp,$nextTurn,$owner,$class) {
	$query = "INSERT trpg_characters VALUES ('',$owner,$hp,$nextTurn,$x,$y,'$class' )";
	mysql_query($query);
}

function edit_character($id,$x,$y,$hp,$nextTurn) {
	if ($hp>0) $query = "UPDATE trpg_characters SET `x` = $x,`y` = $y,`hp` = $hp,`nextTurn` = $nextTurn WHERE `id` = $id";
	else $query = "DELETE FROM trpg_characters WHERE `id` = $id";
	mysql_query($query);
}

function get_characters() {
	$query = "SELECT * FROM trpg_characters";
	$result = mysql_query($query);
	$cha = array();
	$i = 0 ;
	while($row = mysql_fetch_array($result)) {
		$cha[$i] = array();
		$cha[$i]["id"] = $row["id"];
		$cha[$i]["x"] = $row["x"];
		$cha[$i]["y"] = $row["y"];
		$cha[$i]["own"] = $row["owner"];
		$cha[$i]["type"] = $row["class"];
		$cha[$i]["hp"] = $row["hp"];
		$cha[$i]["nt"] = $row["nextTurn"];
		$i++;
	}
	
	return $cha;
	
}

function add_event($event) {
	$query = "INSERT trpg_events VALUES ('','$event')";
	mysql_query($query);
}

function get_game_size() {
	$query = "SELECT * FROM trpg_games WHERE `id` = 1 LIMIT 1";
	$result = mysql_query($query);
	$row = mysql_fetch_array($result);
	
	return array($row["m"],$row["n"]);
}

?>