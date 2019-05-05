$(function () {
    var table_data = [{
        id: "1",
        txt1: "带入",
        txt2: "带入",
        txt3: "带入",
        txt4: '带入',
        txt5: '带入'
    }]
    var $X_Tableb = $('#X_Tableb');
    $X_Tableb.XGrid({
        data: table_data,
        // url: 'http://www.baidu.com',
        colNames: ['序号','日期', '购进退出员', '购退单数', '购退单行数'],
        colModel: [{
            name: 'id',
            // hidden: true
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
            index: 'txt4',
            formatter: function (e) {
                console.log(e)
                return e;
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
    // 导出
    $('#export').click(function () {
        utils.dialog({
            title: '提示',
            content: '是否确认导出表单内容？',
            okValue: '是',
            ok: function () {
            },
            cancelValue: '否',
            cancel: function () {
            }
        }).showModal();
    })
    // 放大镜供应商查询
    $('body').on('click', '#inspector', function () {
        $(this).siblings("input").trigger("dblclick");
    })

    //双击供应商查询
    $('#inspector').dblclick(function () {
        utils.dialog({
            title: '供应商列表',
            url: '../Effective_commodity/Job_form/Supplier_selection.html',
            width: $(window).width() * 0.8,
            height: $(window).width() * 0.5,
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
    //设置显示列
    $('#setCol').bind('click', function () {
        $('#X_Table').XGrid('filterTableHead');
    })
})

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