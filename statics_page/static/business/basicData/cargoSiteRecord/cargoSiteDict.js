$(function () {

    var gridData = [];
    for (var i = 0; i < 13; i++) {
        gridData.push({
            rowNum: i,
            cargoSiteAddress: 'data_' + i,
            isShowCargoSite: 'data_' + i,
            depotType: 'data_' + i,
            depotNum: 'data_' + i,
            StackingNum: 'data_' + i,
            depotAreaNum: 'data_' + i,
            logicArea: 'data_' + i,
            row: 'data_' + i,
            column: 'data_' + i,
            layer: 'data_' + i,
            cargoCapacity: 'data_' + i,
            LanewayNum: 'data_' + i,
            workArea: 'data_' + i,
            pickingPath: 'data_' + i,
            TagNum: 'data_' + i,
            ABCClassify: 'data_' + i,
            largeCategoryOfGoods: 'data_' + i,
            drugType: 'data_' + i,
            zerosGrouping: 'data_' + i,
            cargoSiteType: 'data_' + i,
            length: 'data_' + i,
            width: 'data_' + i,
            height: 'data_' + i,
            shieldingSign: 'data_' + i,
            deviceIdentification: 'data_' + i,
            isMovable: 'data_' + i,
            isInventory: 'data_' + i,
            isLocked: 'data_' + i,
            isSale: 'data_' + i,
            isIncludedInventory: 'data_' + i,
            varietyNum: 'data_' + i,
            personCharge: 'data_' + i,
            storageClassification: 'data_' + i,
            managerNum: 'data_' + i,
            depotStatus: 'data_' + i,
            shelfNum: 'data_' + i,
            isSpecifyLowerLimit: 'data_' + i,
            remark: 'data_' + i

        })
    }

    $("#info_table").XGrid({
        data: gridData,
        colNames: ["", "货位地址", "显示货位", "库别", "库别编号", "堆垛编号", "库区编号", "逻辑区域", "排", "列", "层", "货位容量", "巷道号","工作区域","拣货路径", "电子标签编号", "ABC分类", "商品大类", "剂型", "拆零分组", "货位类别", "长", "宽", "高", "屏蔽标志", "设备标识", "是否移动", "是否盘点", "是否锁定", "是否销售", "是否计入总库存", "品种数", "负责人", "存储分类", "管理人员数", "库房条件", "货架编号", "是否指定下限位", "备注"],
        colModel: [{
            name: "rowNum"
        }, {
            name: "cargoSiteAddress"//货位地址
        }, {
            name: "isShowCargoSite"//显示货位
        }, {
            name: "depotType"//库别
        }, {
            name: "depotNum"//库别编号
        }, {
            name: "StackingNum"//堆垛编号
        }, {
            name: "depotAreaNum"//库区编号
        }, {
            name: "logicArea"//逻辑区域
        }, {
            name: "row"//排
        }, {
            name: "column"//列
        }, {
            name: "layer"//层
        }, {
            name: "cargoCapacity"//货位容量
        }, {
            name: "LanewayNum"//巷道号
        },  {
            name: "workArea"//工作区域
        }, {
            name: "pickingPath"//拣货路径
        },{
            name: "TagNum"//电子标签编号
        }, {
            name: "ABCClassify"//ABC分类
        }, {
            name: "largeCategoryOfGoods"//商品大类
        }, {
            name: "drugType"//剂型
        }, {
            name: "zerosGrouping"//拆零分组
        }, {
            name: "cargoSiteType"//货位类别
        }, {
            name: "length"//长
        }, {
            name: "width"//宽
        }, {
            name: "height"//高
        }, {
            name: "shieldingSign"//屏蔽标志
        }, {
            name: "deviceIdentification"//设备标识
        }, {
            name: "isMovable"//是否移动
        }, {
            name: "isInventory"//是否盘点
        }, {
            name: "isLocked"//是否锁定
        }, {
            name: "isSale"//是否销售
        }, {
            name: "isIncludedInventory"//是否计入总库存
        }, {
            name: "varietyNum"//品种数
        }, {
            name: "personCharge"//负责人
        }, {
            name: "storageClassification"//存储分类
        }, {
            name: "managerNum"//管理人员数
        }, {
            name: "depotStatus"//库房条件
        }, {
            name: "shelfNum"//货架编号
        }, {
            name: "isSpecifyLowerLimit"//是否指定下限位
        }, {
            name: "remark"//备注
        }],
        key: "rowNum",
        rowNum: 10,
        selectandorder: false,
        rowList: [10, 20, 50],
        altRows: true,
        pager: "#grid_pager"
    });


    //新增,修改
    $("#btn_add,#btn_edit").on("click", function () {
        var thisId = this.id;
        if (thisId == "btn_edit") {
            var selectRow = $("#info_table").XGrid("getSeleRow");
            if (!(selectRow && selectRow.length)) {
                utils.dialog({
                    content: "请选择修改行！",
                    timeout: 2000
                }).show();
                return false;
            }
        }

        utils.dialog({
            title: '修改商品批号',
            width: 1200,
            height: 510,
            content: $("#add_edit_dialog"),
            okValue: '保存',
            cancelValue: '取消',
            onshow: function () {
                $(this.node).find('.ui-dialog-content').css({"overflow-y": 'scroll'});

                switch (thisId) {
                    case "btn_add":

                        break;
                    case "btn_edit":

                        var json = {
                            nm_cargoSiteAddr: "XYY-01-C02",
                            nm_showCargoSite: "Y",
                            nm_depot: "1"

                        };

                        $(this.node).find("form").serializeJSONToForm(json);

                        break;
                }
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
