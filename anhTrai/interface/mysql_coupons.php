
<?php
require_once 'conn.php';

 mysqli_set_charset($con,"utf8mb4");
// if (mysql_query("CREATE DATABASE zheermao",$con))  {
//   	echo "Database created";
//   } else {
//   	echo "Error creating database: " . mysql_error();
//   }

 

$sql = "CREATE TABLE coupons(
couponID int NOT NULL AUTO_INCREMENT,
PRIMARY KEY(couponID),
clientID int,
coupons varchar (110),
status int)
default charset=utf8mb4";
echo $sql;
mysqli_query($con,$sql);
 
mysqli_close($con);


?>