
<?php
require_once 'unirest-php-master/src/Unirest.php';

$url="http://thegamesdb.net/api/GetGamesList.php?name=halo";

$xmlinfo = simplexml_load_file($url);

echo json_encode($xmlinfo)

// These code snippets use an open-source library. http://unirest.io/php
$response = Unirest\Request::get("https://igdbcom-internet-game-database-v1.p.mashape.com/games/?fields=name&limit=10&offset=0&order=release_dates.date%3Adesc&search=zelda",
array(
"X-Mashape-Key" => "ioeZE08Y6Kmsh8cr0aIElZKR7najp1cC353jsnZPPgXXsaYQg1",
"Accept" => "application/json"
)
);

?>