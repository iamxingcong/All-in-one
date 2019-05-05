!(function () {

    var gridData = [];
    var colNames = ['商品编号', '商品名称', '商品规格', '生产厂家', '商品产地', '单位', '剂型', '库别', '批号',
        '货位', '生产日期', '有效期至', '货位数量', '存储条件', '外观', '除湿', '加湿', '升温', '降温',
        '通风', '养护原因', '是否异常', '实际养护数量', '养护结论', '批准文号', '备注'];
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
        }, {
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
            name: 'name13'
        },
        {
            name: 'name14'
        },
        {
            name: 'name15',
            rowtype: '#checkbox1',
            formatter: function (value) {
                return value == 0 ? 'false' : 'true';
            }
        },
        {
            name: 'name16',
            rowtype: '#checkbox2',
            formatter: function (value) {
                return value == 0 ? 'false' : 'true';
            }
        }, {
            name: 'name17',
            rowtype: '#checkbox3',
            formatter: function (value) {
                return value == 0 ? 'false' : 'true';
            }
        },
        {
            name: 'name18',
            rowtype: '#checkbox4',
            formatter: function (value) {
                return value == 0 ? 'false' : 'true';
            }
        },
        {
            name: 'name19',
            rowtype: '#checkbox5',
            formatter: function (value) {
                return value == 0 ? 'false' : 'true';
            }
        },
        {
            name: 'name20',
            rowtype: '#checkbox6',
            formatter: function (value) {
                return value == 0 ? 'false' : 'true';
            }
        },
        {
            name: 'name21',
            rowtype: '#checkbox7',
            formatter: function (value) {
                return value == 0 ? 'false' : 'true';
            }
        },
        {
            name: 'name22',
            rowtype: '#abnormal',
            formatter: function (value) {
                return value == 0 ? 'false' : 'true';
            }
        }, {
            name: 'name23',
            rowtype: "#actualCount",
            formatter: function (value) {
                return value == 0 ? 'false' : 'true';
            }
        },
        {
            name: 'name24'
        }, {
            name: 'name25'
        },
        {
            name: 'name26'
        }
    ];
    for (var i = 0; i < 20; i++) {
        gridData.push({
            name1: i,
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
            name15: 1,
            name16: 1,
            name17: 0,
            name18: 1,
            name19: 0,
            name20: 1,
            name21: 0,
            name22: '1',
            name23: '',
            name24: '001',
            name25: '001',
            name26: '001'
        })
    }

    utils.setTableHeight('X_Table');
    $('#X_Table').XGrid({
        data: gridData,
        colNames: colNames,
        colModel: colModels,
        key: 'name1',
        rowNum: 20,
        rownumbers: true,
        rowList: [10, 20, 50],
        altRows: true,
        ondblClickRow: function (rowId) {
            console.log($(this).XGrid('getRowData', rowId));
        },
        pager: '#grid-pager'
    });

    // 保存
    $('#saveBtn').bind('click', function () {
        var data = $('#X_Table').XGrid('getRowData');
        $.each(data, function (item, index) {
           item.name15? item.name15 = true:item.name15 = false;
           item.name16? item.name16 = true:item.name16 = false;
           item.name17? item.name17 = true:item.name17 = false;
           item.name18? item.name18 = true:item.name18 = false;
           item.name19? item.name19 = true:item.name19 = false;
           item.name20? item.name20 = true:item.name20 = false;
           item.name21? item.name21 = true:item.name21 = false;
        })
        console.log(data)
        var valid = validData(data);
        if (!valid.flag) {
            utils.dialog({title: '提示', content: valid.msg, timeout: 2000}).show();
            return false;
        }

    })

    // 校验数据
    function validData(data) {
        var flag = true;
        var msg = '';
        $.each(data, function (index, item) {
            if (!item.name15 && !item.name16 && !item.name17 && !item.name18 && !item.name19 && !item.name20 && !item.name21) {
                flag = false;
                msg = '请填写第' + (index + 1) + '行外观、除湿、加湿、升温、降温、通风、养护原因至少选择一项！';
                return false;
            }
            if (item.name23 == '') {
                flag = false;
                msg = '请填写第' + (index + 1) + '行实际养护数量';
                return false;
            }

        })

        return {flag: flag, msg: msg};
    }

})(window, jQuery);
