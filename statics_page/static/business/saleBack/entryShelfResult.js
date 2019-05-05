!(function () {

    var gridData = [];
    var colNames = ['业主编码', '业主名称', '商品编码', '商品名称', '商品规格', '生产厂家','产地', '单位', '包装数量','库别名称',
        '批号','计划上架货位','<span class="text-danger">实际上架货位</span>','上架数量', '实际退回数量', '实际件数', '实际零散数','容器编号', '退货原因'];
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
        },
        {
            name: 'name12'
        },
        {
            name: 'name13',
            rowtype:'#num_black'
        },
        {
            name: 'name14',
            rowtype:'#num_black'
        },
        {
            name: 'name15'
        },
        {
            name: 'name16'
        },{
            name: 'name17'
        },
        {
            name: 'name18'
        },
        {
            name: 'name19'
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
        key: 'name1',
        rowNum: 20,
        // rownumbers: true,
        selectandorder: true,
        rowList: [10, 20, 50],
        altRows: true,
        ondblClickRow: function (id, dom, obj, index, event) {
            //双击事件
            //回调参数化：id：本行id,dom:本行DOM元素,obj:本行json值,index:下标,event:原事件
            console.log(id, dom, obj, index, event);
            var _this = $(this);
            splitRowData(_this, obj);

        },
        pager: '#grid-pager'
    });


    //拆分行
    function splitRowData(Xgrid, obj) {

        //初始化表格
        $('#split_table').XGrid({
            data: [],
            colNames: ['是否监管', '商品编号', '商品名称', '商品规格', '生产厂家', '包装单位', '单价', '容器编号', '包装数量', '行数量', '总数量'],
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
                },
                {
                    name: 'name8',
                    rowtype: '#num_black'
                }, {
                    name: 'name9'
                },
                {
                    name: 'name17',
                    rowtype: '#num_black'
                },
                {
                    name: 'name11'
                }],
            key: 'name4',
            rownumbers: true,
            altRows: true
        });

        var split_modal = utils.dialog({
            title: '拆分表单行',
            width: $(window).width() * 0.8,
            content: $('#splitModal')
        }).showModal();

        $('#split_table').XGrid('addRowData', obj);

        //新增行
        $('#addRow').bind('click', function () {
            $('#split_table').XGrid('addRowData', obj);
        })

        //删除行
        $('#deleteRow').bind('click', function () {
            var seleRow = $('#split_table').XGrid('getSeleRow');
            if (seleRow && seleRow.length) {
                $('#split_table').XGrid('delRowData', seleRow[0].id);
            } else {
                utils.dialog({content: '请选择要删除的行！', quickClose: true, timeout: 2000}).show();
            }

        })

        //关闭
        $('#close').bind('click', function () {
            split_modal.close();
        })

        //确认
        $('#confirm').bind('click', function () {
            var form_data = $('#split_table').XGrid('getRowData');
            console.log(form_data)
            $.ajax({
                url: '/url/template/api',
                method: 'post',
                data: form_data,
                dataType: 'json',
                success: function (result) {

                    //table重新加载
                    Xgrid.trigger('reloadGrid');

                }, error: function (error) {
                    utils.dialog({title: '提示', content: '请求失败！', timeout: 2000, quickClose: true}).show();
                }
            })
        })

    }


    //收货日期赋值 -- 需要moment.min.js插件
    $('#receiptTime').val(moment().format('YYYY-MM-DD'));


})(window, jQuery);

