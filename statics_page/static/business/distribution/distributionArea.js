$(function () {
    var grid_data = [{
        id: "1",
        txt1: "武汉市内",
        txt2: '',
        txt3: '',
        txt4: '',
        txt5: '',
        txt6: '',
        txt7: '',
        txt8: '',
        txt9: '',
        txt10: '',
        txt11: ''
        
    },
    {
        id: "2",
        txt1: "武汉市外",
        txt2: '',
        txt3: '',
        txt4: '',
        txt5: '',
        txt6: '',
        txt7: '',
        txt8: '',
        txt9: '',
        txt10: '',
        txt11: ''
        
    },
    {
        id: "3",
        txt1: "省际",
        txt2: '',
        txt3: '',
        txt4: '',
        txt5: '',
        txt6: '',
        txt7: '',
        txt8: '',
        txt9: '',
        txt10: '',
        txt11: ''
        
    }];
    var $X_Table = $('#X_Table');
    var rowData;
    $X_Table.XGrid({
        data: grid_data,
        // url: 'http://www.baidu.com',
        colNames: ['id', '配送方向','一级区域编码','一级区域名称','二级区域编码','二级区域名称','三级区域编码','三级区域名称','四级区域编码','四级区域名称',
        '五级区域编码','五级区域名称'
        ],
        colModel: [{
            name: 'id',
            hidden: true,
            hide: true,
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
           
        }],
        rowNum: 10,
        rownumbers: false,
        altRows: true, 
        ondblClickRow: function (e, c, a, b) {
            console.log(' ', e, c, a, b);

        },
        onSelectRow: function (e, c, a, b) {
            rowData = a;
            console.log(' ', e, c, a, b);
        },
        
    });
})