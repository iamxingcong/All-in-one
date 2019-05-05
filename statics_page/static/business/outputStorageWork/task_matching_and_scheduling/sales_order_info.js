$(function () {
  /* 弹窗传递的数据 */
  var dialog_data = dialog.data;

  initTable(dialog_data);

  /* table_a */
  function initTable(orderCode) {
    //订单编号
    console.log(orderCode);
    
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

    var colName = ['销售单号', '客户编号', '客户名称', '商品编码', '商品名', '通用名', '规格',
      '批准文号', '生产厂家', '包装单位', '件包装数量', '数量', '整件数', '零货数', '批号要求'
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
    }];

    $('#table_a').XGrid({
      /* url:"xxxx",
      postData:{
        orderCode:orderCode
      }, */
      data: grid_dataY,
      colNames: colName,
      colModel: colModel,
      rownumbers: true,
      key: 'text1',
      rowNum: 999,
      rownumbers: true,
      altRows: true,
    });
  }
})