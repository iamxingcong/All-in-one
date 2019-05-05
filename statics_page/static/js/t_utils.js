!(function () {

    // 拼接查询字符串
    function makeCompleteUrl(baseUrl, api, param) {
        "use strict";
        var completeUrl,
            queryString = '?',
            _t = new Date().getTime();
        if (param) {
            var queryObj = $.extend({_t: _t}, param);
            for (var key in queryObj) {
                queryString += (key + '=' + queryObj[key] + '&');
            }
        }
        queryString = queryString.substring(0, queryString.length - 1);
        completeUrl = baseUrl + api + queryString;
        return encodeURI(completeUrl);
    }

    // 获取查询参数
    function getParameter(param) {
        var query = window.location.search;
        var iLen = param.length;
        var iStart = query.indexOf(param);
        if (iStart == -1)
            return "";
        iStart += iLen + 1;
        var iEnd = query.indexOf("&", iStart);
        if (iEnd == -1)
            return query.substring(iStart);
        return query.substring(iStart, iEnd);
    }

    /* 表格导出  tableId:表格id;ok_callback:确定的回调;cancel_callback:取消的回调; */
    function exportTable (tableId, okCallback, cancelCallback) {
        var ary = $('#' + tableId).XGrid('getTableHead'),
            s = [];
        s.push('<div id="setCol" style="padding-left: 2.4rem"><div class="row" id="checkRow">');
        for (var i = 0; i < ary.length; i++) {
            if(ary[i].m !== "caozuo"){
                s.push('<div class="col-md-3"><div class="checkbox"><label><input style="margin-right: 10px"');
                s.push(ary[i].hidden ? ' ' : ' checked ');
                s.push('type="checkbox" name="');
                s.push(ary[i].m);
                s.push('">');
                s.push(ary[i].n);
                s.push('</label></div></div>');
            }

        }
        s.push('</div></div>');
        utils.dialog({
            content: s.join(''),
            title: '导出列',
            okValue: '确定',
            ok: function () {
                okCallback(this);
            },
            cancelValue: '取消',
            cancel: function () {
                cancelCallback ? cancelCallback(this) : null;
            },
        }).showModal();
    }

    return services = {makeCompleteUrl: makeCompleteUrl, getParameter: getParameter,exportTable:exportTable}

})(window, jQuery);
