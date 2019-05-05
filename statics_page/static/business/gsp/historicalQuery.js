$(function () {
    var grid_dataY = [];
    $('#X_Table').XGrid({
        data: grid_dataY,
        colNames: ['商品编码', '商品名称', '商品规格', '生产厂家','批号','货位号', '养护记录单据编号', '养护日期', '机构名称', '部门名称','养护员','养护类别','单据状态','备注'],
        colModel: [
            {
                name: 'productCode',
                index: 'productCode'
            }, {
                name: 'productName',
                index: 'productName'
            }, {
                name: 'specifications',
                index: 'specifications'
            }, {
                name: 'manufacturerVal',
                index: 'manufacturerVal'
            },{
                name:'productBatch',
                index:'productBatch'
            },{
                name: 'locationNumber',
                index: 'locationNumber'
            }, {
                name: 'checkPlanCode',
                index: 'checkPlanCode',
                width:200
            }, {
                name: 'completionDate',
                index: 'completionDate',
            }, {
                name: 'orgName',
                index: 'orgName'
            }, {
                name: 'deptName',
                index: 'deptName'
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
            },{
                name: 'documentStatus',
                index: 'documentStatus'
            },{
                name: 'remark',
                index: 'remark'
            }
        ],
        rowNum: 20,
        rowList: [20, 50, 100],
        altRows: true,//设置为交替行表格,默认为false
        rownumbers: true,//是否展示序号，多选
        ondblClickRow: function (e, c, a, b) {
        },
        pager: '#grid-pager',
    });

})


