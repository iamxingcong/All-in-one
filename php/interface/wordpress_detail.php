<?php
require_once 'wordpress_conn.php';

if(isset($_GET['id'])){

	$id = $_GET['id'];

	$sql = "SELECT * FROM wp_posts WHERE ID =  '".$id."'";

	

	$res = mysqli_query($link,$sql);
		 
	while( $row = mysqli_fetch_assoc($res)){

		  $arr = $row ;

	} 

		
	$js = json_encode($arr);
	 
	echo    $js;

}else{

 	echo "error";
}
 



 


 
mysqli_close($link);


?>
