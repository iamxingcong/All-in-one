$(function () {
    var grid_data = [{
            id: "1",
            txt1: "带入",
            txt2: "",
            txt3: "带入",
            txt4: '带入',
            txt5: "",
            txt6: "",
            txt7: ""
        },
        {
            id: "2",
            txt1: "带入",
            txt2: "",
            txt3: "带入",
            txt4: '带入',
            txt5: "",
            txt6: "",
            txt7: ""
        }
    ];
    var $X_Table = $('#X_Table');
    $X_Table.XGrid({
        data: grid_data,
        // url: 'http://www.baidu.com',
        colNames: ['序号', '商品编码', '<span style="color: red">*</span>商品名称', '生产厂家', '规格', '数量', '<span style="color: red">*</span>采购员', '<span style="color: red">*</span>备注'],
        colModel: [{
            name: 'id',
            index: 'id'
        }, {
            name: 'txt1',
            index: 'txt1'
        }, {
            name: 'txt2',
            index: 'txt2',
            rowtype: '#serch_mirror'
        }, {
            name: 'txt3',
            index: 'txt3'
        }, {
            name: 'txt4',
            index: 'txt4'
        }, {
            name: 'txt5',
            index: 'txt5',
            rowtype: "#amount_input",
        }, {
            name: 'txt6',
            index: 'txt6',
            rowtype: "#buyer",
        }, {
            name: 'txt7',
            index: 'txt7'
        }],
        rowNum: 10,
        altRows: true, //设置为交替行表格,默认为false
        ondblClickRow: function (id, dom, obj, index, event) {
            //双击事件
            //回调参数化：id：本行id,dom:本行DOM元素,obj:本行json值,index:下标,event:原事件
            console.log(id, dom, obj, index, event);
            var _this = $(this);
            commodity_search_di(_this, obj);
        },
        onSelectRow: function (e, c, a, b) {
            console.log('单机行事件', e, c, a, b);
        },
        pager: '#grid-pager',
    });

    //点击供应商放大镜调用方法并初始化计算单行和表格数据
    function commodity_search_di(Xgrid, obj) {
        //初始化表格
        $('#split_table').XGrid({
            data: [],
            colNames: ['序号', '商品编码', '商品名称', '生产厂家', '规格'],
            colModel: [{
                    name: 'id',
                    index: 'id'
                },
                {
                    name: 'txt1',
                    index: 'txt1'
                },
                {
                    name: 'txt2',
                    index: 'txt2',
                    rowtype: '#serch_mirror'
                },
                {
                    name: 'txt3',
                    index: 'txt3'
                },
                {
                    name: 'txt4',
                    index: 'txt4'
                }
            ],
            rownumbers: true,
            altRows: true
        });

        utils.dialog({
            title: '商品选择表单',
            width: $(window).width() * 0.8,
            content: $('#rowtypeModal')
        }).showModal();

        $('#split_table').XGrid('addRowData', obj);
    };
    //新增一行
    $('#addRowData').on('click', function () {
        var el = document.querySelector('#dialog_Block');
        utils.dialog({
            title: '新增行',
            width: $(window).width() * 0.4,
            content: el,
            okValue: '确定',
            ok: function () {
                var data = $(this.node).find('form').serializeToJSON();
                $X_Table.XGrid('addRowData', data, 'last');
            },
            cancelValue: '取消',
            cancel: function () {
            }
        }).showModal();
    })
    //删除选中行
    $('#delRowData').on('click', function () {
        var selRow = $('#X_Table').XGrid('getSeleRow');
        $.each(selRow, function (i, v) {
            if (selRow) {
                $X_Table.XGrid('delRowData', v.id);
            } else {
                utils.dialog({
                    content: '没有选中任何行！',
                    quickClose: true,
                    timeout: 2000
                }).showModal();
            }
        })
    })

})