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
        txt12: '操作',
        txt13: "XX件",
        txt14: '带入',
        txt15: '带入',
        txt16: '带入',
        txt17: '带入',
        txt18: '带入',
        txt19: '操作',
        txt20: "XX件",
        txt21: '带入',
        txt22: '带入',
        txt23: '带入',
        txt24: '带入',
        txt25: '带入',
        txt26: '操作',
        txt27: "XX件",
        txt28: '带入',
        txt29: '带入',
        txt30: "操作",
        txt31: '带入'
    }];
    var $X_Table = $('#X_Table');
    var rowData;
    $X_Table.XGrid({
        data: grid_data,
        // url: 'http://www.baidu.com',
        colNames: ['id', '单据编号', '单据日期', '单据状态', '供应商名称', '供应商编号', '单据生成时间', '预估到货量', '备注', '收货时间',
            '等待时间', '打印单据', '操作'
        ],
        colModel: [{
            name: 'id',
            hidden: true,
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
            formatter: function (e) {
                console.log(e)
                return '<button type="button" class="btn btn-info" id="printing">打印</button>';
            }
        }, {
            name: 'txt12',
            formatter: function (e) {
                console.log(e)
                return '<button type="button" class="btn btn-info receipt">开始收货</button>';
            }
        }],
        rowNum: 10,
        rownumbers: true,
        altRows: true, //设置为交替行表格,默认为false
        ondblClickRow: function (e, c, a, b) {
            console.log('双击行事件', e, c, a, b);

        },
        onSelectRow: function (e, c, a, b) {
            rowData = a;
            console.log('单机行事件', e, c, a, b);
        },
        pager: '#grid-pager',
    });

    //查询
    $('#seachBtn').bind('click', function () {
        var form_data = $('#formData').serializeToJSON();
        $X_Table.setGridParam({
            url: '',
            postData: form_data
        }).trigger('reloadGrid')
    })
    //初始化表单
    utils.dialog({
        title: '供应商预约单',
        content: $('#print'),
        width: 500
    }).showModal();

    //重置
    $('#resetBtn').bind('click', function () {
        $('#formData')[0].reset();
        // document.getElementById("formData").reset();
    })
    //打印
    $('#printing').click(function () {
        utils.dialog({
            title: '打印预览',
            url: 'printForm/Reservations.html',
            okValue:'打印',
            cancelValue: '取消',
            cancel: true,
            ok: function () {
                var iframe = document.createElement('iframe');
                iframe.setAttribute("src", "printForm/Reservations.html");
                document.body.appendChild(iframe);
                iframe.contentWindow.print();

                setTimeout(function () {
                    iframe.remove();
                },2000)
            }
        }).showModal();
    })
    //导出
    $('#exportBtn').bind('click', function () {
        var dialog = confirmDialog({
            content: '是否确认导出表单内容？',
            ok: function () {
                console.log('导出成功')
                dialog.close();
            }
        }).showModal();
    })

    //开始收货
    $X_Table.on('click', '.receipt', function () {
        setTimeout(function () {
            var dialog = confirmDialog({
                content: '确认开始收货？',
                ok: function () {
                    console.log('开始收货');
                    console.log(rowData);
                    dialog.close();
                }
            }).showModal();
        }, 200)
    })

    //确认框
    function confirmDialog(param) {
        param = $.extend({
            title: '提示',
            width: 300,
            ok: null
        }, param);
        var d = utils.dialog({
            title: param.title,
            content: param.content,
            width: param.width,
            okValue: '&nbsp;是&nbsp;',
            cancelValue: '&nbsp;否&nbsp;',
            ok: function () {
                if ($.isFunction(param.ok)) {
                    param.ok();
                }
            },
            cancel: true
        }).showModal();
        return d;
    }
})