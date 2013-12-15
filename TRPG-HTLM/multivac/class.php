<?php

if (!function_exists('json_decode')) {
    function json_decode($content, $assoc=false) {
        require_once 'JSON.php';
        if ($assoc) {
            $json = new Services_JSON(SERVICES_JSON_LOOSE_TYPE);
        }
        else {
            $json = new Services_JSON;
        }
        return $json->decode($content);
    }
}

if (!function_exists('json_encode')) {
    function json_encode($content) {
        require_once 'JSON.php';
        $json = new Services_JSON;
        return $json->encode($content);
    }
}

$string = file_get_contents("../js/stats.js");
$string = substr($string,8);

$statistics = json_decode($string);

echo $statistics->{"GUE"}->{"att"};

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