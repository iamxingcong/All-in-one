$(function () {

    var gridData = [];
    for (var i = 0; i < 3; i++) {
        gridData.push({
            rowNum: i,
            containerNum: 'data_' + i,
            containerType: 'data_' + i,
            businessType: 'data_' + i,
            isLocked: 'data_' + i,
            createTime: 'data_' + i,
            creater: 'data_' + i,
            attachment: 'data_' + i
        })
    }

    $("#tableBaseInfo").XGrid({
        data: gridData,
        colNames: ["", "批件名称", "批件编号", "核准内容", "签发日期", "有效期至", "发证机关", "附件"],
        colModel: [{
            name: "rowNum"
        }, {
            name: "containerNum",
            rowtype: "#batch_select_rowtype"
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
        }, {
            name: "attachment",
            formatter: function (e) {
                return "<a href='#'>" + e + "</a>";
            }
        }],
        key: "rowNum",
        multiselect: false
    });

});
