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
      text2: i+100,
      text3: i+100,
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
  var colName = ['创建波次时间', '波次号', '单数', '品规数', '整件数', '零散数', '数量'];
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
  }];
  $('#table_a').XGrid({
    /* url:"",
    postData: {}, */
    data: grid_dataY,
    colNames: colName,
    colModel: colModel,
    key: 'text1',
    rowNum: 10,
    pager: "#grid_pager_a",
    altRows: true, //设置为交替行表格,默认为false
    gridComplete: function () {
      /* 订单信息 */
      $("#table_sum span").each(function (index, ele) {
        $(ele).text('999');
      });
      /* 更新明细 */
      $('#table_b').XGrid('clearGridData');
    },
    ondblClickRow: function (id, dom, obj, index, e) {
    /* 列表明细联动 */
      var sele_data = $(this).XGrid("getRowData", id);
      if($('#table_b').XGrid('getRowData', id).id == undefined){
          $('#table_b').XGrid('addRowData', sele_data, 'last');
      }

    //   var productCode = obj.productCode;
    // var orgCode = dialog_data;
    // $('#table_b').XGrid('clearGridData');
    // if (sele_data) {
    //   $('#table_b').XGrid('setGridParam', {
    //     url: '/org/stockInCheck/queryProductMessage',
    //     postData: {
    //       drugCode: productCode,
    //       orgCode: orgCode
    //     }
    //   }).trigger("reloadGrid");
    // }
    }
  });

  /* table_b */
  var colNameB = ['业主编号', '业主名称', '销售单号', '客户编号', '客户名称', '配送方向编号', '配送方向', '提货方式', '整件数', '折合件数', '品规数',
    '开票时间', '业务员', '线路名称', '是否指定批号下发', '操作员', '客户备注', '出库优先级', '部门名称', '作业状态', '开票类型', '波次号'
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
  }];
  var table_b_id = []
  $('#table_b').XGrid({
    data: grid_dataY,
    colNames: colNameB,
    colModel: colModelB,
    selectandorder: true,
    key: 'text1',
    rowNum: 10,
    pager: "#grid_pager_b",
    altRows: true, //设置为交替行表格,默认为false}
    onSelectRow: function (id, dom, obj, index, event) {

        var index = table_b_id.findIndex((value) => {
            return value === id
        })
        if (index == -1){
            table_b_id.push(id)
        }else{
            table_b_id.splice(index, 1)
        }


    },
  });

  /* 查询 */
  $('#searchBtn').on('click', function () {
    var form_data = $('#form_a').serializeToJSON();
    $('#table_a').setGridParam({
      url: "xxx",
      postData: form_data
    })
  });

  /* 取消波次 */
  $('#cancel_time').on('click', function () {
    var sele_row = $('#table_a').XGrid("getSeleRow");
    if (sele_row) {
      utils.ajax({}, "url", function (res) {
        $('#table_a').setGridParam({
          url: "xxx",
          postData: form_data
        })
      }, function (err) {
        utils.dialog({
          title: "提示",
          content: "取消波次失败",
          timeout: 2000
        }).show()
      })
    } else {
      utils.dialog({
        title: "提示",
        content: "请先选择需要取消波次的订单",
        timeout: 2000
      }).show()
    }
  });

  /* 下发波次 */
  $('#issue_time').on('click', function () {
    var sele_row = $('#table_a').XGrid("getSeleRow");
    if (sele_row) {
      utils.ajax({}, "url", function (res) {
        $('#table_a').setGridParam({
          url: "xxx",
          postData: form_data
        })
      }, function (err) {
        utils.dialog({
          title: "提示",
          content: "下发波次失败",
          timeout: 2000
        }).show()
      })
    } else {
      utils.dialog({
        title: "提示",
        content: "请先选择需要下发波次的订单",
        timeout: 2000
      }).show()
    }
  });

  /* 移除单据 */
  $('#remove_order').on('click', function () {
      var sele_row = $('#table_a').XGrid("getSeleRow");
    if (table_b_id) {
        table_b_id.forEach(function (item) {
            $('#table_b').XGrid('delRowData', item);
        })
        table_b_id = []
        utils.ajax({}, "url", function (res) {

        $('#table_a').setGridParam({
          url: "xxx",
        })
      }, function (err) {
        utils.dialog({
          title: "提示",
          content: "移除单据失败",
          timeout: 2000
        }).show()
      })
    } else {
      utils.dialog({
        title: "提示",
        content: "请先选择需要移除的单据",
        timeout: 2000
      }).show()
    }
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
})