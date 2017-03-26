<?php
header('Content-Type: application/json');

$username = "pressplay";
$password = "Pc16o_A3!8Zs";
$hostname = "mysql4.gear.host";
$db = "pressplay";
$con = mysqli_connect($hostname, $username, $password, $db);

//query to see if game already exists
$sql = "SELECT * FROM games where game_needs_review > 0";
$result = $con->query($sql);

try {
	if (!$result) {
		print_r("Error: " . $sql . "<br>" . $con->error);
	} else {
		$json = mysqli_fetch_all ($result, MYSQLI_ASSOC);
		echo json_encode($json );
	}
} catch (Exception $e) {
	die($e);
}

?>