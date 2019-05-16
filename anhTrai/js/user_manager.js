$("#submit").click(function(){

	var username = $("#user").val().trim();
	var  password = $("#password").val().trim();
	 

	$.ajax({
	  method: "GET",
	  url: "interface/add_users.php",
	  data:  {"username":username,"password":password}  
	})
  .done(function( msg ) {
  		if(msg == 'success'){
  			alert("添加成功");
  			var username = $("#user").val("");
			  var  password = $("#password").val("");
			  list();	
  		}else{
  			alert(msg);
  		};

  })

 
})
 


function list(){
 
	$.ajax({
	  method: "GET",
	  url: "interface/users_list.php"
  	})
  .done(function( msg ) {

  		var usernm = "";
		if( typeof msg === "string"){
    		msg = JSON.parse(msg);
    	}
     	$.each(msg, function (i, im){

     		usernm += "<span class='namelist'>"+im.username+"</span>";
     	});

     	$("#show").empty().append(usernm);

  })
}


list();