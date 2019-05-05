$(function () {
  /* 参数,页面传递的数据 */
  var url = location.search;
  var param = z_utils.parseParams(url);
  // console.log(url, param);

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
  var colName = ['监管/防窜', '拼箱号', '商品编码', '商品名称', '单位包装', '规格', '产地', '批号', '灭菌批号', '显示货位', '生产日期', '有效期至', '生产厂家', '计划零散数', '计划件数',
    '计划数量', '冲红原因', '实际零散数', '实际件数', '实际数量', '质量状况', '中包装数量', '拣货员', '异常类型', '异常数量', '异常备注', '提货方式', '生产日期要求', '批号处理方式', '是否贵重药品', '是否易碎'
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
    altRows: true, //设置为交替行表格,默认为false
    ondblClickRow: function (id, dom, obj, index, event) {
        orderInfo(obj.text1)

    },
    gridComplete: function () {},
    onSelectRow: function (id, dom, obj, index, e) {
      //选中事件
      //回调参数：id：本行id,dom:本行DOM元素,index:下标,event:原事件
    },
    rowList: [10, 20, 50],
    pager: "#grid_pager_goods_a"
  });

  /* table_b */
  var colNameB = ['拼箱号', '批号', '生产日期', '有效期至', '生产厂家', '实际零散数', '实际件数', '实际数量', '质量状况', '冲红原因', '包装单位', '计划件数', '计划零散数', 
  '计划数量', '显示货位', '拣货员', '复核员', '提货方式', '生产日期要求', '批号处理方式', '错误类型', '错误状态', '商品编码', '商品名称', '生产厂家', '复核台编号', '开票单行号'];
  var colModelB = [{
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

  $('#table_b').XGrid({
    data: grid_dataY,
    colNames: colNameB,
    colModel: colModelB,
    key: 'text1',
    rowNum: 10,
    rownumbers: true,
    altRows: true, //设置为交替行表格,默认为false
    ondblClickRow: function (id, dom, obj, index, event) {
    },
    gridComplete: function () {},
    onSelectRow: function (id, dom, obj, index, e) {
      //选中事件
      //回调参数：id：本行id,dom:本行DOM元素,index:下标,event:原事件
    },
    rowList: [10, 20, 50],
    pager: "#grid_pager_goods_b"
  });

  // 扫描监管码弹框
  function orderInfo(orderCode) {
    utils.dialog({
        title: "扫描监管码",
        width: $(window).width() * 0.9,
        height: $(window).height() * 0.7,
        data: [orderCode, false],  // true-扫描监管弹窗  false-扫描监管码弹窗
        url: "scanCode.html"
    }).showModal()
  }

  /* 保存 */
  $('#saveData').on('click', function () {
    var form_data = $('#form_a').serializeToJSON();
    var table_data = $('#table_a').XGrid('getRowData');
    console.log(form_data, table_data);
  });

  // 异常提交
  $('#submitAbnormal').on('click', function(){
    var data = '要传的数据'
    utils.dialog({
        title: "异常提交",
        width: $(window).width() * 0.9,
        height: $(window).height() * 0.6,
        data: data,
        url: "/xyy-wms-views/template/outputStorageWork/internal_review/abnormal_submit.html",
        okValue: '确定提交',
        cancelValue: '取消提交',
        ok: function () {
          saveAbnormal()
        },
        cancel: function () {
        },
    }).showModal()
  })

  // 保存异常
  function saveAbnormal() {
    console.log('保存异常');
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
  });

  //商品条码采集
  $("#codeCollection").on("click", function(){
    utils.dialog({
      title: '条码采集',
      width: $(window).width() * 0.9,
      height: 260,
      content: $("#codeCollectionModule"),
      okValue: '确定',
      cancelValue: '取消',
      resetForm: true,
      onshow: function () {

      },
      ok: function () {
        var obj=$("#codeCollectionForm").serializeFormToJSON();
        console.log(obj);
      },
      cancel: function () {
      },
      onclose: function () {
      },
    }).showModal();
  });

  // 打印标签
  $("#printTag").on("click",function(){
    var box_html = '';
    box_html += `
            <div class="panel-body">
              <table style="width: 100%;">
                <tr>
                  <td>
                    <span>【出库单号】</span><span>SKPZYB1027<span style="font-size: 18px; font-weight: 700;">0811</span></span>
                  </td>
                  <td style="font-size: 18px; text-align: center;">
                    <span>【当前拼箱号】</span><span>拼1</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>【客户名称】</span><span>D01-19</span>
                  </td>
                  <td rowspan="3" style="text-align: center; ">
                    <img id="barcode" style="width: 165px; height: 100px;"/>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>【客户编号】</span><span>D01-19</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>【配送方向】</span><span>D01-19</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>【支付状态】</span><span>D01-19</span>
                  </td>
                  <td style="text-align: center;">
                    <span>【标签条码】</span><span>0904000001</span>
                  </td>
                </tr>
                <tr><td>&nbsp;</td></tr>
                <tr>
                  <td colspan="2" style="font-size: 18px; font-weight: 700;">
                    <span>【开始暂存区】-【截止暂存区】</span><span>Y36-27--Y36-30</span>
                  </td>
                </tr>
                <tr><td>&nbsp;</td></tr>
                <tr>
                  <td colspan="2">
                    <span>【内复核】</span><span>马超</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span>【内复核时间】</span><span>2018-08-01 14:05:21</span>
                  </td>
                </tr>
              </table>
            </div>`;
    $("#printTagModule").html(box_html);
    //设置条形码
    $("#printTagModule #barcode").JsBarcode("0904000001");
    $("#printTagModule").print({
      globalStyles: true, //是否包含父文档的样式，默认为true
      mediaPrint: false, //是否包含media='print'的链接标签。会被globalStyles选项覆盖，默认为false
      stylesheet: null, //外部样式表的URL地址，默认为null
      noPrintSelector: ".no-print", //不想打印的元素的jQuery选择器，默认为".no-print"
      iframe: true, //是否使用一个iframe来替代打印表单的弹出窗口，true为在本页面进行打印，false就是说新开一个页面打印，默认为true
      append: null, //将内容添加到打印内容的后面
      prepend: null, //将内容添加到打印内容的前面，可以用来作为要打印内容
      deferred: $.Deferred() //回调函数
    });
  });

})