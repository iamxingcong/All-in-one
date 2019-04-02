<?php
require_once 'conn.php';
 	
if(isset( $_POST['fname'])){


	 $fname = $_POST['fname'];
	 $lname = $_POST['lname'];
	 $city = $_POST['city'];

	
	 $sql = "INSERT INTO users(first_name,last_name,user_city) VALUES('$fname','$lname','$city')";
	

	$res = mysqli_query($link,$sql);
	 
	  if($res){
 	 	echo 'success';
 	  }else{

 	  	echo 'error';
 	  }

}

?>
