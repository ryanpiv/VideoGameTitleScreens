
<?php
require_once 'unirest-php-master/src/Unirest.php';

//$url="http://thegamesdb.net/api/GetGamesList.php?name=halo";

//$xmlinfo = simplexml_load_file($url);

//echo json_encode($xmlinfo)

$search = $_GET['search'];
//get search parameter from url string, add to search string on igbdcom

// These code snippets use an open-source library. http://unirest.io/php
Unirest\Request::verifyPeer(false);

$response = \Unirest\Request::get("https://igdbcom-internet-game-database-v1.p.mashape.com/games/?fields=name&limit=20&offset=0&order=release_dates.date%3Adesc&search=$search",
	array(
		"X-Mashape-Key" => "BHOdhSjm8Mmshg24IfUdtmdVyl6dp1PBHJBjsn7UnT0WIFK1g3",
		"Accept" => "application/json",
	)
);

header('Content-Type: application/json');
echo json_encode($response);

//echo $response;

//$array = $response->body;

//var_dump($array);

/*for($i=0; $i < count($array); $i++){
echo '<li>' . $array[$i]->name . PHP_EOL . '</li>';
}*/
//print_r($response->body);
//echo $array;
exit();
?>