<?php
error_reporting(E_ALL);

require_once 'conn.php';

$clientID = $_GET["clientID"]; 
$coupons  = $_GET["coupon"];

function generate_password(){ 

	$chars = 'abcdefghjkmnopqrstuvwxyz23456789'; 
	$password = ''; 
	for ( $i = 0; $i < 10; $i++ ) { 
	 
		$password .= $chars[ mt_rand(0, strlen($chars) - 1) ]; 
	} 
	
	return  $password;

	
}; 
 

$usq = "UPDATE client SET couponStatus = true WHERE clientID = $clientID ";

mysqli_query($con,$usq);

for($i = 0; $i < $coupons; $i++){
	$ps = generate_password();

	$sql = "INSERT INTO coupons (clientID,coupons) VALUES ('$clientID', '$ps')";
	mysqli_query($con,$sql);

};






if(!mysqli_query($con,$sql)){
	  die('Error: ' . mysql_error());
};

 echo 'success';

mysqli_close($con);

?>