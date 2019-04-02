<?php
require_once 'wordpress_conn.php';
 
$sql = "SELECT * FROM wp_posts WHERE post_status = 'publish' ORDER by ID DESC LIMIT 40";

$arr = array();

$res = mysqli_query($link,$sql);
	 
while( $row = mysqli_fetch_assoc($res)){

	array_push( $arr, $row);

} 

echo json_encode($arr);


 
mysqli_close($link);


?>
