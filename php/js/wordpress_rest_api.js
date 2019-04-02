$(document).ready(function(){

	var wpurla = "http://localhost/wordpress-4.9.7/wordpress//wp-json/wp/v2/posts";
	// user wordpress, 或者 drupal的restapi 当接口，调试数据非常方便，可以让在设计设计的时候，开发接口的时候，就开始干活。
	function sele(){
 			$.ajax({
				  method: "GET",
				  url: wpurla,
				   
			})
			.done(function( msg ) {
				 
			    let html = '';
				msg.forEach(function(itm,index,ar){
					
					html += '<div class="cross">'+
							'<h3>'+itm.title.rendered+'</h3>'+
							'<div>'+itm.content.rendered+'</div>'+
							 '</div>'
					 
				})

				$("#result").empty().append(html);
	    	})

 	}

 	sele();

})