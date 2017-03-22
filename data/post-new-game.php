<?php

//https://igdbcom-internet-game-database-v1.p.mashape.com/games/?fields=*&limit=30&search=
require_once 'unirest-php-master/src/Unirest.php';

//echo $_SERVER['REQUEST_METHOD'];
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
//stdClass Object ( [gameTitle] => LSD: Dream Emulator [youtubeUrl] => https://www.youtube.com/watch?v=WJnxVwUfRtk [id] => 9235 )

// These code snippets use an open-source library. http://unirest.io/php
Unirest\Request::verifyPeer(false);

$response = \Unirest\Request::get("https://igdbcom-internet-game-database-v1.p.mashape.com/games/?fields=name%2Cfirst_release_date&limit=30&search=" . rawurlencode($obj['gameTitle']),
	array(
		"X-Mashape-Key" => "BHOdhSjm8Mmshg24IfUdtmdVyl6dp1PBHJBjsn7UnT0WIFK1g3",
		"Accept" => "application/json",
	)
);

header('Content-Type: application/json');

foreach ($response as $item => $game[0]) {
	print_r($game);
}

?>