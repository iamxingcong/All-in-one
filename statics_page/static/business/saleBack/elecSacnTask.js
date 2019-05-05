!(function () {


    var gridData = [];
    var colNames = ['单据编号', '单据类型', '单据状态', '销售退回收货单编号', '收货日期', '商品编号', '商品名称', '商品规格', '生产厂家', '包装单位',
        '件包装单位', '收货零散数', '收货件数', '收货数量', '通用名', '产地', '批号', '容器号'];
    var colModels = [
        {
            name: 'name1'
        },
        {
            name: 'name2'
        },
        {
            name: 'name3'
        },
        {
            name: 'name4'
        },
        {
            name: 'name5'
        },
        {
            name: 'name6'
        },
        {
            name: 'name7'
        },
        {
            name: 'name8'
        },{
            name: 'name9'
        },
        {
            name: 'name10'
        },
        {
            name: 'name11'
        }, {
            name: 'name12'
        },
        {
            name: 'name13'
        },
        {
            name: 'name14'
        },
        {
            name: 'name15'
        },
        {
            name: 'name16'
        },
        {
            name: 'name17'
        },
        {
            name: 'name18'
        }
    ];
    for (var i = 0; i < 1; i++) {
        gridData.push({
            name1: '001',
            name2: '001',
            name3: '001',
            name4: '001',
            name5: '001',
            name6: '001',
            name7: '001',
            name8: '001',
            name9: '001',
            name10: '001',
            name11: '001',
            name12: '001',
            name13: '001',
            name14: '001',
            name15: '001',
            name16: '001',
            name17: '001',
            name18: '001',
            name19: '001',
            name20: '001',
            name21: '001'
        })
    }


    utils.setTableHeight('X_Table');
    $('#X_Table').XGrid({
        data: gridData,
        colNames: colNames,
        colModel: colModels,
        rowNum: 20,
        key: 'name1',
        rownumbers: true,
        // selectandorder: true,
        rowList: [10,20,50],
        altRows: true,
        height: 600,
        ondblClickRow: function (id, dom, obj, index, event) {
            //双击事件
            //回调参数化：id：本行id,dom:本行DOM元素,obj:本行json值,index:下标,event:原事件
            console.log(id, dom, obj, index, event);
            utils.dialog({
                title: '电子监管码录入单',
                content: $('#entryOrderModal'),
                width: 600
            }).showModal();

        },
        pager: '#grid-pager'
    });

    // utils.dialog({
    //     title: '电子监管码录入单',
    //     content: $('#entryOrderModal'),
    //     width: 800
    // }).showModal();

    $('#order_1').XGrid({
        data: gridData,
        colNames: ['商品编码', '规格', '名称', '生产厂家', '包装单位', '中包装规格', '件包装规格'],
        colModel: [
            {
                name: 'name1'
            },
            {
                name: 'name2'
            },
            {
                name: 'name3'
            },
            {
                name: 'name4'
            },
            {
                name: 'name5'
            },
            {
                name: 'name6'
            },
            {
                name: 'name7'
            }
        ],
        key: 'name1',
        altRows: true
    });

    $('#order_2').XGrid({
        data: gridData,
        colNames: ['待扫描件包装监管码数', '已扫描件包装监管码数', '待扫描中包装监管码数', '已扫描中包装监管码数', '待扫描小包装监管码数', '已扫描小包装监管码数', '扫描状态'],
        colModel: [
            {
                name: 'name1'
            },
            {
                name: 'name2'
            },
            {
                name: 'name3'
            },
            {
                name: 'name4'
            },
            {
                name: 'name5'
            },
            {
                name: 'name6'
            },
            {
                name: 'name7'
            }
        ],
        key: 'name1',
        altRows: true
    });

    //设置显示列

    $('#setCol').bind('click', function () {
        $('#X_Table').XGrid('filterTableHead');
    })

    // 数据统计
    var source = '共有<%=allbox%>个周转箱，当前复核台有<%=unobtain%>个周转箱未索取，<%=obtain%>个周转箱已索取'
    var method = 'get'
    var url = '/sysVersion/findAllVersionInfoList'
    var form_data = ''
    $('#data_statistics').dataStatistics({
        source: source,
        method: method,
        url: url,
        form_data: form_data
    });


})(window, jQuery);
