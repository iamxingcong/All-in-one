$(function () {

    var gridData = [];
    for (var i = 0; i < 13; i++) {
        gridData.push({
            rowNum: i,
            containerType: 'data_' + i,
            containerLength: 'data_' + i,
            containerWidth: 'data_' + i,
            containerHeight: 'data_' + i
        })
    }

    $("#info_table").XGrid({
        data: gridData,
        colNames: ["省/直辖市/自治区", "市/区", "区县", "街道"],
        colModel: [{
            name: "containerType"
        }, {
            name: "containerLength"
        }, {
            name: "containerWidth"
        }, {
            name: "containerHeight"
        }],
        key: "rowNum",
        rowNum: 10,
        selectandorder: true,
        rowList: [10, 20, 50],
        altRows: true,
        pager: "#grid_pager"
    });

    $("#filterBtn").on("click", function () {
        $("#info_table").XGrid("filterTableHead", ['containerWidth','containerType']);
    })

});