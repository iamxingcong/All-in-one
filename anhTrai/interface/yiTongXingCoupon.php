<?php
require_once 'conn.php';

if (!$con) {
    die('Connect Error (' . mysqli_connect_errno() . ') ' . mysqli_connect_error());
}


if(isset($_POST["username"])){
			$username = $_POST["username"]; 
			$password  = $_POST["password"];
			$clientId = $_POST['clientId'];
}else{
	echo "illegal request";
	return;
};



$res  = $_POST["res"];

$date = date_create();
$tstap = getMillisecond();

function getMillisecond() {
    list($t1, $t2) = explode(' ', microtime());
    return (float)sprintf('%.0f',(floatval($t1)+floatval($t2))*1000);
};

$join = $username.$password.$clientId;
$joinMd5 = md5($join);


$result = mysqli_query($con,"SELECT * FROM users WHERE username = '$username' and password ='$password'");

$row = mysqli_num_rows($result);

echo $row;

if($row){

	if($joinMd5 == $res){
		$arr = array();
	 
		$query = mysqli_query($con," select *  from  coupons where clientID = '$clientId'");
		while( $row =  mysqli_fetch_array($query,MYSQLI_ASSOC)){
			 
		 	array_push( $arr, $row);

		};
		
		
		echo json_encode($arr, JSON_UNESCAPED_UNICODE);
		
	}else{
		echo "校验错误";
	}



}else{
	echo "用户名或密码错误";
}
 

mysqli_close($con);

?>