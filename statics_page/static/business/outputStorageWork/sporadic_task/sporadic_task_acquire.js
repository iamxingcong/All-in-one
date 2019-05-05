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
        grid_dataY.push(
            {
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
    var colName = ['下发时间', '业主编号', '业主名称', '单据编号', '分配单号', '容器编号', '商品编码', '商品名称', '单位包装', '规格', '件包装数量', '产地', '生产厂家', '下架货位', '批号',
        '计划零散数', '实际件数', '计划件数', '实际零散数', '实际数量', '拣货员', '拣货错误处理方式', '存储分类', '批准文号', '生产日期', '有效期至', '批拣单号'
    ];
    var colModel = [
        {
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
        gridComplete: function () {
            // 置灰
          $('#acquire_ok').attr('disabled', true)
            // 置蓝
          $('#acquire_ok').attr('disabled', false)

          // 弹窗
          utils.dialog({
            title: '提示',
            content: "是否清除占用的周转箱",
            timeout: 2000,
            width: 600,
            height: 50,
            okValue: '是',
            cancelValue: '否',
            ok: function () {
              console.log('点击是');
            },
            cancel: function () {
              console.log('点击否');
            },
          }).show();

        },
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
    let boxPop
    let codeArr = []
    /* 关联周转箱 */
    $("#turnover_box").on("change", function () {
        var box_num = $(this).val();
        var box_con = 0;
        var task_code = 'LH2018';//任务单号
        boxPop = utils.dialog({
            title: "扫描周转箱",
            width: 600,
            height: 200,
            content: `
      <div class="col-md-12">
        <label>任务单：</label>
        <span>${task_code}</span><span>需要关联周转箱</span>
      </div>
      <div class="col-md-6">
        <label>已关联：</label>
        <span id="boxCon">${box_con}</span><span>个周转箱</span>
      </div>
      <div class="col-md-6">
        <label>需关联：</label>
        <span id="boxNum">${box_num}</span><span>个周转箱</span>
      </div>
      <div class="col-md-12" style="margin-top:20px">
        <div class="col-md-6">
          <div class="input-group">
            <span class="input-group-addon">周转箱：</span>
            <input class="form-control" id="boxCode">
          </div>
        </div>
        <div class="col-md-4 col-md-offset-1" id="scan" >
          <button type="button" class="btn btn-info add-code" id="addCode" >确定</button>
          <button type="button" class="btn btn-info" >取消</button>
        </div>
      </div>
      <div class="col-md-8" style="margin-top:20px; margin-left: 130px;height: 80px;overflow-y: auto;">
        <ul  id="boxCodeList">
        </ul>
      </div>
        
      </div>
      `,

            onclose: function () {

            },
        }).showModal();
    })

    // 打印-整件任务
    $("#print").on("click", function () {
        // utils.dialog({
        //     content: "正在打印...",
        //     timeout: 1000
        // }).showModal();
        //
        // seleRow(function (ary) {
        //     getData(1, ary)
        // })

    });


    /* 获取出库单选中项,并获取单据数据(组装) */

    function seleRow(callback) {
        var ary = [];
        var sele_data = $("#table_a").XGrid("getSeleRow");
        if (sele_data) {
            if (!$.isArray(sele_data)) {
                ary.push(sele_data.stockOrderNo)
            } else {
                sele_data.forEach(function (item, index) {
                    ary.push(item.stockOrderNo);
                })

            }
        } else {
            utils.dialog({
                title: '预览',
                content: "请选择要打印的单据",
                timeout: 2000
            }).show();
            return
        }
        callback(ary);
    }

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
    /* 获取数据 */
    function getData(printType, outOrderCode) {

        webRender_a(data_a, printType);
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
    function webRender_a(data, printType) {
        var box_html = '';
        /* 基本结构拼装 */
        data.forEach(function (item, index) {
            /* 销售出库复核单 */
            box_html += `
            <div class="content indent1">
                <div class="header">
                  <div class="title">整件拣货单</div>
                </div>
                <div class="top">
                    <div class="col-md-4">任务包号：<i class="val">${item.stockOrderNo}</i></div>
                </div>
                <table id="table_a_${index}"></table>
                <div class="bottom">
                  <div class="col-md-4">拣货员：<i class="val">${item.stockOrderNo}</i></div>
                  <div class="col-md-4">打印时间：<i class="val">${item.time}</i></div>
                  <div class="col-md-4">共2页，第1页</div>
                </div>
                <div style="page-break-after:always"></div>
            </div>
            `;

        });

        $("#box").html(box_html);

        /* 表格初始化 */
        data.forEach(function (item, index) {
            item.list = item.list.map(function (val, key) {
                delete val.id;
                return val
            });
            /* 销售出库复核单 */
            $("#table_a_" + index).jqGrid({
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


        if (printType == 0) {
            /* 打印预览 */
            console.log($(parent.window).width());
            // parent 改为 utils
            parent.dialog({
                title: '预览',
                width: $(parent.window).width() - 100,
                content: $('#box_a').html(),
                okValue: '确定',
                ok: function () {
                }
            }).showModal();
            //$("#print_box").contents().find(".ui-dialog-content").css("overflow","auto");
            window.parent.$('.box').parent('.ui-dialog-content').css("overflow", "auto");
        } else if (printType == 1) {
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


    // 条形码
    $('body').on('click', '#addCode', function () {
        let boxCodeInput = $('#boxCode').val()
        let boxNumCount = $('#boxNum').text()

        // 添加条形码
        $('#boxCodeList').append('<li>' + boxCodeInput + '</li>')

        // 保存条码信息
        codeArr.push(boxCodeInput)

        // 清空输入框
        $('#boxCode').val('')

        // 修改已关联
        $('#boxCon').text($('#boxCodeList').children().length)

        // 修改需关联
        $('#boxNum').text(boxNumCount - 1)

        // 取消弹框
        if (boxNumCount - 1 == 0) {
            boxPop.close().remove()
            getBoxCode(codeArr)
        }

    })

    // 返回条形码信息
    function getBoxCode(data) {
        console.log(data)
    }

    // 输入工号失焦
    $('#workId').blur(function () {
        console.log($(this).val());
    });

    // 输入工号回车
    $('#workId').keydown(function (event) {
        if (event.keyCode == 13) {
            console.log(event.target.value);
        }
    });

    // 打印拣货单
    $('#acquire_ok').click(function (e) {
        if ($('#print_bill').is(':checked')) {
            orderInfo()
        } else {
            alert('请选中打印拣货单')
        }
    })


    // 关联周转箱弹框
    function orderInfo(orderCode) {
        utils.dialog({
            title: "拣货单模板",
            width: $(window).width() * 0.9,
            height: $(window).height() * 0.7,
            data: orderCode,
            url: "/xyy-wms-views/template/outputStorageWork/sporadic_task/revolveBox.html"
        }).showModal()


    }


    // 数据统计
    var source = '共有<%=allbox%>个周转箱，当前复核台有<%=unobtain%>个周转箱未索取，<%=obtain%>个周转箱已索取'
    var method = 'get'
    var url = '/sysVersion/findAllVersionInfoList'
    var form_data = ''
    $('#data_statistics').dataStatistics({
        source: source,
        method: method,
        url: url,
        form_data: form_data
    })

})