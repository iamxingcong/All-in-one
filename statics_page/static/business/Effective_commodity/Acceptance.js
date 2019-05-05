$(function () {
    var grid_data = [{
        id: "1",
        txt1: "带入",
        txt2: "带入",
        txt3: "带入",
        txt4: '带入',
        txt5: '带入',
        txt6: "XX件",
        txt7: '带入',
        txt8: '带入',
        txt9: '带入',
        txt10: '带入',
        txt11: '带入',
        txt12: '操作',
        txt13: "XX件",
        txt14: '带入',
        txt15: '带入',
        txt16: '带入',
        txt17: '带入',
        txt18: '带入',
        txt19: '操作',
        txt20: "XX件",
        txt21: '带入',
        txt22: '带入',
        txt23: '带入',
        txt24: '带入',
        txt25: '带入',
        txt26: '操作',
        txt27: "XX件",
        txt28: '带入',
        txt29: '带入',
        txt30: "操作",
        txt31: '带入'
    }];
    var $X_Table = $('#X_Table');
    $X_Table.XGrid({
        data: grid_data,
        // url: 'http://www.baidu.com',
        colNames: ['序号', '单据编号', '单据类型', '单据状态', '是否监管', '库房编号', '商品编号', '商品名称', '商品规格', '生产厂家',
            '产地', '包装单位', '件包装规格', '收货零散数', '收货件数', '收货数量', '抽检数量', '实际验收数量', '批号', '生产日期',
            '有效期至', '批准文号', '容器编码', '验收数量', '是否特殊商品', '验收结果', '验收备注', '拒收原因', '拒收原因补充',
            '单据创建时间','单据完成时间', '单据操作'
        ],
        colModel: [{
            name: 'id',
            index: 'id'
        }, {
            name: 'txt1',
            index: 'txt1'
        }, {
            name: 'txt2',
            index: 'txt2'
        }, {
            name: 'txt3',
            index: 'txt3'
        }, {
            name: 'txt4',
            index: 'txt4'
        }, {
            name: 'txt5',
            index: 'txt5',
            formatter: function (e) {
                console.log(e)
                return e;
            }
        }, {
            name: 'txt6',
            index: 'txt6'
        }, {
            name: 'txt7',
            index: 'txt7'
        }, {
            name: 'txt8',
            index: 'txt8'
        }, {
            name: 'txt9',
            index: 'txt9'
        }, {
            name: 'txt10',
            index: 'txt10'
        }, {
            name: 'txt11',
            index: 'txt11'
        }, {
            name: 'txt12',
            index: 'txt12'
        }, {
            name: 'txt13',
            index: 'txt13'
        }, {
            name: 'txt14',
            index: 'txt14'
        }, {
            name: 'txt15',
            index: 'txt15'
        }, {
            name: 'txt16',
            index: 'txt16'
        }, {
            name: 'txt17',
            index: 'txt17'
        }, {
            name: 'txt18',
            index: 'txt18'
        }, {
            name: 'txt19',
            index: 'txt19'
        }, {
            name: 'txt20',
            index: 'txt20'
        }, {
            name: 'txt21',
            index: 'txt21'
        }, {
            name: 'txt22',
            index: 'txt22'
        }, {
            name: 'txt23',
            index: 'txt23'
        }, {
            name: 'txt24',
            index: 'txt24'
        }, {
            name: 'txt25',
            index: 'txt25'
        }, {
            name: 'txt26',
            index: 'txt26'
        }, {
            name: 'txt27',
            index: 'txt27'
        }, {
            name: 'txt28',
            index: 'txt28'
        }, {
            name: 'txt29',
            index: 'txt29'
        }, {
            name: 'txt30',
            index: 'txt30'
        },{
            name: 'txt31',
            index: 'txt31'
        }],
        rowNum: 10,
        altRows: true, //设置为交替行表格,默认为false
        ondblClickRow: function (e, c, a, b) {
            console.log('双击行事件', e, c, a, b);
        },
        onSelectRow: function (e, c, a, b) {
            console.log('单机行事件', e, c, a, b);
        },
        pager: '#grid-pager',
    });
    //设置显示列
    $('#setCol').bind('click', function () {
        $('#X_Table').XGrid('filterTableHead');
    })
})