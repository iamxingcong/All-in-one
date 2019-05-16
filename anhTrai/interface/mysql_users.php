
<?php
error_reporting(E_ALL);

require_once 'conn.php';

 mysqli_set_charset($con,"utf8mb4");
// if (mysql_query("CREATE DATABASE zheermao",$con))  {
//   	echo "Database created";
//   } else {
//   	echo "Error creating database: " . mysql_error();
//   }

 

$sql = "CREATE TABLE users(
userID int NOT NULL AUTO_INCREMENT,
PRIMARY KEY(userID),
uids int,
username varchar (30),
password varchar (40),
status int)
default charset=utf8mb4";
echo $sql;
mysqli_query($con,$sql);
 
mysqli_close($con);


?>