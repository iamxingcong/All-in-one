<?php
require_once 'conn.php';
 	
$user_id = $_GET['user_id'];
 
$sql = "DELETE FROM users WHERE user_id =".$user_id;


$res = mysqli_query($link,$sql);
 
if( $res){

 echo "success";

} else {
echo "failed";
}


mysqli_close($link);


?>
