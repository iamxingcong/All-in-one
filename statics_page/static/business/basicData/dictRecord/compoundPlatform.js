$(function () {

    var gridData = [];
    for (var i = 0; i < 13; i++) {
        gridData.push({
            rowNum: i,
            containerNum: 'data_' + i,
            containerType: 'data_' + i,
            businessType: 'data_' + i,
            isLocked: 'data_' + i,
            createTime: 'data_' + i,
            creater: 'data_' + i
        })
    }

    $("#info_table").XGrid({
        data: gridData,
        colNames: ["", "容器编号", "容器类型", "业务类型", "是否锁定", "创建时间", "创建人"],
        colModel: [{
            name: "rowNum"
        }, {
            name: "containerNum"
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
            if (!(selectedRowData && selectedRowData.length)) {
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
            height: 380,
            content: $("#add_edit_dialog"),
            okValue: '保存',
            cancelValue: '取消',
            resetForm: true,
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