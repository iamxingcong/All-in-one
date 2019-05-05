$(function () {
    var table_data = [{
        id: "1",
        txt1: "带入",
        txt2: "带入",
        txt3: "带入",
        txt4: '带入',
        txt5: '带入',
        txt6: "XX件",
        txt7: '带入'
    }]
    var $X_Tableb = $('#X_Tableb');
    $X_Tableb.XGrid({
        data: table_data,
        // url: 'http://www.baidu.com',
        colNames: ['序号', '采购订单编号', '下单日期', '部门名称', '送货方式', '预计到货时间', '采购员', '是否中药'],
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
            txt15: '带入'
        },
        {
            id: "2",
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
            txt15: '带入'
        }
    ];
    var $X_Table = $('#X_Table');
    $X_Table.XGrid({
        data: grid_data,
        // url: 'http://www.baidu.com',
        colNames: ['序号', '是否监管', '是否特殊药品', '药品大类', '商品编号', '商品名称', '商品规格', '生产厂家',
            '包装单位', '数量', '件包装规格', '件数', '零散数', '产地', '单价', '金额'
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
        }],
        rowNum: 10,
        altRows: true,
        selectandorder: true,
        ondblClickRow: function (e, c, a, b) {
            console.log('双击行事件', e, c, a, b);
        },
        onSelectRow: function (e, c, a, b) {
            console.log('单机行事件', e, c, a, b);
        },
        pager: '#grid-pager',
    });
})
