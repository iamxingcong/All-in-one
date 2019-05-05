$(function () {
    /* 弹窗传递的数据 */
    var dialog = parent.dialog.get(window);
    var dialog_data = dialog.data[0];
    var dialog_flag = dialog.data[1];
    console.log(dialog)

    // 隐藏按钮
    if(dialog_flag){
        $(".rush_red_btn").css("visibility","visible");
    }

    initTable(dialog_data);

    // 生成表格
    function initTable(orderCode) {
        //订单编号
        console.log(orderCode);

        var colModel = [];
        var grid_dataY = [];
        var colName = [
            '规格',
            '货号',
            '批号',
            '商品名称',
            '数量',
            '销售单号',
            '单位名称',
            '商品编号',
            '包装单位',
            '件包装数量',
            '零散数',
            '中包装数量',
            '大包装数量',
            '条码类型',
            '分配单号',
            '生产厂家'
        ];
        var content = [
            'text1',
            'text2',
            'text3',
            'text4',
            'text5',
            'text6',
            'text7',
            'text8',
            'text9',
            'text10',
            'text11',
            'text12',
            'text13',
            'text14',
            'text15',
            'text16'
        ]
        colModel = content.map(function (item) {
            return {'name': item}
        })
        for (var i = 0; i < 20; i++) {
            var obj = {}
            content.forEach(function (item) {
                obj[item] = Math.floor(Math.random() * 10)
            })
            grid_dataY.push(obj);
        }

        $('#table_a').XGrid({
            /* url:"xxxx",
             postData:{
             orderCode:orderCode
             }, */
            data: grid_dataY,
            colNames: colName,
            colModel: colModel,
            key: 'text1',
            rowNum: 10,
            rownumbers: true,
            altRows: true,
            pager: '#grid-pager',
        });
    }

    // 快捷键事件
    $(document).keydown(function (e) {
        // F2 事件
        if (e.keyCode == 113){
            scanDelete();
        }
        // F3 事件
        if (e.keyCode == 114){

        }
        // F4 事件----解锁
        if (e.keyCode == 115){
            unlockFun();
        }
    });

    // 生成大包装、中包装、小包装表格
    initPackageTable();
    function initPackageTable(){
        let gridDataB=[],gridDataC=[],gridDataD=[];
        var colModel = [];
        let colNames=["监管码/防窜码","商品名称","包装类型"];
        var content = [
            'text1',
            'text2',
            'text3'
        ];
        colModel = content.map(function (item) {
            return {'name': item}
        })
        for(let i=0; i<6;i++){
            var obj = {};
            content.forEach(function (item) {
                obj[item] = Math.floor(Math.random() * 10)
            });
            gridDataB.push(obj);
            gridDataC.push(obj);
            gridDataD.push(obj);
        }
        $('#table_b').XGrid({
            data: gridDataB,
            colNames: colNames,
            colModel: colModel,
            key: 'text1',
            rownumbers: true,
            altRows: true
        });
        $('#table_c').XGrid({
            data: gridDataC,
            colNames: colNames,
            colModel: colModel,
            key: 'text1',
            rownumbers: true,
            altRows: true
        });
        $('#table_d').XGrid({
            data: gridDataD,
            colNames: colNames,
            colModel: colModel,
            key: 'text1',
            rownumbers: true,
            altRows: true
        });
    };

    // 解锁
    $("#unlockBtn").on("click",function(){
        unlockFun();
    });
    // 解锁方法
    function unlockFun(){
        utils.dialog({
            title: '关闭解锁',
            width: 400,
            height: 165,
            content: $("#close_unlock"),
            okValue: '确定',
            cancelValue: '取消',
            ok: function () {
                //保存按钮回调
            },
            cancel: function () {
                //取消按钮回调
            },
            onclose: function () {
                //关闭按钮回调
            },
        }).showModal();
    };
    //扫描删除方法
    function scanDelete(){
        console.log("删除");
    };

})