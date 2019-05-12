

function refresh(){

	$("#show").empty();
	$.ajax({
		  method: "GET",
		  url: "interface/select.php",
		 
		})
	  .done(function( msg ) {
	    	
	    	if( typeof msg === "string"){
	    		msg = JSON.parse(msg);
	    	}
	     	$.each(msg, function (i, im){
	     		if(im.couponStatus){
	     			var htm = '<div class="single"><span>'+im.company+
	     				"</span><span class='clid'>"+im.clientID+"</span><span>"+
	     				im.product+"</span><span  class='cpQ'>"+im.coupon+
	     				"</span><span class=''>券码已生成</span></div>";
	     		}else{

	     			var htm = '<div class="single"><span>'+im.company+
	     				"</span><span class='clid'>"+im.clientID+"</span><span>"+
	     				im.product+"</span><span  class='cpQ'>"+im.coupon+
	     				"</span><span class='addCoupon'>生成券码</span></div>";
	     		}

	     		

	     		console.log(im);
	     		$("#show").append(htm);

	     	})
	     
	  });

}

 refresh();


$("#show").on("click",".addCoupon",function(){
	 var clientID = $(this).parent().find(".clid").text();
	 var coupon = $(this).parent().find(".cpQ").text();
	 
	 	$(this).removeClass("addCoupon");
	 	$("#opacity").css("display","block");
	 $.ajax({
		  method: "GET",
		  url: "interface/add_coupons.php",
		  data:  {'clientID':clientID,"coupon":coupon}  
	})
	  .done(function( msg ) {
	     if(msg === "success"){
	     	refresh();
	     	 $("#opacity").css("display","none");
	     	$("input").val("");
	     }
	  });
})