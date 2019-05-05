$(function () {

    var gridData = [];
    for (var i = 0; i < 13; i++) {
        gridData.push({
            rowNum: i,
            containerType: 'data_' + i,
            containerLength: 'data_' + i,
            containerWidth: 'data_' + i,
            containerHeight: 'data_' + i,
            containerCubage: 'data_' + i,
            containerLoadBearing: 'data_' + i
        })
    }

    $("#info_table_1").XGrid({
        data: gridData,
        colNames: ["容器类型", "长(cm)", "宽(cm)", "高(cm)", "体积(cm³)", "容器承重(kg)"],
        colModel: [{
            name: "containerType"
        }, {
            name: "containerLength"
        }, {
            name: "containerWidth"
        }, {
            name: "containerHeight"
        }, {
            name: "containerCubage"
        }, {
            name: "containerLoadBearing"
        },],
        key: "rowNum",
        rowNum: 10,
        selectandorder: false,
        rowList: [10, 20, 50],
        altRows: true,
        pager: "#grid_pager_1"
    });

    $("#info_table_2").XGrid({
        data: gridData,
        colNames: ["容器类型", "长(cm)", "宽(cm)", "高(cm)", "体积(cm³)", "容器承重(kg)"],
        colModel: [{
            name: "containerType"
        }, {
            name: "containerLength"
        }, {
            name: "containerWidth"
        }, {
            name: "containerHeight"
        }, {
            name: "containerCubage"
        }, {
            name: "containerLoadBearing"
        },],
        key: "rowNum",
        rowNum: 10,
        selectandorder: false,
        rowList: [10, 20, 50],
        altRows: true,
        pager: "#grid_pager_2"
    });


    $(".nav>li").on('click', function () {
        if (!$(this).hasClass("active")) {
            $(this).addClass("active").siblings().removeClass("active");
            $(".nav-content>div").eq($(this).index()).addClass("active").siblings().removeClass("active");
        }
    });


    // 打印标签
    $("#print").on("click", function () {

        var $printTagModule = $("#printTagModule");
        $printTagModule.html("").show();
        $printTagModule.append('<style>.width100 {width: 100%;}.weightFont700 {font-weight: 700;}.fontSize18 {font-size: 18px;}.fontSize16 {font-size: 16px;}.textCenter {text-align: center;}</style>');

        for (var i = 0; i < 3; i++) {
            var printHtml = [];
            printHtml.push('<div class="panel panel-default">');
            printHtml.push('<div class="panel-body">');
            printHtml.push('<table class="width100">');
            printHtml.push('<tr>');
            printHtml.push('<td class="weightFont700 fontSize18"><span>【整件货位】</span><span>D01-19</span></td><td class="textCenter"><span>XX补货</span></td>');
            printHtml.push('</tr>');
            printHtml.push('<tr>');
            printHtml.push('<td><span>【商品名称】</span><span>野生银花露（含糖型）</span></td><td rowspan="4" class="weightFont700 textCenter"><img id="barcode'+i+'" style="width: 165px; height: 100px;"/></td>');
            printHtml.push('</tr>');
            printHtml.push('<tr>');
            printHtml.push('<td><span class="weightFont700 fontSize16">【数量】</span><span class="weightFont700 fontSize16">1件</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>【规格】</span><span>340ml*12瓶</span></td>');
            printHtml.push('</tr>');
            printHtml.push('<tr>');
            printHtml.push('<td class="weightFont700 fontSize16"><span>【批号】</span><span>180703</span></td>');
            printHtml.push('</tr>');
            printHtml.push('<tr>');
            printHtml.push('<td><span>【生产厂家】</span><span>湖北食为天药业有限公司</span></td>');
            printHtml.push('</tr>');
            printHtml.push('<tr>');
            printHtml.push('<td><span>【拣货人】</span><span>马超</span>&nbsp;&nbsp;&nbsp;&nbsp;<span>【打印时间】</span><span>2018-08-01 14:05:21</span></td><td class="weightFont textCenter"><span>【上架货位】</span><span>A01-010101</span></td>');
            printHtml.push('</tr>');

            printHtml.push('</table>');
            printHtml.push('</div>');
            printHtml.push('</div>');
            printHtml.push('<div style="page-break-after: always;"></div>');
            $printTagModule.append(printHtml.join(''));
            $printTagModule.find("#barcode" + i).JsBarcode(new Date().getTime());//设置条形码
        }

        $("#printTagModule").print({
            globalStyles: true, //是否包含父文档的样式，默认为true
            mediaPrint: false, //是否包含media='print'的链接标签。会被globalStyles选项覆盖，默认为false
            stylesheet: null, //外部样式表的URL地址，默认为null
            noPrintSelector: ".no-print", //不想打印的元素的jQuery选择器，默认为".no-print"
            iframe: true, //是否使用一个iframe来替代打印表单的弹出窗口，true为在本页面进行打印，false就是说新开一个页面打印，默认为true
            append: null, //将内容添加到打印内容的后面
            prepend: null, //将内容添加到打印内容的前面，可以用来作为要打印内容
            deferred: $.Deferred() //回调函数
        });
        $printTagModule.hide();
    });

});