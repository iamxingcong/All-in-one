﻿<?php
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
    <title>ZherMao, client management</title>
 
</head>
<body>

	<header>
		<a href="client_create.php">添加客户</a>
		<a href="create_coupons.php">生成券码</a>
	</header>
			<container>
		<form>
			<div id="input_form">
				<h4>易通行货品接口</h4>
				<span>
					<label for="number">编号</label>
					<input id="number" type="text" name="number" placeholder="编号" />
				</span>
				<span>
					<label for="company">公司名</label>
					<input id="company"  type="text" name="company" placeholder="公司名" />
				</span>
				<span>
					<label for="field">行业归属</label>
					<input id="field" type="text" name="field" placeholder="行业归属" />
				</span>
				<span>
					<label for="product">产品名</label>
					<input id="product" type="text" name="product" placeholder="产品名" />
				</span>
				<span>
					<label for="price">单价</label>
					<input id="price" type="number" name="price" placeholder="单价" />
				</span>
				<span>
					<label for="quantity">数量</label>
					<input id="quantity" type="number" name="quantity" placeholder="数量" />
				</span>
				<span>
					<label for="cost">成本（供应商）</label>
					<input id="cost" type="number" name="cost" placeholder="成本（供应商）" />
				</span>
				<span>
					<label for="coupon">券码</label>
					<input id="coupon" type="number" name="coupon" value="999"  max="1000"  placeholder="券码" />
				</span>
				<span>
					<label for="dealDate">交易日期</label>
					<input id="dealDate" type="datetime-local" name="dealDate" placeholder="交易日期" />
				</span>
				<span>
					<label for="dealTime">交易时间</label>
					<input id="dealTime" type="datetime-local" name="dealTime" placeholder="交易时间" />
				</span>
				<div id="submit">提交</div>
			</div>
				
		</form>

		<div id="show">

		</div>
	</container>
	<script  src="js/jquery-3.4.0.js"></script>
	<script  src="js/index_js.js"></script>
</body>
</html>