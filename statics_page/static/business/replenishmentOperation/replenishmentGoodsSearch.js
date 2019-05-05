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
        multiselect: true,
        rowList: [10, 20, 50],
        altRows: true,
        pager: "#grid_pager"
    });


    $("#btn_create_notice").on('click', function () {
        utils.dialog({
            title: '补货通知单确认',
            width: 1200,
            height: 690,
            content: $("#confirm_dialog"),
            okValue: '保存',
            cancelValue: '取消',
            onshow: function () {
                $(this.node).find('.ui-dialog-content').css({"overflow-y": 'scroll'});
                //回显值
                bindNoticeTable();
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

    function bindNoticeTable() {
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
            multiselect: true,
            rowList: [10, 20, 50],
            altRows: true,
            pager: "#grid_pager_1"
        });
    }

});