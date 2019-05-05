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
    var colName = ['外复核完成时间', '销售单号', '业主', '业务名称', '客户编号', '客户名称', '开票员', '外复核员', '起始暂存区', '终止暂存区', '商品品种',
        '配送类型', '提货方式', '销售单同步时间', '客户备注', '快递单是否打印', '出库单是否打印', '药检报告是否打印'];
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
        },
        onSelectRow: function (id, dom, obj, index, e) {
            //选中事件
            //回调参数：id：本行id,dom:本行DOM元素,index:下标,event:原事件
        }
    });

    /* table_b */
    var colNameB = ['拼箱号', '监/窜/冷', '业主编号', '业主名称', '商品编码', '商品名称', '包装单位', '规格', '件包装数量', '产地', '生产', '批号', '灭菌批号',
        '实际件数', '实际数量', '质量', '处理方式', '实际零散数', '拣货数量', '拣货件数', '拣货零散数', '货位', '拣货员', '生产日期', '有效期至', '效期要求', '批号处理方式',
        '库房编号', '外复核索取时间'
    ];
    var colModelB = [
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
        }, {
            name: 'text17',
            index: 'text17',
        }];

    $('#table_b').XGrid({
        data: grid_dataY,
        colNames: colNameB,
        colModel: colModelB,
        rownumbers: true,
        key: 'text1',
        rowNum: 10,
        pager: "#grid_pager_b",
        altRows: true, //设置为交替行表格,默认为false
        ondblClickRow: function (id, dom, obj, index, event) {

        },
        gridComplete: function () {
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


    // 打印
    // 模拟数据
    var data_a = [
    {
        list: [
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
                "smallPriceTaxSum": "10000.00",
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
                "smallPriceTaxSum": "15000.00",
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
                "smallPriceTaxSum": "15000.00",
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
                "smallPriceTaxSum": "15000.00",
            }
        ]
    }, {
        list: [
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
                "smallPriceTaxSum": "10000.00",
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
                "smallPriceTaxSum": "15000.00",
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
                "smallPriceTaxSum": "15000.00",
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
                "smallPriceTaxSum": "15000.00",
            }
        ]
    }];

    $("#print_out_stock").on("click", function () {
        seleRow(function (ary) {
            getData(1, ary)
        })

    })

    // 获取出库单选中项,并获取单据数据(组装)
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

    // 获取打印数据
    getData = function (printType, outOrderCode) {
        webRender(data_a, printType);
        // var outOrderCodes = outOrderCode.join(',');
        // $.ajax({
        //
        //     url:"/purchase/purchaseRefundProductOrder/findPurchaseRefundProductOrderPrintList",
        //     data:{
        //         purchaseRefundProductOrderNoList :  outOrderCodes,
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
        //                 ok:function () {}
        //             }).showModal();
        //         }
        //     },
        //     error:function(){
        //
        //     }
        // })
    }

    // 渲染打印内容
    function webRender(data, printType) {
        var box_html = '';
        // 打印DOM
        data.forEach(function (item, index) {
            /* 销售出库复核单 */
            box_html += `
            <div class="content indent1">
              <div class="header">
                <div class="title">武汉小药药医药科技有限公司销售出库单复核单(随货同行)</div>
                <span class="title_num">15972808250</span>
              </div>
              <div class="top">
                <ul class="info_list">
                  <li>
                    <span class="col_8"></span>
                    <span class="col_2" style="margin-left:-26px;"> 药品属于特殊商品，非质量问题一律不予退货！</span>
                  </li>
                  <li>
                    <span class="col_8">客户编号：${item.clientNum}</span>
                    <span class="col_2" style="margin-left:-26px;"> 售后服务：400-0505-111</span>
                  </li>
                  <li>
                    <span class="col_8">客户名称：红安县永佳河永兴大药房</span>
                    <span class="col_2" style="margin-left:-26px;">单据编号：SKPZYB10291487</span>
                  </li>
                  <li>
                    <span class="col_6">收货地址：湖北省黄冈市红安县永佳河镇老街</span>
                    <span class="col_2">发货日期：2018-08-17</span>
                    <span class="col_2" style="margin-left:-26px;">订单编号：YBM20180817102154100237</span>
                  </li>
                </ul>
                <span class="inden_type">销</span>
              </div>
              <table id="table_print_${index}"></table>
              <div class="bottom">
                <ul class="info_list">
                  <li>
                    <span class="col_4">发货地址：武汉市东西湖区走马岭食品三路1#厂房一层</span>
                    <span class="col_1">内复核员：</span>
                    <span class="col_1">外复核员：</span>
                    <span class="col_1">共2页，第1页</span>
                    <span class="col_3">白联：财务部 红联：随货同行 蓝联：储运部 绿联：回执</span>
                  </li>
                  <li>售后投诉专线：18163382701</li>
                </ul>
              </div>
              <div style="page-break-after:always;"></div>
            </div>  
            `;
        });
        var computeData = {
          clientNum: 100,
          checked: 'checked',
          uncheck: '',

        }
        box_html +=`
            <div class="content indent2">
              <div class="header2">
                <div class="title">武汉小药药医药科技有限公司销售汇总单(货物交接单)</div>
              </div>
              <div class="top2">
                <div> 
                  <div class="col-md-9">客户编号：${computeData.clientNum}</div>
                  <div class="col-md-3">如含有特殊药品，概不接受现金结算</div>
                </div>
                <div>
                  <div class="col-md-9">客户名称：${computeData.clientNum}</div>
                  <div class="col-md-3">车牌号码：${computeData.clientNum}</div>
                </div>
                <div>
                  <div class="col-md-6">收获地址：${computeData.clientNum}</div>
                  <div class="col-md-6">发货日期：${computeData.clientNum}</div>
                </div>
              </div>
              <table id="table_last_a" border="1">
                <tr>
                  <th>订单编号</th>
                  <th>运费</th>
                  <th>销售金额</th>
                  <th>优惠金额</th>
                  <th>实付金额（小写）</th>
                  <th>实付金额（大写）</th>
                  <th>是否在线支付</th>
                  <th>支付方式</th>
                </tr>
                <tr>
                  <td>${computeData.clientNum}</td>
                  <td>${computeData.clientNum}</td>
                  <td>${computeData.clientNum}</td>
                  <td>${computeData.clientNum}</td>
                  <td>${computeData.clientNum}</td>
                  <td>${computeData.clientNum}</td>
                  <td>${computeData.clientNum}</td>
                  <td>${computeData.clientNum}</td>
                </tr>
              </table>
              <table id="table_last_b" border="1">
                <tr>
                  <td>发票情况</td>
                  <td colspan="2" >
                    <div>
                      <div class="col-md-2"><input type="checkbox">税票未同行</div>
                      <div class="col-md-2"><input type="checkbox">税票退回</div>
                      <div class="col-md-2"><input type="checkbox">税票签收</div>
                      <div class="col-md-2">税票数量</div>
                      <div class="col-md-2">税票号</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>结款情况</td>
                  <td>
                    <div>
                      <div class="col-md-2"><input type="checkbox" >未收款</div>
                      <div class="col-md-2"><input type="checkbox" >已收款￥</div>
                      <div class="col-md-2"><input type="checkbox" >无需收款</div>
                    </div>
                  </td>
                  <td rowspan="2" style="vertical-align: top">
                    暂存区名称：${computeData.clientNum}
                  </td>
                </tr>
                <tr>
                  <td>结款方式</td>
                  <td>
                    <div>
                      <div class="col-md-2"><input type="checkbox" >银联pos</div>
                      <div class="col-md-2"><input type="checkbox" ${computeData.checked}>第三方pos</div>
                      <div class="col-md-2"><input type="checkbox" ${computeData.uncheck}>银行打款</div>
                      <div class="col-md-2"><input type="checkbox" ${computeData.checked}>其他</div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>备注</td>
                  <td colspan="2">${computeData.clientNum}</td>
                </tr>
              </table>
              <div class="bottom2">
                <div>
                  <div class="col-md-5"></div>
                  <div class="col-md-3">运输员：${computeData.clientNum}</div>
                  <div class="col-md-2">客户签名：${computeData.clientNum}</div>
                  <div class="col-md-2">送达时间：${computeData.clientNum}</div>
                </div>
              </div>
            </div>
        `
        $("#box").html(box_html);

        // 打印表格
        data.forEach(function (item, index) {
            item.list = item.list.map(function (val, key) {
                delete val.id;
                return val
            });
            /* 销售出库复核单 */
            $("#table_print_" + index).jqGrid({
                data: item.list,
                datatype: "local", //数据来源，本地数据（local，json,jsonp,xml等）
                height: "auto", //高度，表格高度。可为数值、百分比或'auto'
                width: "1180",
                colNames: [
                    '商品编号',
                    '药品通用名称',
                    '规格',
                    '剂型',
                    '生产企业',
                    '产地',
                    '单位',
                    '数量',
                    '单价',
                    '金额',
                    '灭菌批号',
                    '批号',
                    '生产日期',
                    '有效期至',
                    '库房名称',
                    '货位名称',
                    '批准文号',
                    '质量'
                ],
                colModel: [{
                    index: 'productCode',
                    name: 'productCode',
                    cellattr: function (rowId, tv, rawObject, cm, rdata) {
                        if (rowId == 6) {
                            //金额合计(大写) name
                            return 'colspan=2'
                        }
                    }
                }, {
                    index: 'productName',
                    name: 'productName',
                    cellattr: function (rowId, tv, rawObject, cm, rdata) {
                        //console.log(rowId, tv, rawObject, cm, rdata);
                        if (rowId == 5) {
                            return 'colspan=6'
                        } else if (rowId == 6) {
                            //金额合计(大写) value
                            return 'colspan=5'
                        }
                    }
                }, {
                    index: 'productSpecification',
                    name: 'productSpecification',
                    cellattr: function (rowId, tv, rawObject, cm, rdata) {
                        if (rowId == 5) {
                            return 'style="display:none"'
                        } else if (rowId == 6) {
                            //金额合计 name
                            return 'colspan=2'
                        }
                    }
                }, {
                    index: 'productPackUnitSmall',
                    name: 'productPackUnitSmall',
                    cellattr: function (rowId, tv, rawObject, cm, rdata) {
                        if (rowId == 5) {
                            return 'style="display:none"'
                        } else if (rowId == 6) {
                            //金额合计 value
                            return 'colspan=9'
                        }
                    }
                }, {
                    index: 'productProduceFactory',
                    name: 'productProduceFactory',
                    cellattr: function (rowId, tv, rawObject, cm, rdata) {
                        if (rowId == 5) {
                            return 'style="display:none"'
                        }
                    }
                }, {
                    index: 'productPackInStoreCount',
                    name: 'productPackInStoreCount',
                    cellattr: function (rowId, tv, rawObject, cm, rdata) {
                        if (rowId == 5) {
                            return 'style="display:none"'
                        }
                    }
                }, {
                    index: 'productContainTaxPrice',
                    name: 'productContainTaxPrice',
                    cellattr: function (rowId, tv, rawObject, cm, rdata) {
                        if (rowId == 5) {
                            return 'style="display:none"'
                        }
                    }
                }, {
                    index: 'productContainTaxMoney',
                    name: 'productContainTaxMoney',
                    summaryType: function (value, name, record) {
                        console.log(value, name, record);

                        return value
                    }
                }, {
                    index: 'productBatchNo',
                    name: 'productBatchNo',
                }, {
                    index: 'productProduceDate',
                    name: 'productProduceDate',
                }, {
                    index: 'productExpireDate',
                    name: 'productExpireDate',
                }, {
                    index: 'productApprovalNumber',
                    name: 'productApprovalNumber',
                }, {
                    index: 'productPreparation',
                    name: 'productPreparation',
                }, {
                    index: 'checkEvaluate',
                    name: 'checkEvaluate',
                }, {
                    index: 'goodsAllocation',
                    name: 'goodsAllocation',
                }, {
                    index: 'productQuality',
                    name: 'productQuality',
                }, {
                    index: 'result',
                    name: 'result',
                }, {
                    index: 'smallPriceTaxSum',
                    name: 'smallPriceTaxSum',
                }],
                //forceFit: true,
                //autowidth: true,
                shrinkToFit: true,
                //viewrecords: true, //是否在浏览导航栏显示记录总数
                //rownumbers: true, //序号
                //loadonce: true,
                rowNum: 4,
                gridview: true,
                //footerrow:true, //底部空白行
                //pager: pager_selector, //分页、按钮所在的浏览导航栏
                //rowList: [10, 20, 30, 40, 50], //用于改变显示行数的下拉列表框的元素数组。
                gridComplete: function () {
                    var sum_number = $(this).getCol('number', false, 'sum');
                    var sum_sum = $(this).getCol('sum', false, 'sum');
                    var data = $(this).getRowData();
                    //console.log(data);
                    if (data.length < 4) {
                        $(this).addRowData(data.length + 1, {}, "last");
                    } else if (data.length == 4) {
                        $(this).addRowData(5, {
                            productCode: "小计",
                            number: sum_number,
                            sum: sum_sum,
                            status: "sum",
                        }, "last");
                    } else if (data.length == 5) {
                        $(this).addRowData(6, {
                            productCode: "金额合计(大写)：",
                            productName: "壹仟壹佰陆拾壹元贰角伍分",
                            size: "金额合计：",
                            dosage: "￥：1161.25元",
                            status: "sum",
                        }, "last");
                    }
                    //$(this).footerData("set",{"productCode":"合计","number":sum_number,"sum":sum_sum});
                }
            });


        });

        // 打印
        if (printType == 0) {
            // 打印预览
            utils.dialog({
                title: '预览',
                content: $('#big_box').html(),
            }).showModal();
            //$("#print_box").contents().find(".ui-dialog-content").css("overflow","auto");
            window.parent.$('.box').parent('.ui-dialog-content').css("overflow", "auto");
        } else if (printType == 1) {
            // 打印
            utils.dialog({
                content: "正在打印...",
                timeout: 1000
            }).showModal();

            var printDtd = $.Deferred();
            $("#box").print({
                globalStyles: true, //是否包含父文档的样式，默认为true
                mediaPrint: false, //是否包含media='print'的链接标签。会被globalStyles选项覆盖，默认为false
                stylesheet: null, //外部样式表的URL地址，默认为null
                noPrintSelector: ".no-print", //不想打印的元素的jQuery选择器，默认为".no-print"
                iframe: true, //是否使用一个iframe来替代打印表单的弹出窗口，true为在本页面进行打印，false就是说新开一个页面打印，默认为true
                append: null, //将内容添加到打印内容的后面
                prepend: null, //将内容添加到打印内容的前面，可以用来作为要打印内容
                deferred: printDtd //回调函数
            });

            $.when(printDtd)
                .done(function() {
                    setTimeout(function() {
                        utils.dialog({
                            title:'提示',
                            content: "是否打印成功？",
                            okValue: '确认',
                            cancelValue: '取消',
                            ok: function () {
                                alert('确定打印成功');
                            },
                            cancel: true
                        }).showModal();
                    }, 1000);
                });


        }
    }
})
