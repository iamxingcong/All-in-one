$(function () {

    var gridData = [];
    for (var i = 0; i < 13; i++) {
        gridData.push({
            rowNum: i,
            dictType: 'data_' + i,
            numberCode: 'data_' + i,
            name: 'data_' + i,
            status: Number(i % 2)
        })
    }

    $("#info_table").XGrid({
        data: gridData,
        colNames: ["", "字典类型", "编号", "名称", "状态"],
        colModel: [{
            name: "rowNum"
        }, {
            name: "dictType"
        }, {
            name: "numberCode"
        }, {
            name: "name"
        }, {
            name: "status",
            formatter: function (e) {
                var rtnStr;
                if (e == "0") {
                    rtnStr = "正常"
                } else if (e == "1") {
                    rtnStr = "锁定"
                }
                return rtnStr;
            },
            unformat: function (e) {
                var rtnStr;
                if (e == "正常") {
                    rtnStr = "0"
                } else if (e == "锁定") {
                    rtnStr = "1"
                }
                return rtnStr;
            }
        }],
        key: "rowNum",
        rowNum: 10,
        selectandorder: false,
        rowList: [10, 20, 50],
        altRows: true,
        pager: "#grid_pager"
    });

    //修改
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
            width: 420,//740,
            height: 200,//123,
            content: $("#edit_dialog"),
            okValue: '保存',
            cancelValue: '取消',
            resetForm: true,
            onshow: function () {
                //$(this.node).find('.ui-dialog-content').css({"overflow-y": 'scroll'});
                //旧版本//bindEditDialog(selectedRowData);

                var json={
                    dictType:selectedRowData[0]["dictType"],
                    numberCode:selectedRowData[0]["numberCode"],
                    name:selectedRowData[0]["name"],
                    status:selectedRowData[0]["status"]
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
            colNames: ["", "字典类型", "编号", "名称", "状态"],
            colModel: [{
                name: "rowNum"
            }, {
                name: "dictType"
            }, {
                name: "numberCode"
            }, {
                name: "name",
                rowtype: "#edit_name_input"
            }, {
                name: "status",
                rowtype: "#edit_status_input"
            }],
            key: "rowNum",
            rowNum: 10,
            altRows: true,
        });
    }

    //批量按钮
    $("#btn_batch").on('click', function (e) {
        event.stopPropagation();
        $(this).siblings('.clickApplyItem').stop().toggle();
    });

    //导入
    $("#btn_import_data").on("click", function () {
        //alert("导入数据");
    });

    //下载模板
    $("#btn_download_template").on('click', function () {
        alert("下载模板");
    });

});