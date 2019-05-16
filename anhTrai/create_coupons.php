<?php
session_start();

if(isset($_SESSION['users'])){
  $_SESSION['users'] = $_SESSION['users']+1;
} else{
	 

	$index = "index.php";
	echo "<script language='javascript' type='text/javascript'>"; 
	echo "alert('非法闯入');" ;
	echo "window.location.href='$index'";  
	echo "</script>";
}
?>
 




<!Doctype html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1,user-scalable=no">
 	<link rel="stylesheet" type="text/css" href="css/index.css">
    <title>ZherMao, create coupons</title>
 
</head>
<body>
	<header>
		<a href="client_create.php">添加客户</a>
		<a href="create_coupons.php">生成券码</a>
	</header>
	<container>
		<div class='show_hd'>
				<span>公司</span>
				<span>客户ID</span>
				<span>产品</span>
				<span>券码数量</span>
				<span>操作</span>
				 
			
		</div>
		<div id="show">

		</div>
	</container>

	<div id="opacity"><h1>券码生成中，勿动！！</h1></div>
<script  src="js/jquery-3.4.0.js"></script>
<script  src="js/create_coupons.js"></script>
 
 
</body>
</html>