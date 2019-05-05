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
  var colName = ['业主编号', '业主名称', '是否还原订单', '销售单号', '单位编号', '单位名称', '客户备注', '是否中药', '业务员', '线路名称', '配送方向', '提货方式', '整件数', '折合件数', '品规数', '开票时间', '是否指定批号下发', '订单类型', '出库优先级', '是否打印整件标签', '部门名称', '补单单号', '作业状态', '开票类型', '日期', '操作员', '波次号'];
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
    name: 'text7',
    index: 'text7'
  }, {
    name: 'text7',
    index: 'text7'
  }, {
    name: 'text7',
    index: 'text7'
  }, {
    name: 'text7',
    index: 'text7'
  }, {
    name: 'text7',
    index: 'text7'
  }, {
    name: 'text7',
    index: 'text7'
  }, {
    name: 'text7',
    index: 'text7'
  }, {
    name: 'text7',
    index: 'text7'
  }, {
    name: 'text7',
    index: 'text7'
  }, {
    name: 'text7',
    index: 'text7'
  }, {
    name: 'text7',
    index: 'text7'
  }, {
    name: 'text7',
    index: 'text7'
  }, {
    name: 'text7',
    index: 'text7'
  }, {
    name: 'text7',
    index: 'text7'
  }, {
    name: 'text7',
    index: 'text7'
  }, {
    name: 'text7',
    index: 'text7'
  }, {
    name: 'text7',
    index: 'text7'
  }, {
    name: 'text7',
    index: 'text7'
  }, {
    name: 'text7',
    index: 'text7'
  }, {
    name: 'text7',
    index: 'text7'
  }];
  $('#table_a').XGrid({
    data: grid_dataY,
    colNames: colName,
    colModel: colModel,
    rownumbers: true,
    key: 'text1',
    rowNum: 10,
    altRows: true, //设置为交替行表格,默认为false
    pager: "#grid_pager_a",
      gridComplete: function () {
      /* 更新明细 */
      $('#table_b').XGrid('clearGridData');
    },
    onSelectRow: function (id, dom, obj, index, e) {
      /* 列表明细联动 */
      /* var sele_data = $(this).XGrid("getSeleRow");
      var productCode = obj.productCode;
      var orgCode = dialog_data;
      $('#table_b').XGrid('clearGridData');
      if (sele_data) {
        $('#table_b').XGrid('setGridParam', {
          url: '/org/stockInCheck/queryProductMessage',
          postData: {
            drugCode: productCode,
            orgCode: orgCode
          }
        }).trigger("reloadGrid");
      } */
    }
  });

  /* table_b */
  var gridDataB = [];
  for (var i = 0; i < 20; i++) {
    gridDataB.push({
      text1: i,
      text2: "",
      text3: "",
      text4: "",
      text5: "",
      text6: "",
      text7: (i+1)*10,
      text8: "",
      text9: i,
      text10: "",
      text11: "",
      text12: "2",
      text13: "",
      text14: "",
      text15: ""
    });
  }
  var colNameB = ['商品编号', '商品名称', '规格', '生产厂家', '包装单位', '件包装数量', '订单数量', '批号', '分配数量' ,'单一批号要求',
    '生产日期要求', '质量状况', '销售单号' ,'操作', '原始商品行id'
  ];
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
    formatter: function (e, a, obj) {
      var id=obj.text15;
      if(id){
        return '<a class="del-row">删除行</a>';
      }else{
        return '<a class="add-row">增加行</a>';
      }
    }
  }, {
    name: 'text15',
    index: 'text15',
    hidden:true
  }];
  $('#table_b').XGrid({
    data: gridDataB,
    colNames: colNameB,
    colModel: colModelB,
    rownumbers: true,
    key: 'autoKey',
    rowNum: 10,
    pager: "#grid_pager_b",
    altRows: true, //设置为交替行表格,默认为false
    ondblClickRow: function (id, dom, obj, index, event) {
      if(obj.text15){
        if(obj.text7!=obj.text9){
          batchAcquire({
            "id":id,
            "text7":obj.text7
          });
        }
      }else{
        var id=obj.id,
            dataList=$('#table_b').XGrid('getRowData'),
            tempList=[];//表格所有数据
        for(var i=0; i<dataList.length; i++){
          if(dataList[i].text15&&dataList[i].text15==id&&!dataList[i].text9){
            tempList.push(dataList[i]);
          }
        }
        if(tempList.length==0){
          batchAcquire({
            "id":id,
            "text7":obj.text7
          });
        }
      }
    },
    gridComplete: function () {},
  });

  //增加行
  $(".add-row").on("click",function(){
    var id=$(this).closest("tr").attr("id"),//行id
        data=$('#table_b').XGrid('getRowData',id);//原有行的数据
    var text7=data.text7||0,
        text9=data.text9||0;
    var num=text7-text9;//新增行订单数量
    if(num<=0) return;//判断是否还有剩余数量
    var dataSub=data;
    dataSub.text7=num;
    dataSub.text9="";
    dataSub.text15=id;
    var dataList=$('#table_b').XGrid('getRowData'),
        tempList=[];//表格所有数据
    for(var i=0; i<dataList.length; i++){
      if(dataList[i].text15&&dataList[i].text15==id){
        tempList.push(dataList[i]);
      }
    }
    if(tempList.length>0){
      $('#table_b').XGrid('addRowData', dataSub, "after", tempList[tempList.length-1].id);
    }else{
      $('#table_b').XGrid('addRowData', dataSub, "after", id);
    }
    $('#table_b').XGrid("setRowData", id, {"text7": text9});
  });
  //删除行
  $("#table_b").on("click", ".del-row", function(){
    var id=$(this).closest("tr").attr("id"),//行id
        data=$('#table_b').XGrid('getRowData',id),//行的数据
        parentData=$('#table_b').XGrid('getRowData', data.text15);//原始行的数据
    $('#table_b').XGrid('delRowData', id);
    //修改原始行订单数量
    $('#table_b').XGrid("setRowData", data.text15, {"text7": parseInt(parentData.text7)+parseInt(data.text7)});
  });

  /* 查询 */
  $('#searchBtn').on('click', function () {
    var form_data = $('#form_a').serializeToJSON();
    $('#table_a').setGridParam({
      url: "xxx",
      postData: form_data
    })
  });

  /* 指定批号索取 */
  function batchAcquire(data) {
    utils.dialog({
      title: "指定批号索取",
      width: $(window).width() * 0.9,
      height: $(window).height() * 0.7,
      data: data,
      url: "/xyy-wms-views/template/outputStorageWork/task_matching_and_scheduling/batch_acquire.html",
      onclose:function(){
        var result=this.returnValue;
        if(result&&result.id&&result.data&&result.data.length>0){
          var oldData=$('#table_b').XGrid('getRowData',result.id),//修改行数据
              oldParentData={},//原始行数据
              num;
          if(oldData.text15){
            oldParentData=$('#table_b').XGrid('getRowData',oldData.text15);
            num=parseInt(oldData.text7)-parseInt(result.data[0].text7);
            num+=parseInt(oldParentData.text7);
            $('#table_b').XGrid("setRowData", result.id , {"text7": result.data[0].text7, "text9": result.data[0].text7});
            $('#table_b').XGrid("setRowData", oldData.text15 , {"text7": num});
          }else{
            $('#table_b').XGrid("setRowData", result.id , {"text9": result.data[0].text7});
          }
        }
      }
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
  });

})