$(function () {
    var table_data = [{
        id: "1",
        txt1: "带入",
        txt2: "带入",
        txt3: "带入",
        txt4: '带入',
        txt5: '带入',
        txt6: "XX件",
        txt7: '带入',
        txt8: "XX件",
        txt9: '带入',
        txt10: '带入'
    }]
    var $X_Tableb = $('#X_Tableb');
    $X_Tableb.XGrid({
        data: table_data,
        // url: 'http://www.baidu.com',
        colNames: ['序号', '待修改单编号', '收货日期', '供应商编号', '供应商名称', '部门名称', '采购员', '送货方式', '验收员', '入库员', '是否中药'],
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
        txt15: '带入',
        txt16: "XX件",
        txt17: '带入',
        txt18: '带入',
        txt19: '带入',
        txt20: '带入'
    }];
    var $X_Table = $('#X_Table');
    $X_Table.XGrid({
        data: grid_data,
        // url: 'http://www.baidu.com',
        colNames: ['行号', '是否监管', '商品编号', '商品名称', '商品规格', '生产厂家', '产地', '包装单位', '件包装规格', '件数', '零散数',
            '数量', '批号', '生产日期', '有效期至', '容器编号', '剂型', '修改备注', '是否特殊药品', '批准文号', '灭菌批号'
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
})