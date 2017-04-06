<?php
header('Content-Type: application/json');

$username = "pressplay";
$password = "Pc16o_A3!8Zs";
$hostname = "mysql4.gear.host";
$db = "pressplay";
$con = mysqli_connect($hostname, $username, $password, $db);

$id = $_GET['id'];

//query to get next game in list
$sql = "DELETE FROM games where game_id = " . (int) $id;
$result = $con->query($sql);

try {
	if (!$result) {
		print_r("Error: " . $sql . "<br>" . $con->error);
	} else {
		echo $result;
		//$json = mysqli_fetch_all($result, MYSQLI_ASSOC);
		//echo json_encode($json);
	}
} catch (Exception $e) {
	die($e);
}

?>