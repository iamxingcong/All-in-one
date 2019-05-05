!(function () {


    var gridData = [];
    var colNames = ['日期', '商品编号', '商品名称', '商品规格', '生产厂家', '商品产地', '单位','剂型','存储条件'];
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
        },
        {
            name: 'name9'
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
        rownumbers: true,
        // selectandorder: true,
        rowList: [10, 20, 50],
        altRows: true,
        ondblClickRow: function (e, c, obj, b) {
            utils.dialog({
                title: '重点养护药品信息',
                content: el,
                width: $(window).width() * 0.8,
                height: $(window).height() * 0.8
            }).showModal();
        },
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


})(window, jQuery);

//单据起始日期 - 截止日期
function startTime() {
    WdatePicker({
        errDealMode: 1,
        maxDate: '#F{$dp.$D(\'endTime\')}'
    })

}

function getEndTime() {
    WdatePicker({
        errDealMode: 1,
        minDate: '#F{$dp.$D(\'beginTime\')}'
    })

}
