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
  var colName = ['任务下发时间', '集货完成状态', '是否取消订单', '总箱数', '销售单号', '业主编号', '业主名称',
    '客户编号', '客户名称', '配送类型', '提货方式', '开始暂存区', '终止暂存区', '开票员'
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
  });

  //打印外复核单
  $("#printReviewSheet").on("click",function(){
    var data=$("#table_a").XGrid("getRowData"),
        box_html = '';
    box_html +=`
        <div class="panel-body">
          <div style="text-align: center;">
            <h1 style="font-size: 18px; font-weight: 500;">外复核任务单</h1>
          </div>
          <div>
            <table style="width: 100%;" border="1" cellspacing="0" cellpadding="0">
              <tr style="text-align: center;">
                <td>序号</td><td>出库单号</td><td>起始暂存区</td><td>终止暂存区</td><td>总箱数</td><td>整箱数</td><td>拼箱数</td><td>销售单号</td><td>客户名称</td><td>配送方式</td><td>配送区域</td><td>复核结果</td>
              </tr>`;

    data.forEach(function (item,index) {
      box_html +=`
            <tr>
              <td style="text-align: center;">${index+1}</td>
              <td>${item.text1}</td>
              <td>${item.text2}</td>
              <td>${item.text3}</td>
              <td>${item.text4}</td>
              <td>${item.text5}</td>
              <td>${item.text6}</td>
              <td>${item.text7}</td>
              <td>${item.text8}</td>
              <td>${item.text9}</td>
              <td>${item.text10}</td>
              <td>${item.text11}</td>
            </tr>
          `;
    });

    box_html +=
            `</table>
          </div>
          <div style="text-align: center; margin-top: 6px;">
            <div style="display: inline-block; float: left;">复核人：陈超</div>
            <div style="display: inline-block;">打印时间：2018-08-04 14:41:23</div>
            <div style="display: inline-block; float: right;">第1页&nbsp;&nbsp;&nbsp;共2页</div>
          </div>
        </div>
       `;
    $("#printReviewSheetModule").html(box_html);
    //调用打印
    $("#printReviewSheetModule").print({
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