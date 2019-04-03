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

?>
 
