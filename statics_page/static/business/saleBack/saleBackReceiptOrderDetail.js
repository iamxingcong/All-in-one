!(function () {

    var gridData = [];
    var colNames = ['业主编码', '业主名称', '商品编码', '商品名称', '商品规格', '生产厂家', '产地', '单位', '包装数量', '批号', '生产日期',
        '有效期至', '退回数量', '实际退回数量', '实际件数', '实际零散数', '容器编号', '退货原因', '收货结论'];
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
            name: 'name15'
        },
        {
            name: 'name16'
        }, {
            name: 'name17'
        },
        {
            name: 'name18'
        },
        {
            name: 'name19'
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
        key: 'name1',
        rowNum: 20,
        rownumbers: true,
        rowList: [10, 20, 50],
        altRows: true,
        pager: '#grid-pager'
    });

    //导出
    $('#exportBtn').bind('click', function () {
        exportFiles({url: 'http://www.baidu.com', type: 'post', params: {name1: 'name1'}})
    })

    function exportFiles(param) {
        //创建form表单
        var temp_form = document.createElement("form");
        temp_form.action = param.url();
        //如需打开新窗口，form的target属性要设置为'_blank'
        temp_form.target = "_self";
        temp_form.method = param.type || "post";
        temp_form.style.display = "none";
        //添加参数
        for (var item in param.params) {
            var opt = document.createElement("textarea");
            opt.name = param.params[item].name;
            opt.value = param.params[item].value;
            temp_form.appendChild(opt);
        }
        document.body.appendChild(temp_form);
        //提交数据
        temp_form.submit();
        temp_form.remove();
    }


})(window, jQuery);

