$(function () {
    var grid_data = [{
        id: "1",
        txt1: "CYS0002",
        txt2: '委外',
        txt3: '顺丰速运',
        txt4: '2018-1-1',
        txt5: '2020-1-1',
        txt6: '接口'
        
        
    },
    {
        id: "1",
        txt1: "CYS0002",
        txt2: '自有',
        txt3: '顺丰速运',
        txt4: '2018-1-1',
        txt5: '2020-1-1',
        txt6: '接口'
        
        
    },
    {
        id: "1",
        txt1: "CYS0002",
        txt2: '委外',
        txt3: '顺丰速',
        txt4: '2018-1-1',
        txt5: '2020-1-1',
        txt6: '接口'
        
        
    }];
    var $X_Table = $('#X_Table');
    var rowData;
    $X_Table.XGrid({
        data: grid_data,
        // url: 'http://www.baidu.com',
        
        colNames: ['id', '承运商ID','承运商类型','承运商名称','合同生效日期','合同截止日期','数据交互方式'],
        colModel: [{
            name: 'id',
            hidden: true,
            hide: true,
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
            index: 'txt5'
        }, {
            name: 'txt6',
            index: 'txt6'
        }],
        rowNum: 10,
        rownumbers: false,
        altRows: true, 
        ondblClickRow: function (e, c, a, b) {
            console.log(' ', e, c, a, b);

        },
        onSelectRow: function (e, c, a, b) {
            rowData = a;
            console.log(' ', e, c, a, b);
        },
        
    })



    $("#revise").on("click", function () {
 
        utils.dialog({
            title: '物流状态',
            width: $(window).width()*0.3,
            height:  $(window).height()*0.3,
            content: $("#add_dialog"),
            okValue: '保存',
            cancelValue: '重置',
            onshow: function () {

            },
            ok: function () {

                var datatrans = $("input[name='datatrans']:checked").val();
                 
                if(!datatrans){
                    utils.dialog({
                        content: '请选择物流状态！',
                        quickClose: true
                    }).showModal();
                    return false;
                }else{

                }
            },
            cancel: function () {

            },
            onclose: function () {

            },
        }).showModal();
    })

 
   

})

 