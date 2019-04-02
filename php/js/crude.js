$(document).ready(function(){

	$("#submit").click(function(){
		 
	 	var  fname = $('input[name="fname"]').val(); 
		var  lname = $('input[name="lname"]').val(); 
		var  city = $('input[name="city"]').val(); 

		if(!fname || !lname || !city){
			alert("信息不完整");
			return false;
		}else{

				$.ajax({
					  method: "POST",
					  url: "interface/add.php",
					  data: { 'fname': fname, 'lname': lname, 'city':city }
				})
			  .done(function( msg ) {
			    	 

			    	if( msg == "success"){
			    		 
			    		sele();
			    		$('input[name="fname"]').val(""); 
						$('input[name="lname"]').val(""); 
						$('input[name="city"]').val("");
			    	}
			  });
		}
	   

	})

 	function sele(){
 			$.ajax({
				  method: "GET",
				  url: "interface/select.php",
				   
			})
			.done(function( msg ) {
			    let rs = JSON.parse(msg);
			    let html = '';
				rs.forEach(function(itm,index,ar){
					
					html += '<div class="cross">'+
							'<span>'+ itm.first_name +'</span>'+
							'<span>' + itm.last_name + '</span>'+
							'<span>' + itm.user_city + '</span>'+
							'<i class="del" id="'+itm.user_id+'">删除</i></div>'
					 
				})

				$("#result").empty().append(html);
	    	})

 	}

 	sele();

 	$("#result").on("click",".del", function(){
 		let iddel = $(this).attr("id");
 		$.ajax({
			  method: "GET",
			  url: "interface/del.php",
			  data: { 'user_id': iddel }
				   
		})
		.done(function( msg ) {
			let rs = msg.toString();
			if(rs == "success"){
				sele();

			}
		})
			  
 	})
})