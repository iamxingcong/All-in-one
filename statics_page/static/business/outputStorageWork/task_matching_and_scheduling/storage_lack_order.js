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
  var colName = ['业主编号', '业主名称', '是否中药', '客户编号'
  , '客户名称', '销售单号', '日期', '部门编号', '部门名称', '是否库存满足', '业务员', '操作员', '提货方式', '提货时间'];
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
    index: 'text6',
    rowtype: '#rushCause',
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

  // 生成下拉菜单
  var option = {
    value: 'AAA',
    value2: 'BBBBB',
    value3: 'CCCCCC'
  }

  var optionHtml = `
      <select name="a" class="form-control">
        <option value=${option.value}>请选择</option>
        <option value=${option.value2}>${option.value3}</option>
      </select>
    `
  $('#rushCause').html(optionHtml)

  $('#table_a').XGrid({
    data: grid_dataY,
    colNames: colName,
    colModel: colModel,
    rownumbers: true,
    key: 'text1',
    rowNum: 10,
    altRows: true, //设置为交替行表格,默认为false
    pager: '#grid_pager_a',
    ondblClickRow: function (id, dom, obj, index, event) {

    },
    gridComplete: function () {},
    onSelectRow: function (id, dom, obj, index, e) {
      //选中事件
      //回调参数：id：本行id,dom:本行DOM元素,index:下标,event:原事件
    }
  });

  /* table_b */
  var colNameB = ['商品编号', '商品名称', '规格', '件包装数量', '已处理数量', '冲红原因', '库存不足数量', '数量', '整件不足',
    '零货不足', '零散数', '件数', '批号', '灭菌批号', '批号处理方式', '生产日期要求', '质量状况', '销售单号', '行号', '产地'
    , '生产厂家', '包装单位'];
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
  }, {
    name: 'text15',
    index: 'text15',
  }, {
    name: 'text15',
    index: 'text15',
  }, {
    name: 'text15',
    index: 'text15',
  }, {
    name: 'text15',
    index: 'text15',
  }, {
    name: 'text15',
    index: 'text15',
  }, {
    name: 'text15',
    index: 'text15',
  }, {
    name: 'text15',
    index: 'text15',
  }, {
    name: 'text15',
    index: 'text15',
  }];



  $('#table_b').XGrid({
    data: grid_dataY,
    colNames: colNameB,
    colModel: colModelB,
    rownumbers: true,
    key: 'text1',
    rowNum: 10,
    pager: '#grid_pager_b',
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

  /* 冲红 */
    $('#rush_red').on('click', function () {
        var sele_row = $('#table_a').XGrid("getSeleRow");
        if (sele_row && typeof sele_row == "object") {
            utils.dialog({
                title: "冲红订单信息",
                width: $(window).width() * 0.9,
                height: $(window).height() * 0.7,
                data: [sele_row, false],
                url: "/xyy-wms-views/template/outputStorageWork/task_matching_and_scheduling/rush_red.html",
                onclose: function () {
                    var value = this.returnValue;
                },
                onshow: function () {
                    
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
})