$(function () {

    initDictListTable();//加载字典列表List

    function initDictListTable() {

        initDictDetailTable();//初始化字典详情table

        var gridData = [];
        for (var i = 0; i < 105; i++) {
            gridData.push({
                id: i,
                dictName: 'data_' + i,
                dictMeaning: 'data_' + i
            });
        }

        $("#dictListTable").XGrid({
            data: gridData,
            colNames: ["", "字段名", "名称"],
            colModel: [{
                name: "id",
                hidden: true
            }, {
                name: "dictName"
            }, {
                name: "dictMeaning"
            }],
            key: "id",
            rownumbers: true,
            altRows: true,
            maxheight: 370,
            rowNum: 10,
            rowList: [10, 20, 50],
            pager: "#pager_dictListTable",
            onSelectRow: function (id, dom, obj, index, event) {
                if (dom.hasClass("selRow")) {
                    loadDetail(obj);
                } else {
                    $("#dictDetailTable_shower").XGrid("clearGridData");
                    $("#dictDetailTable_editer").XGrid("clearGridData");
                }
            }
        });
    }

    function initDictDetailTable() {
        //右侧table
        $("#dictDetailTable_shower").XGrid({
            data: [],
            colNames: ["", "字段名", "显示值", "存储值", "状态"],
            colModel: [{
                name: "id",
                hidden: true
            }, {
                name: "dictName"
            }, {
                name: "showValue",
            }, {
                name: "saveValue"
            }, {
                name: "status",
                formatter: function (e) {
                    if (e == 0) {
                        return "正常"
                    } else if (e == 1) {
                        return "锁定"
                    } else {
                        return "";
                    }

                }
            }],
            key: "id",
            rownumbers: true,
            altRows: true,
            height: 370,
            maxheight: 370,
            rowNum: 0,
            //rowList: [10, 20, 50],
            //pager: "#pager_dictDetailTable_shower"
        });

        //弹窗dialog
        $("#dictDetailTable_editer").XGrid({
            data: [],
            colNames: ["", "显示值", "存储值", "状态"],
            colModel: [{
                name: "id",
                hidden: true
            }, {
                name: "showValue",
                rowtype: "#show_val_input"
            }, {
                name: "saveValue",
                rowtype: "#save_val_input"
            }, {
                name: "status",
                formatter: function (e) {
                    if (e == 0) {
                        return "正常"
                    } else if (e == 1) {
                        return "锁定"
                    } else {
                        return "";
                    }

                },
                unformat: function (e) {
                    if (e == "正常") {
                        return "0"
                    } else if (e == "锁定") {
                        return "1"
                    } else {
                        return "";
                    }
                }
            }],
            key: "id",
            rownumbers: true,
            altRows: true,
            height: 370,
            maxheight: 370,
            rowNum: 0,
            //rowList: [10, 20, 50],
            onSelectRow: function (id, dom, obj, index, event) {
                $("[name=dictStatusRadio]").prop("checked", false);
                if (dom.hasClass("selRow") && obj.id) {
                    $("[name=dictStatusRadio][value=" + obj.status + "]").prop("checked", true);
                }
            }
        });
    }

    function loadDetail(selectedRowData) {
        if (selectedRowData) {

            var initData = {
                id: selectedRowData["id"],
                dictName: selectedRowData["dictName"],
                dictMeaning: selectedRowData["dictMeaning"],
                gridData: []
            };

            for (var i = 0; i < 28; i++) {
                initData.gridData.push({
                    id: i,
                    dictName: selectedRowData.id + '_data_' + i,
                    showValue: selectedRowData.id + '_data_' + i,
                    saveValue: selectedRowData.id + '_data_' + i,
                    status: Number(i % 2)
                })
            }

            bindShowerTable(initData);
            bindEditerDialog("edit", initData);
        }
    }

    function bindShowerTable(initData) {
        $("#dictDetailTable_shower").XGrid("setGridParam", {
            data: initData.gridData
        }).trigger("reloadGrid");
    }

    function bindEditerDialog(type, initData) {
        utils.dialog({
            title: '修改',
            width: 900,
            height: 535,
            content: $("#edit_dialog"),
            /*
            okValue: '保存',
            cancelValue: '取消',
            */
            resetForm: true,
            button: [{
                id: "btnAdd",
                value: "新增",
                autofocus: true,
                callback: function () {
                    btnAddFn();
                    return false;
                }
            }, {
                id: "btnDelete",
                value: "删除",
                autofocus: true,
                callback: function () {
                    btnDelFn();
                    return false;
                }
            }, {
                id: "btnSave",
                value: "保存",
                autofocus: true,
                callback: function () {
                    btnSaveFn();
                }
            }, {
                id: "btnClose",
                value: "关闭",
                autofocus: false,
                callback: function () {

                }
            }],
            onshow: function () {
                //$(this.node).find('.ui-dialog-content').css({"overflow-y": 'scroll'});

                if (type == "add") {
                    $("#dictNameInput").val("").prop("disabled", false);
                    $("#dictdictMeaningInput").val("");
                    $("#dictDetailTable_editer").XGrid("clearGridData");
                } else if (type == "edit") {
                    $("#dictNameInput").val(initData.dictName).prop("disabled", true);
                    $("#dictdictMeaningInput").val(initData.dictMeaning);
                    $("#dictDetailTable_editer").XGrid("setGridParam", {
                        data: initData.gridData
                    }).trigger("reloadGrid");
                }
            },
            /*
            ok: function () {
            },
            cancel: function () {
            },
            */
            onclose: function () {

            },
        }).showModal();
    }

    //切换状态
    //0:正常,1:锁定
    $("[name=dictStatusRadio]").on('change', function () {
        var statusVal = this.value;
        var selectedRowData = $("#dictDetailTable_editer").XGrid("getSeleRow");
        if (selectedRowData) {
            $("#dictDetailTable_editer").XGrid("setRowData", selectedRowData.id, {
                status: statusVal
            })
        } else {
            $("[name=dictStatusRadio]").prop("checked", false);
            utils.dialog({
                content: "请选择编辑行!",
                quickClose: true,
                timeout: 2000
            }).showModal();
        }
    });

    //弹出框新增事件
    function btnAddFn() {
        $("#dictDetailTable_editer").XGrid("addRowData", {}, "last");
        $("#dictDetailTable_editer").parent(".XGridBody").get(0).scrollTo(0, $("#dictDetailTable_editer").height());
    }

    //弹出框删除事件
    function btnDelFn() {
        var selectedRowData = $("#dictDetailTable_editer").XGrid("getSeleRow");
        if (selectedRowData) {
            $("#dictDetailTable_editer").XGrid("delRowData", selectedRowData.id);
            $("[name=dictStatusRadio]").prop("checked", false);
        } else {
            utils.dialog({
                content: "请选择删除行!",
                quickClose: true,
                timeout: 2000
            }).showModal();
        }
    }

    //弹出框保存事件
    function btnSaveFn() {
        console.log($("#dictNameInput").val());
        console.log($("#dictdictMeaningInput").val());
        console.log($("#dictDetailTable_editer").XGrid("getRowData"));
    }

    //新增字段
    $("#btnAddDictList").on('click', function () {
        bindEditerDialog("add");
    })
});