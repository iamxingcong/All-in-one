$(function () {
    

    $("#add_route").on("click", function () {
        debugger;
        utils.dialog({
            title: '出库单管理',
            //width: $(window).width()*0.35,
            // height:  $(window).height()*0.65,
            width: 600,
            height: 470,
            content: $("#add_dialog"),
            okValue: '提交出库',
            
            onshow: function () {

            },
            ok: function () {

            },
           
            onclose: function () {
                    alert("onclose");
            },
        }).showModal();
    })

  $("#revise").on("click", function () {
 
        utils.dialog({
            title: '顺风下单',
            // width: $(window).width()*0.35,
            // height:  $(window).height()*0.65,
            width: 600,
            height: 470,
            content: $("#add_dialog"),
            okValue: '提交',
            
            onshow: function () {

            },
            ok: function () {

            },
           
            onclose: function () {

            },
        }).showModal();
    })

 
    $('#print5').click(function () {
        printIframe('print_dm.html');

    })

    //打印iframe加载的页面
    function printIframe(url) {
        var iframe = document.createElement('iframe');
        iframe.setAttribute("src", url);
        iframe.setAttribute("height", "0px");
        iframe.style.border = 'none';
        document.body.appendChild(iframe);
        iframe.contentWindow.print();

        setTimeout(function () {
            iframe.remove();
        }, 2000)
    }

 

})

 