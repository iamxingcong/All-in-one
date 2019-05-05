/**
 * author:deng.tao
 * version:1.0.0
 */
(function (factory) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define([
            "jquery"
        ], factory, utils);
    } else {
        // Browser globals
        factory(jQuery, utils || {});
    }
}(function ($, us) {
    "use strict";
    $.XYYGrid = $.XYYGrid || {};
    if (!$.XYYGrid.hasOwnProperty("defaults")) {
        $.XYYGrid.defaults = {};
    }
    //插入utils
    $.extend($.XYYGrid, us);
    //插入Grid初始函数
    $.extend($.XYYGrid, {
        version: "1.0.0",
        guid: 1,
        uidPref: 'XGrid',
        htmlDecode: function (value) {
            if (value && (value === '&nbsp;' || value === '&#160;' || (value.length === 1 && value.charCodeAt(0) === 160))) {
                return "";
            }
            return !value ? value : String(value).replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
        },
        getAccessor: function (obj, expr) {
            var ret, p, prm = [], i;
            if (typeof expr === 'function') {
                return expr(obj);
            }
            ret = obj[expr];
            if (ret === undefined) {
                try {
                    if (typeof expr === 'string') {
                        prm = expr.split('.');
                    }
                    i = prm.length;
                    if (i) {
                        ret = obj;
                        while (ret && i--) {
                            p = prm.shift();
                            ret = ret[p];
                        }
                    }
                } catch (e) {
                }
            }
            return ret;
        },
        stripPref: function (pref, id) {
            var obj = $.type(pref);
            if (obj === "string" || obj === "number") {
                pref = String(pref);
                id = pref !== "" ? String(id).replace(String(pref), "") : id;
            }
            return id;
        },
        jqID: function (sid) {
            return String(sid).replace(/[!"#$%&'()*+,.\/:; <=>?@\[\\\]\^`{|}~]/g, "\\$&");
        },
        randId: function (prefix) {
            return (prefix || $.XYYGrid.uidPref) + ($.XYYGrid.guid++);
        },
        getMethod: function (name) {
            return this.getAccessor($.fn.XGrid, name);
        },
        getRegional: function (inst, param, def_val) {
            var ret;
            if (def_val !== undefined) {
                return def_val;
            }
            if (inst.p && inst.p.regional && $.XYYGrid.regional) {
                ret = $.XYYGrid.getAccessor($.XYYGrid.regional[inst.p.regional] || {}, param);
            }
            if (ret === undefined) {
                ret = $.XYYGrid.getAccessor($.XYYGrid, param);
            }
            return ret;
        },
        template: function (format) { //jqgformat
            var args = $.makeArray(arguments).slice(1), j, al = args.length;
            if (format == null) {
                format = "";
            }
            return format.replace(/\{([\w\-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g, function (m, i) {
                if (!isNaN(parseInt(i, 10))) {
                    return args[parseInt(i, 10)];
                }
                for (j = 0; j < al; j++) {
                    if ($.isArray(args[j])) {
                        var nmarr = args[j],
                            k = nmarr.length;
                        while (k--) {
                            if (i === nmarr[k].nm) {
                                return nmarr[k].v;
                            }
                        }
                    }
                }
            });
        },
        msiever: function () {
            var rv = 0,
                sAgent = window.navigator.userAgent,
                Idx = sAgent.indexOf("MSIE");

            if (Idx > 0) {
                rv = parseInt(sAgent.substring(Idx + 5, sAgent.indexOf(".", Idx)));
            } else if (!!navigator.userAgent.match(/Trident\/7\./)) {
                rv = 11;
            }
            return rv;
        },
        msie: function () {
            return $.XYYGrid.msiever() > 0;
        },
        getCellIndex: function (cell) {
            var c = $(cell);
            if (c.is('tr')) {
                return -1;
            }
            c = (!c.is('td') && !c.is('th') ? c.closest("td,th") : c)[0];
            if ($.XYYGrid.msie()) {
                return $.inArray(c, c.parentNode.cells);
            }
            return c.cellIndex;
        },
        stripHtml: function (v) {
            v = String(v);
            var regexp = /<("[^"]*"|'[^']*'|[^'">])*>/gi;
            if (v) {
                v = v.replace(regexp, "");
                return (v && v !== '&nbsp;' && v !== '&#160;') ? v.replace(/\"/g, "'") : "";
            }
            return v;
        },
        //自增加扩展函数
        extend: function (methods) {
            $.extend($.fn.XGrid, methods);
            if (!this.no_legacy_api) {
                $.fn.extend(methods);
            }
        },
    });
    $.fn.XGrid = function (par) {
        if (typeof par === 'string') {
            var fn = $.XYYGrid.getMethod(par);
            if (!fn) {
                throw ("XGrid - No such method: " + par);
            }
            var args = $.makeArray(arguments).slice(1);
            return fn.apply(this, args);
        }
        //return this.each  ************发生多个对象链式调用时
        return this.each(function () {
            //if(this.grid) {return;}
            var localData;
            if (par != null && par.data !== undefined) {
                localData = par.data;
                par.data = [];
            }

            var p = $.extend(true, {
                prmNames: {
                    page: "page",
                    total: 'total',
                    records: 'records',
                    list: 'list'
                },
                page: 1,
                rowNum: 20,
                records: 0,
                key: 'id',
                url: '',
                postData: {},
                mtype: 'GET',
                sortorder: "asc",
                data: [],
                datasouce: 'local',
                idPrefix: "",
                styleUI: "jQueryUI",

                pagerpos: 'right',
                regional: "en",
                pgfirst: '',
                pgprev: '',
                pgnext: '',
                pglast: '',
                pgSelect: '',
                treeGrid: false,
                ExpandColumn: null,
                rownumbers: false,
                rownumbersname: '序号',
                initEdit: false,
                multiselect: false,//是否多选
                selectandorder: false,
                colModelOnline: false,//colModel是否在线
                colModelOnlineSave: '/system/saveUserGridInfo',
                colModelOnlineGet: '/system/queryUserGridInfoList',

                /*事件*/
                ondblClickRow: null,
                onClickRow: null,
                onSelectRow: null,


                afterInsertRow: null,

                //不定属性
                id: '',
            }, $.XYYGrid.defaults, par);

            var dir = "ltr";
            //var getstyle = $.XYYGrid.getMethod("getStyleUI");
            p.data = localData;
            var _ts = this, grid = {};
            _ts.p = p;


            function before() {
                var data;
                if (_ts.p.colModelOnline) {
                    utils.ajax({
                        url: _ts.p.colModelOnlineGet,
                        async: false,
                        type: 'post',
                        data: {gridId: $(_ts).prop('id'), pageUrl: window.location.pathname},
                        success: function (dt) {
                            console.log(dt);
                            if (dt.code == 0) {
                                if (!dt.result.fields) {
                                    console.log('没有找到线上列顺序');
                                    return;
                                }
                                var obj = {}, ary = [], list = JSON.parse(dt.result.fields);
                                $.map(list, function (i, v) {
                                    obj[i.name] = i;
                                });

                                $.each(_ts.p.colModel, function (i, v) {
                                    if (obj[v.name]) {
                                        v.hidden = obj[v.name].hidden || false
                                    }
                                    ary.push(v);
                                });
                                _ts.p.colModel = ary;
                            } else {
                                console.log('获取线上列顺序失败');
                            }

                        },
                        complete: function () {

                        }
                    })
                }
                //初始化主题
                $(_ts).addClass('XGridUI');
                //预留 皮肤主题模块
                var stylemodule = _ts.p.styleUI + ".base";
                //判断数据源
                if (_ts.p.url) {
                    _ts.p.datasouce = 'json'
                } else {
                    _ts.p.datasouce = 'local'
                }

                switch (_ts.p.datasouce.toLowerCase()) {
                    case 'local':
                        data = addLocalData();
                        addTableHead();
                        addJSONData(data);
                        break;
                    case "json":
                    case "jsonp":
                        //type=01&_search=false&nd=1529129927860&rows=20&page=1&sidx=&sord=asc
                        var ajaxPar = {
                            pageNum: _ts.p.page,
                            pageSize: _ts.p.rowNum,
                            //sort: _ts.p.sortorder
                        }

                        var ajaxParm = {
                            url: _ts.p.url,
                            type: _ts.p.mtype,
                            data: $.extend(ajaxPar, _ts.p.postData),
                            success: function (dt) {
                                _ts.p.page = dt.result.pageNum;
                                _ts.p.records = dt.result.total;
                                _ts.p.data = dt.result.list;
                                addTableHead();
                                addJSONData(dt.result);
                            }
                        }

                        utils.ajax(ajaxParm);
                        break;
                }
            }

            function addJSONData(data) {
                if (!data) return false;
                _ts.p._data = data;
                //console.log(data, '最终渲染');
                var i = 0, j = 0, v, cur, rd = {}, len, rows, idr, idn, rowData = [], objectReader = reader(),
                    tablebody = $(_ts), tableTr = $(_ts).find("td").closest('tr');
                rows = data.list || [];
                len = rows.length;
                /*
                if (!(rows[0] && rows[0][_ts.p.key])) {
                    console.log('没有id');
                } else {
                    console.log('有id');
                }*/


                while (i < len) {
                    //console.log(rows[i]);
                    cur = rows[i];

                    var noSeleCKStr = '<input type="checkbox">', noSele = false;//标记此行是否禁止选择
                    if ($.isArray(_ts.p.disableRow)) {
                        _ts.p.disableRow.some(function (id) {
                            if (id == cur[_ts.p.key]) {
                                noSele = true;
                            }
                        });
                    }

                    rowData.push('<tr id="');
                    rowData.push(cur[_ts.p.key]);
                    rowData.push('"');
                    /**/


                    if (noSele) {
                        rowData.push('noSele="true"');
                        noSeleCKStr = '已选';
                    } else {
                        noSeleCKStr = '<input type="checkbox">'
                    }


                    /**/
                    rowData.push('>');

                    //是否可多选
                    if (_ts.p.multiselect) {
                        rowData.push('<td style="text-align: center;" row-describedby="ck">');
                        rowData.push(noSeleCKStr);
                        rowData.push('</td>');
                    }

                    //是否显示序号
                    if (_ts.p.rownumbers) {
                        rowData.push('<td row-describedby="rn" style="text-align: center;">');
                        rowData.push((_ts.p.page * _ts.p.rowNum - _ts.p.rowNum) + i + 1);
                        rowData.push('</td>');
                    }

                    var tti = (_ts.p.page * _ts.p.rowNum - _ts.p.rowNum) + i + 1;
                    //序号+多选
                    if (_ts.p.selectandorder) {
                        rowData.push('<td id="grid_checked_' + tti + '" atrs= ' + tti + '  " row-describedby="ck"  row-describedby_="rn_ck">');
                        rowData.push(noSeleCKStr);

                        if (!noSele) rowData.push((_ts.p.page * _ts.p.rowNum - _ts.p.rowNum) + i + 1);

                        rowData.push('</td>');
                    }


                    idn = _ts.p.keyIndex;
                    idr = $.XYYGrid.getAccessor(cur, idn);

                    for (j = 0; j < objectReader.length; j++) {
                        v = $.XYYGrid.getAccessor(cur, objectReader[j]);
                        rd[_ts.p.colModel[j].name] = v;

                        rowData.push(addCell(cur[_ts.p.key], v, j, i, cur, _ts.p.colModel[j], tableTr));
                    }

                    i++;
                    rowData.push('</tr>');
                }
                tableTr.remove();
                tablebody.append(rowData.join(''));

                //如果有额外的附加行
                if (_ts.p.attachRow) {
                    var attachRow_td = tablebody.find('tr:last td').length ? tablebody.find('tr:last td') : tablebody.find('tr:last th');
                    var attachRow_Ary = [];
                    attachRow_td.each(function (i, v) {
                        attachRow_Ary.push($(v).clone().html('').prop('outerHTML').replace('</th>', '</td>').replace('<th ', '<td '));
                    });

                    var attachRow = ['<tr noSele="true" style="background: #E3E3E3;border-radius: 4px 4px 0 0;">'];

                    attachRow.push(attachRow_Ary.join(''));
                    attachRow.push('</tr>');

                    tablebody.append(attachRow.join(''));
                }

                setPager(_ts.p.pager);
                if ($.isFunction(_ts.p.gridComplete)) {
                    _ts.p.gridComplete.call(_ts);
                }
            }

            function addTableHead() {
                //初始化表头
                if (_ts.p.colNames && _ts.p.colNames.length) {
                    var tbHeadAry = ['<tr>'],
                        tbHeadAryMult = ['<table class="gridHeadMult" style="display: block"><tr>'];
                    //tbHeadAryMult    //多重表头

                    //是否可多选
                    if (_ts.p.multiselect) {
                        tbHeadAry.push('<th id="grid_checked" style=" padding: 0 3px;text-align: center;"><input type="checkbox"></th>');
                        tbHeadAryMult.push('<th id="grid_checked" style=" padding: 0 3px;text-align: center;"></th>');
                    }

                    if (_ts.p.selectandorder) {
                        tbHeadAry.push('<th id="grid_checked" style=" padding: 0 3px;text-align: center;"><input type="checkbox"></th>');
                        tbHeadAry.push(_ts.p.rownumbersname);
                        tbHeadAry.push('</th>');

                        tbHeadAryMult.push('<th id="grid_checked" style=" padding: 0 3px;text-align: center;"></th>');
                    }


                    //表头序号
                    if (_ts.p.rownumbers) {
                        tbHeadAry.push('<th style=" padding: 0 3px;text-align: center;">');
                        tbHeadAry.push(_ts.p.rownumbersname);
                        tbHeadAry.push('</th>');

                        tbHeadAryMult.push('<th style=" padding: 0 3px;text-align: center;">');
                        tbHeadAryMult.push(_ts.p.rownumbersname);
                        tbHeadAryMult.push('</th>');
                    }

                    for (let i = 0; i < _ts.p.colNames.length; i++) {
                        tbHeadAry.push('<th  grid_th_');
                        tbHeadAry.push(_ts.p.colModel[i].name);

                        tbHeadAry.push(' row-describedby="');
                        tbHeadAry.push(_ts.p.colModel[i].name);
                        tbHeadAry.push('" ');

                        tbHeadAry.push(_ts.p.colModel[i].hidden ? ' style="display:none" ' : '');
                        tbHeadAry.push('>');
                        tbHeadAry.push(_ts.p.colNames[i]);

                        tbHeadAry.push('</th>');

                        tbHeadAryMult.push('<th grid_th_');
                        tbHeadAryMult.push(_ts.p.colModel[i].name);
                        tbHeadAryMult.push(_ts.p.colModel[i].hidden ? ' style="display:none" ' : '');
                        tbHeadAryMult.push('>');

                        if (_ts.p.tbHeadAryMult && _ts.p.tbHeadAryMult.length) {
                            tbHeadAryMult.push(_ts.p.tbHeadAryMult[i]);
                        }

                        tbHeadAryMult.push('</th>');
                    }
                    tbHeadAry.push('</tr>');

                    tbHeadAryMult.push('</tr></table>');

                    $(_ts).html(tbHeadAry.join(''));
                    if (_ts.p.tbHeadAryMult && _ts.p.tbHeadAryMult.length) {
                        $(_ts).before(tbHeadAryMult.join(''));
                        setTimeout(function () {
                            $(_ts).find('tr:first th').each(function (i, v) {
                                $('.gridHeadMult th').eq(i).css('width', $(v).outerWidth());
                            })
                        })
                    }
                }
            }

            function addLocalData() {
                if (!$.isArray(_ts.p.data)) {
                    return;
                }
                var queryResults = _ts.p.data,
                    recordsperpage = parseInt(_ts.p.rowNum, 10) <= 0 ? 0 : parseInt(_ts.p.rowNum, 10),//int 每页条数
                    total = queryResults.length,//数据总条数
                    page = parseInt(_ts.p.page, 10),//int 当前页数
                    totalpages = Math.ceil(total / (recordsperpage || total)),//计算 总页数 (数据总条数/每页条数)
                    retresult = {};

                queryResults = queryResults.slice((page - 1) * recordsperpage, (page * recordsperpage) || total);

                retresult[_ts.p.prmNames.total] = totalpages;//总页数
                retresult[_ts.p.prmNames.page] = page;//当前页
                retresult[_ts.p.prmNames.records] = total;//总条数
                retresult[_ts.p.prmNames.list] = queryResults;//当前页数据数组
                return retresult;
            }

            function reader(datatype) {
                var field, f = [], j = 0, i;
                for (i = 0; i < _ts.p.colModel.length; i++) {
                    field = _ts.p.colModel[i];
                    if (field.name !== 'cb' && field.name !== 'subgrid' && field.name !== 'rn') {
                        f[j] = datatype === "local" ?
                            field.name :
                            field.name
                        //( (datatype==="xml" || datatype === "xmlstring") ? field.xmlmap || field.name : field.jsonmap || field.name );
                        if (_ts.p.keyName !== false && field.key === true) {
                            _ts.p.keyName = f[j];
                            _ts.p.keyIndex = j;
                        }
                        j++;
                    }
                }
                return f;
            }

            function addCell(rowId, cell, pos, irow, srvr, data, tr) {
                var v, v_, prp = '', rdata = data.name, rowtype = data.rowtype, rowhide = data.hidden;

                // formatter前 转义标签
                if ((!rowtype && rowtype == undefined)) {
                    cell = typeof cell == 'string' ? HTMLEncode(cell) : cell;
                }

                v_ = formatter(rowId, cell, pos, srvr, 'add');
                //prp = formatCol(pos, irow, v, srvr, rowId, rdata);

                rowtype = v_.rowtype;
                v = v_.val;

                prp += data.algin ? 'text-align: center;' : '';
                prp += rowhide ? 'display:none;' : '';
                //if (rowtype && $(rowtype).length && Object.prototype.toString.call(v) == '[object Object]') {
                //此处：如果按以上写法可使数据类型为 obj类型 或 其他类型 时兼容显示，待优化单元素渲染后可改为以上写法，或可考虑是否需要此写法！
                if (rowtype != undefined) {
                    data.rowtype = rowtype;
                    var rowDom = $(rowtype).clone().show();
                    rowDom.prop('id', rowDom.prop('id') + '_' + rowId);
                    if (!$.isEmptyObject(v)) rowDom.JSONToform(v);
                    if ($(rowtype).hasClass('ztree')) {
                        var $_ts = $(_ts);
                        rowDom.prop('id', $_ts.prop('id') + '_' + rowDom.prop('id'));
                        setTimeout(function () {
                            var tree = $($_ts).find('#' + rowDom.prop('id'));
                            var zTreeObj = $.fn.zTree.init(tree, {
                                callback: {
                                    onCheck: function () {
                                        tree.trigger('input');
                                    }
                                },
                                check: {
                                    enable: true,
                                    chkboxType: {"Y": "s", "N": "ps"}
                                },
                            }, v);
                        }, 0);
                    }
                    return "<td role=\"gridcell\" row-describedby='" + rdata + "' style='" + prp + "'>" + (rowDom.prop('outerHTML') || '') + "</td>";
                } else {
                    // console.log(_ts.p.initEdit, rdata);
                    if (_ts.p.initEdit, rdata) {

                        return "<td role=\"gridcell\" row-describedby='" + rdata + "'  style='" + prp + "'>" + v + "</td>";
                    } else {

                        return "<td role=\"gridcell\" row-describedby='" + rdata + "'  style='" + prp + "'>" + v + "</td>";
                    }
                }
            }

            function HTMLEncode(html) {
                var temp = document.createElement("div");
                (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
                var output = temp.innerHTML;
                temp = null;
                return output;
            }

            function formatter(rowId, cellval, colpos, rwdat, _act) {
                var cm = _ts.p.colModel[colpos], v, v_;
                var rowtype = cm.rowtype;
                if (cm.formatter !== undefined) {
                    rowId = String(_ts.p.idPrefix) !== "" ? $.XYYGrid.stripPref(_ts.p.idPrefix, rowId) : rowId;

                    var opts = {rowId: rowId, colModel: cm, gid: _ts.p.id, pos: colpos, styleUI: _ts.p.styleUI};
                    if ($.isFunction(cm.formatter)) {
                        //返回对象中不能包含rowtype，否则会发生冲突
                        //cellval = cellval || rwdat;//0920邓涛，修复有rowtype时，第一个参数为空的bug
                        v = cm.formatter.call(_ts, cellval, cm.rowtype, rwdat, opts, _act);
                        if (v && v.rowtype != undefined) {
                            rowtype = v.rowtype;
                            v_ = v.rowdata || cellval;
                        } else {
                            rowtype = cm.rowtype;
                            v_ = v;
                        }
                    }

                } else {
                    v_ = cellVal(cellval);
                }
                return {val: v_, rowtype: rowtype};
            }

            function cellVal(val) {
                //return val == null || val === "" ? "&#160;" : (_ts.p.autoencode ? $.jgrid.htmlEncode(val) : String(val));
                //return val == null || val === "" ? "&#160;" : String(val);
                //return val == null || val === "" ? "&#160;" : Object.prototype.toString.call(val) == '[object Object]' ? val : String(val);
                //0623修复如val为空，返回"&#160;",引起错误的问题
                return val == null || val === "" ? "" : Object.prototype.toString.call(val) == '[object Object]' || Object.prototype.toString.call(val) == '[object Array]' ? val : String(val);
            }

            function ctPage($page) {
                var records = _ts.p.datasouce != 'local' ? _ts.p.records : _ts.p.data.length;
                var rowNum = _ts.p.rowNum <= 0 ? records : _ts.p.rowNum;//在 <=0 情况转为 总条数，方便以后计算总页数为1
                var lastPage = parseInt((records + Number(rowNum) - 1) / Number(rowNum));
                $page.find('#input_grid-pager').html(' &nbsp;跳至 <input type="number" value="' + _ts.p.page + '"> 页 &nbsp; &nbsp;共 ' + lastPage + ' 页');
                return lastPage;
            }

            function setPager(pgid) {
                //_ts.p.page = 2;
                var $page = $(_ts.p.pager);
                if (_ts.p.pager && $page.length > 0) {

                    var disabled,
                        sep = "<td class='ui-pg-button " + disabled + "'><span class='ui-separator'></span></td>",
                        pginp = '',
                        tp = '_grid-pager',
                        pgl = "<table class='ui-pg-table ui-common-table ui-paging-pager'><tbody><tr>",
                        str = "", pgcnt, lft, cent, rgt, twd, tdw, i,
                        clearVals = function (onpaging, thus) {
                            var ret;
                            ret = $(_ts).triggerHandler("jqGridPaging", [onpaging, thus]);
                            if (ret === 'stop') {
                                return false;
                            }
                            if ($.isFunction(_ts.p.onPaging)) {
                                ret = _ts.p.onPaging.call(_ts, onpaging, thus);
                            }
                            if (ret === 'stop') {
                                return false;
                            }
                            _ts.p.selrow = null;
                            if (_ts.p.multiselect) {
                                _ts.p.selarrrow = [];
                                //setHeadCheckBox(false);
                            }
                            _ts.p.savedRow = [];
                            return true;
                        };
                    pgid = pgid.substr(1);
                    //tp += "_" + pgid;
                    pgcnt = "pg_" + pgid;
                    lft = pgid + "_left";
                    cent = pgid + "_center";
                    rgt = pgid + "_right";
                    /* $("#" + $.XYYGrid.jqID(pgid)).append("<div id='" + pgcnt + "' class='ui-pager-control' role='group'><table " + getstyle(stylemodule, 'pagerTable', false, 'ui-pg-table ui-common-table ui-pager-table') + "><tbody><tr><td id='" + lft + "' align='left'></td><td id='" + cent + "' align='center' style='white-space:pre;'></td><td id='" + rgt + "' align='right'></td></tr></tbody></table></div>").attr("dir", "ltr");*/

                    $("#" + $.XYYGrid.jqID(pgid)).append("<div id='" + pgcnt + "' class='ui-pager-control' role='group'><table><tbody><tr><td id='" + lft + "' align='left'></td><td id='" + cent + "' align='center' style='white-space:pre;'></td><td id='" + rgt + "' align='right'></td></tr></tbody></table></div>").attr("dir", "ltr");


                    //pginp= "<td id='input"+tp+"' dir='"+dir+"'>"+$.XYYGrid.template( $.XYYGrid.getRegional(_ts, "defaults.pgtext", _ts.p.pgtext) || "Page {0} of {1}","<input class='ui-pg-input' type='text' size='2' maxlength='7' value='0' role='textbox'/>","<span id='sp_1_"+$.XYYGrid.jqID(pgid)+"'></span>")+"</td>";

                    pginp = "<td id='input" + tp + "' dir='" + dir + "'>跳至 {0} 页 共 {1} 页</td>";


                    //var po=["first"+tp,"prev"+tp, "next"+tp,"last"+tp], btc=getstyle(stylemodule, 'pgButtonBox', true, 'ui-pg-button'),
                    var po = ["first" + tp, "prev" + tp, "next" + tp, "last" + tp, "select" + tp], btc = '',
                        pot = [($.XYYGrid.getRegional(_ts, "defaults.pgfirst", _ts.p.pgfirst) || ""),
                            ($.XYYGrid.getRegional(_ts, "defaults.pgprev", _ts.p.pgprev) || ""),
                            ($.XYYGrid.getRegional(_ts, "defaults.pgnext", _ts.p.pgnext) || ""),
                            ($.XYYGrid.getRegional(_ts, "defaults.pglast", _ts.p.pglast) || ""),
                            ($.XYYGrid.getRegional(_ts, "defaults.pgSelect", _ts.p.pgSelect) || "")];

                    /*pgl += "<td id='"+po[0]+"' class='"+btc+"' title='"+ pot[0] +"'" + "><span " + getstyle(stylemodule, 'icon_first', false, iconbase)+"></span></td>";
                    pgl += "<td id='"+po[1]+"' class='"+btc+"'  title='"+ pot[1] +"'" +"><span " + getstyle(stylemodule, 'icon_prev', false, iconbase)+"></span></td>";
                    pgl += pginp !== "" ? sep+pginp+sep:"";
                    pgl += "<td id='"+po[2]+"' class='"+btc+"' title='"+ pot[2] +"'" +"><span " + getstyle(stylemodule, 'icon_next',false, iconbase)+"></span></td>";
                    pgl += "<td id='"+po[3]+"' class='"+btc+"' title='"+ pot[3] +"'" +"><span " + getstyle(stylemodule, 'icon_end',false, iconbase)+"></span></td>";*/

                    var fristPageClass = _ts.p.page <= 1 ? ' ui-pager-disable ' : '';
                    var lastPageClass = _ts.p.page >= ctPage($page) ? ' ui-pager-disable ' : '';
                    pgl += "<td id='" + po[0] + "' class='" + btc + " ' title='" + pot[0] + "'" + "><span class='" + fristPageClass + "'>第一页</span></td>";
                    pgl += "<td id='" + po[1] + "' class='" + btc + "'  title='" + pot[1] + "'" + "><span class='" + fristPageClass + "'>上一页</span></td>";
                    pgl += pginp;
                    pgl += "<td id='" + po[2] + "' class='" + btc + "' title='" + pot[2] + "'" + "><span class='" + lastPageClass + "'>下一页</span></td>";
                    pgl += "<td id='" + po[3] + "' class='" + btc + "' title='" + pot[3] + "'" + "><span class='" + lastPageClass + "'>尾页</span></td>";

                    if (_ts.p.rowList && _ts.p.rowList.length) {
                        pgl += "<td id='" + po[4] + "' class='" + btc + "' title='" + pot[4] + "'" + ">";
                        pgl += "<select>";
                        $.each(_ts.p.rowList, function (i, v) {
                            if (v == _ts.p.rowNum) {
                                pgl += "<option selected value='" + v + "'>" + v + "</option>";
                            } else {
                                pgl += "<option value='" + v + "'>" + v + "</option>";
                            }

                        })
                        pgl += "</select>";
                        pgl += "</td>";
                    }


                    $("td#" + pgid + "_" + _ts.p.pagerpos, "#" + pgcnt).html(pgl);
                    ctPage($page);

                    $("#" + $.XYYGrid.jqID(pgid)).off('input', '#select_grid-pager').on('input', '#select_grid-pager', function (e) {
                        $(_ts).setGridParam({rowNum: $(this).find('select').val()}).trigger('reloadGrid');

                    })

                    $page.find('#input_grid-pager input').on('keydown', function (e) {
                        if (e.keyCode == 13) {
                            var lastPage = ctPage($page);
                            _ts.p.page = $.isNumeric(this.value) ? this.value < 1 ? 1 : this.value > lastPage ? lastPage : this.value : 1;
                            before();
                        }
                    })

                    $page.find('#first_grid-pager,#prev_grid-pager,#next_grid-pager,#last_grid-pager').on('click', function () {
                        var lastPage = ctPage($page);
                        var $this = $(this);
                        var $this_ = $this.prop('id').split('_');
                        if ($this_[0] == 'first') {
                            _ts.p.page = 1;
                        }
                        if ($this_[0] == 'prev') {
                            _ts.p.page <= 1 ? 1 : _ts.p.page--;
                        }
                        if ($this_[0] == 'next') {
                            _ts.p.page >= lastPage ? lastPage : _ts.p.page++;
                        }
                        if ($this_[0] == 'last') {
                            _ts.p.page = lastPage;
                        }

                        $page.find('#input_grid-pager').html(' &nbsp;跳至 <input type="number" value="' + _ts.p.page + '"> 页 &nbsp; &nbsp;共 ' + lastPage + ' 页');

                        before();

                    });


                }
            }

            function refreshIndex() {
                //在请求网络url时，暂时禁止执行下方法
                if (!_ts.p.data) return false;
                var datalen = _ts.p.data.length, idname, i, val;

                if (_ts.p.keyName === false || _ts.p.loadonce === true) {
                    idname = _ts.p.localReader.id;
                } else {
                    idname = _ts.p.keyName;
                }
                _ts.p._index = [];
                for (i = 0; i < datalen; i++) {
                    val = $.XYYGrid.getAccessor(_ts.p.data[i], idname);
                    if (val === undefined) {
                        val = String(i + 1);
                    }
                    _ts.p._index[val] = i;
                }
            }

            function updatepager() {
                setPager(_ts.p.pager);
            }

            grid.bDiv = document.createElement("div");
            before();
            setPager(_ts.p.pager);
            refreshIndex();

            if (_ts.p.altRows) {
                $(this).addClass('stripedTable');
            }

            _ts.refreshIndex = refreshIndex;
            _ts.updatepager = updatepager;
            _ts.addCell = addCell;
            _ts.addJSONData = addJSONData;
            _ts.HTMLEncode = HTMLEncode;

            this.grid = grid;
            /*事件*/
            var td, tr, ri, ci, trRow;
            //待优化 tr操作选择器
            $(_ts).delegate('th#grid_checked input[type=checkbox]', {
                'input': function (e) {
                    var $this = $(this), $ts_td_ck = $(_ts).find('td[row-describedby=ck] input[type=checkbox]');

                    $this.prop('checked') ? $ts_td_ck.prop('checked', true) : $ts_td_ck.prop('checked', false);


                    //  $this.attr('checked') ? $ts_td_ck.prop('checked', "checked") : $ts_td_ck.attr('checked', "unchecked");

                    $ts_td_ck.trigger('input');
                },
            });

            $(_ts).delegate('td[row-describedby=ck] input[type=checkbox]', {
                'input': function (e) {
                    var $this = $(this), $ts_th_ck = $(_ts).find('th#grid_checked input[type=checkbox]');
                    tr = $this.closest('tr');
                    if (tr.attr('noSele')) return; //如果为不可选择行，则直接return

                    tr.find('td[row-describedby=ck] input[type=checkbox]').prop('checked', $this.prop('checked'));

                    $this.prop('checked') ? tr.addClass('selRow').attr('clickSelRow', true) : tr.removeClass('selRow').removeAttr('clickSelRow');
                    if (!$this.prop('checked')) {
                        $ts_th_ck.prop('checked', false);
                    }

                    if (!$(_ts).find('td[row-describedby=ck] input').not(':checked').length) {
                        $(_ts).find('th#grid_checked input').prop('checked', 'checked');
                    }
                },
                'click': function (e) {
                    e.stopPropagation();
                }
            });
            $(_ts).delegate('td[role="gridcell"]', {
                'mouseenter': function (e) {
                    var td = $(e.target).closest('td[row-describedby]'), tr = $(td).closest('tr');

                    $.each(_ts.p.colModel, function (i, v) {
                        if (v.name == td.attr('row-describedby') && $.isFunction(v.colMouseenter)) {
                            var cbobj = {
                                rowData: $(_ts).getRowData(tr[0].id),
                                e: e,
                                colModel: v,
                                index: i
                            };
                            v.colMouseenter.call(_ts, cbobj);
                        }
                    })
                },
                'mouseout': function (e) {
                    var td = $(e.target).closest('td[row-describedby]'), tr = $(td).closest('tr');

                    $.each(_ts.p.colModel, function (i, v) {
                        if (v.name == td.attr('row-describedby') && $.isFunction(v.colMouseout)) {
                            var cbobj = {
                                rowData: $(_ts).getRowData(tr[0].id),
                                e: e,
                                colModel: v,
                                index: i
                            };
                            v.colMouseout.call(_ts, cbobj);
                        }
                    })
                },
            });

            $(_ts).before('').on({
                'input': function (e) {
                    var td = $(e.target).closest('td[row-describedby]'), tr = $(td).closest('tr');

                    if (tr.attr('noSele')) return; //如果为不可选择行，则直接return

                    $.each(_ts.p.colModel, function (i, v) {
                        if (v.name == td.attr('row-describedby') && $.isFunction(v.rowEvent)) {
                            var cbobj = {
                                rowData: $(_ts).getRowData(tr[0].id),
                                e: e,
                                colModel: v,
                                index: i
                            };
                            v.rowEvent.call(_ts, cbobj);
                        }
                    })
                    if ($.isFunction(this.p.allEvent)) {
                        this.p.allEvent.call(_ts);
                    }
                },
                'click': function (e) {
                    td = e.target;
                    tr = $(td).closest('tr');
                    if (!tr.length) return;
                    if (tr.attr('noSele')) return; //如果为不可选择行，则直接return
                    ri = tr[0].id;
                    if (!ri) return;
                    ci = $.XYYGrid.getCellIndex(td);
                    var dbcr = $(_ts).triggerHandler("jqGridDblClickRow", [$(tr).attr("id"), ri, ci, e]);

                    if (tr.hasClass('selRow')) {
                        tr.removeClass('selRow').removeAttr('clickSelRow');
                        tr.find('td[row-describedby=ck] input').prop('checked', false);
                    } else {
                        //选中事件
                        tr.addClass('selRow').attr('clickSelRow', true);
                        //非多选情况，取消其他tr的选择状态
                        if (_ts.p.multiselect || _ts.p.selectandorder) {
                            tr.find('td[row-describedby=ck] input').prop('checked', 'checked');
                            if (!$(_ts).find('td[row-describedby=ck] input').not(':checked').length) {
                                $(_ts).find('th.grid_checked input').prop('checked', 'checked');
                            }
                        } else {
                            tr.siblings().removeClass('selRow').removeAttr('clickSelRow');
                        }
                    }

                    if (!$(_ts).find('td[row-describedby=ck] input').not(':checked').length) {
                        $(_ts).find('th#grid_checked input').prop('checked', 'checked');
                    } else {
                        $(_ts).find('th#grid_checked input').prop('checked', false);
                    }


                    if ($.isFunction(_ts.p.onSelectRow)) {
                        dbcr = _ts.p.onSelectRow.call(_ts, ri, tr, $(_ts).getRowData(ri), ci, e);
                        if (dbcr != null) {
                            return dbcr;
                        }
                    }
                },
                'dblclick': function (e) {
                    td = e.target;
                    tr = $(td).closest('tr');
                    if (!tr.length) return;
                    ri = tr[0].id;
                    if (!ri) return;
                    ci = $.XYYGrid.getCellIndex(td);
                    var dbcr = $(_ts).triggerHandler("jqGridDblClickRow", [$(tr).attr("id"), ri, ci, e]);
                    if ($.isFunction(_ts.p.ondblClickRow)) {
                        dbcr = _ts.p.ondblClickRow.call(_ts, ri, tr, $(_ts).getRowData(ri), ci, e);
                        if (dbcr != null) {
                            return dbcr;
                        }
                    }

                },
                'mouseover': function (e) {
                    td = e.target;
                    tr = $(td).closest('tr');
                    if (!tr.length) return;
                    ri = tr[0].id;
                    if (!ri) return;
                    ci = $.XYYGrid.getCellIndex(td);
                    tr.addClass('hoverRow');
                    tr.siblings().removeClass('hoverRow');
                },
                'mouseout': function (e) {
                    td = e.target;
                    tr = $(td).closest('tr');
                    if (!tr.length) return;
                    tr.removeClass('hoverRow');
                },
                'reloadGrid': function () {
                    //$(this).find('tr[id]').remove();
                    _ts.p.page = 1;
                    before();
                    setPager(_ts.p.pager);
                    refreshIndex();
                }
            });

        })
    }
    $.XYYGrid.extend({
        getGridRowById: function (rowid) {
            var row;
            this.each(function () {
                try {
                    //row = this.rows.namedItem( rowid );
                    var i = this.rows.length;
                    while (i--) {
                        if (rowid.toString() === this.rows[i].id) {
                            row = this.rows[i];
                            break;
                        }
                    }
                } catch (e) {
                    row = $(this.XYYGrid.bDiv).find("#" + $.XYYGrid.jqID(rowid));
                }
            });
            return row;
        },
        getSeleRow: function (rtype) {
            var success = false, nm, resAry = [], ind = this.find('tr[id][clickselrow]'), rowtype;
            this.each(function () {
                var $t = this, cnt;
                if (ind && ind.length > 0) {
                    success = ind;
                }
                //td[role="gridcell"]  剔除序号列，复选框列等，否则colModel 和 实际this对不上 ----需优化
                $(ind).each(function (c, o) {
                    var res = {};
                    $('td[role="gridcell"]', o).each(function (i, v) {
                        let cmodel = $t.p.colModel[i];
                        if (!cmodel) return;
                        nm = cmodel.name;
                        rowtype = cmodel.rowtype;
                        //id：如果colModel有，会覆盖掉，如果没有，取当前rowid
                        var ind_ = $(v).parent('tr[id]');
                        res.id = ind_.prop('id');
                        if (nm !== 'cb' && nm !== 'subgrid' && nm !== 'rn') {
                            if ($t.p.treeGrid === true && nm === $t.p.ExpandColumn) {
                                res[nm] = $.XYYGrid.htmlDecode($("span:first", this).html());
                            } else {
                                /*try {
                                    res[nm] = $.unformat.call($t, this, {
                                        rowId: ind.id,
                                        colModel: cmodel
                                    }, i);
                                } catch (e) {
                                    if (rowtype && $(rowtype).length) {
                                        if (!nm) return false;
                                        //res[nm] = $.isEmptyObject($(this).domToJSON()) ? $.XYYGrid.htmlDecode($(this).html()) : $(this).domToJSON();
                                        //以上写法由于 单个元素domToJSON返回字符串 判断错误，改写以下写法

                                        if ($(this).find('input,select,textarea,checkbox').length > 0) {
                                            res[nm] = $(this).domToJSON();
                                        } else {
                                            res[nm] = $.XYYGrid.htmlDecode($(this).html());
                                        }

                                    } else {
                                        //其它关联地方需替换
                                        if (cmodel.editable && $(ind).attr('editrow') == 'true') {
                                            res[nm] = $.XYYGrid.htmlDecode($(this).domToJSON()['']);
                                        } else {
                                            res[nm] = $.XYYGrid.htmlDecode($(this).html());
                                        }
                                    }
                                }*/

                                if (rowtype && $(rowtype).length) {
                                    if (!nm) return false;
                                    //res[nm] = $.isEmptyObject($(this).domToJSON()) ? $.XYYGrid.htmlDecode($(this).html()) : $(this).domToJSON();
                                    //以上写法由于 单个元素domToJSON返回字符串 判断错误，改写以下写法

                                    if ($(this).find('input,select,textarea,checkbox,button').length > 0) {
                                        res[nm] = $(this).domToJSON();
                                    } else if ($(this).find('.ztree').length > 0) {
                                        //如果包含ztree，可用其他判断优化
                                        var treeObj = $.fn.zTree.getZTreeObj($(this).find('.ztree').prop('id'));
                                        //res[nm] = treeObj.getNodes();
                                        res[nm] = treeObj.getCheckedNodes(true);
                                    }
                                    else {
                                        res[nm] = $.XYYGrid.htmlDecode($(this).html());
                                    }

                                } else {
                                    //其它关联地方需替换
                                    if (cmodel.editable && $(ind_).attr('editrow') == 'true') {
                                        //在编辑模式下，暂时不考虑 unformat
                                        res[nm] = $.XYYGrid.htmlDecode($(this).domToJSON());
                                    } else if (cmodel.unformat) {
                                        res[nm] = $.unformat.call($t, this, {
                                            rowId: ind_.id,
                                            colModel: cmodel
                                        }, i);
                                    } else {
                                        res[nm] = $.XYYGrid.htmlDecode($(this).html());
                                    }
                                }
                            }
                        }

                    });
                    resAry.push(res);
                })

            })

            return rtype == 'dom' ? success : resAry;
        },
        getRowData: function (rowid) {
            var res = {}, resall, getall = false, len, j = 0;

            this.each(function () {
                var $t = this, nm, ind, rowtype;
                if (rowid == null) {
                    getall = true;
                    resall = [];
                    len = $t.rows.length - 1;
                } else {
                    ind = $($t).XGrid('getGridRowById', rowid);
                    if (!ind) {
                        return res;
                    }
                    len = 1;
                }
                /*       if (!(usedata && usedata === true && $t.p.data.length > 0)) {
                           usedata = false;
                       }*/
                while (j < len) {
                    if (getall) {
                        ind = $t.rows[j + 1];  // ignore first not visible row
                    }
                    //预留 hasClass .Xgrow
                    /*if ($(ind).hasClass('Xgrow')) {
                    }
                    if (usedata) {
                        res = $t.p.data[$t.p._index[ind.id]];
                    } else {
                        //$('td[role="gridcell"]',ind).each( function(i) {

                    }*/
                    if (!$(ind).attr('noSele')) {//如果不为不可选中行
                        $('td[role="gridcell"]', ind).each(function (i) {
                            let cmodel = $t.p.colModel[i];
                            if (!cmodel) return;
                            nm = cmodel.name;
                            rowtype = cmodel.rowtype;
                            res.id = ind.id;
                            if (nm !== 'cb' && nm !== 'subgrid' && nm !== 'rn') {
                                if ($t.p.treeGrid === true && nm === $t.p.ExpandColumn) {
                                    res[nm] = $.XYYGrid.htmlDecode($("span:first", this).html());
                                } else {
                                    /*try {
                                        res[nm] = $.unformat.call($t, this, {
                                            rowId: ind.id,
                                            colModel: cmodel
                                        }, i);
                                    } catch (e) {
                                        if (rowtype && $(rowtype).length) {
                                            if (!nm) return false;
                                            //res[nm] = $.isEmptyObject($(this).domToJSON()) ? $.XYYGrid.htmlDecode($(this).html()) : $(this).domToJSON();
                                            //以上写法由于 单个元素domToJSON返回字符串 判断错误，改写以下写法

                                            if ($(this).find('input,select,textarea,checkbox').length > 0) {
                                                res[nm] = $(this).domToJSON();
                                            } else {
                                                res[nm] = $.XYYGrid.htmlDecode($(this).html());
                                            }

                                        } else {
                                            //其它关联地方需替换
                                            if (cmodel.editable && $(ind).attr('editrow') == 'true') {
                                                res[nm] = $.XYYGrid.htmlDecode($(this).domToJSON()['']);
                                            } else {
                                                res[nm] = $.XYYGrid.htmlDecode($(this).html());
                                            }
                                        }
                                    }*/

                                    if (rowtype && $(rowtype).length) {
                                        if (!nm) return false;
                                        //res[nm] = $.isEmptyObject($(this).domToJSON()) ? $.XYYGrid.htmlDecode($(this).html()) : $(this).domToJSON();
                                        //以上写法由于 单个元素domToJSON返回字符串 判断错误，改写以下写法

                                        if ($(this).find('input,select,textarea,checkbox,button').length > 0) {
                                            res[nm] = $(this).domToJSON();
                                        } else if ($(this).find('.ztree').length > 0) {
                                            var treeObj = $.fn.zTree.getZTreeObj($(this).find('.ztree').prop('id'));
                                            //res[nm] = treeObj.getNodes();
                                            res[nm] = treeObj != null ? treeObj.getCheckedNodes(true) : '';
                                        }
                                        else {
                                            res[nm] = $.XYYGrid.htmlDecode($(this).html());
                                        }

                                    } else {
                                        //其它关联地方需替换
                                        if (cmodel.editable && $(ind).attr('editrow') == 'true') {
                                            //在编辑模式下，暂时不考虑 unformat
                                            res[nm] = $.XYYGrid.htmlDecode($(this).domToJSON());
                                        } else if (cmodel.unformat) {
                                            res[nm] = $.unformat.call($t, this, {
                                                rowId: ind.id,
                                                colModel: cmodel
                                            }, i);
                                        } else {
                                            res[nm] = $.XYYGrid.htmlDecode($(this).html());
                                        }
                                    }
                                }
                            }
                        });

                        if (getall) {
                            resall.push(res);
                            res = {};
                        }
                    }


                    j++;
                }
            });
            return resall || res;
        },
        delRowData: function (rowid) {
            var success = false, rowInd, ia, nextRow;
            if (!rowid) return false;
            this.each(function () {
                var $t = this;
                rowInd = $($t).XGrid('getGridRowById', rowid);
                if (!rowInd) {
                    return false;
                }
                //预留 删除时subGrid处理
                if ($t.p.subGrid) {

                }

                $(rowInd).remove();
                //删除时更新序号及复选序号
                $($t).XGrid('reNumber');
                if ($t.p.datasouce === 'local') {
                    var id = $.XYYGrid.stripPref($t.p.idPrefix, rowid), pos;
                    if ($t.p._index) {
                        pos = $t.p._index[id];
                    }

                    if (pos !== undefined) {
                        $t.p.data.splice(pos, 1);
                        $t.refreshIndex();
                    }
                }


                success = true;
            })
            return success;
        },
        setRowData: function (rowid, data) {
            var nm, success = false, title;
            this.each(function () {
                if (!this.grid) {
                    return false;
                }
                var t = this, vl, ind, cp = typeof cssp, lcdata = {};
                ind = $(this).XGrid('getGridRowById', rowid);
                if (data && ind) {
                    $(ind).attr('id', data[t.p.key]);
                    try {
                        $(this.p.colModel).each(function (i, v) {

                            nm = this.name;
                            var dval = $.XYYGrid.getAccessor(data, nm);
                            if (dval !== undefined) {
                                lcdata[nm] = this.formatter && typeof this.formatter === 'string' && this.formatter === 'date' ? $.unformat.date.call(t, dval, this) : dval;
                                vl = this.formatter && $.isFunction(this.formatter) ? this.formatter(dval, this.rowtype, data) : dval;//2018-7-28 16:49:51 于超群修改
                                title = this.title ? {"title": $.XYYGrid.stripHtml(vl)} : {};
                                if (t.p.treeGrid === true && nm === t.p.ExpandColumn) {
                                    $("td[role='gridcell']:eq(" + i + ") > span:first", ind).html(vl).attr(title);
                                } else if ($("td[role='gridcell']:eq(" + i + ")", ind).find('.ztree').length) {
                                    var treeID = $("td[role='gridcell']:eq(" + i + ")", ind).find('.ztree').prop('id');
                                    var tree = $('#' + treeID);
                                    var zTreeObj = $.fn.zTree.init(tree, {
                                        callback: {
                                            onCheck: function () {
                                                tree.trigger('input');
                                            }
                                        },
                                        check: {
                                            enable: true,
                                            chkboxType: {"Y": "s", "N": "ps"}
                                        },
                                    }, dval);
                                    tree.trigger('input');
                                } else {
                                    //$("td[role='gridcell']:eq(" + i + ")", ind).html(vl).attr(title);
                                    $("td[role='gridcell'][row-describedby='" + nm + "']", ind).html($(t.addCell(rowid, dval, i, i, data, v)).html());
                                }
                            }
                        });
                        if (t.p.datatype === 'local') {
                            var id = $.jgrid.stripPref(t.p.idPrefix, rowid),
                                pos = t.p._index[id], key;
                            if (t.p.treeGrid) {
                                for (key in t.p.treeReader) {
                                    if (t.p.treeReader.hasOwnProperty(key)) {
                                        delete lcdata[t.p.treeReader[key]];
                                    }
                                }
                            }
                            if (pos !== undefined) {
                                t.p.data[pos] = $.extend(true, t.p.data[pos], lcdata);
                            }
                            lcdata = null;
                        }
                        success = true;
                    } catch (e) {
                        success = false;
                    }
                }
            })
            return success;
        },
        addRowData: function (rdata, pos, src) {
            if ($.inArray(pos, ["first", "last", "before", "after"]) === -1) {
                pos = "last";
            }
            var success = false, nm, row = [], rnc = "", msc = "", gi, si, ni, sind, i, v, prp = "", aradd, cnm, data,
                cm, rowid,
                id, air;
            if (!rdata) return success;
            if ($.isArray(rdata)) {
                aradd = true;
                //pos = "last";
                cnm = rowid;
            } else {
                rdata = [rdata];
                aradd = false;
            }
            this.each(function () {
                var t = this, datalen = rdata.length, k = 0, classes = '', lcdata = {};
                //判断

                data = rdata[0];
                if (!data[t.p.key] || data[t.p.key] == '') {
                    //改变提示方式  2018.8.30 20.56 zhoumingzhe
                    /* utils.dialog({
                        content: '没有找到数据key',
                        timeout: 2000

                    }).showModal(); */
                    console.log('没有找到数据key');
                    return success;
                }

                if (!aradd) {
                    if (rowid !== undefined) {
                        rowid = String(rowid);
                    }
                    else {
                        rowid = $.XYYGrid.randId();
                        if (t.p.keyName !== false) {
                            cnm = t.p.keyName;
                            if (rdata[0][cnm] !== undefined) {
                                rowid = rdata[0][cnm];
                            }
                        }
                    }
                }

                row.push('<tr id="');
                row.push(rdata[0][t.p.key]);
                row.push('">');

                //是否可多选
                if (t.p.multiselect) {
                    row.push('<td style="text-align: center;" row-describedby="ck"><input type="checkbox"></td>');
                }
                //是否显示序号
                if (t.p.rownumbers) {
                    row.push('<td row-describedby="rn" style="text-align: center;">');
                    //row.push((t.p.page * t.p.rowNum - t.p.rowNum) + 1);
                    row.push(t.rows.length);
                    row.push('</td>');
                }
                //是否显示序号多选
                if (t.p.selectandorder) {
                    row.push('<td style="text-align: center;" row-describedby="ck" row-describedby_="rn_ck" ><input type="checkbox">');
                    row.push(t.rows.length);
                    row.push('</td>');
                }

                for (i = 0; i < t.p.colModel.length; i++) {
                    cm = t.p.colModel[i];
                    nm = cm.name;
                    lcdata[nm] = data[nm];

                    v = $.XYYGrid.getAccessor(data, nm);

                    prp = '';

                    //row[row.length] = "<td row-describedby=" + cm.name + " role=\"gridcell\" " + prp + ">" + (v || '') + "</td>";
                    //console.log(t.addCell(data[t.p.key], v, i, i, data,cm));
                    //6.23替换为以下写法
                    row[row.length] = t.addCell(data[t.p.key], v, i, i, data, cm);

                }
                //row.unshift( t.constructTr(rowid, false, classes, lcdata, data ) );


                row[row.length] = "</tr>";

                if (t.rows.length === 1) {
                    //$("table:first", t.grid.bDiv).append(row.join(''));
                    $(this).append(row.join(''));
                } else {
                    switch (pos) {
                        case 'last':
                            $(t.rows[t.rows.length - 1]).after(row.join(''));
                            sind = t.rows.length - 1;
                            break;
                        case 'first':
                            $(t.rows[0]).after(row.join(''));
                            sind = 1;
                            break;
                        case 'after':
                            sind = $(t).XGrid('getGridRowById', src);
                            if (sind) {
                                if ($(t.rows[sind.rowIndex + 1]).hasClass("ui-subgrid")) {
                                    $(t.rows[sind.rowIndex + 1]).after(row);
                                }
                                else {
                                    $(sind).after(row.join(''));
                                }
                                sind = sind.rowIndex + 1;
                            }
                            break;
                        case 'before':
                            sind = $(t).XGrid('getGridRowById', src);
                            if (sind) {
                                $(sind).before(row.join(''));
                                sind = sind.rowIndex - 1;
                            }
                            break;
                    }
                }

                //删除时更新序号及复选序号
                $(t).XGrid('reNumber');
                air = $.isFunction(t.p.afterInsertRow);
                while (k < datalen) {
                    if (air) {
                        t.p.afterInsertRow.call(t, rowid, data, data);
                    }
                    k++;
                }
            })

            return success;
        },
        clearGridData: function (clearfooter) {
            return this.each(function () {
                var $t = this;
                if (!$t.grid) {
                    return;
                }
                if (typeof clearfooter !== 'boolean') {
                    clearfooter = false;
                }
                $(this).find('tr[id]').remove();
                $t.p.selrow = null;
                $t.p.selarrrow = [];
                $t.p.savedRow = [];
                $t.p.records = 0;
                $t.p.page = 1;
                $t.p.lastpage = 0;
                $t.p.reccount = 0;
                $t.p.data = [];
                $t.p._index = {};
                $t.updatepager(true, false);
            });
        },
        setGridParam: function (newParams, overwrite) {
            return this.each(function () {
                var $t = $(this);
                if (overwrite == null) {
                    overwrite = false;
                }
                if (this.grid && typeof newParams === 'object') {
                    var cmodel = {};
                    if (overwrite === true) {
                        var params = $.extend({}, this.p, newParams);
                        this.p = params;
                    } else {
                        if (newParams.colModel) {
                            $.map(newParams.colModel, function (i, v) {
                                cmodel[i.name] = i;
                            });
                            $.each(this.p.colModel, function (i, v) {
                                newParams['colModel'][i] = $.extend(v, cmodel[v.name]);
                            });
                        }

                        $.extend(true, this.p, newParams);
                    }
                    if (newParams.colModel) {
                        $.each(newParams.colModel, function (i, v) {
                            //隐藏展示列
                            if (v.name && v.hidden != undefined) {
                                v.hidden == false ? $t.find('th[grid_th_' + v.name + '],td[row-describedby="' + v.name + '"]').show() : $t.find('th[grid_th_' + v.name + '],td[row-describedby="' + v.name + '"]').hide();
                            }
                        })
                    }
                }
            });
        },
        getGridParam: function (name, module) {
            var $t = this[0], ret;
            if (!$t || !$t.grid) {
                return;
            }
            if (module === undefined && typeof module !== 'string') {
                module = 'jqGrid'; //$t.p
            }
            ret = $t.p;
            if (module !== 'jqGrid') {
                try {
                    ret = $($t).data(module);
                } catch (e) {
                    ret = $t.p;
                }
            }
            if (!name) {
                return ret;
            }
            return ret[name] !== undefined ? ret[name] : null;
        },
        editRow: function (rowid) {
            var success = false, rowInd, rowDom, rowDVal;
            if (!rowid) return false;
            this.each(function () {
                var $t = this;
                rowInd = $($t).XGrid('getGridRowById', rowid);
                if (!rowInd || $(rowInd).attr('editRow') == 'true') {
                    return false;
                }
                $(this.p.colModel).each(function () {
                    if (!this.editable) return;
                    rowDom = $(rowInd).find('td[row-describedby=' + this.name + ']');
                    if (rowDom && rowDom.length && this.editable) {
                        //预留多类型，需要set字典
                        rowDVal = rowDom.text();
                        rowDom.html('<input class="form-control" type="text" value="' + rowDVal + '">');
                        $(rowInd).attr('editRow', true);
                    }
                });
                success = true;
            })
            return success;
        },
        saveRow: function (rowid) {
            var success = false, rowInd, rowDom, rowDVal;
            if (!rowid) return false;
            this.each(function () {
                var $t = this;
                rowInd = $($t).XGrid('getGridRowById', rowid);
                if (!rowInd || $(rowInd).attr('editRow') != 'true') {
                    return false;
                }
                $(rowInd).removeAttr('editRow');
                $(this.p.colModel).each(function () {
                    if (!this.editable) return;
                    rowDom = $(rowInd).find('td[row-describedby=' + this.name + ']');
                    if (rowDom && rowDom.length && this.editable) {
                        //预留多类型，需要set字典
                        rowDVal = rowDom.text();
                        rowDom.html($t.HTMLEncode(rowDom.find('input').val()));
                    }
                });
                success = true;
            })
            return success;
        },
        getTableHead: function () {
            var ary = [];
            this.each(function () {
                var $t = this;
                $($t.p.colModel).each(function (i, v) {
                    if (v.hidegrid == undefined || v.hidegrid == false) {
                        ary.push({m: v.name, n: $t.p.colNames[i], hidden: v.hidden ? true : false});
                    }
                });

            })

            return ary;
        },
        filterTableHead: function () {
            var $t = this;
            var ary = $t.XGrid('getTableHead'), s = [];

            s.push('<div id="setCol" style="padding-left: 2.4rem"><div class="row" id="checkRow">');
            for (var i = 0; i < ary.length; i++) {
                s.push('<div class="col-md-3" ><div class="checkbox"><label><input style="margin-right: 5px"');
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
                title: '筛选列',
                width: 666,
                cancelValue: '取消',
                cancel: true,
                okValue: '确定',
                ok: function () {
                    var newColModel = [];
                    $(this.node).find('#checkRow input[type="checkbox"]').each(function (index) {
                        newColModel.push({name: $(this).attr('name'), hidden: !$(this).prop("checked")});
                    });
                    //重新设置colModel展示项
                    $t.setGridParam({
                        colModel: newColModel
                    });

                    $t.each(function () {
                        if (this.p.colModelOnline) {
                            utils.ajax({
                                url: this.p.colModelOnlineSave,
                                type: 'post',
                                data: {
                                    gridId: $t.prop('id'),
                                    pageUrl: window.location.pathname,
                                    fields: JSON.stringify(newColModel),
                                },
                                success: function () {
                                    console.log('筛选列缓存成功！');
                                },
                                error: function (e) {
                                    utils.dialog({
                                        content: '筛选列缓存失败！'
                                    })
                                }
                            });
                        }
                    });

                },
            }).showModal();

        },
        reNumber: function () {
            //更新序号
            return this.each(function () {
                $.each(this.rows, function (i, v) {
                    if (v.id && v.id != '') {
                        $(v).find('td[row-describedby="rn"]').html(i);
                        if ($(v).find('td[row-describedby_="rn_ck"] input[type="checkbox"]').prop('checked')) {
                            $(v).find('td[row-describedby_="rn_ck"]').html('<input type="checkbox" checked="checked">' + i);
                        } else {
                            $(v).find('td[row-describedby_="rn_ck"]').html('<input type="checkbox">' + i);
                        }

                    }
                })
            })
        }
    });
    $.unformat = function (cellval, options, pos, cnt) {

        var ret, unformatFunc = options.colModel.unformat;
        if (options.colModel && $.isFunction(unformatFunc)) {
            ret = unformatFunc.call(this, $(cellval).text(), options, cellval);
        }

        return ret !== undefined ? ret : cnt === true ? $(cellval).text() : $.XYYGrid.htmlDecode($(cellval).html());

    };
}));

/**
 * BUG
 * 范围:colModel中name不可重复，否则和筛选时列会按同一个字段处理
 * 原因：无法准确定位重复name
 */


/**
 * 需优化，预留
 *
 * 优化 delrowData 不传参，返回true的问题
 * 优化 需要将行的 新建，取值 统一操作 做model标准    范围:所有对行的操作
 * 优化 入参，回调参数等，可将多个参数 优化为JSON对象
 * 优化 制作组件交互逻辑走向图
 * 优化 可将需要存在表格中的数据，可考虑 亮哥提出的 $.data 方案
 *
 *
 * 需新增功能
 *
 * 新增 固定表头及附加行，设定数据行宽度，超出滚动条
 * 新增 rowNum 不分页，显示所有数据，目前设置负数不管用                       -- 已优化 0917
 * 新增 设置控件默认数据，而不设置选中数据
 * 新增 设置初始化默认选中行，或者不可选中行，参数可为考虑 []或ID
 * 新增 Url返回参数设定,应对后端数据格式不统一的问题
 * 新增 拖动行功能
 * 新增  禁用行，XGrid新增排序，支持正序倒序，XGrid表头可拖动排序
 * 新增列表数据提升优先级，新增提升优先级函数
 *
 *
 * 页面基本会有快捷键，需增加全局捕获事件函数
 *
 *
 * tabs
 *      设置tabs页，页签名称
 *      新增tabs页关闭回传数据
 */

/**
 * log：
 * 0915:
 *      1.优化 getSeleRow 统一为数组
 *
 * 0917：
 *      1.优化 新增 设置rowNum <= 0 为不分页
 *      2.新增 td列的mouseenter等事件
 * 0921：
 *      3.修复 formatter 前后 rowtype不一致，获取数据为dom节点的问题
 *
 * */