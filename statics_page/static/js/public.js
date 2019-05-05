var _iframe_src = [],
    _iframe_id = [];
var sw = $(window).width(); //
var m = document.getElementById("tab");
var n = m ? (m.offsetWidth - 24 - 15) : 0; // tab 总共可容纳的 宽度，即 上面一整行的宽度
var prvUrlInfo = {};
//$('#nav-tab').css('width',n); //
// 如果拉伸网页，会出现左右滚动

function showLoading(par) {
    $('.loadingBlock').show();
    var defaultObj = {
        hideTime: 6000
    };
    $.extend(defaultObj, par);

    setTimeout(function () {
        hideLoading();
    }, defaultObj.hideTime)

}

function hideLoading() {
    $('.loadingBlock').hide();
}

$(document).ready(function () {
    //插件的初始化
    $('#mainFrameTabs').bTabs({
        //登录界面URL，用于登录超时后的跳转
        'loginUrl': 'http://xxx.com/login',
        //用于初始化主框架的宽度高度等，另外会在窗口尺寸发生改变的时候，也自动进行调整
        'resize': function () {
            //这里只是个样例，具体的情况需要计算
            //$('#mainFrameTabs').height(100);
        }
    });

    //打开新标签

    $('.submenu>li>a').on('click', function () {
        $('.btabs').removeClass("activeted");
        $('.hover-tab').removeClass("activeted");
        $(this).addClass("activeted");
        var href_id = $(this).parent().attr('mid');
        var href_title = this.firstChild.nodeValue;
        var href_url = $(this).parent().attr('data-href');
        if (_iframe_src.indexOf(href_url) < 0) {
            console.log('新增',href_url,'___',_iframe_src.length);
            //if (_iframe_src.length >= 12) {
            if ($('ul#nav-tab li').length >= 12) {
                dialog({
                    title: '提示',
                    content: '您已打开12个tab页了，再开可能会导致浏览器崩溃~'
                }).showModal();
                return;
            }
            _iframe_src.push(href_url);
            _iframe_id.push(href_id);
        }

        $('#mainFrameTabs').bTabsAdd(href_id, href_title, href_url, '', {
            backFlag: true
        });

        // 打开tab  设置默认值width
        open_initWidthTab();
    });

    //开关事件
    var real_toggle = $('#real_toggle')
    real_toggle.on('click', function () {
        var flag = real_toggle.attr('data-flag');
        if (flag == 'open') {
            real_toggle.attr('data-flag', 'close');
            $('#main-content').css('padding', '0');
            $('#sidebar-con').css('display', 'none');
            $('#real_toggle img').attr('src', "static/images/btn_close.png")
        } else {
            real_toggle.attr('data-flag', 'open');
            $('#main-content').css('padding', '0 0 0 190px');
            $('#sidebar-con').css('display', 'block');
            $('#real_toggle img').attr('src', "static/images/btn_open.png")
        }
    });
})
//申请点击事件
$('.operate').on('click', 'button', function (event) {
    event.stopPropagation();
    $(this).filter('.batch-apply').siblings('.clickApplyItem').stop().toggle();
});
// 菜单栏title全展示
$('.submenu>li .second,.submenu>li .third').hover(function () {
    $(this).find('.second-title').stop().fadeToggle();
    $(this).find('.third-title').stop().fadeToggle();
    $(this).find('.clickApplyItem').hide();
});
$('.apply').click(function () {
    var id = $(this).attr('mid');
    var title = $(this).attr('data-title');
    var url = $(this).attr('data-href')
    $('#mainFrameTabs').bTabsAdd(id, title, url);
})
$('.import').click(function (e) {
    e.stopPropagation();
    var id = $(this).attr('mid');
    var title = $(this).attr('data-title');
    var url = $(this).attr('data-href')
    $('#mainFrameTabs').bTabsAdd(id, title, url);
})
$('.download').click(function (e) {
    e.stopPropagation();
    var id = $(this).attr('mid');
    var title = $(this).attr('data-title');
    var url = $(this).attr('data-href')
    $('#mainFrameTabs').bTabsAdd(id, title, url);
})
//li， 不给宽度
// 打开tab  设置默认值width
function open_initWidthTab() {
    //tab 签   当屏幕宽度不够的时候动态设置单个宽度
    var tab_li = $('#nav-tab li');
    var curAllTabWidth = 0;
    // $('#nav-tab li.active').attr('data-width',$('#nav-tab li.active').outerWidth(true));

    $(tab_li).each(function (index, item) {
        curAllTabWidth += $(item).width() + 14; // 14： 每个签的margin 左右 值
    })
    if (curAllTabWidth >= n) {
        //console.log('宽度不够了')
        $(tab_li).each(function (index, item) {
            if (index != 0) {
                //      $(item).css('width',n / (_iframe_src.length+1) - 14);
                //   $(item).find('a').css('width','75%');
            }
        })
    } else {
        //console.log('宽度还够')
    }
};

function reset_tabWidth() {
    //当 打开12个之后开始关闭tab 动态设置 tab width
    var tab_li = $('#nav-tab li');
    var initTabWidth = 0;
    $(tab_li).each(function (index, item) {
        if (index != 0) {
            initTabWidth += Number($(item).attr('data-width'));
        }
    })
    var _length = $('#nav-tab li').length - 1;
    if (initTabWidth <= (n - 51 - 14)) { // 51  ：首页tab 的width值   14：首页tab的margin 值
        $('#nav-tab li[data-width]').css('width', 'auto');
        $('#nav-tab li[data-width]').find('a').css('width', '100%');
    } else {
        $('#nav-tab li[data-width]').css('width', ((n - 51 - 14) / _length) - 16);
    }
}

// 删除 单个tab
function bTabsClose(which) {
    var cur_tab_btn_href = $(which).prev('a').attr('href');
    var cur_tab_btn_id = cur_tab_btn_href.replace('#bTabs_', '');
    delTabById(cur_tab_btn_id);
    reset_tabWidth();
}

//通过ID  删除tab
function delTabById(ID) {
    var cur_index = _iframe_id.indexOf(ID);
    _iframe_src.splice(cur_index, 1); // 移除 当前的src
    _iframe_id.splice(cur_index, 1); // 移除当前的 id
}

//新增tabs
function openTabs(href_id, href_title, href_url, paramObj) {
    if ($('ul#nav-tab li').length >= 12) {
        dialog({
            title: '提示',
            content: '您已打开12个tab页了，再开可能会导致浏览器崩溃~'
        }).showModal();
        return false;
    }
    var cur = $('#nav-tab li.active');
    var id = cur.find('a').attr('href').replace('#bTabs_', '');
    var title = cur.find('a').attr('title');
    var url = $(cur.find('a').attr('href') + " iframe").attr('src');
    prvUrlInfo[id] = {
        href_id: id,
        href_title: title,
        href_url: url
    };

    _iframe_src.push(url)
    _iframe_id.push(id)

    $('#mainFrameTabs').bTabsAdd(href_id, href_title, href_url, '', paramObj);
}

//右键菜单
window.oncontextmenu = function () {
    return false;
}
$("#nav-tab").delegate('li', 'mousedown', function (e) {
    if (e.which == 3) {
        $(this).contextMenu('jqContextMenu', {
            //菜单样式
            menuStyle: {
                listStyle: 'none',
                padding: '0px',
                margin: '0px',
                backgroundColor: 'rgb(255, 255, 255)',
                border: '1px solid rgb(153, 153, 153)',
                width: '100px'
            },
            //菜单项样式
            itemStyle: {
                margin: '0px',
                color: 'rgb(0, 0, 0)',
                display: 'block',
                cursor: 'default',
                padding: '3px',
                border: '1px solid rgb(255, 255, 255)',
                backgroundColor: 'transparent'
            },
            //菜单项鼠标放在上面样式
            itemHoverStyle: {
                backgroundColor: 'rgb(182,189,210)',
                borderColor: 'rgb(10,36,106)'
            },
            //事件
            bindings: {
                'item_1': function (t) { // 重新加载
                    reloadPage(t);
                    // 首页重新加载：2018-8-10(崔笑笑))
                    // if (curHref == 'bTabs_navTabsMainPage') {
                    //     // location.reload();
                    //     onIndexLoad();
                    // } else {
                    //     var _src = $("#" + curHref + " iframe").attr('src');
                    //     $("#" + curHref + " iframe").attr('src', _src)
                    // }
                },
                'item_2': function (t) { // 关闭标签
                    closeTabs(t);
                },
                'item_3': function (t) { //  关闭全部 标签
                    var nav_li = $('#nav-tab>li');
                    confirmDialogReturn({
                        theme: "提示",
                        msg: "确定关闭全部标签？",
                        cb: function (e) {
                            if (e) {
                                for (var i = 1; i < nav_li.length; i++) {
                                    var _href = $(nav_li[i]).find('a').attr('href');
                                    _href = _href.replace('#', '');
                                    $('#mainFrameTabs').bTabsClose(_href);

                                }
                            }
                            _iframe_src.splice(0, _iframe_src.length);
                            _iframe_id.splice(0, _iframe_id.length);
                        }
                    });
                },
                'item_4': function (t) { // 关闭 其它 标签
                    var curHref = $(t).find('a').attr('href');
                    curHref = curHref.replace('#', ''); //  当前tab  的链接
                    var nav_li = $('#nav-tab>li') // 获取所有的tab
                    confirmDialogReturn({
                        theme: "提示",
                        msg: "确定关闭其他标签？",
                        cb: function (e) {
                            if (e) {
                                for (var i = 1; i < nav_li.length; i++) {
                                    var _href = $(nav_li[i]).find('a').attr('href');
                                    _href = _href.replace('#', '');
                                    if (curHref != _href) {
                                        $('#mainFrameTabs').bTabsClose(_href);
                                    }
                                }
                                var tab_li = $('#nav-tab li');
                                $(tab_li).each(function (index, item) {
                                    if (index != 0) {
                                        $('#nav-tab li[data-width]').css('width', 'auto');
                                        $('#nav-tab li[data-width]').find('a').css('width', '100%');
                                    }
                                })
                            }
                        }
                    });
                    _iframe_src.splice(0, _iframe_src.length);
                    _iframe_id.splice(0, _iframe_id.length);

                    _iframe_src.push($('#menuSideBar li[mid=' + curHref.replace('bTabs_', '') + ']').attr('data-href'));
                    _iframe_id.push(curHref.replace('bTabs_', ''));
                }
            }
        })
    }
})

//重载
function reloadPage(t) {

    var curHref = $(t).find('a').attr('href'),
        curHref = curHref.replace('#', ''),
        _src = $("#" + curHref + " iframe").attr('src'),
        curIframe = $("#" + curHref + " iframe");

    if (curIframe.contents().find('#reloadBtn').length) {
        confirmDialogReturn({
            theme: "提示",
            msg: "确定重新加载页面，保存数据将丢失？",
            cb: function (e) {
                if (e) {
                    curIframe.attr('src', _src);
                }
            }
        });
    } else {
        curIframe.attr('src', _src);
    }

}

//关闭本页面
function closeTabs(f, data) {
    var curHref = $(f).find('a').attr('href');
    var ID = $(f).find('a').attr('mid');
    curHref = curHref.replace('#', '');
    var cur_index = _iframe_id.indexOf(ID);
    if (curHref != 'bTabs_navTabsMainPage') {
        $('#mainFrameTabs').bTabsClose(curHref, data);
        delTabById(curHref);
        _iframe_src.splice(cur_index, 1); // 移除 当前的src
        _iframe_id.splice(cur_index, 1); // 移除当前的 id
    }

    reset_tabWidth()
}

//confirm 提示
function confirmDialogReturn(json) {
    var d = dialog({
        title: json.theme,
        content: json.msg,
        width: 300,
        height: 30,
        button: [{
                value: '确定',
                callback: function () {
                    d.close().remove();
                    typeof json.cb == 'function' ? json.cb(true) : ''
                    return true;
                },
                autofocus: true
            },
            {
                value: '取消',
                callback: function () {
                    d.close().remove();
                    typeof json.cb == 'function' ? json.cb(false) : ''
                    return false;
                }
            }
        ],
        cancel: false,
    });
    d.showModal();
}

//头部系统设置的下拉菜单
$('.topSet').click(function () {
    $('.setList').toggle();
})
//账号设置
$('.accountSet').click(function () {
    var id = $(this).attr('mid');
    var title = $(this).attr('data-title');
    var url = $(this).attr('data-href')
    $('#mainFrameTabs').bTabsAdd(id, title, url);
})
//分公司角色权限
$('.roleAuthority').click(function () {
    var id = $(this).attr('mid');
    var title = $(this).attr('data-title');
    var url = $(this).attr('data-href')
    $('#mainFrameTabs').bTabsAdd(id, title, url);
})
// 底部出现滚动条
// window.onload = function () {
//     var a = document.body.clientWidth - 190; //取得iframe框架的实际宽度
//     // alert(a);  //弹出数值测试
//     document.getElementById("mainFrameTabs").style.width = a + "px";
// }
