
<?php
error_reporting(E_ALL);

$link = mysqli_connect("localhost","root","","zheermao");
mysqli_query($link,'SET NAMES utf8mb4');

if (!$link) {
    die('Connect Error (' . mysqli_connect_errno() . ') ' . mysqli_connect_error());
}


 
$arr = array();

$query = mysqli_query($link," select *  from  client");
while( $row =  mysqli_fetch_array($query,MYSQLI_ASSOC)){
	 
 	array_push( $arr, $row);

};

echo json_encode($arr, JSON_UNESCAPED_UNICODE);
mysqli_close($link);

?>