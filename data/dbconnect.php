

<?php

$username = "pressplay";
$password = "Pc16o_A3!8Zs";
$hostname = "mysql4.gear.host"; 
$db = "pressplay";

$con = mysqli_connect($hostname,$username,$password,$db);

$json = file_get_contents("../screens.json");
$sql = '';
$jsonIterator = new RecursiveIteratorIterator(
    new RecursiveArrayIterator(json_decode($json, TRUE)),
    RecursiveIteratorIterator::SELF_FIRST);

foreach ($jsonIterator as $key => $val) {
    if(is_array($val)) {
    	//new entry then begin new sql statement
    	$sql = "INSERT INTO games (GameSeriesId, GameTitle, GameSeries, GameSeriesSequence, YoutubeUrl, YoutubeStartTime, YoutubeEndTime, ImageId, GameFormalName) VALUES (";
    	$col = '';
    	$values = '';
    } else {
    	//else, add to the sql statement
    	switch ($val) {
    		case 'game_title':
    			$col += 'GameTitle, ';
    			$values += $val + ' ,';
    			break;
    		case 'game_series_name': 
    			$col += 'GameSeries, ';
    			$values += $val + ' ,';
    			break;
    		case 'game_series_sequence':
    			$col += 'GameSeriesSequence, ';
    			$values += $val + ' ,';
    			break;
    		case 'game_youtube_link':
    			$col += 'YoutubeUrl, ';
    			$values += $val + ' ,';
    			break;
    		case 'game_youtube_start_time':
    			$col += 'YoutubeStartTime, ';
    			$values += $val + ' ,';
    			break;
    		case 'game_youtube_end_time':
    			$col += 'YoutubeEndTime, ';
    			$values += $val + ' ,';
    			break;
    		case 'game_still_path':
    			//images
    			break;
    		
    	}
    }
}

/*

//1. get id for recently submitted game from games table
$sql = "SELECT last_insert_id() from pressplay.games";
$result = $con->query($sql);
if(!$result){
	echo 'Could not run query: ' . mysql_error();
} else {
	if ($result->num_rows > 0) {
    	// output data of each row
	    while($row = $result->fetch_assoc()) {
	        echo "id: " . $row["last_insert_id()"]. "<br>";
	    }
	} else {
	    echo "0 results";
	}
} */

//2. encode image to base64

//3. insert base64 image into images table with game id

//query
$imagePath = '../StartScreens/Gears_of_War_2/default.jpg';


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