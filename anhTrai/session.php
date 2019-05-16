<?php

session_start();
 
$url =  $_SERVER["HTTP_REFERER"].$_SERVER['REQUEST_URI'];  


$parts = parse_url($url);
parse_str($parts['query'], $query);
 
$_SESSION['users'] =  $query['session'];

 

$create_coupons = "client_create.php";
echo "<script language='javascript' type='text/javascript'>";  
echo "window.location.href='$create_coupons'";  
echo "</script>";