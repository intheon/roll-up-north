<?php


if(isset($_POST["location_lat"]) && isset($_POST["location_long"]) && isset($_POST["title"]) && isset($_POST["desc"]) && isset($_POST["adder"]) && isset($_POST["rating"]))
{
	$location_lat= $_POST["location_lat"];
	$location_long = $_POST["location_long"];
	$location_name = $_POST["title"];
	$location_rating = $_POST["rating"];
	$location_description = $_POST["desc"];
	$adder_ip = $_SERVER['REMOTE_ADDR'];
	$adder_name = $_POST["adder"];

	require "db_conf.php";

	$payload = mysqli_query($connect,"INSERT INTO skatelocatons (location_name, location_rating, location_description, adder_name, adder_ip, location_long, location_lat) VALUES ('$location_name', '$location_rating', '$location_description', '$adder_name', '$adder_ip', '$location_long', '$location_lat')");

	echo "success";
}

?>