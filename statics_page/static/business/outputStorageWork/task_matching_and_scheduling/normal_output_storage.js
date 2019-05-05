$(function () {

  /* 填入初始数据 */
  $('#form_a').JSONToform({
    val_a: '举个栗子'
  })

  /* 数据统计 */
  $("#data_stats span").each(function (index, ele) {
    $(ele).text('999');
  });

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
  var colName = ['同步时间', '业主编号', '业主名称', '是否还原订单', '销售单号', '客户编号', '客户名称',
    '客户备注', '业务员', '配送方向', '配送方式', '整件数', '折合件数', '品规数', '开票时间', '是否指定批号下发', '订单类型', '出库优先级', '部门名称', '作业状态', '开票类型', '操作员'
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
  }, {
    name: 'text14',
    index: 'text14',
  }, {
    name: 'text14',
    index: 'text14',
    rowtype: '#text14_e',
    rowEvent: function (row) {
      var rowdata = row.rowData;
      console.log(rowdata);

      /* utils.ajax({}, "url", function (res) {
        utils.dialog({
          title: "提示",
          content: "批号下发成功",
          timeout: 2000
        }).show()
      }, function (err) {
        utils.dialog({
          title: "提示",
          content: "批号下发失败",
          timeout: 2000
        }).show()
      }) */
    }
  }, {
    name: 'text14',
    index: 'text14',
  }, {
    name: 'text14',
    index: 'text14',
  }, {
    name: 'text14',
    index: 'text14',
  }, {
    name: 'text14',
    index: 'text14',
  }, {
    name: 'text14',
    index: 'text14',
  }, {
    name: 'text14',
    index: 'text14',
  }];
  $('#table_a').XGrid({
    data: grid_dataY,
    colNames: colName,
    colModel: colModel,
    selectandorder: true,
    key: 'text1',
    rowNum: 10,
    altRows: true, //设置为交替行表格,默认为false
    pager: '#grid_pager_a',
    ondblClickRow: function (id, dom, obj, index, event) {
      orderInfo(obj.text1);
    },
    gridComplete: function () {
      /* 订单信息 */
      $("#table_sum span").each(function (index, ele) {
        $(ele).text('999');
      });
    },
    onSelectRow: function (id, dom, obj, index, e) {

    }
  });

  /* 销售订单明细弹框 */
  function orderInfo(orderCode) {
    utils.dialog({
      title: "销售订单明细",
      width: $(window).width() * 0.9,
      height: $(window).height() * 0.7,
      data: orderCode,
      url: "/xyy-wms-views/template/outputStorageWork/task_matching_and_scheduling/sales_order_info.html"
    }).showModal()
  }

  /* 查询 */
  $('#searchBtn').on('click', function () {
    var form_data = $('#form_a').serializeToJSON();
    $('#table_a').setGridParam({
      url: "xxx",
      postData: form_data
    })
  });

  /* 安排波次 */
  $('#plan_time').on('click', function () {
    var sele_row = $('#table_a').XGrid("getSeleRow");
    if (sele_row) {
      utils.ajax({}, "url", function (res) {
        utils.dialog({
          title: "提示",
          content: "安排波次成功",
          timeout: 2000
        }).show()
      }, function (err) {
        utils.dialog({
          title: "提示",
          content: "安排波次失败",
          timeout: 2000
        }).show()
      })
    } else {
      utils.dialog({
        title: "提示",
        content: "请先选择需要安排波次的订单",
        timeout: 2000
      }).show()
    }
    console.log(sele_row);
  });

  /* 冲红 */
  $('#rush_red').on('click', function () {
    var sele_row = $('#table_a').XGrid("getSeleRow");
    if (sele_row && typeof sele_row == "object") {
      utils.dialog({
        title: "冲红订单信息",
        width: $(window).width() * 0.9,
        height: $(window).height() * 0.7,
        data: [sele_row, true],
        url: "/xyy-wms-views/template/outputStorageWork/task_matching_and_scheduling/rush_red.html",
        onclose: function () {
          var value = this.returnValue;
        }
      }).showModal()
    } else {
      utils.dialog({
        title: "提示",
        content: "请先选择一条(单选)需要冲红的订单",
        timeout: 2000
      }).show()
    }
    console.log(sele_row);
  });

  //展示数据统计
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

