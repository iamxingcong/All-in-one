
<?php

require_once 'conn.php';
// if (mysql_query("CREATE DATABASE zheermao",$con))  {
//   	echo "Database created";
//   } else {
//   	echo "Error creating database: " . mysql_error();
//   }

 
$sql = "CREATE TABLE client
(
	clientID int NOT NULL AUTO_INCREMENT, 
	PRIMARY KEY(clientID),
	numbers varchar(45),
	company varchar(45),
	field varchar(45),
	product varchar(45),
	price decimal(8,2),
	quantity int(9),
	cost decimal(8,2),
	coupon int,
	couponStatus boolean,
	dealDate timestamp,
	dealTime timestamp
)
default charset=utf8mb4";

mysqli_query($con,$sql);
 
mysqli_close($con);


?>