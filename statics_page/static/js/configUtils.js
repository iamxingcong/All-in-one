let CONFIG = {
    VERSION: '',
    STR: {
        NOTICE_OPERATING: '正在操作',
        NOT_FIND: '找不到组件'
    }
}


let utils = {
    /*ajax: function (objParams, interfaceName, requestType, successCallback, errorCallback, completeCallback) {
        $.ajax({
            url: interfaceName,
            type: requestType,
            dataType: 'json',
            timeout: 8000, //6000
            data: objParams,
            success: function (data) {
                successCallback(data);
            },
            error: function () {
                $.isFunction(errorCallback) ? errorCallback() : '';
            },
            complete: function () {
                $.isFunction(completeCallback) ? completeCallback() : '';
            }
        });
    },*/
    ajax: function (param) {
        //预留默认函数及公共处理部分
        var defaultObj = {
            timeout: 8000,
            async: true,
            /*success: function (data) {
                 $.isFunction(defaultObj.success) ? defaultObj.success(data) : '';
             },
             error: function (e) {
                 $.isFunction(defaultObj.error) ? defaultObj.error(e) : '';
             },
             complete: function (e) {
                 $.isFunction(defaultObj.complete) ? defaultObj.complete(e) : '';
             }*/
        };
        $.extend(defaultObj, param);
        $.ajax(defaultObj);
    },
    dialog: function (objParams) {
        //http://aui.github.io/artDialog/doc/index.html
        if (window.dialog && typeof window.dialog == 'function') {
            console.log('window.dialog');
        } else if (parent.dialog && typeof parent.dialog == 'function') {
            console.log('parent.dialog');
            window.dialog = parent.dialog;
        } else {
            console.log(CONFIG.STR.NOT_FIND);
            alert(CONFIG.STR.NOT_FIND + ':dialog');
            return false;
        }

        var defaultObj = {"resetForm": true};//是否重置form表单默认值

        $.extend(defaultObj, objParams);

        var onCloseFnTmp = defaultObj.onclose;

        defaultObj.onclose = function () {
            if (defaultObj.resetForm === true) {
                $(this.node).find("form").each(function (i, v) {
                    v.reset();
                });
            }
            onCloseFnTmp && onCloseFnTmp.call(this);
        };

        var d = dialog(defaultObj);

        if (defaultObj.timeout) {
            setTimeout(function () {
                d.close().remove();
            }, defaultObj.timeout);
        }


        return d;

    },
    jsonToString: function (obj) {
        var s = '?';
        for (var o in obj) {
            s += o + "=" + obj[o] + "&";
        }
        return s.slice(0, s.length - 1);
    },
    formatDate: function (time) {
        if (!time) return false;
        var d = new Date(time),
            year = d.getFullYear(),
            month = d.getMonth() + 1,
            day = d.getDate(),
            hour = d.getHours(),
            min = d.getMinutes(),
            sec = d.getSeconds();
        return year + '-' +
            (month < 10 ? '0' + month : month) + '-' +
            (day < 10 ? '0' + day : day) + ' ' +
            (hour < 10 ? '0' + hour : hour) + ':' +
            (min < 10 ? '0' + min : min) + ':' +
            (sec < 10 ? '0' + sec : sec);
    },
    setTableHeight: function (tableId) {
        //设置XGrid高度
        var $table = $('#' + tableId),
            offsetTop = $table.offset().top;
        $('body').css({position: 'absolute', top: '0', bottom: '0'});
        var bodyHeight = $('body').height();
        var maxHeight = bodyHeight - offsetTop - 48 - 8 - 15 - 10;
        $table.closest('.table-box').css('max-height', maxHeight);

    },
    // 操作标签页
    openTabs: function (id, title, url, paramObj) {
        //打开标签页
        parent.openTabs(id, title, url, paramObj);
    },
    closeTab: function (data) {
        //关闭当前标签页,跳到父标签页
        var which = parent.$('#nav-tab li.active');
        parent.closeTabs(which, data);
    },
}


/*************************     方法扩展到$中   *****************************/
//序列化form为JSON
$.fn.serializeToJSON = function () {
    var o = {},
        a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
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

/******************************  表单序列化与表单回显值  ******************************/
$.fn.extend({
    serializeFormToJSON: function () {
        var rtnObj = {},
            arr = this.serializeArray();
        $.each(arr, function (i, v) {
            if (rtnObj.hasOwnProperty(v.name)) {
                if (Object.prototype.toString.call(rtnObj[v.name]).indexOf('Array') == -1) {
                    rtnObj[v.name] = [rtnObj[v.name]];
                }
                rtnObj[v.name].push(v.value || "");
            } else {
                rtnObj[v.name] = v.value || "";
            }
        });
        return rtnObj;
    },
    serializeJSONToForm: function (json) {
        if (Object.prototype.toString.call(json).indexOf('Object') == -1) {
            return false;
        }
        var $this = $(this), $el, isJsonValArr = false;
        $this[0].reset();
        $.each(json, function (jsonKey, jsonVal) {

            $el = $this.find("[name=" + jsonKey + "]");

            var hasRepeatNameBetweenDifferentType = false;//不同type的元素,有相同的name属性
            if ($el && $el.length) {
                if ($el.length >= 2) {
                    //检查name相同的一组元素type是否相同
                    var first$elType = $el.eq(0).prop("type") || $el.eq(0).get(0).nodeName;
                    $.each($el, function (index$el, value$el) {
                        if (($(value$el).prop("type") || value$el.nodeName) != first$elType) {
                            hasRepeatNameBetweenDifferentType = true;
                            return false;
                        }
                    });
                }
            } else {
                return true;//continue
            }
            if (hasRepeatNameBetweenDifferentType) {
                console.error("error: has repeat name[" + jsonKey + "] between different type of node!");
                return false;
            }

            isJsonValArr = Object.prototype.toString.call(jsonVal).indexOf('Array') > -1;
            switch ($el.prop("type") || $el.get(0).nodeName) {
                case "radio":
                    $($el.selector + "[value=" + jsonVal + "]").prop("checked", true);
                    break;
                case "checkbox":
                    if (isJsonValArr) {
                        $.each(jsonVal, function (indexV, valueV) {
                            $($el.selector + "[value=" + valueV + "]").prop("checked", true);
                        })
                    } else {
                        $($el.selector + "[value=" + jsonVal + "]").prop("checked", true);
                    }
                    break;
                case "text":
                case "select-one":
                case "textarea":
                    if (isJsonValArr) {
                        $.each(jsonVal, function (indexV, valueV) {
                            $el.eq(indexV).prop("value", valueV);
                        })
                    } else {
                        $el.prop("value", jsonVal);
                    }
                    break;
                default:
                    if (isJsonValArr) {
                        $.each(jsonVal, function (indexV, valueV) {
                            $el.eq(indexV).html(valueV);
                        })
                    } else {
                        $el.html(jsonVal);
                    }
                    break;
            }
        });
    }
});


/******************************  插件部分  ******************************/
//模块折叠
$.fn.fold = function () {
    var $this = $(this),
        t = $(this).find('[fold=sub]') || this;
    t.find('div').css({
        'transition': ' transform 1s'
    });
    $(t).hover(function () {
        $(this).css({
            'cursor': 'pointer',
            'transition': ' transform 1s'
        });
    })
    $(t).on('click', function () {
        var p = $(this).parent('[fold=head]') || $(this);

        var that = $(this).find('div');
        p.next('[fold=body]').is(':visible') ? that.css({
            'transform': 'rotate(180deg)'
        }) : that.css({
            'transform': 'rotate(0deg)'
        });
        p.next('[fold=body]').stop().slideToggle(function () {
            console.log($(this).is(':visible'));
            $(this).is(':visible') ? that.css({
                'transform': 'rotate(0deg)'
            }) : that.css({
                'transform': 'rotate(180deg)'
            });
        });


    })
}

//字典检索

$.fn.Xseach = function (par) {
    var t = this;
    var ul = $('<ul class="word" ></ul>');
    // $(t).wrap('<div class="search_Box"></div>')
    $(t).after(ul)
    //失去焦点事件
    $(t).blur(function (e) {
        setTimeout(function () {
            //debugger;
            ul.find("li").remove();
            ul.css("display", "none");

        }, 1000);
    });

    ul.on('click', 'li', function (e) {
        var word = $(this).text();
        console.log(word);
        $(t).val(word);
        ul.find('li').remove();
    });

    //这里 blur事件的触发，比on绑定要先执行，所以要加延时执行，否则将拿不到word

    function myFunction() {
        var tab = ul[0].childNodes;
        var li = ul.find("li");
        console.log('出发oninput事件');
        var keywords = $(t).val();
        // var keywords = document.getElementById("text").value;
        if (keywords == '') {
            ul.hide();
            return
        }
        ul.css({
            position: 'absolute',
            'z-index': '99',
            background: '#fff',
            top: '34px',
        });
        $.ajax({
            url: par.url + '/su?wd=' + keywords,
            dataType: 'jsonp',
            jsonp: 'cb', //回调函数的参数名(键值)key
            // jsonpCallback: 'fun', //回调函数名(值) value
            beforeSend: function () {
                ul.append('<div>正在加载...</div>');
                ul.css("display", "block")
            },
            success: function (data) {
                ul.empty().show();
                if (data.s == '') {
                    ul.append('<div class="error">找不到  "' + keywords + '"</div>');
                    ul.css("display", "block")
                }
                $.each(data.s, function () {
                    ul.append('<li class="clicks">' + this + '</li>');
                    ul.css("display", "block")
                })
            },
            error: function () {
                ul.empty().show();
                ul.append('<div class="click_work">Fail "' + keywords + '"</div>');
            }
        })


        var i = 0;
        document.onkeydown = function (e) {
            //上
            if (tab.length) {
                var j;
                if (e.keyCode == 40) {
                    for (j = 0; j < tab.length; j++) {
                        tab[j].className = "ele";
                        if (tab[j].className == "ele") {
                            tab[j].className = "";
                        }
                    }
                    if (i < tab.length) {
                        tab[i].className = "ele";
                        var word = tab[i].innerHTML;
                        t.val(word);
                        i = i + 1;
                        if (i == tab.length) {
                            i = 0;
                            j = 0;
                        }
                    }
                }
                //下

                if (e.keyCode == 38) {
                    m = 0
                    for (; m < tab.length; m++) {
                        if (tab[m].className == "ele") {
                            tab[m].className = "";
                            break;
                        }
                    }
                    i = m;
                    if (m > 0) {
                        tab[m - 1].className = "ele";
                        var word = tab[m - 1].innerHTML;
                        t.val(word);
                    } else {
                        tab[tab.length - 1].className = "ele";
                    }
                }
                //enter
                if (e.keyCode == 13) {
                    ul.find("li").remove();
                    ul.css("display", "none")
                }
            }

        }
    }

    $(t).on('input', myFunction);

    // var ul = document.getElementById("word");
}

/**
 * 上传图片
 * @param urlBack  Function 点击确定的回调函数
 * @param typeList Array    可选择的类型 {text:xxx,value:xxx}
 * @param fileParam JSON   必传 图片名称、图片地址 字段名  eg:{name:xxx,url:xxx}
 *  @param eChoImgList Array 可不传 存放回显图片数据 [{name:xx,type:xxx,url:xxxx}]
 */
$.fn.upLoad = function (parmas) {
    //urlBack
    var typeList = parmas.typeList; //图片显示类型
    if (typeList.length > 0) {
        for (var a = 0; a < typeList.length; a++) {
            if (typeList[a].value == '') {
                utils.dialog({
                    width: 300,
                    title: '提示',
                    content: '请选择附件类型，表格序号除外第一列',
                    okValue: '确定',
                    ok: function () {
                    }
                }).showModal();
                return false;
            }
        }
    } else {
        utils.dialog({
            width: 300,
            title: '提示',
            content: '请新增行并选择附件类型',
            okValue: '确定',
            ok: function () {
            }
        }).showModal();
        return false;
    }

    var thisId = this.id;
    var upLoadDialog = 'upload_Dialog' + thisId //弹框外层id
    var fileBtn = 'fileBtn_' + thisId; //弹框内上传按钮
    var imgBox = 'imgcontain' + thisId; //存放图片div
    var eChoImgList = parmas.eChoImgList || []; //存放回显图片数据
    var fileParam = parmas.fileParam; //存存储与数据字段名 ：图片名称、图片地址
    if (!fileParam) {
        alert('请传入数据库对应的 图片名称、图片地址 对应的字段');
        return false
    }
    var upload_Dialog_Html = '<div class="upload_Dialog" id="' + upLoadDialog + '"><div id="' + imgBox + '" class="imgcontain result" name="result">' +
        '<p class="imgFile" id="imgFileP"><input class="fileload" type="file" accept="image/gif,image/jpg,image/jpeg,image/png" multiple="multiple" id="' + fileBtn + '"/></p>' +
        '</div></div>';


    //打开弹窗
    utils.dialog({
        title: '批量管理附件',
        width: 700,
        content: upload_Dialog_Html,
        okValue: '保存',
        ok: function () {
            for (var i = 0; i < $(".viewImgItem").length; i++) {
                var type = $(".viewImgItem").eq(i).find("select option:selected").val();
                if (type == '' || !type) {
                    utils.dialog({
                        width: 200,
                        title: '提示',
                        content: '请选择附件类型',
                        okValue: '确定',
                        ok: function () {
                        }
                    }).showModal();
                    return false;
                }
            }
            //检测是否有重复名称
            var f = false;
            $(".viewImgItem").each(function () {
                var flag = false;
                var iImgName = $.trim($(this).find('.viewImgName input').val());
                $(".viewImgItem").not($(this)).each(function () {
                    var name = $.trim($(this).find('.viewImgName input').val());
                    if (name == iImgName) {
                        flag = true;
                        return false;
                    }
                })
                if (flag) {
                    f = true;
                    return false;
                }
            })
            if (f) {
                utils.dialog({
                    width: 200,
                    title: '提示',
                    content: '附件名称不可重复',
                    okValue: '确定',
                    ok: function () {
                    }
                }).showModal();
                return false;
            }
            //反回数据
            var imgList = initData();
            parmas.urlBack && parmas.urlBack(imgList);
        },
        cancelValue: '取消',
        cancel: function () {
        }
    }).showModal();


    //以下弹框初始化完成后代码--------------

    //拼装类型select框
    var osHTML = optionsHTML(typeList);
    //显示已存在图片
    initShowImg(eChoImgList);


    //弹框内file
    $('#' + fileBtn).change(function () {
        var that = this;
        var file = this.files;
        var maxsize = 2 * 1024 * 1024; //2M

        for (var i = 0; i < file.length; i++) {
            var size = file[i].size; //图片大小
            if (size > maxsize) {
                alert('图片过大，单张图片大小不超过2M');
                that.value = '';
                return false;
            }
        }
        sendFile(file);
    })

    //图片删除按钮
    $('#' + upLoadDialog).on("click", ".closeBtn", function () {
        var _this = $(this);
        utils.dialog({
            width: 200,
            title: '提示',
            content: '确定删除？',
            okValue: '确定',
            ok: function () {
                _this.parent().remove();
            },
            cancelValue: '取消',
            cancel: function () {
            }
        }).showModal();

    })
    //切换类型时改变附件名称
    window.index = 0;
    $('#imgcontainundefined').on('change', '.imgTypeSel', function () {
        var inp = $(this).parents('.viewImgItem').find('.viewImgName input');
        var val = $.trim($(this).find('option:selected').text());
        var arr = [];
        $('.imgTypeSel').not(this).each(function () {
            var checkVal = $.trim($(this).find('option:selected').text());
            if (checkVal == val) {
                arr.push(checkVal);
            }
        });
        var s = arr.length > 0 ? '-' + arr.length : '';
        window.index++;
        inp.val(val + '' + s);
        $(this).parents('.viewImgItem').find('img').attr('data-type', val);
    })

    //往服务器发送图片
    function sendFile(files) {
        var formData = new FormData();
        for (var i = 0; i < files.length; i++) {
            formData.append('files', files[i]);
        }
        var d = utils.dialog({
            content: '正在上传..'
        }).showModal();
        $.ajax({
            url: '/upload/upload',
            data: formData,
            type: 'post',
            processData: false,
            contentType: false,
            dataType: 'json',
            success: function (data) {
                $('#' + fileBtn).val(''); //清空按钮value
                d.close().remove();
                if (data.code == 0) {
                    utils.dialog({
                        title: '提示',
                        width: '200px',
                        content: '上传成功',
                        okValue: '确定',
                        ok: function () {
                        }
                    }).showModal();
                    var imgArr = data.result;
                    var html = '';
                    for (var i = 0; i < imgArr.length; i++) {
                        html += imgHTML(imgArr[i]);
                    }
                    $('#' + imgBox).prepend(html);
                } else {
                    utils.dialog({
                        title: '提示',
                        width: '200px',
                        content: '上传失败',
                        okValue: '确定',
                        ok: function () {
                        }
                    }).showModal();
                }
            },
            error: function () {
                $('#' + fileBtn).val('');
                d.close().remove();
            }
        })
    }

    //如果存在附件则展示已存在附件图片
    function initShowImg(arr) {
        if (arr.length > 0) {
            var html = '';
            for (var i = 0; i < arr.length; i++) {
                var name = arr[i][fileParam.name];
                var url = arr[i][fileParam.url];
                var type = arr[i].type;

                html += imgHTML(url, name, type);
            }
            $('#' + imgBox).prepend(html);
            $(".viewImgItem").each(function () {
                var _this = this;
                var type = $(_this).find("img").attr('data-type');
                $(_this).find("select option").each(function () {
                    var _that = this;
                    var val = $(_that).val();
                    if (val == type) {
                        $(_that).prop("selected", true);
                        return false;
                    }
                });
            });
        }
    }

    //初始化反回数据
    function initData() {
        var arr = [];
        var json = {}
        $(".viewImgItem").each(function (index) {
            json = {};
            var type = $(this).find("select option:selected").val();
            var name = $(this).find("input").val();
            var url = $(this).find('img').attr('src');
            json.type = type;
            json.name = name;
            json.url = url;
            arr.push(json);
        });

        var picture = {}; //存放图片数据
        for (var i = 0; i < typeList.length; i++) {
            picture[typeList[i].value] = [];
        }
        var type = ''; //图片type值
        for (var i = 0; i < arr.length; i++) {
            type = arr[i].type;
            var dataJson = {};
            dataJson[fileParam.name] = arr[i].name;
            dataJson[fileParam.url] = arr[i].url;
            dataJson.type = type;
            if (picture[type]) {
                //对已存在type类型图片进行去重合并
                picture[type] = Array.from(new Set(picture[type].concat([dataJson])));
            } else {
                picture[type] = [dataJson];
            }
        }
        return picture;
    }

    //拼装类型select
    function optionsHTML(arr) {
        var optionsHTML = '<option value="">请选择</option>';
        for (var i = 0; i < arr.length; i++) {
            optionsHTML += '<option value="' + arr[i].value + '">' + arr[i].text + '</option>';
        }
        return optionsHTML;
    }

    //获取缩略图html
    function imgHTML(url, name, type) {
        var url = url,
            name = name || '',
            type = type || '';
        var html = '<div class="viewImgItem"><span class="closeBtn">×</span><div class=imgbox><img src="' + url + '" data-type="' + type + '" alt="' + name + '" /></div>' +
            '<select class="imgTypeSel">' + osHTML + '</select>' +
            '<p class="viewImgName"><input type="text" placeholder="证书名称" value="' + name + '"/></p>' +
            '</div>';
        return html;
    }
}


//本地字典是否存在utils


/**
 * 图片预览（支持轮播）
 * @param option Object {}
 *
 * @param option.list  图片数据集合 可以是[url,url2,url3] or [{name:1,type:类型,url:xxx},{xxx}]
 *
 * @param option.fileParam  JSON   必传 图片名称、图片地址 字段名  eg:{name:xxx,url:xxx}
 *
 * @param option.index 当前显示的图片下标 Number
 *
 * eg:   $.viewImg({
            fileParam:{
                name:'fileName',
                url:'filePath'
            },
            list:data.enclosureList
        })
 *
 *
 */
$.extend({
    viewImg: function (option) {
        var url = '';
        var urlList = option.list;
        if (typeof urlList == 'string') {
            urlList = JSON.parse(urlList);
        }
        var imgLen = urlList.length;
        if (imgLen < 1 || !urlList) {
            utils.dialog({
                title: '提示',
                width: '200px',
                content: '没有可预览附件',
                okValue: '确定',
                ok: function () {
                }
            }).showModal();
            return false;
        }
        var html = '<div class="viewImgBox"><p class="vTop"></p>\
                <div id="viewImg">\
            	<div class="leftBtn"><i></i></div>\
            	<div class="rightBtn"><i></i></div>\
                <div id="imgList"></div>\
                </div>\
            <p class="vBottom"></p></div>';
        utils.dialog({
            title: '预览',
            content: html,
            onclose: function () {
                document.onscroll = null;
            }
        }).showModal();
        try {
            var H = document.documentElement.clientHeight || document.body.clientHeight;
            document.onscroll = function () {
                var top = $('.ui-popup-show.ui-popup-focus').offset().top;
                var h = $('.ui-popup-show.ui-popup-focus').height();
                var scrTop = document.documentElement.scrollTop || document.body.scrollTop;
                if (scrTop < top - 10) {
                    document.documentElement.scrollTop = top - 10;
                }
                if (scrTop > (top + h - H)) {
                    document.documentElement.scrollTop = top + h - H;
                }
            }
        } catch (e) {
        }
        var fileParam = option.fileParam ? option.fileParam : false; //存存储与数据字段名 ：图片名称、图片地址
        if (urlList.length < 2) {
            $(".leftBtn,.rightBtn").hide();
        }
        var html = '';
        for (var i = 0; i < urlList.length; i++) {
            if (typeof urlList[i] == 'object' && fileParam) {
                url = urlList[i][fileParam.url];
            } else {
                url = urlList[i];
            }
            var reg = /(.pdf)$/i;
            var h = Math.round(800 * 1.475);
            if (reg.test(url)) {
                html += '<embed src="' + url + '" type="application/pdf" width="100%" height="' + h + '" class="imgView">';
            } else {
                html += '<img src="' + url + '" class="imgView"/>';
            }
        }
        $('#imgList').append(html);
        var Index = option.index;
        if (Index) {
            setIndex(Index);
        } else {
            setIndex(0);
            Index = 0;
        }
        var n = Number(Index);

        //左右按钮切换
        $("#viewImg").on("click", ".rightBtn i", function () {
            n++;
            console.log('+', n)
            if (n >= imgLen) {
                n = 0;
            }
            setIndex(n);
        });
        $("#viewImg").on("click", ".leftBtn i", function () {
            n--;
            console.log('-', n)
            if (n < 0) {
                n = imgLen - 1;
            }
            setIndex(n);
        });

        //设置图片展示层级
        function setIndex(index) {
            index = Math.abs(index)
            $('#imgList .imgView').css("opacity", "0");
            var tagName = $('#imgList .imgView').eq(index).get(0).tagName;
            if (tagName == 'IMG') {
                $("#imgList").css("overflow-y", "hidden");
            } else {
                $("#imgList").css("overflow-y", "auto");
            }
            $('#imgList .imgView').eq(index).css({
                "opacity": "1"
            });
            if (fileParam) {
                //显示图片名称与当前索引
                $(".vTop").html(urlList[index][fileParam.name]);
                $(".vBottom").html((index + 1) + '/' + imgLen);
            }
        }
    },
})


// 动态设置require位置
function setRequireRight() {
    var $require = $('.input-group-addon.require');
    if ($require.length) {
        Array.prototype.forEach.call($require, function (el) {
            var $this = $(el);
            $this.prepend('<i class="text-require">*  </i>');
        });
    }
}

// 去掉所有input的autocomplete, 显示指定的除外
$('input:not([autocomplete]),textarea:not([autocomplete]),select:not([autocomplete])').attr('autocomplete',
    'off');

setRequireRight();

//参数：保留几位小数，货币符号，千位分隔符，小数分隔符
Number.prototype.formatMoney = function (places, symbol, thousand, decimal) {
    places = !isNaN(places = Math.abs(places)) ? places : 2;
    symbol = symbol !== undefined ? symbol : "$";
    thousand = thousand || ",";
    decimal = decimal || ".";
    var number = this,
        negative = number < 0 ? "-" : "",
        i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};

//转大写
function chineseNumber(n) {
    var fraction = ['角', '分'];
    var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    var unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
    var head = n < 0 ? '负' : '';
    n = Math.abs(n);

    var s = '';

    for (var i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor((n * 100 / 10) * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);

    for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = '';
        for (var j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
}

//检测字符串长度，ps:区分字符和汉字，汉字length=2
function getByteLen(val) {
    return String(val).length + (String(val).match(/[^\x00-\xff]/g) || "").length; // 加上匹配到的全角字符长度
}

//截取字符串， ps:区分字符和汉字，汉字length=2
function getByteVal(val, max) {
    var returnValue = '';
    var byteValLen = 0;
    for (var i = 0; i < val.length; i++) {
        if (val[i].match(/[^\x00-\xff]/ig) != null)
            byteValLen += 2;
        else
            byteValLen += 1;
        if (byteValLen > max)
            break;
        returnValue += val[i];
    }
    return returnValue;
}

// input框设置关闭记忆功能
$("input[type='text'],input[type='number']").attr('autocomplete', 'off');
$(document).on("focus", "input[type='text'],input[type='number']", function () {
    $(this).attr('autocomplete', 'off');
})

//触发父级b.tabs.js关闭jqContextMenuHide函数
$('body').on('click', function () {
    try {
        parent.$.contextMenu.jqContextMenuHide()
    } catch (err) {
        //parent并没有contextMenu.jqContextMenuHide()
    }
})


//公用失去焦点事件&按下事件校验
$('body').on('blur', '.Filter_SpaceAndStrLen_Class', function () {
    //去掉前后空格
    this.value = this.value.replace(/^ +| +$/g, '');
}).on('keyup input', '.Filter_SpaceAndStrLen_Class', function () {
    //限制长度为50个字符||25个汉字
    if (getByteLen(this.value) > 50) {
        this.value = getByteVal(this.value, 50);
    }
})

//公用失去焦点事件&按下事件校验（搜索字段长度限制）
$('body').on('blur', '.Filter_SpaceAndStrSearchLen_Class', function () {
    //去掉前后空格
    this.value = this.value.replace(/^ +| +$/g, '');
}).on('keyup input', '.Filter_SpaceAndStrSearchLen_Class', function () {
    //限制长度为40个字符||20个汉字
    if (getByteLen(this.value) > 40) {
        this.value = getByteVal(this.value, 40);
    }
})
//公用失去焦点事件&按下事件校验（备注字段长度限制）
$('body').on('blur', '.Filter_SpaceAndStrRemarkLen_Class', function () {
    //去掉前后空格
    this.value = this.value.replace(/^ +| +$/g, '');
}).on('keyup input', '.Filter_SpaceAndStrRemarkLen_Class', function () {
    //限制长度为80个字符||40个汉字
    if (getByteLen(this.value) > 80) {
        this.value = getByteVal(this.value, 80);
    }
})

//table表格内有效期时间控制
function getToday() {
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    return y + '-' + ((m < 10) ? '0' + m : m) + '-' + ((d < 10) ? '0' + d : d)
}

//XGrid 中 使用  有效期开始时间
function begDate(that, name) {
    var parentId = $(that).parent().attr('id');
    $(that).attr('id', parentId + 'inp');
    var begDate = $.trim($(that).val());
    var endInp = $(that).parents('tr').find('input[name="' + name + '"]');
    var endDate = $.trim(endInp.val());
    if (begDate != '' && endDate != '' && compareDate(endDate, begDate)) {
        endInp.val(getdifference(begDate, 1));
    }
}

//XGrid 中 使用    有效期截止时间
function endDate(that, name, fn) {
    var begDateId = $(that).parents('tr').find('input[name="' + name + '"]').attr('id');
    if (!begDateId || begDateId == '') {
        var parentId = $(that).parents('tr').find('input[name="' + name + '"]').parent().attr('id');
        begDateId = parentId + 'inp';
        $(that).parents('tr').find('input[name="' + name + '"]').attr('id', begDateId)
    }
    var options = {};
    if (begDateId && begDateId != '') {
        // 当起始日期是今天时，截至日期大于等于今天
        //当起始日期不是今天时，截至日期大于等于今天
        var begDate = $.trim($(that).val());
        var startTime = $('#' + begDateId).val();
        if (startTime == getToday()) {
            options.minDate = '#F{$dp.$D(\'' + begDateId + '\',{d:0})}';
        } else {
            if (startTime < getToday()) {
                options.minDate = '%y-%M-%d';
            } else {
                options.minDate = '#F{$dp.$D(\'' + begDateId + '\',{d:1})}';
            }
        }

    }
    if (fn) {
        options.onpicked = function () {
            fn();
        }
    }
    WdatePicker(options);
}


//form 中input 使用  有效期开始时间
function useInInpBegDate(that, id) {
    var begDate = $.trim($(that).val());
    var endInp = $('#' + id);
    var endDate = $.trim(endInp.val());
    if (begDate != '' && endDate != '' && compareDate(endDate, begDate)) {
        endInp.val(getdifference(begDate, 1));
    }
}

//form 中input 使用   有效期截止时间
function useInInpEndDate(that, id, fn) {
    var begDateId = id
    var options = {};
    if (begDateId && begDateId != '') {
        // 当起始日期是今天时，截至日期大于等于今天
        //当起始日期不是今天时，截至日期大于等于今天
        var begDate = $.trim($(that).val());
        var startTime = $('#' + begDateId).val();
        if (startTime == getToday()) {
            options.minDate = '#F{$dp.$D(\'' + begDateId + '\',{d:0})}';
        } else {
            if (startTime < getToday()) {
                options.minDate = '%y-%M-%d';
            } else {
                options.minDate = '#F{$dp.$D(\'' + begDateId + '\',{d:1})}';
            }
        }

    }
    if (fn) {
        options.onpicked = function () {
            fn();
        }
    }
    WdatePicker(options);
}


/**
 * 比较日期大小 a是否小于b
 *
 * @param a,b
 *            日期：'2017-06-13' '2017/06/13' '2017.06.13'
 *
 */
function compareDate(a, b) {
    var reg = /-|\.|\//g;
    var aArr = a.replace(reg, '-').split('-');
    var bArr = b.replace(reg, '-').split('-');
    var begDate = new Date(aArr[0], parseInt(aArr[1]) - 1, parseInt(aArr[2]))
        .getTime();
    var endDate = new Date(bArr[0], parseInt(bArr[1]) - 1, parseInt(bArr[2]))
        .getTime();
    if (begDate < endDate) {
        return true;
    } else {
        return false;
    }
}

/*
 * getdifference 获取指定日期的间隔日期 fromDate是"yyyy-MM-dd"的日期格式，为指定日期，例如‘2014-10-10’
 * dayInterval表示间隔天数，间隔天数大于0，则得到比指定日期大dayInterval天的日期，间隔天数小于0，则得到比指定日期小dayInterval天的日期
 */
function getdifference(fromDate, dayInterval) {
    var curDate = new Date(Date.parse(fromDate.replace(/-/g, "/")));
    curDate.setDate(curDate.getDate() + dayInterval);
    var year = curDate.getFullYear();
    var month = (curDate.getMonth() + 1) < 10 ? "0" + (curDate.getMonth() + 1) :
        (curDate.getMonth() + 1);
    var day = curDate.getDate() < 10 ? "0" + curDate.getDate() : curDate
        .getDate();
    return year + "-" + month + "-" + day;
}

/**
 * 设置table表格内附件类型列select不可重复选择
 *
 * @param obj this对象
 *
 * @param tableId 需要设置的table  id
 *
 * @param selName  需要设置的select name值
 */
function selCannotRepeatChoice(obj, tableId, selName) {
    var $this = $(obj);
    var arr = [];
    var selVal = $this.val();
    $('#' + tableId).find('tr').each(function () {
        var val = $(this).find('select[name="' + selName + '"] option:selected').val();
        arr.push(val);
    });
    $this.find('option').each(function () {
        var value = $(this).val();
        if (findInArr(value)) {
            $(this).prop('disabled', true).css('color', 'rgba(0,0,0,.2)');
        } else {
            $(this).prop('disabled', false).css('color', 'rgba(0,0,0,1)');
        }
    })
    $this.find('option[value="' + selVal + '"]').prop('disabled', false).css('color', 'rgba(0,0,0,.2)');

    function findInArr(str) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == str) {
                return true;
            }
        }
        return false;
    }
}
