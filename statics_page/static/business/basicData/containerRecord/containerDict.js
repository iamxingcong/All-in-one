$(function () {

    var gridData = [];
    for (var i = 0; i < 13; i++) {
        gridData.push({
            rowNum: i,
            containerNum: 'data_' + i,
            containerType: 'data_' + i,
            businessType: 'data_' + i,
            isLocked: 'data_' + i,
            createTime: 'data_' + i,
            creater: 'data_' + i
        })
    }

    $("#info_table").XGrid({
        data: gridData,
        colNames: ["", "容器编号", "容器类型", "业务类型", "是否锁定", "创建时间", "创建人"],
        colModel: [{
            name: "rowNum"
        }, {
            name: "containerNum"
        }, {
            name: "containerType"
        }, {
            name: "businessType"
        }, {
            name: "isLocked"
        }, {
            name: "createTime"
        }, {
            name: "creater"
        },],
        key: "rowNum",
        rowNum: 10,
        selectandorder: false,
        rowList: [10, 20, 50],
        altRows: true,
        pager: "#grid_pager"
    });


    //打印
    $("#print_btn").on('click', function () {
        var that = this;
        utils.dialog({
            title: '打印容器编号',
            width: 300,
            height: 100,
            content: $("#print_dialog"),
            okValue: '确定',
            cancelValue: '取消',
            resetForm: true,
            onshow: function () {
                //$(this.node).find('.ui-dialog-content').css({"overflow-y": 'scroll'});
            },
            ok: function () {
                //保存按钮回调

                printBarcode();

            },
            cancel: function () {
            },
            onclose: function () {

            },
        }).showModal();
    });


    function printBarcode() {

        var mmTopxHeight = $("#mmTopxHeight").height();
        console.log("1mm=" + mmTopxHeight + "px");

        //打印单尺寸：90*40

        var $printTagModule = $("#printTagModule");
        $printTagModule.html("").show();
        for (var i = 0; i < 3; i++) {
            var printHtml = [];
            printHtml.push('<img id="barcode' + i + '" style="margin: 20px 0;">');
            printHtml.push('<div style="page-break-after: always;"></div>');
            $printTagModule.append(printHtml.join(''));
            $printTagModule.find("#barcode" + i).JsBarcode("376921", {
                fontOptions: "bold",
                font: "Microsoft YaHei",
                fontSize: 190,
                width: 17,
                height: 300,
            });//设置条形码
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

    }


    //新增、修改
    $("#add_btn,#edit_btn").on('click', function () {
        var that = this;
        var selectedRowData = void 0;

        if (that.id == "edit_btn") {
            selectedRowData = $("#info_table").XGrid("getSeleRow");
            if (!selectedRowData) {
                utils.dialog({
                    content: '请选择编辑行！',
                    quickClose: true
                }).showModal();
                return false;
            }
        }

        utils.dialog({
            title: '新增/编辑',
            width: 500,
            height: 250,
            content: $("#add_edit_dialog"),
            okValue: '保存',
            cancelValue: '取消',
            resetForm: true,
            onshow: function () {
                //$(this.node).find('.ui-dialog-content').css({"overflow-y": 'scroll'});
            },
            ok: function () {
                //保存按钮回调
            },
            cancel: function () {
            },
            onclose: function () {

            },
        }).showModal();
    });

    //二级联动
    //容器类型变化,设置业务类型
    $('body').on('change', '.container_type_select', function () {
        var $that = $(this);//容器类型
        var containerType = $that.val();
        var $business_type_select = $that.parents(".row").find(".business_type_select");//业务类型

        var disabledFlag = false;
        var html = [];
        html.push("<option value='0'>请选择</option>");
        switch (containerType) {
            case "0":
                break;
            case "1":
                html.push("<option value='1'>零货采购入库</option>");
                html.push("<option value='2'>销售出库</option>");
                break;
            case "2":
                html.push("<option value='3'>采购入库</option>");
                html.push("<option value='4'>整件拣货</option>");
                break;
            case "3":
            case "4":
                disabledFlag = true;
                break;
            default:
                break;
        }
        $business_type_select.html(html.join("")).prop("disabled", disabledFlag);
    });
});