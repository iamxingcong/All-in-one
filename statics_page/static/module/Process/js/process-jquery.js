;
(function ($) {
    $.fn.process = function (opt) {
        var settings = {
            steps: [],
            newsteps: []
        };
        $.each(opt, function (index, item) {
            settings.steps.push(item)
        });
        for (var i = 1; i < settings.steps.length + 1; i++) {
            var item = opt["node" + i];
            settings.newsteps.push(item)
        }
        //创建结构
        var $container = $('<ul class="process-container">');
        $.each(settings.newsteps, function (index, item) {
            var name = item.iscompany ? item.iscompany : item.name;
            if (index > 6 && index <= 13) {
                var $step = $(`<li class="process-step float-right"><span>${index+1}</span><div class="step-content">${name}</div><div class="line"></div></li>`);
            } else {
                var $step = $(`<li class="process-step"><span>${index+1}</span><div class="step-content">${name}</div><div class="line"></div></li>`);
            }
            var tempArr = [];
            if (item.records.length > 0) {
                tempArr = item.records.sort((a, b) => b.handTime - a.handTime);

                $.each(tempArr, function (e, it) {
                    if (it.handTime != null && it.handTime != '') {
                        it.handTime = moment(it.handTime).format('YYYY-MM-DD HH:mm:ss')
                    } else {
                        it.handTime = "";
                    }
                })
            }
            item.records = tempArr;
            //tips位置
            if (item.records) {
                var handler = item.records[0].company ? item.records[0].company : item.records[0].handler;
                var $tips = $('<div class="step-tips"><p>' + handler + '</p><p>' + item.records[0].handTime + '</p><p>' + item.records[0].detail + '</p></div>');
                if (item.records[0].handler) {
                    var $more = $(`<div class="tips-more">查看详情<div class="tips-modal"><i class="close">&times;</i></div></div>`);
                    var hide = '';
                    //节点详情
                    $.each(item.records, function (i, t) {
                        //判断详情信息状态
                        var status = t.status;
                        if (status == 0) {
                            status = '驳回';
                        } else if (status == 1) {
                            if(index==0){
                                status ="提交审核";
                            }else{
                                status = '审核通过';
                            }
                        } else if (status == 2) {
                            status = '审核中';
                            hide = 'child';
                        } else if (status == 4) {
                            status = '关闭'
                        }else if(status==''||status==undefined||status==null){
                            hide='child'
                        }// 判断状态为''或undefined或null
                        
                        //判断处理人
                        if (t.handler != null) {
                            t.handler = t.handler;
                        } else {
                            t.handler = "";
                        }
                        var handler = t.company ? t.company : '处理人:' + t.handler;

                        var detail_new = t.detail ? t.detail : '';
                        if(index==0){
                            var $more_cont = $(`<div class="more_cont ${hide}"><span class="node-line"></span><p class="handler">${handler}</p><p class="handTime">处理时间:${t.handTime}</p><p class="detail">状态:${status}</p></div>`);
                        }else{
                            var $more_cont = $(`<div class="more_cont ${hide}"><span class="node-line"></span><p class="handler">${handler}</p><p class="handTime">处理时间:${t.handTime}</p><p class="detail">审核状态:${status}</p><p class="detail">处理意见:${detail_new}</p></div>`);
                        }
                        
                        if (i > 2) {
                            $more.find('.tips-modal').css("overflow", "auto");
                        } else if (i < 2) {
                            $more.find('.tips-modal').removeAttr("overflow");
                        }
                        $more.find('.tips-modal').append($more_cont);
                    });
                    $tips.append($more);
                    $step.append($tips);
                }
            }
            //判断第一个节点的状态
            if(index==0){

            }
            //判断节点状态
            switch (parseInt(item.Taskstatus)) {
                case 0:
                    $step.addClass('status-return');
                    break;
                case 1:
                    $step.addClass('status-success');
                    break;
                case 2:
                    $step.addClass('status-pending');
                    break;
                case 3:
                    $step.addClass('status-notStart');
                    break;
                case 4:
                    $step.addClass('status-close');
                    break;
            }
            //判断线的状态
            if (item.linecount == 0) {
                $step.find('.line').addClass('track-1')
            } else if (item.linecount == 1) {
                $step.find('.line').addClass('track-2')
            } else if (item.linecount == 2) {
                $step.find('.line').addClass('track-3')
            } else if (item.linecount == 3 || item.linecount > 3) {
                $step.find('.line').addClass('track-4')
            };
            //判断是否为最后一步
            if (index == settings.steps.length - 1) {
                $step.addClass('step-last');
            };
            $container.append($step);
        })
        $(this).append($container);
        //绑定事件
        //查看详情模态框
        $(this).on('click', '.tips-more', function () {
            $(this).find('.tips-modal').fadeIn(300);
        });
        //关闭模态框
        $(this).on('click', '.close', function (e) {
            e.stopPropagation();
            $(this).parent().fadeOut(300);
        });
        //判断状态
        return this;
    };

})(jQuery)