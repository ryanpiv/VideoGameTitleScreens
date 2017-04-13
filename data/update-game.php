<?php
//$json = json_decode(file_get_contents('php://input'));

$gameId = $_POST['gameid'];
$gameName = $_POST['gamename'];
$gameTitle = $_POST['gametitle'];
$gameSeriesSequence = $_POST['gameseriessequence'];
$gameSeriesName = $_POST['gameseriesname'];
$gameImage = '';
try {
	$gameImage = @file_get_contents($_FILES['file']['tmp_name']);
} catch (Exception $e) {

};
$gameYoutubeUrl = $_POST['gameyoutubelink'];
$gameYoutubeStartTimeMinutes = $_POST['gameyoutubestarttimeminutes'];
$gameYoutubeStartTimeSeconds = $_POST['gameyoutubestarttimeseconds'];
$gameYoutubeEndTimeMinutes = $_POST['gameyoutubeendtimeminutes'];
$gameYoutubeEndTimeSeconds = $_POST['gameyoutubeendtimeseconds'];

$gameFolderName = '../StartScreens/' . $gameTitle;

header('Content-Type: application/json');

$username = "pressplay";
$password = "Pc16o_A3!8Zs";
$hostname = "mysql4.gear.host";
$db = "pressplay";
$con = mysqli_connect($hostname, $username, $password, $db);

if ($gameImage != '') {
	move_uploaded_file($_FILES['file']['tmp_name'], $gameFolderName . '/default.jpg');
}

$gameFolderName = 'StartScreens/' . $gameTitle . '/default.jpg';

$sql = "update pressplay.games
set game_title = '" . $gameTitle . "', game_series_name = '" . $gameSeriesName . "', game_series_sequence = '" . $gameSeriesSequence . "', game_formal_name = '" . $gameName . "', game_youtube_link = '" . $gameYoutubeUrl . "', game_youtube_start_time_minutes = " . intval($gameYoutubeStartTimeMinutes) . ", game_youtube_start_time_seconds = " . intval($gameYoutubeStartTimeSeconds) . ", game_youtube_end_time_minutes = " . intval($gameYoutubeEndTimeMinutes) . ", game_youtube_end_time_seconds = " . intval($gameYoutubeEndTimeSeconds) . ", game_needs_review=0";

if ($gameImage != '') {
	$sql .= ", game_still_path='" . $gameFolderName . "'";
}
$sql .= " where game_id = '" . $gameId . "'";

$result = $con->query($sql);

if (!$result) {
	print_r("Error: " . $sql . "<br>" . $con->error);
} else {
	echo ($result);
}

?>