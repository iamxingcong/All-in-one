var grid_table = $('#grid-table');
var pager_selector = $('#grid-page');
var data1 = [{
    a: 'a1',
    b: 'b',
    c: 'c',
    d: 'd',
    e: 'e',
    f: 'f'
  },
  {
    a: 'a2',
    b: 'b',
    c: 'c',
    d: 'd',
    e: 'e',
    f: 'f'
  },
  {
    a: 'a3',
    b: 'b',
    c: 'c',
    d: 'd',
    e: 'e',
    f: 'f'
  },
  {
    a: 'a4',
    b: 'b',
    c: 'c',
    d: 'd',
    e: 'e',
    f: 'f'
  },
  {
    a: 'a5',
    b: 'b',
    c: 'c',
    d: 'd',
    e: 'e',
    f: 'f'
  },
];

$(function () {
$(grid_table).jqGrid({
  data: data1,
  datatype: "local", //数据来源，本地数据（local，json,jsonp,xml等）
  height: $('.content').height() - 455, //高度，表格高度。可为数值、百分比或'auto'
  styleUI: 'Bootstrap',
  colNames: ['商品编号', '商品名称', '商品规格', '包装单位', '生产厂家', '商品批号'],
  colModel: [{
      name: 'a',
      width: 120,
    },
    {
      name: 'b',
      width: 150,
    }, {
      name: 'c',
      width: 100,
    },
    {
      name: 'd',
      width: 70,
    },
    {
      name: 'e',
      width: 150,
    },
    {
      name: 'f',
      width: 100,
    }
  ],
  onSelectRow: function (id) {

  },
  forceFit: true,
  autowidth: true,
  viewrecords: true, //是否在浏览导航栏显示记录总数
  rownumbers: true, //序号
  //loadonce: true,
  rowNum: -1,
  pager: pager_selector, //分页、按钮所在的浏览导航栏
  rowList: [10, 20, 30, 40, 50], //用于改变显示行数的下拉列表框的元素数组。
  loadComplete: function () {

  },
  beforeSelectRow: function (rowid, e) {

  }
});

//高度自适应
$(window).resize(function(){  
  $(window).unbind("onresize");  
  $(grid_table).setGridHeight($('.content').height() - 455);  
  $(window).bind("onresize", this);  
});

//表格功能
$(grid_table).jqGrid('navGrid','#grid-page',{edit:true,add:true,del:true});
});