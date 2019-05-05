$(function () {
    /* 弹窗传递的数据 */
    var dialog = parent.dialog.get(window);
    console.log(dialog)


    initTable();

    // 生成表格
    function initTable(orderCode) {
        //订单编号
        console.log(orderCode);

        var colModel = [];
        var grid_dataY = [];
        var colName = [
            '显示货位',
            '商品编号',
            '配送方向',
            '商品名称',
            '规格',
            '批号',
            '数量',
            '包装单位',
            '周转箱代号',
            '周转箱号',
            '复核台'
        ];
        var content = [
            'text1',
            'text2',
            'text3',
            'text4',
            'text5',
            'text6',
            'text7',
            'text8',
            'text9',
            'text10',
            'text11'
        ]
        colModel = content.map(function (item) {
            return {'name': item}
        })
        for (var i = 0; i < 20; i++) {
            var obj = {}
            content.forEach(function (item) {
                obj[item] = Math.floor(Math.random() * 10)
            })
            grid_dataY.push(obj);
        }

        $('#table_a').XGrid({
            /* url:"xxxx",
             postData:{
             orderCode:orderCode
             }, */
            data: grid_dataY,
            colNames: colName,
            colModel: colModel,
            key: 'text1',
            rowNum: 20,
            rownumbers: true,
            altRows: true,
            pager: '#grid-pager',
        });
    }

})