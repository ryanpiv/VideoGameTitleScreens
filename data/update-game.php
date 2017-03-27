<?php
$json = json_decode(file_get_contents('php://input'));

header('Content-Type: application/json');

$username = "pressplay";
$password = "Pc16o_A3!8Zs";
$hostname = "mysql4.gear.host";
$db = "pressplay";
$con = mysqli_connect($hostname, $username, $password, $db);

//query to see if game already exists
$sql = "update pressplay.games
set game_title = '" . $json->gametitle . "', game_series_name = '" . $json->gameseriesname ."', game_series_sequence = '" . $json->gameseriessequence . "', game_formal_name = '" . $json->gamename . "', game_youtube_link = '" . $json->gameyoutubeurl . "', game_youtube_start_time = '" . $json->gameyoutubestarttime . "', game_youtube_end_time = '" . $json->gameyoutubeendtime . "', game_needs_review=0 where game_id = '" . $json->gameid . "'";


$result = $con->query($sql);

if (!$result) {
	print_r("Error: " . $sql . "<br>" . $con->error);
}
else {
	echo($result);
}


?>