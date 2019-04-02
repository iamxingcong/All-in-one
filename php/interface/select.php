<?php

define('DB_SERVER','localhost');
define('DB_USER','root');
define('DB_PASSWORD','');
define('DB_NAME','dbtuts');



$link = mysqli_connect( DB_SERVER,DB_USER,DB_PASSWORD, DB_NAME );

if(mysqli_connect_errno() ){
 	 printf("Connect failed: %s\n", mysqli_connect_error());
     exit();
}

 	
 	 
	$sql = "select * from users ORDER by user_id DESC LIMIT 40";

	$arr = array();

	$res = mysqli_query($link,$sql);
		 
	while( $row = mysqli_fetch_assoc($res)){

		array_push( $arr, $row);

	} 

	echo json_encode($arr);
	
 
	 
	mysqli_close($link);
?>
