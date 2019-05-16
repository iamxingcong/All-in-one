
<?php
require_once 'conn.php';

if (!$con) {
    die('Connect Error (' . mysqli_connect_errno() . ') ' . mysqli_connect_error());
}




 
$arr = array();

$query = mysqli_query($con," select *  from  client");
while( $row =  mysqli_fetch_array($query,MYSQLI_ASSOC)){
	 
 	array_push( $arr, $row);

};

echo json_encode($arr, JSON_UNESCAPED_UNICODE);
mysqli_close($con);

?>