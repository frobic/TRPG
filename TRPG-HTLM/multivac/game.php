<?php
function start_new_game() {
	reset_game(8,10);
	$statistics = $GLOBALS["statistics"];

	add_character(1,1,$statistics->{'SCO'}->{'hp'},1+0.01*$statistics->{'SCO'}->{'cel'},1,"SCO");
	add_character(6,8,$statistics->{'SCO'}->{'hp'},2+0.01*$statistics->{'SCO'}->{'cel'},2,"SCO");
	add_character(0,1,$statistics->{'GUE'}->{'hp'},3+0.01*$statistics->{'GUE'}->{'cel'},1,"GUE");
	add_character(7,8,$statistics->{'GUE'}->{'hp'},4+0.01*$statistics->{'GUE'}->{'cel'},2,"GUE");
	add_character(0,0,$statistics->{'ARC'}->{'hp'},5+0.01*$statistics->{'ARC'}->{'cel'},1,"ARC");
	add_character(7,9,$statistics->{'ARC'}->{'hp'},6+0.01*$statistics->{'ARC'}->{'cel'},2,"ARC");
}
?>