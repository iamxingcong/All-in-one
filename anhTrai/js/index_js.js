
var str = $( "form" ).serialize();

$("#submit").click(function(){
	var str = $( "form" ).serialize();
	var oks = $("form").serializeArray();
	console.log(oks);
	 

	 var mCoupons = $("#coupon").val();
	 if(mCoupons > 1000){
	 	alert("券码不能超多1000张");
	 	$("#coupon").val(1000);
	 	return false;
	 };
	var obj = [];
	var x = [];
	var b = "";
	 for(var i = 0; i < oks.length; i++ ){
	 	 
	 	 
	 	 obj.push(oks[i].name);
	 	 x.push(oks[i].value);
	 };

	 for(var i = 0; i < obj.length; i++ ){
	  
	 	var m = obj[i];
	 	var n = x[i];
	 	if(!n){
	 		var nm = i+1;
	 		alert("第"+nm+"个框不能为空！！！");
	 		return;
	 		 
	 	};
	 	
	 	b += '"' +m+'":"'+n+'",';
	 };

	 b = b.substring(0,b.length - 1);
  		 
	 b = "{"+b+"}";
	 b =  JSON.parse(b);


	console.log(b);
	$.ajax({
	  method: "GET",
	  url: "interface/add_client.php",
	  data:  b  
	})
  .done(function( msg ) {
     if(msg === "success"){
     	
     	alert("添加成功");
     	$("input").val("");
     	
     }
  });

})
