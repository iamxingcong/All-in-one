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
        txt26: '带入',
        txt27: '带入',
        txt28: '带入',
        txt29: '带入'
    }];
    var $X_Table = $('#X_Table');
    utils.setTableHeight('X_Table');
    $X_Table.XGrid({
        data: grid_data,
        // url: 'http://www.baidu.com',
        colNames: ['是否监管', '商品大类', '商品编码', '商品名称', '商品规格', '生产厂家', '包装单位', '件包装规格',
            '收货数量', '实际验收数量', '抽检数量', '产地', '批号', '生产日期', '有效期至', '进口注册证号', '容器编码',
            '剂型', '灭菌批号', '是否特殊商品', '特殊品外包装、标签备注', '批准文号', '验收结论', '验收备注', '复查结论', '复查备注','id'
        ],
        colModel: [ {
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
            index: 'txt10',
            rowtype: '#num_black'
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
            index: 'txt16',
            rowtype: '#num_black'
        }, {
            name: 'txt17',
            index: 'txt17',
            rowtype: '#num_black'
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
            index: 'txt21',
            rowtype: '#num_black'
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
            index: 'txt25',
            rowtype: '#num_black'
        },{
            name: 'txt26',
            index: 'txt26',
            rowtype: '#num_black'
        },{
            name: 'id',
            hidden: true
        }],
        rowNum: 10,
        rownumbers: true,
        altRows: true, //设置为交替行表格,默认为false
        ondblClickRow: function (e, c, a, b) {
            console.log('双击行事件', e, c, a, b);
        },
        onSelectRow: function (e, c, a, b) {
            console.log('单机行事件', e, c, a, b);
        },
        pager: '#grid-pager',
    });

    //拒收单弹框
    // confirmDialog({
    //     title: '拒收单',
    //     content: $('#rejectOrder'),
    //     width: 600
    // }).showModal();

    //确认框
    function confirmDialog(param) {

        var defaultOptions = {
            title: '提示',
            width: 300,
            ok: null,
            cancel: null,
            okValue: '确定',
            cancelValue: '取消'
        };

        param = $.extend(defaultOptions, param);

        var dialog = utils.dialog({
            title: param.title,
            content: param.content,
            width: param.width,
            okValue: param.okValue,
            cancelValue: param.cancelValue,
            ok: function () {
                if ($.isFunction(param.ok)) {
                    param.ok();
                }
            },
            cancel: function () {
                if ($.isFunction(param.cancel)) {
                    param.cancel();
                }
            }
        }).showModal();

        return dialog;
    }

    //提示框
    function showTips(msg) {
        var d = utils.dialog({
            title: '提示',
            content: msg,
            width: 300,
            okValue: '我知道了',
            ok: function () {
                d.close().remove();
            }
        }).showModal();
    }
})
