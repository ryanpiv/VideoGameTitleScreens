
<?php
require_once 'unirest-php-master/src/Unirest.php';

//$url="http://thegamesdb.net/api/GetGamesList.php?name=halo";

//$xmlinfo = simplexml_load_file($url);

//echo json_encode($xmlinfo)

$search = $_GET['search'];
$id = $_GET['id'];
//get search parameter from url string, add to search string on igbdcom

// These code snippets use an open-source library. http://unirest.io/php
Unirest\Request::verifyPeer(false);

$response = \Unirest\Request::get("https://igdbcom-internet-game-database-v1.p.mashape.com/collections/". $search . "?fields=*",
	array(
		"X-Mashape-Key" => "BHOdhSjm8Mmshg24IfUdtmdVyl6dp1PBHJBjsn7UnT0WIFK1g3",
		"Accept" => "application/json",
	)
);


foreach($response->body as $item=>$value){
	for($i = 0; $i < count($value->games); $i++){
		if($value->games[$i] == $id){
			$value->seriesSequence = $i;
		}
	}
}

header('Content-Type: application/json');
echo json_encode($response);
exit();
?>