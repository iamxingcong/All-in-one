$(function(){

    var gridData = [];
    for (var i = 0; i < 13; i++) {
        gridData.push({
            rowNum: i,
            depotNum: 'data_' + i,
            depotName: 'data_' + i,
            Remark:'data_'+ i,
            depotType: 'data_' + i,
            warehouseNum: 'data_' + i,
            warehouse: 'data_' + i
        })
    }

    $("#info_table").XGrid({
        data: gridData,
        colNames: ["", "库别编号", "库别名称",'备注', "库别类型",'仓库编号','仓库'],
        colModel: [{
            name: "rowNum"
        }, {
            name: "depotNum"//库区编号
        }, {
            name: "depotName"//库别名称
        }, {
            name: "Remark"//备注
        },{
            name: "depotType"//库别类型
        },{
            name: "warehouseNum"//仓库编号
        },{
            name: "warehouse"//仓库
        }],
        key: "rowNum",
        rowNum: 10,
        selectandorder: false,
        rowList: [10, 20, 50],
        altRows: true,
        pager: "#grid_pager"
    });

});
