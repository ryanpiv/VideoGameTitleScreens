<?php

// never assume the upload succeeded
if ($_FILES['file']['error'] !== UPLOAD_ERR_OK) {
	die("Upload failed with error code " . $_FILES['file']['error']);
}

$info = getimagesize($_FILES['file']['tmp_name']);
if ($info === FALSE) {
	die("Unable to determine image type of uploaded file");
}

if (($info[2] !== IMAGETYPE_GIF) && ($info[2] !== IMAGETYPE_JPEG) && ($info[2] !== IMAGETYPE_PNG)) {
	die("Not a gif/jpeg/png");
}

$ds = DIRECTORY_SEPARATOR; //1

$storeFolder = 'uploads'; //2

if (!empty($_FILES)) {

	$tempFile = $_FILES['file']['tmp_name']; //3

	$targetPath = dirname(__FILE__) . $ds . $storeFolder . $ds; //4

	$targetFile = $targetPath . $_FILES['file']['name']; //5

	move_uploaded_file($tempFile, $targetFile); //6

}

?>

