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


    $("#search_count").on('click', function () {
        utils.dialog({
            title: '零货出库折合件数查询',
            width: 1100,
            height: 515,
            content: $("#search_dialog"),
            onshow: function () {
                $(this.node).find('.ui-dialog-content').css({"overflow-y": 'scroll',"overflow-x":"hidden"});

                bindReplenishmentTableHtml();
            },
            onclose: function () {

            },
        }).showModal();
    });


    function bindReplenishmentTableHtml() {
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
            /*multiselect: true,*/
            rowList: [10, 20, 50],
            altRows: true,
            pager: "#grid_pager_2"
        });
    }


})