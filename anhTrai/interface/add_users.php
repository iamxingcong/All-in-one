<?php
error_reporting(E_ALL);

require_once 'conn.php';

$username = $_GET["username"]; 
$password  = $_GET["password"];
 

$sql = "SELECT * FROM users where username ='$username'";
 
$res = mysqli_query($con,$sql);
$row = mysqli_num_rows($res);

 if($row){
 	 echo "用户已经存在";
 	 return;
 }else{
 	 
 


	$pmd5 = md5($password);
	$usq = "INSERT INTO  users (username,password) VALUES ('$username','$pmd5') ";

	$sqs = mysqli_query($con,$usq);
	 
	 
	if($sqs){
		   echo 'success';
	};



 	
 }



mysqli_close($con);

?>