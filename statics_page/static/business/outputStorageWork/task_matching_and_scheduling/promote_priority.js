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
  var colName = ['波次下发时间', '提货方式', '波次号', '配送方向编号', '配送方向', '托运方向', '作业状态',
    '销售单号', '被动补单单数量', '客户编号', '客户名称', '品规数', '数量', '件数', '业务员', '出库优先级', '暂存区起始号'
    , '暂存区终止号', '是否零货活动', '客户备注', '业主编码', '线路名称', '优先级'
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
  }, {
    name: 'text14',
    index: 'text14',
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
        promotePriorityPop(obj.text1);
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


   // 单据补货查看弹窗
    function promotePriorityPop(productCode) {
        utils.dialog({
            title: "单据补货查看",
            width: $(window).width() * 0.9,
            height: $(window).height() * 0.7,
            data: productCode,
            url: "/template/outputStorageWork/task_matching_and_scheduling/promote_priority_pop.html"
        }).showModal()
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
    })
})