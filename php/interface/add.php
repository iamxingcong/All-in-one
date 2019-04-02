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
