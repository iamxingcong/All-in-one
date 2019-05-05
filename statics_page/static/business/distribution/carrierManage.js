$(function () {
    var grid_data = [{
        id: "1",
        txt1: "CYS0002",
        txt2: '委外',
        txt3: '顺丰速运',
        txt4: '省际',
        txt5: '北京-海南线，山东-海口线',
        txt6: '生效'
       
    },
    {
        id: "2",
        txt1: '',
        txt2: '',
        txt3: '',
        txt4: '',
        txt5: '',
        txt6: '' 
    },
    {
        id: "3",
        txt1:'',
        txt2: '',
        txt3: '',
        txt4: '',
        txt5: '',
        txt6: '' 
    }];
    var $X_Table = $('#X_Table');
    var rowData;
    $X_Table.XGrid({
        data: grid_data,
        // url: 'http://www.baidu.com',
        colNames: ['id', '承运商ID','承运商类型','承运商名称','配送范围','配送线路','生效状态'],
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
            index: 'txt5'
        }, {
            name: 'txt6',
            index: 'txt6'
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
        
    })


 

    
     
})