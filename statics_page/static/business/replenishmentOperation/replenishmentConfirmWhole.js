$(function () {

    //点击补货条码查询
    $("#replenishment_search_btn").on('click', function () {
        utils.dialog({
            title: '查询补货上架',
            width: 1100,
            height: 515,
            content: $("#search_dialog"),
            okValue: '确认',
            cancelValue: '取消',
            onshow: function () {
                $(this.node).find('.ui-dialog-content').css({"overflow-y": 'scroll', "overflow-x": "hidden"});

                bindReplenishmentTableHtml();
            },
            ok: function () {
                //保存按钮回调
            },
            cancel: function () {
            },
            onclose: function () {

            },
        }).showModal();
    })


    function bindReplenishmentTableHtml() {
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
    }


});