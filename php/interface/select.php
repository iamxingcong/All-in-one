<?php

require_once 'conn.php';
 	
 	 
$sql = "SELECT * FROM users ORDER by user_id DESC LIMIT 40";

$arr = array();

$res = mysqli_query($link,$sql);
	 
while( $row = mysqli_fetch_assoc($res)){

	array_push( $arr, $row);

} 

echo json_encode($arr);


mysqli_close($link);

?>
