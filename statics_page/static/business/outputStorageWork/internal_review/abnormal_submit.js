$(function () {
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
    });
  }
  var colName = ['监管/防窜', '拼箱号', '商品编码', '商品名称', '规格', '包装单位', '产地',
    '批号', '灭菌批号', '显示货位', '生产厂家', '件包装数量', '计划拣货数量', '实际拣货数量', '异常原因', 
    '异常数量', '备注留言'
  ];
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
    name: 'text15',
    index: 'text15',
    rowtype: '#text15_e',
  }, {
    name: 'text16',
    index: 'text16',
    rowtype: '#text16_e',
  }, {
    name: 'text17',
    index: 'text17',
    rowtype: '#text17_e',
  }];
  $('#table_a').XGrid({
    data: grid_dataY,
    colNames: colName,
    colModel: colModel,
    key: 'text1',
    rowNum: 10,
    rownumbers: true,
    pager: '#grid_pager_a',
    altRows: true, //设置为交替行表格,默认为false
    ondblClickRow: function (id, dom, obj, index, event) {

    },
    gridComplete: function () {},
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
})