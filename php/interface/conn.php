<?php 
header('Access-Control-Allow-Origin: *');
header("content-Type: application/json; charset=utf8");//字符编码设置  

define('DB_SERVER','localhost');
define('DB_USER','root');
define('DB_PASSWORD','');
define('DB_NAME','dbtuts');



$link = mysqli_connect( DB_SERVER,DB_USER,DB_PASSWORD, DB_NAME );
mysqli_query($link,"set names 'utf8'");
if(mysqli_connect_errno() ){
	printf("Connect failed: %s\n", mysqli_connect_error());
	exit();
}

?>
 
