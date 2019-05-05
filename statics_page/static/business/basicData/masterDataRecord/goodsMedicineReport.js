$(function () {

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

    $("#info_table_goods").XGrid({
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
        rowList: [10, 20, 50],
        altRows: true,
        pager: "#grid_pager_goods"
    });

    $("#info_table_report").XGrid({
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
        rowList: [10, 20, 50],
        altRows: true,
        pager: "#grid_pager_report"
    });


    $("#add_btn").on('click', function () {
        utils.dialog({
            title: '新增/编辑',
            width: 530,
            content: $("#add_edit_dialog"),
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


    var prevUploadFileName = "";//上一次上传的文件名
    $("#btnUpload").on("change", function () {

        //previewUpload("https://files.test.ybm100.com/G2/M00/03/E9/Cgo001vXwqqAaBhyAAMdLYcniyk705.png", "还收不到回归发版");
        //return false;


        var fileName = this.files[0].name;
        //是否选择了文件
        if (!fileName) {
            utils.dialog({
                title: "提示",
                width: 200,
                content: "请选择文件",
                okValue: "确定",
                ok: function () {
                }
            }).showModal();
            return false;
        }

        //重复文件
        if (prevUploadFileName != "" && prevUploadFileName == fileName) {
            utils.dialog({
                title: "提示",
                width: 300,
                content: "此文件已经上传过，请确认是否再次上传？",
                okValue: "再次上传",
                cancelValue: "取消上传",
                ok: function () {
                    UploadFileFn(function () {
                        previewUpload(list, filename);
                    });
                },
                cancel: function () {

                }
            }).showModal();
        } else {
            UploadFileFn(function () {
                previewUpload(list, filename);
            });
        }
    });

    function UploadFileFn(cb) {
        var file = $("#btnUpload")[0].files[0];
        var formData = new FormData();
        formData.append("file", file);
        formData.append("name", file.name);

        var loading = dialog({
            title: '上传中',
            fixed: true,
            width: 200,
            quickClose: false,
            cancel: false
        }).showModal();

        $.ajax({
            url: 'http://wms.dev.ybm100.com/upload/upload',
            type: 'POST',
            async: false,
            data: formData,
            processData: false,
            contentType: false,
            beforeSend: function () {
                console.log("正在上传");
            },
            success: function (data) {
                loading.close();
                if (data.code == 0) {
                    prevUploadFileName = file.name;
                    cb(data.result[0], prevUploadFileName);
                    utils.dialog({content: data.result, quickClose: false, timeout: 2000}).showModal();

                } else if (data.code == 1) {
                    utils.dialog({content: data.msg, quickClose: false, timeout: 2000}).showModal();
                } else {
                    utils.dialog({content: "上传失败", quickClose: true, timeout: 2000}).showModal();
                }
            }, error: function () {
                loading.close();
                utils.dialog({content: "上传失败", quickClose: true, timeout: 2000}).showModal();
            }, complete: function () {
                $("#btnUpload").val("");
            }
        });
    }

    function previewUpload(src, filename) {
        if (src) {
            var htmlArr = [];
            htmlArr.push("<li>");
            htmlArr.push("<span class='close-btn'>×</span>");

            if (src.lastIndexOf('.pdf') > -1) {
                htmlArr.push("<embed src='" + src + "' type='application/pdf' width='100%' height='100%' class='pre-img'>")
            } else {
                htmlArr.push("<img src='" + src + "' class='pre-img'>");
            }

            htmlArr.push("");
            htmlArr.push("<p>" + filename + "</p>");
            htmlArr.push("</li>");

            $(htmlArr.join("")).appendTo($("#previewBox").show().find("ul"));
        }
    }

    $("#previewBox").on("click", '.close-btn', function () {
        $(this).closest("li").remove();
    })

});