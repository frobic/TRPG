<pre>
<?php
include("config.php");

function reset_game() {
    $query = "UPDATE trpg_games SET `turn` = 0 WHERE `id` = 1";
	mysql_query($query);
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

function add_event($event) {
	$query = "INSERT trpg_events VALUES ('','$event')";
	mysql_query($query);
}

function get_game() {

}

//add_character(1,2,8,14,1,"GUE");
//edit_character(5,1,2,0,14);

mysql_close();
?>
</pre>