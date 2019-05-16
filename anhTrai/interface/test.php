<?php
function generate_password(){ 

	$chars = 'abcdefghjkmnopqrstuvwxyz23456789'; 
	$password = ''; 
	for ( $i = 0; $i < 10; $i++ ) { 
	 
		$password .= $chars[ mt_rand(0, strlen($chars) - 1) ]; 
	} 
	
	return  $password;

	
} 
 

 $str = "Shanghai";
echo md5($str);