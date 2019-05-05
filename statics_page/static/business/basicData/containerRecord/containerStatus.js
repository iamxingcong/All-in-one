$(function () {

    var gridData = [];
    for (var i = 0; i < 5; i++) {
        gridData.push({
            rowNum: i,
            containerNum: 'data_' + i,
            containerType: 'data_' + i,
            locked: 'data_' + i,
            containerStatus: 'data_' + i,
            documentNum: 'data_' + i,
            documentType: 'data_' + i,
            purchaseSaleNum: 'data_' + i
        })
    }

    $("#info_table").XGrid({
        data: gridData,
        colNames: ["", "容器编号", "容器类型", "是否锁定", "容器使用状态", "单据编号", "单据类型", "采购/销售单号"],
        colModel: [{
            name: "rowNum"
        }, {
            name: "containerNum"
        }, {
            name: "containerType"
        }, {
            name: "locked"
        }, {
            name: "containerStatus"
        }, {
            name: "documentNum"
        }, {
            name: "documentType"
        }, {
            name: "purchaseSaleNum"
        }],
        key: "rowNum",
        rowNum: 10,
        selectandorder: false,
        rowList: [10, 20, 50],
        altRows: true,
        pager: "#grid_pager"
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
