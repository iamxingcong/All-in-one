
<?php

$con = mysql_connect("localhost","root","");
if (!$con) {
  die('Could not connect: ' . mysql_error());
 }

 mysql_set_charset("utf8mb4");
// if (mysql_query("CREATE DATABASE zheermao",$con))  {
//   	echo "Database created";
//   } else {
//   	echo "Error creating database: " . mysql_error();
//   }

mysql_select_db("zheermao", $con);

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
	coupon text,
	dealDate timestamp,
	dealTime timestamp
)
default charset=utf8mb4";

mysql_query($sql,$con);
 
mysql_close($con);


?>