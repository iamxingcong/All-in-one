function initDate(param) {
    var new_date = new Date();
    var year = new_date.getFullYear();
    var month = new_date.getMonth() + 1;
    var date = new_date.getDate();
    //1位数加0
    month = month.toString().length <= 1 ? '0' + month : month;
    date = date.toString().length <= 1 ? '0' + date : date;
    //console.log(new_date, year, month, date);
    //设置开始时间为当月第一天00:00:00，结束时间为当天23:59:59
    $('#beginTime').val(year + '-' + month + '-01');
    $('#endTime').val(year + '-' + month + '-' + date);
}

$(function () {
    var grid_dataY = [];
    $('#X_Table').XGrid({
        data: grid_dataY,
        colNames: ['养护记录单据编号', '日期', '机构名称', '部门名称', '养护员', '养护类别', '单据状态', '备注'],
        postData:{
            orgCode:''
        },
        colModel: [
            {
                name: 'checkPlanCode',
                index: 'checkPlanCode',//索引。其和后台交互的参数为sidx
                key: true
            }, {
                name: 'checkTimes',
                index: 'checkTimes',
                formatter:function (e){
                    if (e != null && e !="") {
                        return ToolUtil.dateFormat(e, 'yyyy-MM-dd');
                    } else {
                        return "";
                    }
                }
            }, {
                name: 'orgName',
                index: 'orgName'

            }, {
                name: 'depaName',
                index: 'depaName'
            }, {
                name: 'userName',
                index: 'userName'
            }, {
                name: 'checkType',
                index: 'checkType',
                formatter: function (e) {
                    if (e == '1') {
                        return '重点养护'
                    } else if (e == '2') {
                        return '普通养护'
                    }
                }
            }, {
                name: 'status',
                index: 'status',
                formatter: function (e) {
                    if (e == '1') {
                        return '已完成'
                    } else if (e == '2') {
                        return '未养护'
                    }
                }
            }, {
                name: 'rate',
                index: 'rate'
            }, {
                name: 'orgCode',
                index: 'orgCode',
                hidden:true
            }
        ],
        rowNum: 20,
        rowList:[20,50,100],
        altRows: true,//设置为交替行表格,默认为false
        rownumbers: true,//是否展示序号，多选
        ondblClickRow: function (e, c, a, b) {
            $("#checkPlanCode").val(a.checkPlanCode)
            $("#orgName").val(a.orgName);
            $("#deptName").val(a.depaName);
            $("#userName").val(a.userName);

            var el = document.querySelector('#checkPlanInfo_Table_wrap');//html元素
            utils.dialog({
                title:'历史养护记录详情',
                content: el,
                width:$(window).width()*0.8,
                height:$(window).height()*0.8

            }).showModal();
            $('#checkPlanInfo_Table').XGrid({
                data: grid_dataY,
                postData:{
                    checkPlanCode:a.checkPlanCode,
                    orgCode:a.orgCode
                },
                colNames: ["商品编号", "商品名称", "商品规格 ", "生产厂家", "单位", "剂型", "库房名称","批号","实际养护数量","养护类别","生产日期","有效期","养护完成日期","近效期天数","养护周期","养护状态","备注"],
                colModel: [
                    {
                        name: 'productCode',
                        index: 'productCode',//索引。其和后台交互的参数为sidx
                        key: true
                    }, {
                        name: 'productName',
                        index: 'productName'

                    }, {
                        name: 'specifications',
                        index: 'specifications'
                    }, {
                        name: 'manufacturerVal',
                        index: 'manufacturerVal'
                    }, {
                        name: 'packingUnitVal',
                        index: 'packingUnitVal'
                    },
                    {
                        name: 'dosageFormVal',
                        index: 'dosageFormVal',

                    }, {
                        name: 'wareHouse',
                        index: 'wareHouse',
                        formatter:function (e){
                            if (e != null && e !="") {
                                if(e==1){
                                    return  "合格库"
                                }
                                if(e==2){
                                    return  "不合格库"
                                }
                                if(e==3){
                                    return  "暂存库"
                                }
                            } else {
                                return "";
                            }
                        }

                    }, {
                        name: 'productBatch',
                        index: 'productBatch'
                    },{
                        name: 'amount',
                        index: 'amount'
                    }, {
                        name: 'checkType',
                        index: 'checkType',
                        formatter:function (e){
                            if (e != null && e !="") {
                                if(e==1){
                                    return  "重点养护"
                                }
                                if(e==2){
                                    return  "普通养护"
                                }
                            } else {
                                return "";
                            }
                        }
                    }, {
                        name: 'productDate',
                        index: 'productDate',
                        formatter:function (e){
                            if (e != null && e !="") {
                                return ToolUtil.dateFormat(e, 'yyyy-MM-dd');
                            } else {
                                return "";
                            }
                        }
                    }, {
                        name: 'validateDate',
                        index: 'validateDate',
                        formatter:function (e){
                            if (e != null && e !="") {
                                return ToolUtil.dateFormat(e, 'yyyy-MM-dd');
                            } else {
                                return "";
                            }
                        }
                    }, {
                        name: 'completionDate',
                        index: 'completionDate',
                        formatter:function (e){
                            if (e != null && e !="") {
                                return ToolUtil.dateFormat(e, 'yyyy-MM-dd');
                            } else {
                                return "";
                            }
                        }
                    }, {
                        name: 'neareffect',
                        index: 'neareffect'
                    }, {
                        name: 'checkcycle',
                        index: 'checkcycle'
                    }, {
                        name: 'statusName',
                        index: 'statusName'
                    }, {
                        name: 'remark',
                        index: 'remark'
                    }
                ],
                rowNum: 20,
                rowList:[20,50,100],
                altRows: true,//设置为交替行表格,默认为false
                rownumbers: true,//是否展示序号，多选
                ondblClickRow: function (e, c, a, b) {


                },
                onSelectRow: function (e, c, a, b) {

                },
                pager: '#checkPlanInfo_Table-pager',
            });

        },
        onSelectRow: function (e, c, a, b) {

        },
        pager: '#grid-pager',
    });

})
