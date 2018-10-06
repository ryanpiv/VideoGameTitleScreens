<?php
header('Content-Type: application/json');
require_once("config.php"); 

$index = $_GET['index'];

//query to get next game in list
$sql = "SELECT * FROM games where game_needs_review > 0 LIMIT " . $index . ", 1";
$result = $con->query($sql);

try {
	if (!$result) {
		print_r("Error: " . $sql . "<br>" . $con->error);
	} else {
		$json = mysqli_fetch_all($result, MYSQLI_ASSOC);
		echo json_encode($json);
	}
} catch (Exception $e) {
	die($e);
}

?>