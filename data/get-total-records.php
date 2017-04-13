<?php
header('Content-Type: application/json');

$username = "pressplay";
$password = "Pc16o_A3!8Zs";
$hostname = "mysql4.gear.host";
$db = "pressplay";
$con = mysqli_connect($hostname, $username, $password, $db);

//query to see if game already exists
$sql = "SELECT count(*) as total FROM games";
$result = $con->query($sql);

try {
	if (!$result) {
		print_r("Error: " . $sql . "<br>" . $con->error);
	} else {
		$data = mysqli_fetch_assoc($result);
		echo ($data['total']);
	}
} catch (Exception $e) {
	die($e);
}

?>