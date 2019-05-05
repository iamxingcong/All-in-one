$(function () {
    var table_data = [{
        id: "1",
        txt1: "带入",
        txt2: "带入",
        txt3: "带入",
        txt4: '带入',
        txt5: '带入',
        txt6: "XX件",
        txt7: '带入',
        txt8: "XX件",
        txt9: '带入',
        txt10: '带入',
        txt11: '带入',
        txt12: "XX件",
        txt13: '带入',
        txt14: '带入',
        txt15: "带入",
        txt16: "带入",
        txt17: '带入',
        txt18: '带入',
        txt19: "XX件",
        txt20: '带入',
        txt21: "XX件",
        txt22: '带入',
        txt23: '带入',
        txt24: '带入',
        txt25: "XX件",
        txt26: '带入',
        txt27: '带入',
        txt28: "带入",
        txt29: "带入",
        txt30: '带入',
        txt31: '带入',
        txt32: "XX件",
        txt33: '带入',
        txt34: "XX件",
        txt35: '带入',
        txt36: '带入',
        txt37: '带入',
        txt38: "XX件"
    }]
    var $X_Tablee = $('#X_Tablee');
    $X_Tablee.XGrid({
        data: table_data,
        // url: 'http://www.baidu.com',
        colNames: ['单据编号', '单据行号', '单据创建日期', '单据类型', '单据状态', '是否监管', '采购订单编号', '商品大类', '商品编号', '商品规格',
            '生产厂家', '包装单位', '收货数', '是否特殊药品', '剂型', '产地', '批号', '生产日期', '有效日期', '容器编码', '单价',
            '总金额', '中包装规格', '见包装规格', '收获零散数', '收获件数', '在途数量', '预计到货日期', '单据状态',
            '收货结论', '验收结论', '验收备注', '复查结论', '复查备注', '修改备注', '拒收备注', '单据完成时间', '单据操作'
        ],
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
            index: 'txt11'
        }, {
            name: 'txt12',
            index: 'txt12'
        }, {
            name: 'txt13',
            index: 'txt13'
        }, {
            name: 'txt14',
            index: 'txt14'
        }, {
            name: 'txt15',
            index: 'txt15'
        }, {
            name: 'txt16',
            index: 'txt16'
        }, {
            name: 'txt17',
            index: 'txt17'
        }, {
            name: 'txt18',
            index: 'txt18'
        }, {
            name: 'txt19',
            index: 'txt19'
        }, {
            name: 'txt20',
            index: 'txt20'
        }, {
            name: 'txt21',
            index: 'txt21'
        }, {
            name: 'txt22',
            index: 'txt22'
        }, {
            name: 'txt23',
            index: 'txt23'
        }, {
            name: 'txt24',
            index: 'txt24'
        }, {
            name: 'txt25',
            index: 'txt25'
        }, {
            name: 'txt26',
            index: 'txt26'
        }, {
            name: 'txt27',
            index: 'txt27'
        }, {
            name: 'txt28',
            index: 'txt28'
        }, {
            name: 'txt29',
            index: 'txt29'
        }, {
            name: 'txt30',
            index: 'txt30'
        }, {
            name: 'txt31',
            index: 'txt31'
        }, {
            name: 'txt32',
            index: 'txt32'
        }, {
            name: 'txt33',
            index: 'txt33'
        }, {
            name: 'txt34',
            index: 'txt34'
        }, {
            name: 'txt35',
            index: 'txt35'
        }, {
            name: 'txt36',
            index: 'txt36'
        }, {
            name: 'txt37',
            index: 'txt37',
            formatter: function () {
                return '<button type="button" class="btn btn-info operate">操作</button>';
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
    //点击操作按钮触发校验
    $X_Tableb.on('click', '.operate', function () {
        setTimeout(function () {
            utils.dialog({
                title: '提示',
                content: '确认该拒收单已完成？',
                okValue: '确定',
                ok: function () {
                },
                cancelValue: '取消',
                cancel: function () {
                }
            }).showModal();
        }, 200)
    })
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
    $('body').on('click', '#supplierBtn,#commodityName', function () {
        $(this).siblings("input").trigger("dblclick");
    })

    //双击供应商查询
    $('#supplierName').dblclick(function () {
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
    //双击商品查询
    $('#commodityName').dblclick(function () {
        utils.dialog({
            title: '供应商列表',
            url: '../Effective_commodity/Job_form/Commodity_selection.html',
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
        $('#X_Tableb').XGrid('filterTableHead');
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