

<?php

require_once("config.php"); 

$json = file_get_contents("../screens.json");
$sql = '';
$jsonIterator = new RecursiveIteratorIterator(
	new RecursiveArrayIterator(json_decode($json, TRUE)),
	RecursiveIteratorIterator::SELF_FIRST);

foreach ($jsonIterator as $key => $val) {
	if (is_array($val)) {
		//print_r(array_values($val));
		//new entry then begin new sql statement

		foreach ($val as $game => $item) {
			// print_r($item);
			// print_r($game);

			$col = '';
			$values = '';

			$numItems = count($item);
			$i = 0;

			foreach ($item as $index => $detail) {
				// print_r($index);
				// print_r($detail);

				$col .= $index;
				$values .= "'" . $detail . "'";

				if (++$i < $numItems) {
					$col .= ', ';
					$values .= ', ';
				}

			}

			// print_r($col);
			// print_r($values);
			$sql = "INSERT INTO games (" . $col . ") VALUES ( " . $values . ")";
			print_r($sql);
			if ($con->query($sql) === TRUE) {
				$last_id = $con->insert_id;
				echo "New record created successfully. Last inserted ID is: " . $last_id;
			} else {
				echo "Error: " . $sql . "<br>" . $con->error;
			}
		}

		//$sql = "INSERT INTO games (GameSeriesId, GameTitle, GameSeries, GameSeriesSequence, YoutubeUrl, YoutubeStartTime, YoutubeEndTime, ImageId, GameFormalName) VALUES (";
	}

	/*
		if ($con->query($sql) === TRUE) {
			$last_id = $con->insert_id;
			echo "New record created successfully. Last inserted ID is: " . $last_id;
		} else {
			echo "Error: " . $sql . "<br>" . $con->error;
	*/
}

/*
//1. get id for recently submitted game from games table
$sql = "SELECT last_insert_id() from pressplay.games";
$result = $con->query($sql);
if (!$result) {
echo 'Could not run query: ' . mysql_error();
} else {
if ($result->num_rows > 0) {
// output data of each row
while ($row = $result->fetch_assoc()) {
echo "id: " . $row["last_insert_id()"] . "<br>";
}
} else {
echo "0 results";
}
}*/

//2. encode image to base64

//3. insert base64 image into images table with game id

//query
//$imagePath = '../StartScreens/Gears_of_War_2/default.jpg';

// Check connection
/*if (mysqli_connect_errno())
{
echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
else {
echo "successfully connected";

$sql = "INSERT INTO games (GameSeriesId, GameTitle, GameSeries, GameSeriesSequence, YoutubeUrl, GameFormalName)
VALUES (1, 'Gears of War 3', 'Gears of War', 3, '9SmYsU0R8ko', 'Gears of War 3')";

if ($con->query($sql) === TRUE) {
$last_id = $con->insert_id;
echo "New record created successfully. Last inserted ID is: " . $last_id;
} else {
echo "Error: " . $sql . "<br>" . $con->error;
}

$con->close();

}

 */

?>