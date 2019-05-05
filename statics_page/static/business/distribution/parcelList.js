$(function () {

    var gridData = [];
    for (var i = 0; i < 13; i++) {
        gridData.push({
            rowNum: i,
            containerType: 'data_' + i,
            containerLength: 'data_' + i,
            containerWidth: 'data_' + i,
            containerHeight: Number(i % 3),
            containerCubage: Number(i % 2),
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


    //改派
    $("#btn_reassignment").on('click', function () {
        utils.dialog({
            title: '订单改派',
            width: 821,
            height: 467,
            content: $("#show_reassignment_dialog"),
            /*
            okValue: '确定',
            cancelValue: '取消',
            */
            resetForm: true,
            button: [{
                id: "btnDelete",
                value: "删除",
                autofocus: true,
                callback: function () {

                    return false;
                }
            }, {
                id: "btnClose",
                value: "关闭",
                autofocus: true,
                callback: function () {

                }
            }, {
                id: "btnSave",
                value: "保存",
                autofocus: true,
                callback: function () {

                }
            }],
            onshow: function () {
                //$(this.node).find('.ui-dialog-content').css({"overflow-y": 'scroll', "max-height": "475px"});
                bindReassignmentData();
            },
            /*
            ok: function () {
                //保存按钮回调
            },
            cancel: function () {
            },
            */
            onclose: function () {

            },
        }).showModal();
    });

    function bindReassignmentData() {


        var gridData = [];
        for (var i = 1; i < 13; i++) {
            gridData.push({
                id: i,
                orderNum: i,//订单号
                dispatchType: Number(i % 3),//配送方式
                expressCompany: Number(i % 2),//快递公司
                dispatchNum: (i * Math.random() * 10).toFixed(0)//运单号
            })
        }


        $("#info_table_reassignment").XGrid({
            data: gridData,
            colNames: ["", "订单号", "配送方式", "快递公司", "运单号"],
            colModel: [{
                name: "id",
                hidden: true
            }, {
                name: "orderNum"
            }, {
                name: "dispatchType",
                rowtype: "#dispatchType_select",
                formatter: function (e, r, obj) {
                    var rtnStr = [];
                    rtnStr.push('<option value="0">请选择</option>');
                    rtnStr.push('<option value="1" >自营</option>');
                    rtnStr.push('<option value="2">第三方物流</option>');
                    $(r).find('select').html(rtnStr.join(""));

                    return e;
                },
                rowEvent: function (args) {
                    bindExpressCompanySelect($(args.e.target).closest('td').siblings("td[row-describedby=expressCompany]").find("select"), args.rowData.dispatchType);

                    //这一行的运单号
                    var $thisTrOrderNum = $(args.e.target).closest('td').siblings("td[row-describedby=dispatchNum]").find("input");

                    //自营
                    if (args.rowData.dispatchType == "1") {
                        $thisTrOrderNum.val(args.rowData.orderNum).prop("disabled", true);
                    } else {
                        $thisTrOrderNum.val($thisTrOrderNum.attr("data-exchange-before")).prop("disabled", false);
                    }
                }
            }, {
                name: "expressCompany",
                rowtype: "#expressCompany_select",
                formatter: function (e, r, obj) {
                    bindExpressCompanySelect($(r).find('select'), obj["dispatchType"]);
                    return e;
                },
                rowEvent: function (args) {
                    //这一行的运单号
                    var $thisTrOrderNum = $(args.e.target).closest('td').siblings("td[row-describedby=dispatchNum]").find("input");

                    //顺丰
                    if (args.rowData.expressCompany == "1") {
                        $thisTrOrderNum.val(args.rowData.orderNum).prop("disabled", true);
                    } else {
                        $thisTrOrderNum.val($thisTrOrderNum.attr("data-exchange-before")).prop("disabled", false);
                    }
                }
            }, {
                name: "dispatchNum",
                rowtype: "#dispatchNum_input"
            }],
            height: 400,
            maxheight: 400,
            key: "id",
            altRows: true,
            rowNum: 0,
            /*
            rowList: [10, 20, 50],
            pager: "#grid_pager_reassignment"
            */
            gridComplete: function () {
                var $this = $(this);
                var $eleTrs = $(this).find("tr:not(:first)");
                if (!($eleTrs && $eleTrs.length)) {
                    return false;
                }
                var orderNum, dispatchType, expressCompany, dispatchNumInput;
                $.each($eleTrs, function (i, v) {
                    orderNum = $(v).find('td[row-describedby="orderNum"]').html();//订单号
                    dispatchType = $(v).find('td[row-describedby="dispatchType"] select').val();//配送方式
                    expressCompany = $(v).find('td[row-describedby="expressCompany"] select').val();//快递公司
                    dispatchNumInput = $(v).find('td[row-describedby="dispatchNum"] input');//运单号
                    dispatchNumInput.attr({"data-exchange-before": dispatchNumInput.val()});//初始绑定值
                    if (dispatchType == "1" || expressCompany == "1") {
                        dispatchNumInput.val(orderNum).prop("disabled", true);
                    }
                })
            }
        });
    }


    function bindExpressCompanySelect(domTarget, eventVal) {
        var rtnStr = [];

        if (eventVal == "0") {
            rtnStr.push('<option value="0">请选择</option>');
        } else if (eventVal == "1") {
            rtnStr.push('<option value="1">自营物流</option>');
        } else if (eventVal == "2") {
            rtnStr.push('<option value="0">请选择</option>');
            rtnStr.push('<option value="1" >顺丰</option>');
            rtnStr.push('<option value="2">EMS</option>');
            rtnStr.push('<option value="3">德邦</option>');
        }
        domTarget.html(rtnStr);
    }

});