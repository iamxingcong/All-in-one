(function ($) {
    $.fn.dataStatistics = function (obj) {
        // 数据统计
        var clear, result

        var getData = function () {
            // 发送请求
            $.ajax({
                url: obj.url,
                method: obj.method,
                data: obj.form_data,
                dataType: 'json',
                success: function (data) {
                    // 请求成功返回数据
                    // data = {
                    //     "allbox": 1000,
                    //     "unobtain": 600,
                    //     "obtain": 400
                    // };

                    result = tmpl(obj.source, data);
                    $('.data-content').html(result)

                },
                error: function (error) {
                    // utils.dialog({
                    //     title: '提示',
                    //     content: '请求失败！',
                    //     timeout: 2000,
                    //     quickClose: true
                    // }).show();

                    // 请求失败
                    error = {
                        "allbox": 1000+Math.floor(Math.random()*100),
                        "unobtain": 600+Math.floor(Math.random()*10),
                        "obtain": 400+Math.floor(Math.random()*10)
                    };


                    result = tmpl(obj.source, error);

                    $('.data-content').html(result).css('max-width', $('.panel').width() - 50 + 'px')

                }
            })
        }
        getData()
        // 鼠标移入
        $(this).mouseenter(function () {
            $('.data-content').css('display', 'block')
            clear = setInterval(function () {
                getData()
            }, 1000)
        })

        // 鼠标移出
        $(this).mouseout(function () {
            $('.data-content').css('display', 'none')
            clearInterval(clear)
        })
    };

    // jQuery模板
    var cache = {};
    this.tmpl = function tmpl(str, data){
        var fn = !/\W/.test(str) ?
            cache[str] = cache[str] ||
                tmpl(document.getElementById(str).innerHTML) :
            new Function("obj",
                "var p=[],print=function(){p.push.apply(p,arguments);};" +
                "with(obj){p.push('" +
                str
                    .replace(/[\r\t\n]/g, " ")
                    .split("<%").join("\t")
                    .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                    .replace(/\t=(.*?)%>/g, "',$1,'")
                    .split("\t").join("');")
                    .split("%>").join("p.push('")
                    .split("\r").join("\\'")
                + "');}return p.join('');");
        return data ? fn( data ) : fn;
    };

})(jQuery)
