$(function () {

    //绑定初始数据
    var gridData = [];
    for (var i = 0; i < 13; i++) {
        gridData.push({
            rowNum: i,
            containerType: 'data_' + i,
            containerLength: 'data_' + i,
            containerWidth: 'data_' + i,
            containerHeight: 'data_' + i,
            containerCubage: 'data_' + i,
            containerLoadBearing: 'data_' + i
        })
    }
    $("#info_table").XGrid({
        data: gridData,
        colNames: ["容器类型", "长(cm)", "宽(cm)", "高(cm)", "体积(cm³)", "容器承重(kg)"],
        colModel: [{
            name: "containerType"
        }, {
            name: "containerLength"
        }, {
            name: "containerWidth"
        }, {
            name: "containerHeight"
        }, {
            name: "containerCubage"
        }, {
            name: "containerLoadBearing"
        },],
        key: "rowNum",
        rowNum: 10,
        multiselect: true,
        rowList: [10, 20, 50],
        altRows: true,
        pager: "#grid_pager"
    });

    //新增事件
    $("#add_btn").on('click', function () {
        var that = this;
        utils.dialog({
            title: '新增',
            width: 500,
            height: 365,
            content: $('#add_dialog'),
            okValue: '保存',
            cancelValue: '取消',
            onshow: function () {
                //$(this.node).find('.ui-dialog-content').css({"overflow-y": 'scroll'});
            },
            ok: function () {
                //保存按钮回调
            },
            cancel: function () {
            },
            onclose: function () {

            },
        }).showModal();
    });

    //选择货位事件
    $("#select_cargosite_btn").on("click", function () {
        var that = this;
        utils.dialog({
            title: '选择货位',
            width: 1000,
            /*height: 515,*/
            align: 'center center',
            content: $("#select_cargosite_dialog"),
            okValue: '',
            cancelValue: '',
            onshow: function () {
                //$(this.node).find('.ui-dialog-content').css({"overflow-y": 'scroll'});
                getSelectCargositeTableData();
            },
            onclose: function () {

            },
        }).showModal();
    });

    //选择货位dialog的table绑定数据
    function getSelectCargositeTableData() {
        var gridData = [];
        for (var i = 0; i < 13; i++) {
            gridData.push({
                rowNum: i,
                containerType: 'data_' + i,
                containerLength: 'data_' + i,
                containerWidth: 'data_' + i,
                containerHeight: 'data_' + i,
                containerCubage: 'data_' + i,
                containerLoadBearing: 'data_' + i
            })
        }

        $("#select_cargosite_table").XGrid({
            data: gridData,
            colNames: ["容器类型", "长(cm)", "宽(cm)", "高(cm)", "体积(cm³)", "容器承重(kg)"],
            colModel: [{
                name: "containerType"
            }, {
                name: "containerLength"
            }, {
                name: "containerWidth"
            }, {
                name: "containerHeight"
            }, {
                name: "containerCubage"
            }, {
                name: "containerLoadBearing"
            },],
            key: "rowNum",
            rowNum: 10,
            selectandorder: false,
            /*rowList: [10, 20, 50],*/
            altRows: true,
            pager: "#grid_pager_select_cargosite_table"
        });
    }

    //修改、批量修改
    $("#edit_btn,#batch_edit_btn").on("click", function () {
        var that = this;
        var title;
        if (that.id == "edit_btn") {
            title = "暂存区修改"
        } else if (that.id == "batch_edit_btn") {
            title = "暂存区批量修改"
        }

        var seleRow = $("#info_table").XGrid("getSeleRow");

        utils.dialog({
            title: title,
            width: 600,
            height: 260,
            content: bindEditDialogHtml(that.id),
            okValue: '保存',
            cancelValue: '取消',
            onshow: function () {
                //$(this.node).find('.ui-dialog-content').css({"overflow-y": 'scroll'});
            },
            ok: function () {
                //保存按钮回调
            },
            cancel: function () {
            },
            onclose: function () {

            },
        }).showModal();
    });

    //修改、批量修改拼装html
    function bindEditDialogHtml(id) {
        var html = [];

        html.push('<div class="content">');
        html.push('<div class="panel panel-default">');
        html.push('<div class="panel-body">');
        html.push('<div class="row">');

        if (id == "edit_btn") {
            html.push('<div class="col-md-6">');
            html.push('<div class="input-group">');
            html.push('<span class="input-group-addon">暂存区编号：</span>');
            html.push('<span class="input-group-addon text-align-left">Y99-97</span>');
            html.push('</div>');
            html.push('</div>');

            html.push('<div class="col-md-6">');
            html.push('<div class="input-group">');
            html.push('<span class="input-group-addon">货位地址：</span>');
            html.push('<span class="input-group-addon text-align-left">Y99-97</span>');
            html.push('</div>');
            html.push('</div>');
        } else if (id == "batch_edit_btn") {
            html.push('<div class="col-md-6">');
            html.push('<div class="input-group">');
            html.push('<span class="input-group-addon">暂存区起始编号：</span>');
            html.push('<input type="text" class="form-control">');
            html.push('</div>');
            html.push('</div>');

            html.push('<div class="col-md-6">');
            html.push('<div class="input-group">');
            html.push('<span class="input-group-addon">暂存区终止编号：</span>');
            html.push('<input type="text" class="form-control">');
            html.push('</div>');
            html.push('</div>');
        }

        html.push('<div class="col-md-12">');
        html.push('<div class="input-group">');
        html.push('<h4>修改内容</h4>');
        html.push('</div>');
        html.push('</div>');

        html.push('<div class="col-md-6">');
        html.push('<div class="input-group">');
        html.push('<span class="input-group-addon">业务类别</span>');
        html.push('<select class="form-control">');
        html.push('<option value="0">请选择</option>');
        html.push('<option value="1">锁定</option>');
        html.push('<option value="2">占用</option>');
        html.push('<option value="3">空闲</option>');
        html.push('</select>');
        html.push('</div>');
        html.push('</div>');

        html.push('<div class="col-md-6">');
        html.push('<div class="input-group">');
        html.push('<span class="input-group-addon">提货方式</span>');
        html.push('<select class="form-control">');
        html.push('<option value="0">请选择</option>');
        html.push('<option value="1">锁定</option>');
        html.push('<option value="2">占用</option>');
        html.push('<option value="3">空闲</option>');
        html.push('</select>');
        html.push('</div>');
        html.push('</div>');

        html.push('<div class="col-md-6">');
        html.push('<div class="input-group">');
        html.push('<span class="input-group-addon">暂存区类别</span>');
        html.push('<select class="form-control">');
        html.push('<option value="0">请选择</option>');
        html.push('<option value="1">锁定</option>');
        html.push('<option value="2">占用</option>');
        html.push('<option value="3">空闲</option>');
        html.push('</select>');
        html.push('</div>');
        html.push('</div>');

        html.push('<div class="col-md-6">');
        html.push('<div class="input-group">');
        html.push('<span class="input-group-addon">暂存区配送方向</span>');
        html.push('<select class="form-control">');
        html.push('<option value="0">请选择</option>');
        html.push('<option value="1">锁定</option>');
        html.push('<option value="2">占用</option>');
        html.push('<option value="3">空闲</option>');
        html.push('</select>');
        html.push('</div>');
        html.push('</div>');

        html.push('<div class="col-md-6">');
        html.push('<div class="input-group">');
        html.push('<span class="input-group-addon">是否锁定</span>');
        html.push('<select class="form-control">');
        html.push('<option value="0">请选择</option>');
        html.push('<option value="1">锁定</option>');
        html.push('<option value="2">占用</option>');
        html.push('<option value="3">空闲</option>');
        html.push('</select>');
        html.push('</div>');
        html.push('</div>');

        html.push('</div>');
        html.push('</div>');
        html.push('</div>');
        html.push('</div>');

        return html.join("");
    }

});