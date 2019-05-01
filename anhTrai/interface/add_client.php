<?php
error_reporting(E_ALL);

$con = mysqli_connect("localhost","root","","zheermao");
mysqli_query($con,'SET NAMES utf8mb4');


$number = $_GET["number"];
$company = $_GET["company"];
$field = $_GET["field"];
$product = $_GET["product"];
$price = $_GET["price"];
$quantity = $_GET["quantity"];
$cost = $_GET["cost"];
$coupon = $_GET["coupon"];
$dealDate = $_GET["dealDate"];
$dealTime = $_GET["dealTime"];


$sql = "INSERT INTO client (numbers,company,field,product,price,quantity,cost,coupon,dealDate,dealTime) VALUES ('$number','$company','$field','$product','$price','$quantity','$cost','$coupon','$dealDate','$dealTime')";


if(!mysqli_query($con,$sql)){
	  die('Error: ' . mysql_error());
};
echo 'success';


mysqli_close($con);

?>