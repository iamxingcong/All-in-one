$("#submit").click(function(){

	var username = $("#user").val().trim();
	var  password = $("#password").val().trim();
	 

	$.ajax({
	  method: "GET",
	  url: "interface/user_login.php",
	  data:  {"username":username,"password":password}  
	})
  .done(function( msg ) {
  		if(msg == 'success'){
  			alert("登录成功");
  			window.location.href = "session.php?session="+username;
  			 
  		}else{
  			alert(msg);
         window.location.href = "index.php";
  		};

  })

 
})
