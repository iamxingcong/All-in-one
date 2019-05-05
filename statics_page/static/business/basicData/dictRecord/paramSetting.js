$(function () {

    var gridData = [];
    for (var i = 1; i < 13; i++) {
        gridData.push({
            rowNum: i,
            containerNum: 'data_' + i,
            containerType: 'data_' + i,
            businessType: 'data_' + i,
            isLocked: 'data_' + i,
            createTime: 'data_' + i
        })
    }

    $("#info_table").XGrid({
        data: gridData,
        colNames: ["", "参数编号", "参数含义", "参数值", "参数单位", "备注"],
        colModel: [{
            name: "rowNum",
            hidden: true
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
        }],
        key: "rowNum",
        rowNum: 10,
        selectandorder: false,
        rowList: [10, 20, 50],
        altRows: true,
        rownumbers: true,
        multiselect: false,
        pager: "#grid_pager"
    });


    //新增、修改
    $("#btn_edit").on('click', function () {
        var that = this;
        var selectedRowData = void 0;

        if (that.id == "btn_edit") {
            selectedRowData = $("#info_table").XGrid("getSeleRow");
            if (!(selectedRowData && selectedRowData.length)) {
                utils.dialog({
                    content: '请选择修改行！',
                    quickClose: true,
                    timeout: 2000
                }).showModal();
                return false;
            }
        }

        utils.dialog({
            title: '编辑',
            width: 450,//1000,
            /*height: 123,*/
            content: $("#edit_dialog"),
            okValue: '保存',
            cancelValue: '取消',
            resetForm: true,
            onshow: function () {
                //$(this.node).find('.ui-dialog-content').css({"overflow-y": 'scroll'});
                //旧版本,bindEditDialog(selectedRowData);

                var json = {
                    paramCode: "235454",
                    paramMeaning: "豆腐干梵蒂冈丹甫股份",
                    paramVal: "2000",
                    paramUnit: "件",
                    remarks:"手机了发动机盖丰富的个",
                    isBusinessParam:"0",
                    paramType:"4"
                }

                $(this.node).find("form").serializeJSONToForm(json);

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


    function bindEditDialog(data) {
        $("#info_table_edit").XGrid({
            data: data,
            colNames: ["", "参数编号", "参数含义", "参数值", "参数单位", "备注"],
            colModel: [{
                name: "rowNum",
                hidden: true
            }, {
                name: "containerNum"

            }, {
                name: "containerType",
                rowtype: "#edit_param_meaning_input"
            }, {
                name: "businessType",
                rowtype: "#edit_param_value_input"
            }, {
                name: "isLocked",
                rowtype: "#edit_param_unit_input"
            }, {
                name: "createTime",
                rowtype: "#edit_param_remark_input"
            }],
            key: "rowNum",
            altRows: true,
        });
    }


});