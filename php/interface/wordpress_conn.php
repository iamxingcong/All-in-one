<?php 
<<<<<<< HEAD
ini_set("display_errors", "On");

error_reporting(E_ALL | E_STRICT);

header("Access-Control-Allow-Origin: *");
header("content-Type: application/json; charset=UTF-8");//字符编码设置  
=======
header('Access-Control-Allow-Origin: *');
header("content-Type: application/json; charset=utf8");//字符编码设置  
>>>>>>> master


define('DB_SERVER','localhost');
define('DB_USER','root');
define('DB_PASSWORD','');
define('DB_NAME','wordpress');



$link = mysqli_connect( DB_SERVER,DB_USER,DB_PASSWORD, DB_NAME );
mysqli_query($link,"set names 'utf8'");
if(mysqli_connect_errno() ){
 	 printf("Connect failed: %s\n", mysqli_connect_error());
     exit();
}


?>
