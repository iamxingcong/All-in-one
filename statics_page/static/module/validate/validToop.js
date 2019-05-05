function validform(_element) {
    /*关键在此增加了一个return，返回的是一个validate对象，这个对象有一个form方法，返回的是是否通过验证*/
    return $("#" + _element).validate({
        meta: "validate",
        errorClass: "error", //errorClass定义的样式类用于验证失败的表单元素和errorElement规定的错误信息容器元素
        validClass: "success", //validClass定义的样式类用于验证成功的表单元素。
        ignore: ".ignore", //ignore属性值是一个class样式类，具有此类的表单元素就会忽略验证。
        errorElement: "span", //提示语的标签
        unhighlight: function (element, errorClass, validClass) { //验证通过
            $(element).tooltip('destroy').removeClass(errorClass);

        },
        errorPlacement: function (error, element) { //验证失败提示信息
            var top = $("#" + _element).offset().top;
            if (top > $(window).height()) {
                $('html, body').scrollTop(top);
            }
            if ($(element).next("div").hasClass("tooltip")) {
                $(element).attr("data-original-title", $(error).text()).tooltip("show");
            } else {
                $(element).attr("title", $(error).text()).tooltip("show");
            }
            setTimeout(function () {
                $(element).tooltip('destroy')
            }, 2000);
        },
        /**
         * 所有提示框显示后执行
         * errorList 所有验证失败元素集合 [{message: "这是必填字段", element: select#salesContributionClassification.form-control.{validate:{.required.:true}}.error, method: "required"}]
         * */
        errorLoad:function(errorList){
            var el=errorList[0].element;
            var top = $(el).offset().top;

            //2018.8.29,rl,bug1890,begin
            if(el.nodeName=='SELECT') return;
            //2018.8.29,rl,bug1890,end

            $('html, body').scrollTop(top-100);
        },

        rules: { //可以自定义验证
            /*username: {
              required: true,
              isUserName:true
            },
            date: {
              required: true,
              date:true
            }*/
        }
    });
    // var validator = $("#" + _element).validate();
    // validator.element("#" + _element);
}
// 单个表单校验
$.fn.extend({
    validDom: function (form) {
        var $self = $(this);
        return $('#' + form).validate({
            errorPlacement: function (error, element) { //验证失败提示信息
                var top = $self.offset().top;
                if (top > $(window).height()) {
                    $('html, body').scrollTop(top);
                }
                if ($(element).next("div").hasClass("tooltip")) {
                    $(element).attr("data-original-title", $(error).text()).tooltip(
                        "show");
                } else {
                    $(element).attr("title", $(error).text()).tooltip("show");
                }
                setTimeout(function () {
                    $(element).tooltip('destroy')
                }, 2000);
            },
        }).element($self);
    }
})

//注册表单验证
$(validform());