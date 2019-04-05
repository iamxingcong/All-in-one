<?php 
header('Access-Control-Allow-Origin: *');
header("content-Type: text/html; charset=utf-8");//字符编码设置  

// 万一wordpress, drupal，等，安装在远程，不支持restapi, 配置需要时间，那就直接查询好了

define('DB_SERVER','localhost');
define('DB_USER','root');
define('DB_PASSWORD','password');
define('DB_NAME','wp5');



$link = mysqli_connect( DB_SERVER,DB_USER,DB_PASSWORD, DB_NAME );

if(mysqli_connect_errno() ){
 	 printf("Connect failed: %s\n", mysqli_connect_error());
     exit();
}


?>
