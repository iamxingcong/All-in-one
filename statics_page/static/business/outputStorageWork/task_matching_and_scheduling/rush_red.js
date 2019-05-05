$(function () {
  /* 弹窗传递的数据 */
  var dialog = parent.dialog.get(window);
  var dialog_data = dialog.data[0];
  var dialog_flag = dialog.data[1];

  // 隐藏按钮
  if(dialog_flag){
      $(".rush_red_btn").css("visibility","visible");
  }

    initTable(dialog_data);
  // initTable('')
  /* table_a */
  function initTable(orderCode) {
    //订单编号
    console.log(orderCode);

    //data
    var grid_dataY = [];
    for (var i = 0; i < 10; i++) {
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

    var colName = ['商品编码', '商品名', '通用名', '规格', '批准文号', '生产厂家', '包装单位', '件包装数量', '开票数量',
      '整件数', '零货数', '要冲红数量', '冲红原因', '已冲红数量', '生产日期要求'
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
      index: 'text12',
      rowtype:'#text12_e'
    }, {
      name: 'text13',
      index: 'text13',
      rowtype:'#text13_e'
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
      selectandorder: true,
      key: 'text1',
      rowNum: 999,
      altRows: true,
    });
  }




  /* 确认冲红 */
  $("#rush_red_ok").on("click", function () {
    var form_data = $('#form_a').serializeToJSON();
    if (form_data.type == '0') {
      var sele_row = $('#table_a').XGrid("getSeleRow");
      if (sele_row) {
        dialog.close();
        /* utils.ajax({}, "url", function (res) {
          dialog.close();
        }, function (err) {
          utils.dialog({
            title: "提示",
            content: "冲红失败",
            timeout: 2000
          }).show()
        }) */
      } else {
        utils.dialog({
          title: "提示",
          content: "请先选择需要冲红的商品",
          timeout: 2000
        }).show()
      }
    }else{
      dialog.close();
        /* utils.ajax({}, "url", function (res) {
          dialog.close();
        }, function (err) {
          utils.dialog({
            title: "提示",
            content: "冲红失败",
            timeout: 2000
          }).show()
        }) */
    }
  })

    /* 冲红取消 */
    $("#rush_red_close").on("click", function () {
      dialog.close();
    })
})