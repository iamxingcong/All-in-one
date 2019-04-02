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

 	$user_id = $_GET['user_id'];
 	 
	$sql = "DELETE FROM users WHERE user_id =".$user_id;

	  
	$res = mysqli_query($link,$sql);
		 
	if( $res){

		 echo "success";

	} else {
		echo "failed";
	}

	 
	
 
	 
	mysqli_close($link);
?>
