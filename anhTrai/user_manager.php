
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
    <title>ZherMao, user manager</title>
 
</head>
<body>

 
			<container>
		<form>
			<div id="input_form">
				<h4>折耳猫————用户管理</h4>
				<span>
					<label for="number">用户名</label>
					<input id="user" type="text" name="user" placeholder="用户名" />
				</span>
				<span>
					<label for="password">密码</label>
					<input id="password" type="text" name="password" placeholder="密码" />
				</span>

				<div id="submit">添加用户</div>
			</div>
				
		</form>

		<div id="show">

		</div>
	</container>
	<script  src="js/jquery-3.4.0.js"></script>
	<script  src="js/user_manager.js"></script>
</body>
</html>