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
        txt11: "带入",
        txt12: '带入',
        txt13: '带入',
        txt14: "XX件",
        txt15: '带入',
        txt16: "XX件",
        txt17: '带入',
        txt18: '带入',
        txt19: "带入",
        txt20: "带入",
        txt21: "带入",
        txt22: '带入',
        txt23: '带入',
        txt24: "XX件",
        txt25: '带入',
        txt26: "XX件",
        txt27: '带入',
        txt28: '带入',
        txt29: "带入",
        txt30: '带入',
        txt31: '带入',
        txt32: "XX件",
        txt33: '带入',
        txt34: "XX件",
        txt35: '带入',
        txt36: '带入',
        txt37: "带入",
        txt38: "带入",
        txt39: "带入",
        txt40: '带入',
        txt41: '带入',
        txt42: "XX件",
        txt43: '带入'
    }]
    var $X_Tableb = $('#X_Tableb');
    $X_Tableb.XGrid({
        data: table_data,
        // url: 'http://www.baidu.com',
        colNames: ['序号', '购进退出单编号', '购进退出单行号', '采购退出单编号', '入库单编号', '是否监管', '商品大类', '商品编号', '商品名称', '商品规格', '生产厂家', '包装单位', '剂型',
            '退货日期', '供应商编号', '供应商名称', '申请退货数', '退货零散数', '退货件数', '退货总量', '实际退出货位',
            '退出货位', '退出数量', '货位库存', '容器编号', '件包装规格', '库别', '产地', '批号', '生产日期', '有效期至', '金额', '批准文号', '采购员', '退货类型', '供应商送货员', '供应商送货员电话', '特殊样品包装',
            '退货方式', '运输工具', '供应商仓库地址', '单据状态', '退货暂存区货位', '单据操作'
        ],
        colModel: [{
            name: 'id',
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
            index: 'txt37'
        }, {
            name: 'txt38',
            index: 'txt38'
        }, {
            name: 'txt39',
            index: 'txt39'
        }, {
            name: 'txt40',
            index: 'txt40'
        }, {
            name: 'txt41',
            index: 'txt41'
        }, {
            name: 'txt42',
            index: 'txt42'
        }, {
            name: 'txt43',
            index: 'txt43',

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
    // 放大镜商品查询
    $('body').on('click', '.glyphicon-search', function () {
        $(this).siblings("input").trigger("dblclick");
    })
    //双击供应商查询
    $('#supplierName').dblclick(function () {
        utils.dialog({
            title: '供应商列表',
            url: 'produceList.html',
            width: $(window).width() * 0.8,
            height: 600,
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
    // 打印
    // 模拟数据
    var data_a = [
        {
            list: [
                {
                    "commodityName": "半夏止咳糖浆",
                    "specModel": "100毫升/瓶",
                    "manufacturer": "生产厂家GRX",
                    "unit":'盒',
                    "unitPrice": "20.000",
                    "amount": "500.00",
                    "productMoney": "10000.00",
                    "productApprovalNumber": "商品财务92611",
                    "productProduceDate": "2018-03-26",
                    "productExpireDate": "2021-09-26",
                    "goodsAllocation": "合格库",
                    "productQuality": "合格",
                    "result": "入库",
                    "smallPriceTaxSum": "10000.00",
                },
                {
                    "commodityName": "半夏止咳糖浆1",
                    "specModel": "110毫升/瓶",
                    "manufacturer": "生产厂家GRX",
                    "unit":'盒',
                    "unitPrice": "10.000",
                    "amount": "500.00",
                    "productMoney": "5000.00",
                    "productApprovalNumber": "商品财务92610",
                    "productProduceDate": "2018-03-26",
                    "productExpireDate": "2021-09-26",
                    "goodsAllocation": "合格库",
                    "productQuality": "合格",
                    "result": "入库",
                    "smallPriceTaxSum": "15000.00",
                }
            ]
        }];
    $("#Printing").on("click", function () {
        seleRow(function (ary) {
            getData(1, ary)
        })
    })

    // 获取出库单选中项,并获取单据数据(组装)
    function seleRow(callback) {
        var ary = [];
        var sele_data = $("#X_Tableb").XGrid("getSeleRow");
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
            /* 购进退出复核单 */
            box_html += `
            <div class="content indent1">
              <div class="header">
                <div class="title">武汉小药药医药科技有限公司购进退出复核单(随货同行)</div>
                <span class="title_num">15972808250</span>
              </div>
              <div class="top">
                <ul class="info_list">
                  <li>
                    <span class="col_8"></span>
                    <span class="col_2"></span>
                  </li>
                  <li>
                    <span class="col_8">单位编号：${item.clientNum}</span>
                  </li>
                  <li>
                    <span class="col_8">供货单位：红安县永佳河永兴大药房</span>
                    <span class="col_2" style="margin-left:-26px;">单据编号：SKPZYB10291487</span>
                  </li>
                  <li>
                    <span class="col_4">收货地址：湖北省黄冈市红安县永佳河镇老街</span>
                    <span class="col_2">采购员：周灿</span>
                    <span class="col_2">开票员：普斌</span>
                    <span class="col_2">发货日期：2018-09-01</span>
                  </li>
                </ul>
                <span class="inden_type">退</span>
              </div>
              <table id="table_print"></table>
              <div class="bottom">
                <ul class="info_list">
                  <li>
                    <span class="col_4">发货地址：湖北省武汉市东西湖区107国道北十四支沟西三号生产车间第二层201</span>
                    <span class="col_1">保管员：</span>
                    <span class="col_1">复核员：</span>
                    <span class="col_1">共1页，第1页</span>
                    <span class="col_3">白联:财务部 红联:随货同行 黄联:质管部 蓝联:储运部 绿联:回执</span>
                  </li>
                </ul>
              </div>
              <div style="page-break-after:always;"></div>
            </div>  
            `;
        });
        var computeData = {
            clientNum: 'P0056',
            checked: 'checked',
            uncheck: '',

        }
        $("#box").html(box_html);

        // 打印表格
        data.forEach(function (item, index) {
            item.list = item.list.map(function (val, key) {
                delete val.id;
                return val
            });
            /* 购进退出复核单 */
            $("#table_print").jqGrid({
                data: item.list,
                datatype: "local", //数据来源，本地数据（local，json,jsonp,xml等）
                height: "auto", //高度，表格高度。可为数值、百分比或'auto'
                width: "1180",
                colNames: [
                    '商品名称',
                    '规格/型号',
                    '生产企业',
                    '单位',
                    '单价',
                    '数量',
                    '金额',
                    '批号/序列号',
                    '生产日期',
                    '有效期至',
                    '库房名称',
                    '货位名称',
                    '注册证号/备案号',
                    '质量'
                ],
                colModel: [ {
                    index: 'commodityName',
                    name: 'commodityName',
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
                    index: 'specModel',
                    name: 'specModel',
                    cellattr: function (rowId, tv, rawObject, cm, rdata) {
                        if (rowId == 5) {
                            return 'style="display:none"'
                        } else if (rowId == 6) {
                            //金额合计 name
                            return 'colspan=2'
                        }
                    }
                }, {
                    index: 'manufacturer',
                    name: 'manufacturer',
                    cellattr: function (rowId, tv, rawObject, cm, rdata) {
                        if (rowId == 5) {
                            return 'style="display:none"'
                        }
                    }
                },{
                    index: 'unit',
                    name: 'unit',
                    cellattr: function (rowId, tv, rawObject, cm, rdata) {
                        if (rowId == 5) {
                            return 'colspan=2'
                        }
                    }
                },{
                    index: 'unitPrice',
                    name: 'unitPrice',
                    cellattr: function (rowId, tv, rawObject, cm, rdata) {
                        if (rowId == 5) {
                            return 'style="display:none"'
                        }
                    }
                }, {
                    index: 'amount',
                    name: 'amount',
                    cellattr: function (rowId, tv, rawObject, cm, rdata) {
                        if (rowId == 5) {
                            return 'style="display:none"'
                        }
                    }
                }, {
                    index: 'productMoney',
                    name: 'productMoney',
                    summaryType: function (value, name, record) {
                        console.log(value, name, record);
                        return value
                    }
                }, {
                    index: 'productApprovalNumber',
                    name: 'productApprovalNumber',
                }, {
                    index: 'productProduceDate',
                    name: 'productProduceDate',
                }, {
                    index: 'productExpireDate',
                    name: 'productExpireDate',
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
                            commodityName: "小计",
                            number: sum_number,
                            sum: sum_sum,
                            status: "sum",
                        }, "last");
                    } else if (data.length == 5) {
                        $(this).addRowData(6, {
                            commodityName: "金额合计(大写)：",
                            manufacturer: "壹仟壹佰陆拾壹元贰角伍分",
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
            // $('.box').css("width", '1100px')
            // return;
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