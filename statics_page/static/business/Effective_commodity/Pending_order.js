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
            txt12:'操作'
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
            txt12:'操作'
        }
    ];
    var $X_Table = $('#X_Table');
    $X_Table.XGrid({
        data: grid_data,
        // url: 'http://www.baidu.com',
        colNames: ['序号', '待处理单据编号', '单据行号', '商品编码', '生产厂家', '名称', '规格', '数量', '供应商', '采购员',
            '备注', '单据状态','调整单据状态'
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
        },{
            name: 'txt12',
            index: 'txt12',
            formatter: function (value) {
                return '<button type="button" class="btn btn-info operate">操作</button>';
            }
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