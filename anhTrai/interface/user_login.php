<?php
session_start();



error_reporting(E_ALL);

require_once 'conn.php';

$username = $_GET["username"]; 
$password  = $_GET["password"];
$pmd5 = md5($password);

$sql = "SELECT * FROM users where username ='$username' and  password = '$pmd5'";
 
$res = mysqli_query($con,$sql);
$row = mysqli_num_rows($res);

 if($row){
 	 echo "success";
 	 $_SESSION['userlogins']= $pmd5;
 	 return;
 }else{
 	 echo "failed";

 
 }



mysqli_close($con);

?>