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
        });
    }

    $("#info_table_goods").XGrid({
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
        onSelectRow: function (id, dom, obj) {
            showTableSiteData(id, dom, obj);
        },
        pager: "#grid_pager_goods"
    });


    function showTableSiteData(id, dom, obj) {
        if (dom.hasClass("selRow")) {
            $("#info_table_site").XGrid("clearGridData").XGrid({
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
                rowList: [10, 20, 50],
                altRows: true,
                pager: "#grid_pager_site"
            });
        } else {
            $("#info_table_site").XGrid("clearGridData");
        }
    }

    //新增,修改
    $("#add_btn_goods").on('click', function () {
        var that = this;
        utils.dialog({
            title: '新增',
            width: 600,
            height: 500,
            content: $("#add_edit_dialog"),
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

});
