!(function () {


    var gridData = [];
    var colNames = ['机构名称', '仓库名称', '销售退回入库单号', '销售退回验收单号', '销售退回开票单号', '单据日期', '部门', '验收员', '上架员', '上架日期',
        '单据状态'];
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
        }
    ];
    for (var i = 0; i < 20; i++) {
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
        // rownumbers: true,
        selectandorder: true,
        rowList: [10,20,50],
        altRows: true,//设置为交替行表格,默认为false
        pager: '#grid-pager'
    });

    //列表查询
    $('#searchBtn').bind('click', function () {
        var data = $('#myForm').serializeToJSON();
        $('#X_Table').setGridParam({
            url: 'http://www.baidu.com',
            postData: data
        }).trigger('reloadGrid');
    })

    //设置显示列
    $('#setCol').bind('click', function () {
        $('#X_Table').XGrid('filterTableHead');
    })

    // 放大镜商品查询
    $('body').on('click', '.glyphicon-search', function () {
        $(this).siblings("input").trigger("dblclick");
    })

    //双击商品查询
    $('#product').dblclick(function () {
        utils.dialog({
            title: '供应商列表',
            url: 'produceList.html',
            width: $(window).width() * 0.8,
            height: 600,
            data: $('#product').val(), // 给modal 要传递的 的数据
            onclose: function () {
                if (this.returnValue) {
                    var data = this.returnValue;
                    $("#product").val(data.name1);
                }
            },
            oniframeload: function () {
                // console.log('iframe ready')
            }
        }).showModal();
        return false;
    })


})(window, jQuery);
