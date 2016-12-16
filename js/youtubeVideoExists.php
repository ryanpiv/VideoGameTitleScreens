<?php

$videoID = $_GET['videoID'];
$key = 'AIzaSyDQMMu2up2rc9UzS0gy0t960HiSPx0sdKk';

$response = file_get__contents('https://www.googleapis.com/youtube/v3/videos?part=id&id=' . $videoID . '&key=' . $apiPublicKey);
$json = json_decode($response);

if (sizeof($json['items'])) {
	// video exists
	echo true;
} else {
	// video does not exist
	echo false;
}

?>