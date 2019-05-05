/**
 * author:deng.tao
 * version:2.0
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
        try {
            factory(jQuery, utils);
        } catch (e) {
            factory(jQuery, {});
        }
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
        getHiddenWidth: function (el) {
            //获取隐藏元素的宽度
            var dm = el.clone();
            $(dm).css({
                position: "absolute",
                left: "0",
                top: "-999px"
            });
            $('body').after(dm);

            return dm.width() + 24;
        },
        reWidth: function (ts, tb, data) {
            $(ts).css({'width': $(tb).find('.XGridHead>table').outerWidth() + 'px', 'min-height': '1px'});
        }
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

            var p = $.extend({
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

                height: 'auto',
                maxheight: 'autoHeight',

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

            var _tsID = $(_ts).prop('id');

            //创建外层dom，将this插入其中

            var theight, maxheight = '';
            if (typeof p.height == 'number')
                theight = p.height + 'px'
            else {
                theight = p.height
            }

            if (p.maxheight && typeof p.maxheight == 'number') {
                maxheight = 'max-height:' + p.maxheight + 'px'
            } else if ((p.maxheight && $('.XGridBody').length < 1) || p.maxheight == 'auto') {
                //如果不设置maxheight || XGrid数量大于1，则不设置计算maxheight高度
                maxheight = 'max-height:' + (window.innerHeight - _ts.offsetTop - 110) + 'px'
            }


            var _tb = $(this).closest('.tableBlock');
            if (_tb.length <= 0) {
                _tb = $('<div class="tableBlock" style="overflow-x: hidden;height:100%;display:flex;flex-direction:column;"><div class="XGridBody" style="height:' + theight + ';' + maxheight + ';overflow: auto; flex:1;"></div></div>');
                $(_tb).insertBefore(this);
                $(this).appendTo($(_tb).find('.XGridBody'));
            }


            /*$(_ts).after('<div class="tableBlock"><div class="XGridBody" style="height: ' + p.height + 'px;overflow: auto;"><table id="' + _tsID + '"></table></div></div>');
            _ts.remove();

            _ts = document.querySelector('#' + _tsID);

             var _tb = $(_ts).closest('.tableBlock');
            */

            _ts.p = p;

            function before() {
                var data;
                if (_ts.p.colModelOnline) {
                    $.ajax({
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
                        //addTableHead();
                        addJSONData(data);
                        break;
                    case "json":
                    case "jsonp":
                        //type=01&_search=false&nd=1529129927860&rows=20&page=1&sidx=&sord=asc
                        var ajaxPar = {
                            pageNum: _ts.p.page,
                            pageSize: _ts.p.rowNum,
                            sortname: '',
                            sorttype: ''
                        }

                        if (_ts.p.sortorder) {
                            ajaxPar.sort = _ts.p.sortorder;
                        }

                        var ajaxParm = {
                            url: _ts.p.url,
                            type: _ts.p.mtype,
                            data: $.extend(ajaxPar, _ts.p.postData),
                            success: function (dt) {
                                if (dt && dt.result) {
                                    _ts.p.page = dt.result.pageNum;
                                    _ts.p.records = dt.result.total;
                                    _ts.p.data = dt.result.list;
                                    //addTableHead();
                                    addJSONData(dt.result);
                                }
                            }
                        }

                        $.ajax(ajaxParm);
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


                while (i < len) {
                    cur = rows[i];

                    var isKey = _ts.p.key == 'autoKey' && !cur[_ts.p.key] ? (Math.random().toString().slice(2, 14)) : cur[_ts.p.key];

                    var noSeleCKStr = '<input type="checkbox">', noSele = false;//标记此行是否禁止选择
                    if ($.isArray(_ts.p.disableRow)) {
                        _ts.p.disableRow.some(function (id) {
                            if (id == isKey) {
                                noSele = true;
                            }
                        });
                    }

                    rowData.push('<tr id="');
                    rowData.push(isKey);
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
                        rowData.push('<td style="text-align: center; width: 80px !important;" row-describedby="ck">');
                        rowData.push(noSeleCKStr);
                        rowData.push('</td>');
                    }

                    //是否显示序号
                    if (_ts.p.rownumbers) {
                        rowData.push('<td row-describedby="rn" style="text-align: center; width: 80px">');
                        rowData.push((_ts.p.page * _ts.p.rowNum - _ts.p.rowNum) + i + 1);
                        rowData.push('</td>');
                    }

                    var tti = (_ts.p.page * _ts.p.rowNum - _ts.p.rowNum) + i + 1;
                    //序号+多选
                    if (_ts.p.selectandorder) {
                        rowData.push('<td style="width: 80px;" id="grid_checked_' + tti + '" atrs= ' + tti + '  " row-describedby="ck"  row-describedby_="rn_ck">');
                        rowData.push(noSeleCKStr);

                        if (!noSele) rowData.push((_ts.p.page * _ts.p.rowNum - _ts.p.rowNum) + i + 1);

                        rowData.push('</td>');
                    }


                    idn = _ts.p.keyIndex;
                    idr = $.XYYGrid.getAccessor(cur, idn);

                    for (j = 0; j < objectReader.length; j++) {
                        v = $.XYYGrid.getAccessor(cur, objectReader[j]);
                        rd[_ts.p.colModel[j].name] = v;

                        rowData.push(addCell(isKey, v, j, i, cur, _ts.p.colModel[j], tableTr));
                    }

                    i++;
                    rowData.push('</tr>');
                }
                tableTr.remove();
                tablebody.append(rowData.join(''));

                /*if (data.list && data.list.length == 0) {
                    $(_ts).css({'width': $(_tb).find('.XGridHead>table').outerWidth() + 'px', 'min-height': '1px'});
                }*/

                $.XYYGrid.reWidth(_ts, _tb, data.list);
                //XGrid数据table初始化完后，初始化统一头部cell的宽度

                var name = $(v).attr('row-describedby');

                //在计算列宽时，如果隐藏则无法计算正确宽度，所以渲染时需判断做处理

                /*
                                if (tablebody.is(':visible')) {
                                    //展示的table
                                    tablebody.find('tr:nth-child(2) td').each(function (i, v) {
                                        /!*var $td = $(_tb).find('.XGridHead [row-describedby=' + $(v).attr('row-describedby') + ']');

                                        if ($td.length) {
                                            $td.css({'width': cellWidth + 'px'});
                                        } else {
                                            //$td 为0，指本td为XGrid自行生成列
                                        }*!/

                                        var w = $(_tb).find('.XGridHead th').eq(v.cellIndex).get(0).offsetWidth;
                                        var cellWidth = v.offsetWidth > w ? v.offsetWidth : w;

                                        //var cellWidth = v.offsetWidth;
                                        $(_tb).find('.XGridHead th').eq(v.cellIndex).css({'width': cellWidth + 'px'});//校正表头行宽度
                                        $(_ts).find('tr:first th').eq(v.cellIndex).css({'width': cellWidth + 'px'});//校正隐藏行宽度
                                        $(_ts).find('tr:nth-child(2) td').eq(v.cellIndex).css({'width': cellWidth + 'px'});//校正td宽度
                                    });
                                } else {
                                    //展隐藏的table

                                    //获取隐藏元素的宽度
                                    var Pwidth = tablebody.parents(':visible').eq(0).innerWidth();
                                    var dm = tablebody.parents('.tableBlock').clone();
                                    $(dm).css({
                                        position: "absolute",
                                        left: "0",
                                        top: "-9999px",
                                        width: Pwidth + 'px'
                                    });
                                    $(dm).prop('id', 'hiddenTable');
                                    $('body').after(dm);

                                    var tablebody_ = $(dm).find('.XGridBody table');

                                    tablebody_.find('tr:nth-child(2) td').each(function (i, v) {
                                        /!*var $td = $(_tb).find('.XGridHead [row-describedby=' + $(v).attr('row-describedby') + ']');

                                        if ($td.length) {
                                            $td.css({'width': cellWidth + 'px'});
                                        } else {
                                            //$td 为0，指本td为XGrid自行生成列
                                        }*!/


                                        var cellWidth = v.offsetWidth;

                                        //var cellWidth = v.offsetWidth;
                                        $(_tb).find('.XGridHead th').eq(v.cellIndex).css({'width': cellWidth + 'px'});//校正表头行宽度
                                        $(_ts).find('tr:first th').eq(v.cellIndex).css({'width': cellWidth + 'px'});//校正隐藏行宽度
                                        $(_ts).find('tr:nth-child(2) td').eq(v.cellIndex).css({'width': cellWidth + 'px'});//校正td宽度
                                    });

                                    //删除模拟用tableBlock
                                    $(dm).remove();

                                }
                */


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
                    // tbHeadAry      普通表头
                    // tbHeadAryMult   多重表头
                    // tbHeadAryHide    隐藏表头
                    var tbHeadAry = ['<div class="XGridHead" style="overflow-x: hidden"><table style="width:max-content;"><tr>'],
                        tbHeadAryMult = ['<table class="gridHeadMult" style="display: block;"><tr>'],
                        tbHeadAryHide = ['<tr style="height: 1px; display: none;">'];


                    //是否可多选
                    if (_ts.p.multiselect) {

                        tbHeadAry.push('<th id="grid_checked" style=" padding: 0 3px;text-align: center;width: 80px;"><input type="checkbox">');
                        if (typeof _ts.p.multiselect == 'string')
                            tbHeadAry.push(_ts.p.multiselect);
                        tbHeadAry.push('</th>');
                        tbHeadAryMult.push('<th id="grid_checked" style=" padding: 0 3px;text-align: center;"></th>');
                    }

                    //表头序号
                    if (_ts.p.rownumbers) {
                        tbHeadAry.push('<th style=" padding: 0 3px;text-align: center;width: 80px;">');
                        tbHeadAry.push(_ts.p.rownumbersname);
                        tbHeadAry.push('</th>');

                        tbHeadAryMult.push('<th style=" padding: 0 3px;text-align: center;">');
                        tbHeadAryMult.push(_ts.p.rownumbersname);
                        tbHeadAryMult.push('</th>');

                        tbHeadAryHide.push('<th style=" padding: 0 3px;text-align: center;"></th>');
                    }

                    //是否显示序号多选
                    if (_ts.p.selectandorder) {
                        tbHeadAry.push('<th id="grid_checked" style=" padding: 0 3px;text-align: center;width: 80px;"><input type="checkbox">');
                        tbHeadAry.push(_ts.p.rownumbersname);
                        tbHeadAry.push('</th>');

                        tbHeadAryMult.push('<th id="grid_checked" style=" padding: 0 3px;text-align: center;"></th>');

                        tbHeadAryHide.push('<th id="grid_checked" style=" padding: 0 3px;text-align: center;"></th>');
                    }


                    for (let i = 0; i < _ts.p.colNames.length; i++) {
                        tbHeadAry.push('<th  grid_th_');

                        tbHeadAry.push(_ts.p.colModel[i].name);

                        tbHeadAry.push(' row-describedby="');
                        tbHeadAry.push(_ts.p.colModel[i].name);
                        tbHeadAry.push('" ');
                        _ts.p.colModel[i].sortable && tbHeadAry.push('grid_sort="true" ');
                        tbHeadAry.push('style="');
                        // 添加cursor状态
                        _ts.p.colModel[i].sortable && tbHeadAry.push('cursor: pointer;');

                        tbHeadAry.push(_ts.p.colModel[i].hidden ? 'display:none;' : '');



                        if (_ts.p.colModel[i].width) {
                            tbHeadAry.push('width:');
                            tbHeadAry.push(_ts.p.colModel[i].width || 150);
                            tbHeadAry.push('px;');
                        }
                        tbHeadAry.push('" ');

                        tbHeadAry.push('>');

                        tbHeadAry.push(_ts.p.colNames[i]);

                        // 加入排序图标
                        if (_ts.p.colModel[i].sortable) {

                            tbHeadAry.push('<span class="layui-table-sort layui-inline">' +
                                '<i class="layui-edge layui-table-sort-asc" title="升序"></i>' +
                                '<i class="layui-edge layui-table-sort-desc" title="降序"></i>' +
                                '</span>');
                        }

                        tbHeadAry.push('</th>');

                        tbHeadAryMult.push('<th grid_th_');
                        tbHeadAryMult.push(_ts.p.colModel[i].name);
                        tbHeadAryMult.push(_ts.p.colModel[i].hidden ? ' style="display:none" ' : '');
                        tbHeadAryMult.push('>');

                        if (_ts.p.tbHeadAryMult && _ts.p.tbHeadAryMult.length) {
                            tbHeadAryMult.push(_ts.p.tbHeadAryMult[i]);
                        }

                        tbHeadAryMult.push('</th>');


                        tbHeadAryHide.push('<th grid_th_');
                        tbHeadAryHide.push(_ts.p.colModel[i].name);
                        tbHeadAryHide.push(_ts.p.colModel[i].hidden ? ' style="display:none" ' : '');
                        tbHeadAryHide.push('>');

                        if (_ts.p.tbHeadAryMult && _ts.p.tbHeadAryMult.length) {
                            tbHeadAryHide.push(_ts.p.tbHeadAryMult[i]);
                        }

                        tbHeadAryHide.push('</th>');
                    }
                    tbHeadAry.push('</tr></table>');

                    tbHeadAryMult.push('</tr></table></div>');

                    tbHeadAryHide.push('</tr>');

                    if ($(_tb).find('.XGridHead').length <= 0) {
                        $(_ts).parent('.XGridBody').before(tbHeadAry.join(''));//插入头部
                        $(_ts).append(tbHeadAryHide.join(''));//插入隐藏tr
                    }


                    //$(_ts).html(tbHeadAry.join(''));

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
                prp += data.width ? ('width:' + data.width + 'px') : '';
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
                    v = v || '';
                    var title = '';//邓涛0920增加，td title 配置功能
                    /*if (data.title == true) {

                    }
*/
                    title = HTMLDecode(v).replace(/\'/g, "&apos;").replace(/\"/g, "&quot;");

                    if (_ts.p.initEdit, rdata) {

                        return "<td role=\"gridcell\" row-describedby='" + rdata + "'  style='" + prp + "'  title='" + title + "'>" + v + "</td>";
                    } else {

                        return "<td role=\"gridcell\" row-describedby='" + rdata + "'  style='" + prp + "'  title='" + title + "'>" + v + "</td>";
                    }
                }
            }

            function HTMLDecode(text) {
                var temp = document.createElement("div");
                temp.innerHTML = text;
                var output = temp.innerText || temp.textContent;
                temp = null;
                return output;
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
                //dt 1115更改回车跳转页数展示不正确的问题
                if ($page.find('#input_grid-pager input[type="number"]').length) {
                    $page.find('#input_grid-pager').html(' &nbsp;跳至 <input type="number" value="' + $page.find('#input_grid-pager input[type="number"]').val() + '"> 页 &nbsp; &nbsp;共 ' + lastPage + ' 页 / ' + records + '条');
                } else {
                    $page.find('#input_grid-pager').html(' &nbsp;跳至 <input type="number" value="' + _ts.p.page + '"> 页 &nbsp; &nbsp;共 ' + lastPage + ' 页 / ' + records + '条');
                }
                //$page.find('#input_grid-pager').html(' &nbsp;跳至 <input type="number" value="' + $page.find('#input_grid-pager input[type="number"]').val() + '"> 页 &nbsp; &nbsp;共 ' + lastPage + ' 页 / ' + records + '条');
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

                    //$("#" + $.XYYGrid.jqID(pgid)).append("<div id='" + pgcnt + "' class='ui-pager-control' role='group'><table><tbody><tr><td id='" + lft + "' align='left'></td><td id='" + cent + "' align='center' style='white-space:pre;'></td><td id='" + rgt + "' align='right'></td></tr></tbody></table></div>").attr("dir", "ltr");

                    $("#" + $.XYYGrid.jqID(pgid)).append("<div id='" + pgcnt + "' class='ui-pager-control' role='group'><table><tbody><tr><td id='" + rgt + "' align='right'></td></tr></tbody></table></div>").attr("dir", "ltr");


                    //pginp= "<td id='input"+tp+"' dir='"+dir+"'>"+$.XYYGrid.template( $.XYYGrid.getRegional(_ts, "defaults.pgtext", _ts.p.pgtext) || "Page {0} of {1}","<input class='ui-pg-input' type='text' size='2' maxlength='7' value='0' role='textbox'/>","<span id='sp_1_"+$.XYYGrid.jqID(pgid)+"'></span>")+"</td>";

                    pginp = "<td id='input" + tp + "' dir='" + dir + "'></td>";


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

                    //下拉设置页数事件
                    $("#" + $.XYYGrid.jqID(pgid)).off('input', '#select_grid-pager').on('input', '#select_grid-pager', function (e) {
                        if (_ts.p.onPaging && $.isFunction(_ts.p.onPaging) && _ts.p.onPaging.call(_ts, 1) == false) return false;//翻页前事件回调
                        $(_ts).setGridParam({rowNum: $(this).find('select').val()}).trigger('reloadGrid');
                    })

                    //页数输入跳转事件
                    $page.find('#input_grid-pager input').on('keydown', function (e) {
                        if (e.keyCode == 13) {
                            var lastPage = ctPage($page), tPage = _ts.p.page;
                            tPage = $.isNumeric(this.value) ? this.value < 1 ? 1 : this.value > lastPage ? lastPage : this.value : 1;
                            if (_ts.p.onPaging && $.isFunction(_ts.p.onPaging) && _ts.p.onPaging.call(_ts, tPage) == false) {
                                return false;//翻页前事件回调
                            }
                            _ts.p.page = tPage;
                            before();
                        }
                    })

                    //翻页按钮事件
                    $page.find('#first_grid-pager,#prev_grid-pager,#next_grid-pager,#last_grid-pager').on('click', function () {
                        var lastPage = ctPage($page), tPage = _ts.p.page;
                        var $this = $(this);
                        var $this_ = $this.prop('id').split('_');
                        if ($this_[0] == 'first') {
                            tPage = 1;
                        }
                        if ($this_[0] == 'prev') {
                            _ts.p.page <= 1 ? 1 : tPage--;
                        }
                        if ($this_[0] == 'next') {
                            _ts.p.page >= lastPage ? lastPage : tPage++;
                        }
                        if ($this_[0] == 'last') {
                            tPage = lastPage;
                        }
                        //$page.find('#input_grid-pager').html(' &nbsp;跳至 <input type="number" value="' + _ts.p.page + '"> 页 &nbsp; &nbsp;共 ' + lastPage + ' 页');

                        if ($this.find('span').hasClass('ui-pager-disable')) {
                            return false;
                        }

                        if (_ts.p.onPaging && $.isFunction(_ts.p.onPaging) && _ts.p.onPaging.call(_ts, tPage) == false) return false;//翻页前事件回调
                        $page.find('#input_grid-pager').find('input[type="number"]').val(tPage);
                        _ts.p.page = tPage;
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

            addTableHead();
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
            $(_tb).delegate('th#grid_checked input[type=checkbox]', {
                'input': function (e) {
                    var $this = $(this), $ts_td_ck = $(_tb).find('td[row-describedby=ck] input[type=checkbox]');

                    $this.prop('checked') ? $ts_td_ck.prop('checked', true) : $ts_td_ck.prop('checked', false);


                    //  $this.attr('checked') ? $ts_td_ck.prop('checked', "checked") : $ts_td_ck.attr('checked', "unchecked");

                    $ts_td_ck.trigger('input');
                },
            });

            //全选-数据行中的复选框
            $(_tb).delegate('td[row-describedby=ck] input[type=checkbox]', {
                'input': function (e) {
                    var $this = $(this), $ts_th_ck = $(_tb).find('th#grid_checked input[type=checkbox]');
                    tr = $this.closest('tr');
                    if (tr.attr('noSele')) return; //如果为不可选择行，则直接return

                    tr.find('td[row-describedby=ck] input[type=checkbox]').prop('checked', $this.prop('checked'));

                    $this.prop('checked') ? tr.addClass('selRow').attr('clickSelRow', true) : tr.removeClass('selRow').removeAttr('clickSelRow');
                    if (!$this.prop('checked')) {
                        $ts_th_ck.prop('checked', false);
                    }

                    if (!$(_tb).find('td[row-describedby=ck] input').not(':checked').length) {
                        $(_tb).find('th#grid_checked input').prop('checked', 'checked');
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
            $(_tb).find('.XGridBody').on('scroll', function (e) {
                $(_tb).find('.XGridHead')[0].scrollLeft = this.scrollLeft;
            });
            $(_ts).before('').unbind().on({
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
                    if (e.target.tagName != "TD") return;
                    if (!tr.length) return;
                    if (tr.attr('noSele')) return; //如果为不可选择行，则直接return
                    ri = tr[0].id;
                    if (!ri) return;
                    ci = $.XYYGrid.getCellIndex(td);

                    /*0927邓涛 废弃*/
                    //var dbcr = $(_ts).triggerHandler("GridDblClickRow", [$(tr).attr("id"), ri, ci, e]);

                    if (tr.hasClass('selRow')) {
                        tr.removeClass('selRow').removeAttr('clickSelRow');
                        tr.find('td[row-describedby=ck] input').prop('checked', false);
                    } else {
                        //选中事件
                        tr.addClass('selRow').attr('clickSelRow', true);
                        //非多选情况，取消其他tr的选择状态
                        if (_ts.p.multiselect || _ts.p.selectandorder) {
                            tr.find('td[row-describedby=ck] input').prop('checked', 'checked');


                            // shirt 快捷键功能
                            if (e.shiftKey){
                                var trArry = $(_ts).find('tr');
                                var selTrs = $(_ts).find('tr.selRow');
                                selTrs.sort(function (prev, next) {
                                    return $(prev).index() - $(next).index();
                                })

                                trArry.removeClass('selRow').removeAttr('clickSelRow', true).find('td[row-describedby=ck] input').prop('checked', false);

                                trArry.slice($(selTrs[0]).index(), tr.index()+1).addClass('selRow').attr('clickSelRow', true).find('td[row-describedby=ck] input').prop('checked', 'checked');

                            }

                            if (!$(_ts).find('td[row-describedby=ck] input').not(':checked').length) {
                                $(_ts).find('th.grid_checked input').prop('checked', 'checked');
                            }
                        } else {
                            tr.siblings().removeClass('selRow').removeAttr('clickSelRow');
                        }
                    }

                    if (!$(_tb).find('td[row-describedby=ck] input').not(':checked').length) {
                        $(_tb).find('th#grid_checked input').prop('checked', 'checked');
                    } else {
                        $(_tb).find('th#grid_checked input').prop('checked', false);
                    }


                    if ($.isFunction(_ts.p.onSelectRow)) {
                        var dbcr = _ts.p.onSelectRow.call(_ts, ri, tr, $(_ts).getRowData(ri), ci, e);
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
                    /*0927邓涛 废弃*/
                    //var dbcr = $(_ts).triggerHandler("jqGridDblClickRow", [$(tr).attr("id"), ri, ci, e]);
                    if ($.isFunction(_ts.p.ondblClickRow)) {
                        var dbcr = _ts.p.ondblClickRow.call(_ts, ri, tr, $(_ts).getRowData(ri), ci, e);
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
                'reloadGrid': function (e, param) {
                    if (param && param.rePage == false) {
                        console.log('no rePage!');
                    } else {
                        _ts.p.page = 1;
                    }

                    before();
                    setPager(_ts.p.pager);
                    refreshIndex();

                    //2018.11.2,rl,重新加载数据时,重置XGridHead中的checkbox
                    $(_ts).closest('.tableBlock').find(".XGridHead #grid_checked input[type=checkbox]").prop("checked", false);
                },
                'scroll': function (e) {
                    console.log(e);
                }
            });

            //  排序
            var _thead = $(_tb).find('.XGridHead');
            $(_thead).delegate('th[grid_sort="true"]', {
                'click': function (e) {
                    var othis = $(this)
                        , elemSort = othis.find('.layui-table-sort')
                        , nowType = elemSort.attr('lay-sort')
                        , type;

                    if (nowType === 'asc') {
                        type = 'desc';
                    } else if (nowType === 'desc') {
                        type = null;
                    } else {
                        type = 'asc';
                    }
                    sort(e, type);
                }
            }).find('.layui-table-sort .layui-edge ').on('click', function (e) {
                e.stopPropagation()
                var othis = $(this)
                    , index = othis.index();
                if (index === 0) {
                    sort(e, 'asc');
                } else {
                    sort(e, 'desc');
                }
            });

            // 排序方法
            function sort(e, type) {

                var that = $(e.target),
                    sortType = type,
                    sortName = that.attr('row-describedby')?that.attr('row-describedby'):that.closest('th').attr('row-describedby'),
                    data = _ts.p.data, thisData;

                try {
                    that.closest('tr').find('th[grid_sort="true"]').find('.layui-table-sort').removeAttr('lay-sort');
                    if(that.hasClass('layui-edge')){

                        // 点击图标
                        that.closest('.layui-table-sort').attr('lay-sort', type || null);
                    }else {
                        // 点击表头
                        that.find('.layui-table-sort').attr('lay-sort', type || null);
                    }

                } catch (e) {
                    return hint.error('Table modules: Did not match to colName');
                }

                if(_ts.p.url){
                    $(_ts).setGridParam({
                        postData: {
                            sortname: sortName,
                            sorttype: sortType
                        }
                    }).trigger('reloadGrid');
                }else {
                    //默认为前端自动排序。如果否，则需自主排序（通常为服务端处理好排序）
                    if (type === 'asc') { //升序
                        thisData = localSort(data, 'name1');
                    } else if (type === 'desc') { //降序
                        thisData = localSort(data, 'name1', true);
                    } else {
                        //清除排序 待优化
                        // thisData = localSort(data, table.config.indexName);
                        // delete that.sortKey;
                    }
                    $(_ts).setGridParam({data: thisData}).trigger('reloadGrid');
                }

            }

            //将数组中的对象按其某个成员排序
            function localSort(obj, key, desc){
                var clone = JSON.parse(
                    JSON.stringify(obj || [])
                );

                if(!key) return clone;

                //如果是数字，按大小排序，如果是非数字，按字典序排序
                clone.sort(function(o1, o2){
                    var isNum = /^-?\d+$/
                        ,v1 = o1[key]
                        ,v2 = o2[key];

                    if(isNum.test(v1)) v1 = parseFloat(v1);
                    if(isNum.test(v2)) v2 = parseFloat(v2);

                    if(v1 && !v2){
                        return 1;
                    } else if(!v1 && v2){
                        return -1;
                    }

                    if(v1 > v2){
                        return 1;
                    } else if (v1 < v2) {
                        return -1;
                    } else {
                        return 0;
                    }
                });

                desc && clone.reverse(); //倒序
                return clone;
            };

        })
    }


    //JSON反序列化为form
    $.fn.JSONToform = function (jn) {
        var _this = this;
        var _thisDom = $(this).find('input,select,textarea,radio');
        if (Object.prototype.toString.call(jn) == '[object Object]') {
            $.each(jn, function (e, v) {
                var self = $(_this).find('[name=' + e + ']');
                if (self && self.prop('type') == 'radio') {
                    //$(_this).find('[name=' + e + '][value=' + v + ']').prop('checked', 'checked');
                    $(_this).find('[name=' + e + '][value=' + v + ']').attr('checked', 'checked');
                } else if (self && self.prop('type') == 'checkbox') {

                    //v ? self.attr('checked', 'checked') : self.attr('checked', false);
                    //self.attr('checked', false);
                    if (Object.prototype.toString.call(v) == '[object Array]') {
                        $.each(v, function (item, value) {
                            $(_this).find('[name=' + e + '][value=' + value + ']').prop('checked', 'checked');
                        })
                    } else if (Object.prototype.toString.call(v) == '[object String]') {
                        $(_this).find('[name=' + e + '][value=' + v + ']').attr('checked', 'checked');
                    }

                } else if (self && self.prop('type') == 'select-one') {
                    v = v ? v : '""';
                    self.find('option[value=' + v + ']').attr('selected', 'selected').siblings().removeAttr('selected');
                } else {
                    self.prop('value', v);
                    //self.val(v);
                }

            })


        } else if (_thisDom.length == 1) {
            var self = _thisDom;

            if (self && self.prop('type') == 'radio') {
                $(_this).prop('checked', 'checked');
            } else if (self && self.prop('type') == 'checkbox') {
                (jn && jn != 'false') ? self.attr('checked', 'checked') : self.attr('checked', false);
            } else if (self && self.prop('type') == 'select-one') {
                self.find('option[value=' + jn + ']').attr('selected', 'selected').siblings().removeAttr('selected');
            } else {
                self.prop('value', jn).attr('value', jn);
                //self.val(v);
            }
        }
    }
//dom序列化为JSON，类似form序列化
    $.fn.domToJSON = function () {
        var _this = this;
        var _thisDom = $(this).find('input,select,textarea,checkbox');
        var o = {};
        //如果只有一个元素，直接返回值
        if (_thisDom.length == 1) {
            $.each(_thisDom, function (e, v) {
                var self = $(v);
                if (self && self.prop('type') == 'radio') {
                    self.prop('checked') ? o = self.val() : '';
                } else if (self && self.prop('type') == 'checkbox') {
                    o = self.prop('checked');
                } else {
                    o = self.val();
                    //self.val(v);
                }
            })
        } else {
            $.each(_thisDom, function (e, v) {
                var self = $(v);
                if (self && self.prop('type') == 'radio') {
                    self.prop('checked') ? o[self.prop('name')] = self.val() : '';
                } else if (self && self.prop('type') == 'checkbox') {
                    o[self.prop('name')] = self.prop('checked');
                } else {
                    o[self.prop('name')] = self.val();
                    //self.val(v);
                }
            })
        }


        return o;
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

            //return rtype == 'dom' ? success : ind.length > 1 ? resAry : resAry[0];
            return rtype == 'dom' ? success : resAry;
        },
        getRowData: function (rowid) {
            var res = {}, resall, getall = false, len, j = 0;

            this.each(function () {
                var $t = this, nm, ind, rowtype;
                //rowid 为假，获取全部数据
                if (rowid == null) {
                    getall = true;
                    resall = [];
                    len = $t.rows.length - 1;
                } else {
                    //rowid 为真，获取id数据
                    ind = $($t).XGrid('getGridRowById', rowid);
                    if (!ind) {
                        return res;
                    }
                    len = 1;
                }

                while (j < len) {
                    if (getall) {
                        //如果获取多行，根据下表取行数据
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


                        //判断以免覆盖原id
                        //console.log(ind);
                        if (res.id == undefined) res.id = ind.id;
                        //新增rowid
                        res.rowid = ind.id;

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
                var t = this, vl, ind, cp = typeof cssp, lcdata = {}, rowData = $(t).XGrid('getRowData', rowid);
                ind = $(this).XGrid('getGridRowById', rowid);
                if (data && ind) {

                    try {
                        $(this.p.colModel).each(function (i, v) {

                            nm = this.name;
                            var dval = $.XYYGrid.getAccessor(data, nm);
                            if (t.p.key == nm && dval) {
                                $(ind).attr('id', dval);
                            }
                            if (dval !== undefined) {
                                var data_ = $.extend(rowData, data);
                                lcdata[nm] = this.formatter && typeof this.formatter === 'string' && this.formatter === 'date' ? $.unformat.date.call(t, dval, this) : dval;
                                vl = this.formatter && $.isFunction(this.formatter) ? this.formatter(dval, this.rowtype, data_) : dval;//2018-7-28 16:49:51 于超群修改
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
                                    $("td[role='gridcell'][row-describedby='" + nm + "']", ind).html($(t.addCell(rowid, dval, i, i, data_, v)).html());
                                }
                            }
                        });
                        if (t.p.datatype === 'local') {
                            /*var id = $.jgrid.stripPref(t.p.idPrefix, rowid),
                                pos = t.p._index[id], key;
                            if (t.p.treeGrid) {
                                for (key in t.p.treeReader) {
                                    if (t.p.treeReader.hasOwnProperty(key)) {
                                        delete lcdata[t.p.treeReader[];
                                    }
                                }
                            }
                            if (pos !== undefined) {
                                t.p.data[pos] = $.extend(true, t.p.data[pos], lcdata);
                            }
                            lcdata = null;*/
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

                    console.log('没有找到数据key,生成时间戳key');
                    //return success;
                }
                id = data[t.p.key] || Math.random().toString().slice(2, 15);//new Date().getTime();

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
                row.push(id);
                row.push('">');

                //是否可多选
                if (t.p.multiselect) {
                    row.push('<td style="text-align: center;width: 80px;" row-describedby="ck"><input type="checkbox"></td>');
                }
                //是否显示序号
                if (t.p.rownumbers) {
                    row.push('<td row-describedby="rn" style="text-align: center;width: 80px;">');
                    row.push(t.rows.length);
                    row.push('</td>');
                }
                //是否显示序号多选
                if (t.p.selectandorder) {
                    row.push('<td style="text-align:center;width:80px;" row-describedby="ck" row-describedby_="rn_ck" ><input type="checkbox">');
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
                    //row[row.length] = t.addCell(data[t.p.key], v, i, i, data, cm);
                    row[row.length] = t.addCell(id, v, i, i, data, cm);

                }
                //row.unshift( t.constructTr(rowid, false, classes, lcdata, data ) );


                row[row.length] = "</tr>";

                if (t.rows.length === 1) {
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

                        $.extend(this.p, newParams);
                    }
                    if (newParams.colModel) {
                        var $tbhead = $t.closest('.tableBlock');

                        $.each(newParams.colModel, function (i, v) {
                            //隐藏展示列
                            if (v.name && v.hidden != undefined) {
                                var grid_th = $tbhead.find('th[grid_th_' + v.name + ']');
                                var grid_td = $tbhead.find('td[row-describedby="' + v.name + '"]');
                                v.hidden == false ? $tbhead.find('th[grid_th_' + v.name + '],td[row-describedby="' + v.name + '"]').show() : $tbhead.find('th[grid_th_' + v.name + '],td[row-describedby="' + v.name + '"]').hide();
                                /*var width = grid_td.outerWidth() > grid_th.outerWidth() ? grid_td.outerWidth() : grid_th.outerWidth();
                                grid_th.css('width', width);
                                grid_td.eq(0).css('width', width);*/

                                /*
                                1011 dt 去掉判断，每次设置列后，校正所有列宽
                                if (grid_th_height== 0) {
                                    //显示列时，如果本来就隐藏的列宽度会为0，同步内容宽度给两个 th
                                }*/
                            }
                        })

                        //校正宽度
                        $.XYYGrid.reWidth(this, $tbhead[0], this.p.data);
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
        filterTableHead: function (disabledFieldArr) {
            var $t = this;
            var ary = $t.XGrid('getTableHead'), s = [];

            var disabledFieldArrFlag = $.isArray(disabledFieldArr) && disabledFieldArr.length;

            s.push('<div id="setCol" style="padding-left: 2.4rem"><div class="row" id="checkRow">');
            for (var i = 0; i < ary.length; i++) {
                s.push('<div class="col-md-3" ><div class="checkbox"><label><input style="margin-right: 5px"');
                s.push(ary[i].hidden ? ' ' : ' checked ');
                s.push('type="checkbox" name="');
                s.push(ary[i].m + '"');

                //禁止取消的字段,rl,2018.10.24
                if (disabledFieldArrFlag) {
                    $.each(disabledFieldArr, function (item, val) {
                        if (ary[i].m == val) {
                            s.push(" disabled ");
                            return false;
                        }
                    });
                }

                s.push('>');
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
                            $.ajax({
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
                            $(v).find('td[row-describedby_="rn_ck"]').html('<input type="checkbox" checked="checked">' + (i));
                        } else {
                            $(v).find('td[row-describedby_="rn_ck"]').html('<input type="checkbox">' + (i));
                        }

                    }
                })
            })
        },
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
 * 新增 自动生成唯一key                           --已增加 1008
 * 新增 翻页中显示总条数                          --已增加 1008
 * 新增 固定表头及附加行，设定数据行宽度，超出滚动条                    --已增加1008
 * 新增 rowNum 不分页，显示所有数据，目前设置负数不管用                       -- 已增加 0917
 * 新增 设置控件默认数据，而不设置选中数据   ×
 * 新增 设置初始化默认选中行，或者不可选中行，参数可为考虑 []或ID
 * 新增 Url返回参数设定,应对后端数据格式不统一的问题
 * 新增 拖动行功能
 * 新增 禁用行，XGrid新增排序，支持正序倒序，XGrid表头可拖动排序
 * 新增 列表数据提升优先级，新增提升优先级函数
 * 新增 新增排序
 * 新增 渲染过渡效果
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
