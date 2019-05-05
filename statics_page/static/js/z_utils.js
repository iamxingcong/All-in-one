/* by zhou */

/* log:
       2018.07.30  创建z_utils,新增totalTable/exportTable/initDate/tableCut/parseParams
       2018.08.02  新增openPage
*/

var z_utils = {
  /* 合计计算  data:全部的数据;colName:需要计算合计的项; */
  totalTable: function (data, colName) {
    //初始值
    var count = 0;
    //精确到小数点8位
    var n = 8;
    $.each(data, function (index, item) {
      var item_num = item[colName];
      if (!item_num) item_num = 0;
      try {
        var baseNum = item_num.toString().split('.')[1].length;
        count += Number(item_num) * Math.pow(10, baseNum) * Math.pow(10, n - baseNum);
      } catch (e) {
        count += Number(item_num) * Math.pow(10, n)
      }
    })
    return count / Math.pow(10, n);
  },
  /* 表格导出  tableId:表格id;ok_callback:确定的回调;cancel_callback:取消的回调; */
  exportTable: function (tableId, okCallback, cancelCallback) {
    var ary = $('#' + tableId).XGrid('getTableHead'),
      s = [];
      s.push('<div id="setCol" style="padding-left: 2.4rem"><div class="row" id="checkRow">');
    for (var i = 0; i < ary.length; i++) {
      s.push('<div class="col-md-3"><div class="checkbox"><label><input style="margin-right: 10px"');
      s.push(ary[i].hidden ? ' ' : ' checked ');
      s.push('type="checkbox" name="');
      s.push(ary[i].m);
      s.push('">');
      s.push(ary[i].n);
      s.push('</label></div></div>');
    }
    s.push('</div></div>');
    utils.dialog({
      content: s.join(''),
      title: '导出列',
      okValue: '确定',
      ok: function () {
        return okCallback(this);//未选择导出字段时，阻止弹框关闭,ranliang,2018.10.24
      },
      cancelValue: '取消',
      cancel: function () {
        cancelCallback ? cancelCallback(this) : null;
      },
    }).showModal();
  },
  /* 日期初始化 beginId:开始时间id;endId:结束时间id;*/
  initDate: function (beginId, endId) {
    var new_date = new Date();
    var year = new_date.getFullYear();
    var month = new_date.getMonth() + 1;
    var date = new_date.getDate();
    //1位数加0
    month = month.toString().length <= 1 ? '0' + month : month;
    date = date.toString().length <= 1 ? '0' + date : date;
    //设置开始时间为当月第一天00:00:00，结束时间为当天23:59:59
    $('#' + beginId).val(year + '-' + month + '-01 00:00:00');
    $('#' + endId).val(year + '-' + month + '-' + date + ' 23:59:59');
  },
  /* tables切换 display:显示的css;*/
  tableCut: function (display) {
    $('.nav-tabs>li').on('click', function () {
      var $this = $(this),
        $nav_content = $('.nav-content');
      $this.addClass('active').siblings().removeClass('active');
      $nav_content.children('div').eq($this.index()).css('display', display ? display : 'block').siblings().hide();
      $nav_content.children('div').eq($this.index()).addClass('active').siblings().removeClass('active');
    });
  },
  /* 解析url传参  url:页面路径;*/
  parseParams: function (url) {
    var data = {};
    if (url.indexOf('?') == -1) return {};
    var paramAry = url.split('?')[1].split('&');
    $.each(paramAry, function (index, item) {
      var i = item.split('=');
      if (i[0]) {
        data[i[0]] = i[1];
      }
    })
    return data
  },
  /* 页面跳转 url:路径文件;data:url传参,对象类型; */
  openPage: function (url, data) {
    if (!data) {
      window.location = url;
    } else {
      var arr = [],
        str = '';
      Object.keys(data).map(key => {
        arr.push(`${key}=${data[key]}`);
      });
      if (arr.length > 0) {
        str = '?' + arr.join('&');
      } else {
        str = ''
      }
      window.location = url + str;
    }
  }
}