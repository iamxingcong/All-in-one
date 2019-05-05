$(function () {
  /* 弹窗传递的数据 */
  var dialog = parent.dialog.get(window);
  //console.log(dialog);
  var dialog_data = dialog.data;
  initTable(dialog_data);
  // initTable('')
  /* table_a */
  function initTable(orderCode) {
    //订单编号
    //console.log(orderCode);

    //data
    var grid_dataY = [];
    for (var i = 0; i < 10; i++) {
      grid_dataY.push({
        text1: i,
        text2: "",
        text3: "",
        text4: "",
        text5: "",
        text6: i+200,
        text7: i+100,
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

    var colName = ['商品编码', '商品名称', '库别', '显示货位', '批号', '可索取数量', '索取数量', '件包装数量', '生产日期',
      '有效期至', '规格', '包装单位', '产地', '出库已分配数量', '库存数量'
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
      index: 'text7',
      rowtype:'#text7_d',
      formatter: function (e, d, rData) {
          if (rData.text7 === 101) {
              return {
                  'rowtype': '#text7_e'
              };
          } else{
              return {
                  'rowtype': '#text7_d'
              };
          }
      }
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
    }, {
      name: 'text13',
      index: 'text13',
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


})