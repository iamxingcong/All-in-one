$(function () {
    var grid_data1 = [{
        id: "1",
        lineNumber: "1",
        lineNumberSplitOrigin: "1",
        txt1: "带入",
        txt2: "带入",
        txt3: "带入",
        txt4: 1,
        txt5: '带入',
        txt6: "XX件",
        txt7: '123',
        txt8: '13',
        txt9: '',
        txt10: '带入',
        txt11: '带入',
        txt12: '',
        txt13: "",
        txt14: '带入',
        txt15: '15',
        txt16: '带入',
        txt17: '带入',
        txt18: '带入',
        txt19: '操作',
        txt20: "XX件",
        txt21: '带入',
        txt22: '带入',
        txt23: '带入',
        txt24: '',
        txt25: '带入',
        txt26: '操作',
        txt27: "XX件",
        txt28: '带入',
        productCountBigSplitOrigin: '11',
        productCountScatterSplitOrigin: '22'
    }, {
        id: "2",
        lineNumber: "2",
        lineNumberSplitOrigin: "2",
        txt1: "带入",
        txt2: "带入",
        txt3: "带入",
        txt4: 1,
        txt5: '带入',
        txt6: "XX件",
        txt7: '123',
        txt8: '13',
        txt9: '',
        txt10: '带入',
        txt11: '带入',
        txt12: '',
        txt13: "",
        txt14: '带入',
        txt15: '15',
        txt16: '带入',
        txt17: '带入',
        txt18: '带入',
        txt19: '操作',
        txt20: "XX件",
        txt21: '带入',
        txt22: '带入',
        txt23: '带入',
        txt24: '',
        txt25: '带入',
        txt26: '操作',
        txt27: "XX件",
        txt28: '带入',
        productCountBigSplitOrigin: '11',
        productCountScatterSplitOrigin: '22'
    }, {
        id: "3",
        lineNumber: "3",
        lineNumberSplitOrigin: "3",
        txt1: "带入",
        txt2: "带入",
        txt3: "带入",
        txt4: 1,
        txt5: '带入',
        txt6: "XX件",
        txt7: '123',
        txt8: '13',
        txt9: '',
        txt10: '带入',
        txt11: '带入',
        txt12: '',
        txt13: "",
        txt14: '带入',
        txt15: '15',
        txt16: '带入',
        txt17: '带入',
        txt18: '带入',
        txt19: '操作',
        txt20: "XX件",
        txt21: '带入',
        txt22: '带入',
        txt23: '带入',
        txt24: '',
        txt25: '带入',
        txt26: '操作',
        txt27: "XX件",
        txt28: '带入',
        productCountBigSplitOrigin: '11',
        productCountScatterSplitOrigin: '22'
    }];
    var $X_Table = $('#X_Table1');
    $X_Table.XGrid({
        data: grid_data1,
        // url: 'http://www.baidu.com',
        colNames: ['号', '行号', '原始行号', '是否监管', '商品编号', '商品名称', '商品规格', '生产厂家', '包装单位', '收货零散数', '收货件数',
            '收货数量', '件包装规格', '批号', '生产日期', '有效期至', '容器编号', '单价', '总金额', '订单行数', '中包装规格',
            '是否特殊药品', '收获结论', '在途数量', '拒收原因', '拒收原因补充', '抽检数量', '药品体积', '药品资料', '剂型', '中药产地', '原始件数量', '原始零散数量'
        ],
        colModel: [{
            name: 'id',
            index: 'id'
        }, {
            name: 'lineNumber',
            index: 'lineNumber',
            // hidden: true
        }, {
            name: 'lineNumberSplitOrigin',
            // hidden: true
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
            rowtype: '#count_black',
            rowEvent: rowEx

        }, {
            name: 'txt8',
            rowtype: '#count_black',
            rowEvent: rowEx
        }, {
            name: 'txt9',//收货数量
            index: 'txt9',
        }, {
            name: 'txt10',
            index: 'txt10',
            rowtype: '#Part_specification',
            formatter: function (e, r, obj) {
                var rtnStr = [];
                rtnStr.push('<option value="0">请选择</option>');
                rtnStr.push('<option value="1" >1</option>');
                rtnStr.push('<option value="2">2</option>');
                $(r).find('select').html(rtnStr.join(""));

                return e;
            },
            rowEvent: rowEx

        }, {
            name: 'txt11',
            index: 'txt11',
            rowtype: '#productBatchCode',
            formatter: function (e, r, obj) {
                var rtnStr = [];
                $.each(obj.productBatchList, function (index, v) {
                    rtnStr.push('<input id="BatchCode" value="' + v.batchNumber + '">');
                    $(r).find('#productBatchCode').html(rtnStr.join(""));
                })
                return e;
            },
            rowEvent: function (eType) {
                var productBatchList = eType.rowData.productBatchList;
                $.each(productBatchList, function (index, item) {
                    if (item.batchNumber == eType.rowData.productBatchCode) {
                        $('#BatchCode').focus(function () {
                            utils.dialog({
                                title: '提示',
                                content: '该商品批号系统已存在！',
                                // width: $(window).width() * 0.4,
                                ok: function () {
                                    return false;
                                },
                                okValue: '我知道了'
                            }).showModal();
                        })
                        $("X_Table1").XGrid("setRowData", eType.rowData.id, {
                            productionDate: item.createTime,
                            effectiveDate: item.produceTime
                        })
                    }else if(!item.batchNumber){
                        $("X_Table1").XGrid("setRowData", eType.rowData.id, {
                            productionDate: item.createTime,
                            effectiveDate: item.produceTime
                        })
                    }
                })
            }
        }, {
            name: 'txt12',
            rowtype: '#productionDate'
        }, {
            name: 'txt13',
            rowtype: '#effectiveDate'
        }, {
            name: 'txt14',
            rowtype: '#search_black'
        }, {
            name: 'txt15',//单价
            index: 'txt15',
            rowEvent: rowEx
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
            rowtype: '#receipt_black',
            rowEvent: function (eType) {

                if (eType.rowData.txt20 == 2) {

                    utils.dialog({
                        title: '拒收单',
                        content: $('#reject_order'),
                        width: 500,
                        okValue: '确定',
                        cancelValue: '取消',
                        cancel: true,
                        ok: function () {

                        }
                    }).showModal();

                    $(eType.e.target).closest('tr').find('td[row-describedby="txt22"] select').removeAttr('disabled');
                    $(eType.e.target).closest('tr').find('td[row-describedby="txt23"] input').removeAttr('disabled');
                } else {

                    $(eType.e.target).closest('tr').find('td[row-describedby="txt22"] select').attr('disabled', '');
                    $(eType.e.target).closest('tr').find('td[row-describedby="txt23"] input').attr('disabled', '');
                }

                if (eType.rowData.txt20 == 3) {
                    $(eType.e.target).closest('tr').find('td[row-describedby="txt14"] input').val('');
                }
            }
        }, {
            name: 'txt21',
            index: 'txt21'
        }, {
            name: 'txt22',
            rowtype: '#receipt_black'
        }, {
            name: 'txt23',
            rowtype: '#count_black'
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
            name: 'productCountBigSplitOrigin'
        }, {
            name: 'productCountScatterSplitOrigin'
        }],
        rowNum: 10,
        key: "autoKey",
        altRows: true, //设置为交替行表格,默认为false
        selectandorder: true,
        ondblClickRow: function (id, dom, obj, index, event) {
            //双击事件
            //回调参数化：id：本行id,dom:本行DOM元素,obj:本行json值,index:下标,event:原事件
            console.log(id, dom, obj, index, event);
            var _this = $(this);
            splitRowData(_this, obj);

        },
        onSelectRow: function (e, c, a, b) {
            console.log('单机行事件', e, c, a, b);
        },
        pager: '#grid-pager1',
        gridComplete: function () {
            initAUto('autocomplete');
        }
    });

    //字典查询(单选)
    var datajson = [
        {
            "manufactoryId": "1990",
            "manufactoryName": "北京",
            "code": "A1990"
        },
        {
            "manufactoryId": "2093",
            "manufactoryName": "上海",
            "code": "B2093"
        },
        {
            "manufactoryId": "1993",
            "manufactoryName": "深圳",
            "code": "C1993"
        },
        {
            "manufactoryId": "1941",
            "manufactoryName": "香港",
            "code": "D1941"
        },
        {
            "manufactoryId": "2002",
            "manufactoryName": "澳门",
            "code": "E2002"
        }
    ];

    //字典查询(单选)
    function initAUto(className) {
        $.each($('.' + className), function (index, item) {
            $(item).Autocomplete({
                lookup: datajson,//监听数据 value显示文本，data为option的值
                // paramName: 'query111',//查询参数，默认 query
                // serviceUrl: '/sales/getAvailableContainer?orgCode=' + orgCode, //异步请求
                dataType: 'json',
                minChars: '0', //触发自动匹配的最小字符数
                maxHeight: '300', //默认300高度
                triggerSelectOnValidInput: false, // 必选
                hideInpuId: '#BatchCode', //隐藏input的id
                dataReader: {
                    // list: "arr", //结果集，不写返回结果为数组
                    data: 'productBatchCode',
                    value: 'productBatchList'
                },
                onSelect: function (result) {
                    // return false;
                    //选中回调
                    // alert('You selected: ' + result.value + ', ' + result.data + ',' + result.name);

                    console.log('选中回调', result);

                    // $('#hide').val(result.data).trigger('input')

                },
                onNoneSelect: function (params, suggestions) {
                    $(item).val('');
                },
                onSearchStart: function (params) {
                    // console.log('检索开始回调', params)
                },
                onSearchComplete: function (query, suggestions) {
                    //匹配结果后回调
                    // console.log(query, suggestions);
                    // if (suggestions.length < 1) {
                    //     utils.dialog({
                    //         title: '查询无结果',
                    //         content: '是否新增生产厂家？',
                    //         width: '300',
                    //         okValue: '确认',
                    //         ok: function () {
                    //             this.title('提交中…');
                    //             return false;
                    //         },
                    //         cancelValue: '取消',
                    //         cancel: function () {
                    //             $('input').val('')
                    //         }
                    //     }).show();
                    // }
                },
                onSearchError: function (query, jqXHR, textStatus, errorThrown) {
                    //查询失败回调
                    console.log(query, jqXHR, textStatus, errorThrown)
                },
                onHide: function (container) {
                    // console.log('container隐藏前回调', container)
                }
            });
        })
    }

    // 放大镜供应商查询
    $('body').on('click', '#containerName', function () {
        $(this).siblings("input").trigger("dblclick");
    })
    //双击容器编号查询
    $('#container').dblclick(function () {
        utils.dialog({
            title: '容器编号',
            url: '../Job_form/containerNumber.html',
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
        txt26: '操作',
        txt27: "XX件"
    }];
    var $X_Table1 = $('#X_Table');
    $X_Table1.XGrid({
        data: grid_data,
        // url: 'http://www.baidu.com',
        colNames: ['编号', '是否监管', '采购订单编号', '商品编号', '商品规格', '生产厂家', '包装单位', '收货零散数', '收货件数',
            '收货数量', '件包装规格', '批号', '生产日期', '有效期至', '容器编号', '单价', '总金额', '中包装规格', '是否特殊药品',
            '收获结论', '在途数量', '拒收原因', '拒收原因补充', '抽检数量', '药品体积', '药品资料', '剂型', '中药产地'
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
        }],
        rowNum: 10,
        altRows: true, //设置为交替行表格,默认为false
        selectandorder: true,
        ondblClickRow: function (id, dom, obj, index, event) {
            //双击事件
            //回调参数化：id：本行id,dom:本行DOM元素,obj:本行json值,index:下标,event:原事件
            console.log(id, dom, obj, index, event);
            var _this = $(this);
            splitRowData(_this, obj);

        },
        onSelectRow: function (e, c, a, b) {
            console.log('单机行事件', e, c, a, b);
        },
        pager: '#grid-pager',
    });

    //初始化表格
    $('#split_table').XGrid({
        data: [],
        colNames: ['是否监管', '商品编号', '商品名称', '商品规格', '生产厂家', '包装单位', '单价', '容器编号', '件包装规格', '行件数量', '总件数量', '行零散数量', '总零散数量'],
        colModel: [{
            name: 'txt1'
        }, {
            name: 'lineNumber'
        }, {
            name: 'lineNumberSplitOrigin'
        }, {
            name: 'txt2'
        }, {
            name: 'txt3'
        }, {
            name: 'txt4'
        }, {
            name: 'txt5'
        }, {
            name: 'txt6'
        }, {
            name: 'txt15'
        }, {
            name: 'txt14'
        }, {
            name: 'txt10',
            rowtype: '#Part_specification',
            formatter: function (e, r, obj) {
                var rtnStr = [];
                rtnStr.push('<option value="0">请选择</option>');
                rtnStr.push('<option value="1" >1</option>');
                rtnStr.push('<option value="2">2</option>');
                $(r).find('select').html(rtnStr.join(""));
                return e;
            },
            rowEvent: rowEx
        }, {
            name: 'txt8',
            rowtype: '#count_black',
            rowEvent: rowEx
        }, {
            name: 'Piece_num',
        }, {
            name: 'txt7',
            rowtype: '#count_black',
            rowEvent: rowEx
        }, {
            name: 'txt9',
            hidden: true
        }, {
            name: 'Scattered_num',
        }],
        key: 'autoKey',
        rownumbers: true,
        altRows: true,
        gridComplete: function () {
            initAUto('autocomplete');
        }
    });

    //拆分行
    var splitRowData = function (Xgrid, rowData) {
        //初始化清表单
        $('#split_table').XGrid('clearGridData');
        //如果原始行号不为空则取出明细表格中初始行号相同的记录，全部带入到弹窗表格，否则为第一次拆行，弹窗中带入rowData即可
        //明细表格数据
        var detail_table_data = $('#X_Table1').XGrid('getRowData');
        console.info(detail_table_data);
        //缓存弹窗表格打开时需要填充的初始数据
        var split_table_data = [];
        $.each(detail_table_data, function (index, item) {//重新排序
            if (item.lineNumberSplitOrigin == rowData.lineNumberSplitOrigin) {
                var id = index + 1;
                item.id = id;
                split_table_data.push(item);
            }
        })

        var split_modal = utils.dialog({
            title: '拆分表单行',
            width: $(window).width() * 0.8,
            content: $('#splitModal')
        }).showModal();

        //填充弹窗表格数据
        $.each(split_table_data, function (index, item) {//重新排序
            $('#split_table').XGrid('addRowData', item);
        })

        //新增行
        $('#addData').unbind('click').bind('click', function () {
            var splitTableRow = $('#split_table').XGrid('getRowData');
            var firsRow = splitTableRow[0];
            $('#split_table').XGrid('addRowData', firsRow);
            // $('#split_table').XGrid('addRowData', $.extend(rowData, {txt8: '', txt7: ''}));
        })

        //删除行
        $('#deleteRow').unbind('click').bind('click', function () {
            var seleRow = $('#split_table').XGrid('getSeleRow');
            if (seleRow && seleRow.length) {
                var splitTableRow = $('#split_table').XGrid('getRowData');
                if (splitTableRow.length < 2) {
                    utils.dialog({
                        content: '最后一行无法删除！',
                        quickClose: true,
                        timeout: 2000
                    }).show();
                    return false;
                }
                $('#split_table').XGrid('delRowData', seleRow[0].id);
            } else {
                utils.dialog({
                    content: '请选择要删除的行！',
                    quickClose: true,
                    timeout: 2000
                }).show();
            }
        })

        //关闭
        $('#close').unbind('click').bind('click', function () {
            split_modal.close();
        })

        //确认
        $('#confirm').unbind('click').bind('click', function () {
            var return_data = [];  //存填充明细表格的数量
            var productCountOrigin = 0;  //行未拆分时的总数量
            var productCount = 0;   //行拆分后的总数量
            var split_table_data_result = $('#split_table').XGrid('getRowData'); //拆分行数据
            //计算行未拆分时的总数量
            $.each(detail_table_data, function (index, item) {//重新排序
                if (item.lineNumberSplitOrigin == rowData.lineNumberSplitOrigin) {
                    var lineProductCount = (item.txt10 * item.txt8 + item.txt7 * 1);
                    productCountOrigin += lineProductCount
                }
            })
            //计算
            $.each(split_table_data_result, function (index, item) {
                //计算数量
                var lineProductCount = (item.txt10 * item.txt8 + item.txt7 * 1);
                var linedata = [];
                $.each(linedata, function (i, t) {
                    t.txt9.push(lineProductCount);
                })
                productCount += lineProductCount

            })

            //判断原始总数和拆分后的数量是否相等
            if (productCount != productCountOrigin) {
                utils.dialog({
                    content: '“行数量”不等于“总数量”！',
                    quickClose: true,
                    timeout: 2000
                }).show();
                return;
            }

            //清空明细表
            $('#X_Table1').XGrid('clearGridData');
            //把弹窗表格数据放到detail_table_data中

            var splitTableRow = $('#split_table').XGrid('getRowData');
            var firsRow = splitTableRow[0];

            //合并数组    ---   明细表格中拆分行上面的记录 + 弹窗拆分的记录 + 拆分下面的记录
            var return_data = return_data.concat(detail_table_data.slice(0, firsRow.lineNumber - 1), split_table_data_result, detail_table_data.slice(firsRow.lineNumber - 1 + split_table_data.length, detail_table_data.length));
            console.info(return_data);
            $.each(return_data, function (index, item) {
                var id = index + 1;
                item.id = id;
                item.lineNumber = id;
                $('#X_Table1').XGrid('addRowData', item);
            })
            //关闭弹窗
            split_modal.close();
        })
    }

    // 新增行
    $('#addRowData').on('click', function () {
        var el = document.querySelector('#dialog_Block');
        utils.dialog({
            title: '新增行',
            content: el,
            width: $(window).width() * 0.4,
            height: 200,
            ok: function () {
                $('#X_Table1').XGrid('addRowData', $.extend($(this.node).find('form').serializeToJSON(), {
                    id: '1'
                }));
                saveCheck();
                return false;
            },
            okValue: '保存',
            cancelValue: '取消',
            cancel: function () {
            }
        }).showModal();
    })

    function saveCheck() {
        utils.dialog({
            title: '新增行',
            content: '<input type="text" class="form-control" value="是广泛大概">',
            width: $(window).width() * 0.2,
            height: 100,
        }).showModal();
    }

    // 删除行
    $('#delRowData').on('click', function () {
        var selRow = $('#X_Table1').XGrid('getSeleRow');
        if (selRow.length) {
            $.each(selRow, function (index, item) {
                $('#X_Table1').XGrid('delRowData', item.id);
            })
        } else {
            utils.dialog({
                content: '没有选中任何行！',
                quickClose: true,
                timeout: 2000
            }).showModal();
        }
    })

    //动态计算
    function rowEx(eType) {
        if (eType.rowData !== null) {
            //获取当前单行
            //计算公式：收货数量=到货零散数+到货件数*件包装
            var Scattered_num = parseInt(eType.rowData.txt7),//零散数
                Piece_num = parseInt(eType.rowData.txt8),//件数
                Part_specification = parseInt($(eType.e.target).closest('tr').find('td[row-describedby="txt10"] select').val());//件包装

            var punchStockCost = parseInt(Part_specification * Piece_num + Scattered_num);//收货数量

            var punch_num = parseInt(eType.rowData.txt9);
            punch_num = punchStockCost;
            var punchMount = parseInt(punch_num*eType.rowData.txt15);//总金额
            $(eType.e.target).closest('tr').find('td[row-describedby="txt9"]').html(punchStockCost);
            $(eType.e.target).closest('tr').find('td[row-describedby="txt16"]').html(punchMount);

            //判断抽检数量
            var chou_num = $(eType.e.target).closest('tr').find('td[row-describedby="txt24"]');//抽检数据
            var choujian = 0;
            if(Scattered_num !== null){
                choujian+=Scattered_num
            }else if(Piece_num !== null){
                if(Piece_num<=3){
                    choujian+=Piece_num*3
                }else if(Piece_num>3&&Piece_num<=50){
                    choujian+=3*3
                }else if(Piece_num>50){
                    choujian+=(3+(Piece_num-50))*3
                }
            }
            chou_num.html(choujian);
        }
    }

})

function getProduction() {
    utils.dialog({
        title: '提示',
        content: '请仔细核对“生产日期”!',
        okValue: '我知道了',
        ok: function () {
        }
    }).showModal();
    // $("#starttime").val();
}

function getEffective() {
    utils.dialog({
        title: '提示',
        content: '请仔细核对“生产日期”!',
        okValue: '我知道了',
        ok: function () {
        }
    }).showModal();
    // $("#endtime").val();
}
