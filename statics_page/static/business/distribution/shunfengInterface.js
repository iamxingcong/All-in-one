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

    $("#info_table").XGrid({
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
        pager: "#grid_pager"
    });

    $("#btnPrint").on("click", function () {
        var list = [];
        var timer = new Date().getTime();
        for (var i = 0; i < 10; i++) {
            list.push('http://wms-pic.dev.ybm100.com/20181029/6c716cfa-9e22-4452-8755-83c9b021cfc3.jpg?_=' + timer + i);
        }
        printBarcode(list);
    });


    function printBarcode(list) {

        var d = utils.dialog({
            title: '请稍候，打印单生成中...',
            width: 300
        }).showModal();

        $("#printTagModule").html("");

        if (!(list && list.length)) {
            return false;
        }

        var img = [],
            flag = 0,
            mulitImg = list;
        var imgTotal = mulitImg.length;
        for (var i = 0; i < imgTotal; i++) {
            img[i] = new Image();
            img[i].src = mulitImg[i];
            $("#printTagModule").append(img[i]).append($('<div style="page-break-after: always;"></div>'));
            img[i].onload = function () {
                //第i张图片加载完成
                flag++;
                if (flag == imgTotal) {
                    //全部加载完成
                    d.close().remove();
                    printFn();
                }
            }
        }

        /*
        for (var i = 0; i < list.length; i++) {
            var printHtml = [];
            printHtml.push('<img id="barcode' + i + '" src=' + list[i] + '>');
            printHtml.push('<div style="page-break-after: always;"></div>');
            $printTagModule.append(printHtml.join(''));
        }
        */


        /* printStatus.done(function() {
             alert("打印成功");
         }).fail(function(){
             alert("打印失败");
         });
        */

    }

    function printFn() {
        $("#printTagModule").show();
        var printStatus = $.Deferred();
        $("#printTagModule").print({
            globalStyles: true, //是否包含父文档的样式，默认为true
            mediaPrint: false, //是否包含media='print'的链接标签。会被globalStyles选项覆盖，默认为false
            stylesheet: null, //外部样式表的URL地址，默认为null
            noPrintSelector: ".no-print", //不想打印的元素的jQuery选择器，默认为".no-print"
            iframe: true, //是否使用一个iframe来替代打印表单的弹出窗口，true为在本页面进行打印，false就是说新开一个页面打印，默认为true
            append: null, //将内容添加到打印内容的后面
            prepend: null, //将内容添加到打印内容的前面，可以用来作为要打印内容
            deferred: printStatus  //回调函数
        });
        $("#printTagModule").hide();
    }

});