<?php

require "db_conf.php";

$data = mysqli_query($connect,"SELECT location_name, location_rating, location_description, adder_name, location_long, location_lat FROM skatelocations");

$json = array();

while($row = mysqli_fetch_assoc($data))
{
	$json[] =  $row;
}

mysqli_close($connect);

echo json_encode($json);

?>