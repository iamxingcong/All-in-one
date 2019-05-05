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
            content: $('#add_edit_dialog'),
            okValue: '保存',
            cancelValue: '取消',
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

    //容器大小,长,宽,高
    $('body').on('input', '.computed-input', function () {
        var computed_input = $('.computed-input');
        var flag = true;
        var valueArr = 1;
        $.each(computed_input, function (i, v) {
            if (!$.isNumeric($(v).val())) {
                flag = false;
            } else {
                valueArr *= $(v).val();
            }
        });

        flag ? $('.computed-result').val(valueArr.toFixed(2)) : $('.computed-result').val("");
    })

});