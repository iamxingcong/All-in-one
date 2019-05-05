$(function () {


    var gridData = [];
    for (var i = 0; i < 13; i++) {
        gridData.push({
            rowNum: i,
            depotAreaNum: 'data_' + i,
            functionDepotAreaNum: 'data_' + i,
            functionDepotAreaExplain: 'data_' + i,
            logisticsNum: 'data_' + i,
            depotType: 'data_' + i,
            depotNum: 'data_' + i,
            pickCargoStyle: 'data_' + i,
            depotStatus: 'data_' + i,
            pickType: 'data_' + i,
            verifyOutDepotType: 'data_' + i,
            canBeUsedAsStage: 'data_' + i,
            proprietorNum: 'data_' + i,
            proprietorName: 'data_' + i
        })
    }

    $("#info_table").XGrid({
        data: gridData,
        colNames: ["", "库区编号", "功能库区编码", "功能库区说明", "物流中心编码", "库别", "库房编码", "拣货类型", "库房条件", "拣货方式", "复核出库类型", "楼层库是否可做暂存库", "业主编码", "业主名称"],
        colModel: [{
            name: "rowNum"
        }, {
            name: "depotAreaNum"//库区编号
        }, {
            name: "functionDepotAreaNum"//功能库区编码
        }, {
            name: "functionDepotAreaExplain"//功能库区说明
        }, {
            name: "logisticsNum"//物流中心编码
        }, {
            name: "depotType"//库别
        }, {
            name: "depotNum"//库房编码
        }, {
            name: "pickCargoStyle"//拣货类型
        }, {
            name: "depotStatus"//库房条件
        }, {
            name: "pickType"//拣货方式
        }, {
            name: "verifyOutDepotType"//复核出库类型
        }, {
            name: "canBeUsedAsStage"//楼层库是否可做暂存库
        }, {
            name: "proprietorNum"//业主编码
        }, {
            name: "proprietorName"//业主名称
        },],
        key: "rowNum",
        rowNum: 10,
        selectandorder: false,
        rowList: [10, 20, 50],
        altRows: true,
        pager: "#grid_pager"
    });


    //新增、编辑
    $("#add_btn,#edit_btn").on("click", function () {
        var that = this;
        var selectedRowData = void 0;

        if (that.id == "edit_btn") {
            selectedRowData = $("#info_table").XGrid("getSeleRow");
            if (!selectedRowData) {
                utils.dialog({
                    content: '请选择编辑行！',
                    quickClose: true
                }).showModal();
                return false;
            }
        }

        utils.dialog({
            title: '新增/编辑',
            width: 700,
            height: 515,
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


    //拣货方式,选择规则
    $("body").on('click', '[name^=pickWay]', function () {
        var $that = $(this);
        var thatValue = $that.val();
        var parentsLabelList = $that.parents('label').siblings();

        if ($.isNumeric(thatValue) && (Number(thatValue) > 2)) {
            var $radioPDA = parentsLabelList.find('input[name=pickWayPDA]');
            if ($radioPDA && $radioPDA.length) {// && $radioPDA.is(":checked")
                $radioPDA.prop("checked", false);
            }
        } else if (thatValue == "2") {
            var radioList = parentsLabelList.find('input[name=pickWay]');
            $.each(radioList, function (i, v) {
                if ($.isNumeric(v.value) && (Number(v.value) > 2)) {
                    $(v).prop("checked", false);
                }
            })
        }
    });

    //全选反选功能
    $("#pickingType").on('click',function() {
        $("input[name='pickingType']").prop("checked", this.checked);
    });

    $("input[name='pickingType']").on('click',function() {
        var $subsType = $("input[name='pickingType']");
        $("#pickingType").prop("checked" , $subsType.length == $subsType.filter(":checked").length ? true :false);
    });
    //库房条件全选/反选
    $("#condition").on('click',function() {
        $("input[name='condition']").prop("checked", this.checked);
    });

    $("input[name='condition']").on('click',function() {
        var $subsCondition = $("input[name='condition']");
        $("#condition").prop("checked" , $subsCondition.length == $subsCondition.filter(":checked").length ? true :false);
    });
});
