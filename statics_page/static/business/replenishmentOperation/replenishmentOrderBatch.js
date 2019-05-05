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

    initTable(0);//页面初始加载info_table_0

    $(".nav>li").on('click', function () {
        if (!$(this).hasClass("active")) {
            $(this).addClass("active").siblings().removeClass("active");
            $(".nav-content>div").eq($(this).index()).addClass("active").siblings().removeClass("active");

            initTable($(this).index());
        }
    });

    function initTable(index) {
        switch (index) {
            case 0:
                initTable0();
                break;
            case 1:
                initTable1();
                break;
            case 2:
                initTable2();
                break;
            case 3:
                initTable3();
                break;
            default:
                break;
        }
    }

    function initTable0() {
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

        $("#info_table_0").XGrid({
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
            pager: "#grid_pager_0"
        });
    }

    function initTable1() {

    }

    function initTable2() {
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

        $("#info_table_2").XGrid({
            data: gridData,
            colNames: ["容器类型", "长(cm)", "宽(cm)", "高(cm)", "体积(cm³)", "容器承重(kg)"],
            colModel: [{
                name: "containerType"
            }, {
                name: "containerLength",
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
    }

    function initTable3() {

    }


    //波次下发，点击波次号
    $("#info_table_2").on('click', "[row-describedby='containerLength']", function () {
        utils.dialog({
            title: '查看单据信息',
            width: 1200,
            height: 520,
            content: $("#info_tabe_2_dialog"),
            onshow: function () {
                $(this.node).find('.ui-dialog-content').css({"overflow-y": 'scroll'});
                //回显值

                bindNoticeTable();
            },
            onclose: function () {

            },
        }).showModal();
    });

    function bindNoticeTable() {
        $("#info_table_2_detail").XGrid({
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
            pager: "#grid_pager_2_detail"
        });
    }


    //点击订单池补货
    $("#replenishment_btn").on('click', function () {
        utils.dialog({
            title: ' 补货商品查询',
            width: 1300,
            height: 670,
            content: $("#replenishment_data_dialog"),
            onshow: function () {
                $(this.node).find('.ui-dialog-content').css({"overflow-y": 'scroll'});
                //回显值
                bindReplenishmentDataTable();
            },
            onclose: function () {

            },
        }).showModal();
    });

    function bindReplenishmentDataTable() {
        $("#info_table_4").XGrid({
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
            pager: "#grid_pager_4"
        });
    }


    //生成补货通知单
    $("body").on('click', "#create_notice_btn", function () {
        utils.dialog({
            title: ' 补货通知单',
            width: 1200,
            height: 670,
            content: $("#notice_dialog"),
            onshow: function () {
                $(this.node).find('.ui-dialog-content').css({"overflow-y": 'scroll'});
                //回显值
                bindNoticeDataTable();
            },
            onclose: function () {

            },
        }).showModal();
    });

    function bindNoticeDataTable(){
        $("#info_table_5").XGrid({
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
            selectandorder: true,
            rowList: [10, 20, 50],
            altRows: true,
            pager: "#grid_pager_5"
        });
    }

});