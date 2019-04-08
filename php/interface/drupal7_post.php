<?php
require_once 'drupal7_conn.php';
 
$sql = "SELECT * FROM   field_data_body WHERE entity_type ='node'";

$arr = array();

$res = mysqli_query($link,$sql);


if (!$res) {
	printf("Error: %s\n", mysqli_error($link));
	exit();
}

	 
while( $row = mysqli_fetch_assoc($res)){

	array_push( $arr, $row);

} 

echo json_encode($arr);


mysqli_close($link);


?>
