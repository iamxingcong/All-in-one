$(function () {
    var grid_data = [{
        id: "1",
        txt1: "XL0001",
        txt2: '北京',
        txt3: 'BJ01',
        txt4: '北京',
        txt5: 'CY01',
        txt6: '朝阳区',
        txt7: 'WJ014',
        txt8: '望京街道',
        txt9: '圆通',
        txt10: '11'  
    },
    {
        id: "2",
        txt1: "XL0031",
        txt2: '北京',
        txt3: 'BJ01',
        txt4: '北京',
        txt5: 'CY01',
        txt6: '朝阳区',
        txt7: 'WJ01f',
        txt8: '望京街道',
        txt9: '顺丰',
        txt10: '11'  
    },
    {
        id: "3",
        txt1: "XL0002",
        txt2: '北京',
        txt3: 'BJ01',
        txt4: '北京',
        txt5: 'CY01',
        txt6: '朝阳区',
        txt7: 'WJ01sfe',
        txt8: '望京街道',
        txt9: '顺丰',
        txt10: '00'  
    }
    ];
    var $X_Table = $('#X_Table');
    var rowData;
    $X_Table.XGrid({
        data: grid_data,
        // url: 'http://www.baidu.com',
        colNames: ['id', '一级地址编码','一级地址名称','二级地址编码','二级地址名称','三级地址编码','三级地址名称',
        '四级地址名称','四级地址名称','默认承运商','操作'],
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
        }, {
            name: 'txt7',
            index: 'txt7'
        }, {
            name: 'txt8',
            index: 'txt8'
        }, {
            name: 'txt9',
            index: 'txt9',
            rowtype: '#select_black',
              
        }, {
            name: 'txt10',
            index: 'txt10',
            rowtype: '#operate_btn',
            formatter: function (e, r, obj) {
                
                    var id = obj.id;
                    setTimeout(function () {
                        if (obj.txt10  == "11") {

                            $("#" + id).find("td[row-describedby='txt10'] .save_btns").hide().siblings().show();
                            $("#" + id).find("td[row-describedby='txt9'] select").hide();
                        }
                    }, 0);
                
                return e;
            }
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



    $("#add_route").on("click", function () {
 
        utils.dialog({
            title: '新增线路',
            width: $(window).width()*0.6,
            height:  $(window).height()*0.65,
            content: $("#add_dialog"),
            okValue: '保存',
            cancelValue: '重置',
            onshow: function () {

            },
            ok: function () {

            },
            cancel: function () {

            },
            onclose: function () {

            },
        }).showModal();
    })

    $(".save_btns").click(function(){
         
        var ids = $(this).parent().attr("id").replace("operate_btn_","");
        $("#X_Table tbody #"+ids+" select").hide();
        $(this).hide().siblings().show();
        // here get what you want
        var dt = $('#X_Table').XGrid('getRowData',ids);
        console.log(dt);
        alert(dt.txt7);
    })

    $(".revise_btns").click(function(){
        
        var ids = $(this).parent().attr("id").replace("operate_btn_","");
        $("#X_Table tbody #"+ids+" select").show();
        $(this).hide().siblings().show();
    })

   
})