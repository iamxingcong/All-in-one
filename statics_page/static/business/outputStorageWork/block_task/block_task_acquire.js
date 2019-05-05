$(function () {

  /* 参数,页面传递的数据 */
  var url = location.search;
  var param = z_utils.parseParams(url);
  console.log(url, param);

  /* 填入初始数据 */
  $('#form_a').JSONToform({
    val_a: '举个栗子'
  })

  /* table_a */
  //data
  var grid_dataY = [];
  for (var i = 0; i < 20; i++) {
    grid_dataY.push({
      text1: i,
      text2: "",
      text3: "",
      text4: "",
      text5: "",
      text6: "",
      text7: "",
      text8: "",
      text9: "",
      text10: "",
      text11: "",
      text12: "2",
      text13: "",
      text14: "",
      text15: "4",
      text16: "6",
      text17: "",
      text18: "",
      text19: "",
      text20: "",
      text21: "",
      text22: "",
      text23: "",
      text24: "继续销售",
      text25: "",
      text26: "",
      text27: "",
      text28: "",
    });
  }
  var colName = ['创建时间', '分配单号', '标签条码', '作业状态', '拣货员', '业主编号', '业主名称', '销售单号', '商品编码', '商品名称','单位包装', '规格', '件包装数量', '产地', '生产厂家', '暂存区起始号', '暂存区终止号', '下架货位', '批号',
    '实际件数', '计划件数', '拼箱号', '批准文号', '生产日期', '有效期至', '灭菌批号', '站台号','拣货错误处理方式'
  ];
  var colModel = [{
    name: 'text1',
    index: 'text1'
  }, {
    name: 'text2',
    index: 'text2'
  }, {
    name: 'text3',
    index: 'text3'
  }, {
    name: 'text4',
    index: 'text4'
  }, {
    name: 'text5',
    index: 'text5'
  }, {
    name: 'text6',
    index: 'text6'
  }, {
    name: 'text7',
    index: 'text7'
  }, {
    name: 'text8',
    index: 'text8',
  }, {
    name: 'text9',
    index: 'text9'
  }, {
    name: 'text10',
    index: 'text10'
  }, {
    name: 'text11',
    index: 'text11'
  }, {
    name: 'text12',
    index: 'text12'
  }, {
    name: 'text13',
    index: 'text13'
  }, {
    name: 'text14',
    index: 'text14',
    rowtype: '#text14_e',
  }, {
    name: 'text15',
    index: 'text15',
  }, {
    name: 'text16',
    index: 'text16',
  }, {
    name: 'text17',
    index: 'text17',
  }, {
    name: 'text17',
    index: 'text17',
  }, {
    name: 'text17',
    index: 'text17',
  }, {
    name: 'text17',
    index: 'text17',
  }, {
    name: 'text17',
    index: 'text17',
  }, {
    name: 'text17',
    index: 'text17',
  }, {
    name: 'text17',
    index: 'text17',
  }, {
    name: 'text17',
    index: 'text17',
  }, {
    name: 'text17',
    index: 'text17',
  }, {
    name: 'text17',
    index: 'text17',
  }, {
    name: 'text17',
    index: 'text17',
  }, {
    name: 'text17',
    index: 'text17',
  }];
  $('#table_a').XGrid({
    data: grid_dataY,
    colNames: colName,
    colModel: colModel,
    rownumbers: true,
    key: 'text1',
    rowNum: 10,
    pager: "#grid_pager_a",
    altRows: true, //设置为交替行表格,默认为false
    ondblClickRow: function (id, dom, obj, index, event) {

    },
    gridComplete: function () {},
    onSelectRow: function (id, dom, obj, index, e) {
      //选中事件
      //回调参数：id：本行id,dom:本行DOM元素,index:下标,event:原事件
    }
  });

  /* 保存 */
  $('#saveData').on('click', function () {
    var form_data = $('#form_a').serializeToJSON();
    var table_data = $('#table_a').XGrid('getRowData');
    console.log(form_data, table_data);
  });


  // 数据统计
  var source = '共有<%=allbox%>个周转箱，当前复核台有<%=unobtain%>个周转箱未索取，<%=obtain%>个周转箱已索取共有<%=allbox%>个周转箱，当前复核台有<%=unobtain%>个周转箱未索取，<%=obtain%>个周转箱已索取共有<%=allbox%>个周转箱，当前复核台有<%=unobtain%>个周转箱未索取，<%=obtain%>个周转箱已索取共有<%=allbox%>个周转箱，当前复核台有<%=unobtain%>个周转箱未索取，<%=obtain%>个周转箱已索取'
  var method = 'get'
  var url = '/sysVersion/findAllVersionInfoList'
  var form_data = ''
  $('#data_statistics').dataStatistics({
      source: source,
      method: method,
      url: url,
      form_data: form_data
  })


  // 打印数据
    var data_a = [
        {
            "department": null,
            "supplierName": "供应商财务92610",
            "purchaseUserNames": "采购区域经理01",
            "stockOrderNo": "RKDCGD1809067056",
            "storeTime": "2018-09-26",
            "priceTaxSum": "15000.00000000",
            "priceTaxSumChineseNum": null,
            "guardianUser": null,
            "remark": null,
            "list": [
                {
                    "productCode": "A1029003",
                    "productName": "商品财务92611",
                    "productSpecification": "商品财务92611",
                    "productPackUnitSmall": "g",
                    "productProduceFactory": "生产厂家GRX",
                    "productPackInStoreCount": "500.00",
                    "productContainTaxPrice": "20.000",
                    "productContainTaxMoney": "10000.00",
                    "productBatchNo": "PH626254",
                    "productProduceDate": "2018-03-26",
                    "productExpireDate": "2021-09-26",
                    "productApprovalNumber": "商品财务92611",
                    "productPreparation": "测试添加剂型1",
                    "checkEvaluate": "1",
                    "goodsAllocation": "合格库",
                    "productQuality": "合格",
                    "result": "入库",
                    "smallPriceTaxSum": "10000.00"
                },
                {
                    "productCode": "S1010002",
                    "productName": "商品财务92610",
                    "productSpecification": "商品财务92610",
                    "productPackUnitSmall": "g",
                    "productProduceFactory": "生产厂家GRX",
                    "productPackInStoreCount": "500.00",
                    "productContainTaxPrice": "10.000",
                    "productContainTaxMoney": "5000.00",
                    "productBatchNo": "PH728567",
                    "productProduceDate": "2018-03-26",
                    "productExpireDate": "2021-09-26",
                    "productApprovalNumber": "商品财务92610",
                    "productPreparation": "测试添加剂型1",
                    "checkEvaluate": "1",
                    "goodsAllocation": "合格库",
                    "productQuality": "合格",
                    "result": "入库",
                    "smallPriceTaxSum": "15000.00"
                }
            ],
            "smallPriceTaxSum": "15000.00",
            "pageNumber": 1,
            "pageTotal": 1,
            "inspectorUser": null
        }
    ];


  // 打印预览
  $("#acquire_ok").on("click",function () {

      seleRow(function (ary) {
          getData_a(0, ary)
      })


  });


  // 打印-整件任务
  $("#print").on("click",function () {
      utils.dialog({
          content:"正在打印...",
          timeout:1000
      }).showModal();

      seleRow(function (ary) {
          getData_a(1, ary);
      })

  });

    // 打印-商品
    $("#pick_ok").on("click",function () {
        utils.dialog({
            content:"正在打印...",
            timeout:1000
        }).showModal();

        seleRow(function (ary) {
            getData_b(1, ary)
        })

    });

  /* 获取出库单选中项,并获取单据数据(组装) */

    function seleRow(callback) {
        var ary = [];
        var sele_data = $("#table_a").XGrid("getSeleRow");
        if(sele_data.length){
            if(!$.isArray(sele_data)){
                ary.push(sele_data.stockOrderNo)
            }else {
                sele_data.forEach(function (item,index) {
                    ary.push(item.stockOrderNo);
                })

            }
        }else {
            utils.dialog({
                title:'预览',
                content:"请选择要打印的单据",
                timeout:2000
            }).show();
            return
        }
        callback(ary);
    }

  /* 获取数据 */
    function getData_a(printType,outOrderCode) {

        webRender_a(data_a,printType);
        // var outOrderCodes = outOrderCode.join(',');
        // $.ajax({
        //
        //     url:"/purchase/purchaseOrderStoreAndProduct/selectPurchaseStoreOrderPrintData",
        //     data:{
        //         stockOrderNos :  outOrderCodes,
        //         printType: printType
        //     },
        //
        //     success:function(res){
        //         if($.isArray(res.result)){
        //             webRender(res.result,printType);
        //         }else {
        //             utils.dialog({
        //                 title:'提示',
        //                 content:"数据为空或格式不正确",
        //
        //             }).showModal();
        //         }
        //     },
        //     error:function(){
        //
        //     }
        // })
    }

    /* 数据渲染 */
    function webRender_a(data,printType) {
        var box_html = '';
        /* 基本结构拼装 */
        data.forEach(function (item,index) {
            /* 销售出库复核单 */
            box_html +=`
            <div class="content indent1">
                <div class="header">
                  <div class="title">整件拣货单</div>
                </div>
                <div class="top">
                  <ul class="info_list">
                    <li style="text-align: center;" class="clearfix">
                      <div style="display:inline-block; float: left;">批检任务号：<i class="val">${item.stockOrderNo}</i></div>
                      <div style="display:inline-block;">拣货员：<i class="val">${item.purchaseUserNames}</i></div>
                      <div style="display:inline-block; float: right;">打印时间：<i class="val">${item.storeTime}</i></div>
                    </li>
                  </ul>
                </div>
                <table id="table_a_${index}"></table>
                <div style="page-break-after:always"></div>
            </div>
            `;

        });

        $("#box").html(box_html);

        /* 表格初始化 */
        data.forEach(function (item,index) {
            item.list = item.list.map(function (val,key) {
                delete val.id;
                return val
            });
            /* 销售出库复核单 */
            $("#table_a_"+index).jqGrid({
                data: item.list,
                datatype: "local", //数据来源，本地数据（local，json,jsonp,xml等）
                height: "auto", //高度，表格高度。可为数值、百分比或'auto'
                width: 1050,
                colNames: ['显示货位', '商品编号', '配送方向', '商品名称', '规格', '件包装数量', '批号', '数量'],
                colModel: [
                    {
                        index: 'productCode',
                        name: 'productCode',
                    }, {
                        index: 'productName',
                        name: 'productName',
                    }, {
                        index: 'productSpecification',
                        name: 'productSpecification',
                    }, {
                        index: 'productPackUnitSmall',
                        name: 'productPackUnitSmall',
                    }, {
                        index: 'productProduceFactory',
                        name: 'productProduceFactory',
                    }, {
                        index: 'productPackInStoreCount',
                        name: 'productPackInStoreCount',
                    }, {
                        index: 'productContainTaxPrice',
                        name: 'productContainTaxPrice',
                    }, {
                        index: 'productContainTaxMoney',
                        name: 'productContainTaxMoney',
                    }
                ],
                shrinkToFit: true,
                rowNum: 4,
                gridview: true,
            });
        });


        if(printType==0){
            /* 打印预览 */
            console.log($(parent.window).width());
            // parent 改为 utils
            parent.dialog({
                title:'预览',
                width:$(parent.window).width()-100,
                content:$('#box_a').html(),
                okValue:'确定',
                ok:function () {}
            }).showModal();
            //$("#print_box").contents().find(".ui-dialog-content").css("overflow","auto");
            window.parent.$('.box').parent('.ui-dialog-content').css("overflow","auto");
        }else if(printType==1){
            /* 打印 */
            // print 改为 jqprint
            $('.box').css("width", '1100px')
            $("#box").print({
                globalStyles: true, //是否包含父文档的样式，默认为true
                mediaPrint: false, //是否包含media='print'的链接标签。会被globalStyles选项覆盖，默认为false
                stylesheet: null, //外部样式表的URL地址，默认为null
                noPrintSelector: ".no-print", //不想打印的元素的jQuery选择器，默认为".no-print"
                iframe: true, //是否使用一个iframe来替代打印表单的弹出窗口，true为在本页面进行打印，false就是说新开一个页面打印，默认为true
                append: null, //将内容添加到打印内容的后面
                prepend: null, //将内容添加到打印内容的前面，可以用来作为要打印内容
                deferred: $.Deferred() //回调函数
            });
        }
    }

    /* 获取数据 */
    function getData_b(printType,outOrderCode) {

        webRender_b(data_a,printType);
        // var outOrderCodes = outOrderCode.join(',');
        // $.ajax({
        //
        //     url:"/purchase/purchaseOrderStoreAndProduct/selectPurchaseStoreOrderPrintData",
        //     data:{
        //         stockOrderNos :  outOrderCodes,
        //         printType: printType
        //     },
        //
        //     success:function(res){
        //         if($.isArray(res.result)){
        //             webRender(res.result,printType);
        //         }else {
        //             utils.dialog({
        //                 title:'提示',
        //                 content:"数据为空或格式不正确",
        //
        //             }).showModal();
        //         }
        //     },
        //     error:function(){
        //
        //     }
        // })
    }
  /* 数据渲染 */
    function webRender_b(data,printType) {
        var box_html = '';
      /* 基本结构拼装 */
        data.forEach(function (item,index) {
          /* 销售出库复核单 */
            box_html +=`
            
            <div class="panel-body">
                <div class="clearfix pro pro-top" style="text-align: center;">
                  <div style="display: inline-block; float:left;"><span>【货位】</span><span>D01-19</span></div>
                  <div style="display: inline-block;"><span>【整件数量】</span><span>D01-19</span></div>
                  <div style="display: inline-block; float: right;"><span>【是否重打】</span><span>D01-19</span></div>
                </div>
                <div class="clearfix pro pro-content">
                  <table style="width: 100%;">
                    <tr>
                      <td>
                        <span>【客户名称】</span><span>D01-19</span>
                      </td>
                      <td>
                        <span>【出库单号】</span><span>SKPZYB1027<span style="font-size: 18px; font-weight: 700;">0811</span></span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>【商品名称】</span><span>D01-19</span>
                      </td>
                      <td rowspan="3" style="text-align: center; ">
                        <img id="barcode" style="width: 165px; height: 100px;"/>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>【规格】</span><span>D01-19</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="font-weight: 700">
                        <span>【批号】</span><span>D01-19</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>【客户编号】</span><span>D01-19</span>
                      </td>
                      <td style="text-align: center;">
                        <span>【标签条码】</span><span>D01-19</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>【配送方向】</span><span>D01-19</span>
                      </td>
                      <td>
                        <span>【支付状态】</span><span>D01-19</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>【生产厂家】</span><span>D01-19</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>【拣货人】</span><span>D01-19</span>&nbsp;&nbsp;
                        <span>【时间】</span><span>D01-19</span>
                      </td>
                      <td style="font-size: 18px; font-weight: 700;">
                        <span>【开始暂存区】-【截止暂存区】</span><span>Y36-27--Y36-30</span>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            `;

        });

        $(".pro-print").html(box_html);

        $("#barcode").JsBarcode("01222454545");

        $(".pro-print").print({
            globalStyles: true, //是否包含父文档的样式，默认为true
            mediaPrint: false, //是否包含media='print'的链接标签。会被globalStyles选项覆盖，默认为false
            stylesheet: null, //外部样式表的URL地址，默认为null
            noPrintSelector: ".no-print", //不想打印的元素的jQuery选择器，默认为".no-print"
            iframe: true, //是否使用一个iframe来替代打印表单的弹出窗口，true为在本页面进行打印，false就是说新开一个页面打印，默认为true
            append: null, //将内容添加到打印内容的后面
            prepend: null, //将内容添加到打印内容的前面，可以用来作为要打印内容
            deferred: $.Deferred() //回调函数
        });
    }



    $("#barcode1").JsBarcode("Hi!");


})