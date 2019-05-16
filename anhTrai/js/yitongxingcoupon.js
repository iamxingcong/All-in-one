var user = 'xingcong';
var pw = 'xc123456';

var clientId = "1";

var xcmd5 = $.md5(pw);
var timestamp = Date.parse(new Date());
var res = 'xingcong'+xcmd5+clientId;
res = $.md5(res);



function list(){
 
	$.ajax({
	  method: "POST",
	  url: "interface/yiTongXingCoupon.php",
    data:{'username':"xingcong",'password':"5937ffad5ecd5f6dd9a83b83895e480f","res":res,"timestamp":timestamp,"clientId":clientId}
  	})
  .done(function( msg ) {

      console.log(msg)
  })
}


list();

