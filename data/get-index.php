<?php

require_once("config.php"); 

$sql = "SELECT * FROM games where game_needs_review = 0";

$result = $con->query($sql);

if (!$result) {
	die("Error: " . $sql . "<br>" . $con->error);
} else {
	//$output ='<div id="Container" class="hover-cont"><div class="row">'
	$output = '<div id="Container-mix" class="hover-cont row">';
	while ($row = mysqli_fetch_assoc($result)) {
		//handle rows.
		//print_r($row);

		$output .= '<div class="col-6 col-lg-3 mix" data-myorder="' . $row['game_series_name'] . ' ' . $row['game_series_sequence'] . '"><div class="game-item hover-out" onmouseover="lowerOpacity(this)" onmouseout="raiseOpacity(this)" ';
		$output .= 'style="background-image:url(' . $row['game_still_path'] . ')"';
		$output .= ' data-game-title="' . $row['game_title'] . '"';
		$output .= ' data-game-series-name="' . $row['game_series_name'] . '"';
		$output .= ' data-game-series-sequence="' . $row['game_series_sequence'] . '"';
		$output .= ' data-game-path="' . $row['game_video_path'] . '"';
		$output .= ' data-game-background-color="' . $row['game_background_color'] . '"';
		$output .= ' data-game-formal-name="' . strtoupper($row['game_formal_name']) . '"';
		$output .= ' data-game-audio-path="' . $row['game_audio_path'] . '"';
		$output .= ' data-game-youtube-link="' . $row['game_youtube_link'] . '"';
		$output .= ' data-game-youtube-start-time-="' . $row['game_youtube_start_time_seconds'] . '"';
		$output .= ' data-game-path-intro="' . $row['game_video_path_intro'] . '">';
		$output .= '</div><div class="game-title hover-in">' . $row['game_formal_name'] . '</div></div>';

	}
	$output .= "</div>";
	echo ($output);
}

?>