<?php
//print_r($_FILES['file']);
//Array ( [name] => mass-effect-andromeda8.jpg [type] => image/jpeg [tmp_name] => C:\wamp\tmp\phpD9A0.tmp [error] => 0 [size] => 206306 )

header('Content-Type: application/json');
require_once("config.php"); 

$gameTitle = $_POST['gameTitle'];
$gameYoutubeUrl = $_POST['youtubeUrl'];
$gameId = $_POST['id'];
$gameSeriesSequence = $_POST['seriesSequence'];
$gameSeriesName = $_POST['seriesName'];
$gameImage = file_get_contents($_FILES['file']['tmp_name']);
$gameYoutubeStartTimeMinutes = $_POST['youtubeStartTimeMinutes'];
$gameYoutubeStartTimeSeconds = $_POST['youtubeStartTimeSeconds'];
$gameYoutubeEndTimeMinutes = $_POST['youtubeEndTimeMinutes'];
$gameYoutubeEndTimeSeconds = $_POST['youtubeEndTimeSeconds'];

//https://igdbcom-internet-game-database-v1.p.mashape.com/games/?fields=*&limit=30&search=
require_once 'unirest-php-master/src/Unirest.php';

//echo $_SERVER['REQUEST_METHOD'];
//$json = file_get_contents('php://input');
//$obj = json_decode($json, true);
//stdClass Object ( [gameTitle] => LSD: Dream Emulator [youtubeUrl] => https://www.youtube.com/watch?v=WJnxVwUfRtk [id] => 9235 )

// These code snippets use an open-source library. http://unirest.io/php
Unirest\Request::verifyPeer(false);

// These code snippets use an open-source library. http://unirest.io/php
$response = Unirest\Request::get("https://api-endpoint.igdb.com/games/?fields=name%2Cfirst_release_date%2Cslug%2Cid&limit=10&offset=0&order=release_dates.date%3Adesc&search=" . $gameTitle,
	array(
		//"X-Mashape-Key" => "BHOdhSjm8Mmshg24IfUdtmdVyl6dp1PBHJBjsn7UnT0WIFK1g3",
		"user-key" => "f361f5b194a92307ed96c8820749ef8f",
		"Accept" => "application/json",
	)
);

//query to see if game already exists
$sql = "SELECT * FROM games where game_formal_name='" . $gameTitle . "'";
$result = $con->query($sql);

try {
	if (!$result) {
		print_r("Error: " . $sql . "<br>" . $con->error);
	} else {
		foreach ($response->body as $item => $game) {
			//print_r($game);
			$row = mysqli_fetch_assoc($result);
			while ($row = mysqli_fetch_assoc($result)) {
				if ($row['game_title'] != $game->slug) {
					die('Game already exists.');
				}

			}
			if ($game->id == $gameId) {
				//print_r($game);
				$gameTitle = $game->slug;
				$gameFormalName = $game->name;

				$gameFolderName = '../StartScreens/' . $game->slug;
				//create folder and store image here
				if (!file_exists($gameFolderName)) {
					mkdir($gameFolderName);
				}
				move_uploaded_file($_FILES['file']['tmp_name'], $gameFolderName . '/default.jpg');

				//need to change string to be from root dir
				$gameFolderName = 'StartScreens/' . $game->slug . '/default.jpg';

				$sql = "INSERT INTO games (game_title, game_formal_name, game_youtube_link, game_still_path, game_series_sequence, game_series_name, game_youtube_start_time_minutes, game_youtube_start_time_seconds, game_youtube_end_time_minutes, game_youtube_end_time_seconds) VALUES ( '" . $gameTitle . "', '" . $gameFormalName . "', '" . $gameYoutubeUrl . "', '" . $gameFolderName . "', '" . $gameSeriesSequence . "', '" . $gameSeriesName . "', " . intval($gameYoutubeStartTimeMinutes) . ", " . intval($gameYoutubeStartTimeSeconds) . ", " . intval($gameYoutubeEndTimeMinutes . ", " . intval($gameYoutubeEndTimeSeconds) . ")";
				//print_r($sql);
				if ($con->query($sql) === TRUE) {
					$last_id = $con->insert_id;
					header('Content-type: application/json');
					echo "New record created successfully. Last inserted ID is: " . $last_id;
				} else {
					die($con->error);
				}
			}

		}
	}
} catch (Exception $e) {
	die($e);
}

?>