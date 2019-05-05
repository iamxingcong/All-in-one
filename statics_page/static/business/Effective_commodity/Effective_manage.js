$(function () {
    $("#getRowData").click(function () {
        // 单独字段校验
        // $('#a').validDom('myform')
        //提交前验证
        // console.log(validform("myform").form());
        var a = utils.dialog({
            title: '提示',
            content: '请输入正确的效期规则！',
            width: 300,
            ok: function () {
                a.close().remove();
                if (validform("myform").form()) { //验证通过 "myform"为需要验证的form的ID
                    //utils.dialog({content: '校验通过！', quickClose: true, timeout: 2000}).showModal();
                    utils.dialog({
                        content: '恭喜审核通过',
                        quickClose: true,
                        timeout: 2000
                    }).showModal();
                } else { //验证不通过
                    utils.dialog({
                        content: '校验不通过！',
                        quickClose: true,
                        timeout: 2000
                    }).showModal();
                    return false;
                }
                return false;
            },
            okValue: '我知道了'
        }).showModal();
    })
})