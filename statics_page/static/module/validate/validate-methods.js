$(function () {
    // 判断整数value是否等于0 
    jQuery.validator.addMethod("isIntEqZero", function (value, element) {
        value = parseInt(value);
        return this.optional(element) || value == 0;
    }, "整数必须为0");

    // 判断整数value是否大于0
    jQuery.validator.addMethod("isIntGtZero", function (value, element) {
        value = parseInt(value);
        return this.optional(element) || value > 0;
    }, "整数必须大于0");

    jQuery.validator.addMethod("integer", function (value, element) {
        var tel = /^\+?[1-9][0-9]*$/g;

        //var tel =  /^\d+$/g;   
        return this.optional(element) || (tel.test(value));

    }, "请输入非零的正整数");

    //验证支付名称
    jQuery.validator.addMethod("payName", function (value, element) {
        var pay = /^[-a-zA-Z0-9_\u4e00-\u9fa5]+$/;
        return this.optional(element) || (pay.test(value));
    }, "");

    jQuery.validator.addMethod("floattwo", function (value, element) {

        var ts = parseFloat(value);

             
        var flt = /^[0-9]+([.]{1}[0-9]{1,2})?$/;
      

        //var tel =  /^\d+$/g;   
        return this.optional(element) || (flt.test(ts)) && ts > 0;

    }, "最多2位小数，且大于0");

    jQuery.validator.addMethod("floattwos", function (value, element) {

        var ts = parseFloat(value);


            var flt =  /^(-?\d+)(\.\d{1,2})?$/;


        //var tel =  /^\d+$/g;
        return this.optional(element) || (flt.test(ts)) && ts < 0;

    }, "最多2位小数， 且小于0");


    
    //大于0的整数和小数
    jQuery.validator.addMethod("isAbsInt", function (value, element) {
        var exg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
        return this.optional(element) || (exg.test(value));
    }, "数字必须为0,正整数或正小数");

    //大于等于0的数字，也可以是小数,小数两位
    jQuery.validator.addMethod("isAbsFloatTwo", function (value, element) {
        var exg = /^([+][0-9]*|[+][1-9][0-9]*)$/
        var a = /^([0-9]+(.[0-9]{2})?)$/
        return this.optional(element) || (exg.test(value)) || (a.test(value));
    }, "大于等于0的数字,两位小数");

    //包含0的正整数
    jQuery.validator.addMethod("isAbsInZero", function (value, element) {
        var exg = /^([1-9]\d*|[0]{1,1})$/;
        return this.optional(element) || (exg.test(value));
    }, "正整数");

    // 1到31的數字
    jQuery.validator.addMethod("isMinMax", function (value, element) {
        //var exg = /^([1-9]|(1|2)[0-9])|30|31$/;
        var exg = /^(1|2)[0-9]$/;
        var a = /^[1-9]$/;
        var b = /^30|31$/
        return this.optional(element) || (exg.test(value) || a.test(value) || b.test(value));
    }, "1到31的數字");

    // 判断整数value是否大于或等于0
    jQuery.validator.addMethod("isIntGteZero", function (value, element) {
        value = parseInt(value);
        return this.optional(element) || /^\d+$/.test(value);
    }, "整数必须大于或等于0");

    // 判断整数value是否不等于0 
    jQuery.validator.addMethod("isIntNEqZero", function (value, element) {
        value = parseInt(value);
        return this.optional(element) || value != 0;
    }, "整数必须不等于0");

    // 判断整数value是否小于0 
    jQuery.validator.addMethod("isIntLtZero", function (value, element) {
        value = parseInt(value);
        return this.optional(element) || value < 0;
    }, "整数必须小于0");

    // 判断整数value是否小于或等于0 
    jQuery.validator.addMethod("isIntLteZero", function (value, element) {
        value = parseInt(value);
        return this.optional(element) || value <= 0;
    }, "整数必须小于或等于0");

    // 判断浮点数value是否等于0 
    jQuery.validator.addMethod("isFloatEqZero", function (value, element) {
        value = parseFloat(value);
        return this.optional(element) || value == 0;
    }, "浮点数必须为0");

    // 判断浮点数value是否大于0
    jQuery.validator.addMethod("isFloatGtZero", function (value, element) {
        value = parseFloat(value);
        return this.optional(element) || value > 0;
    }, "浮点数必须大于0");

    // 判断金额是否大于99999999.99
    jQuery.validator.addMethod("maxValue", function (value, element) {
        value = parseFloat(value);
        return this.optional(element) || value <= 99999999.99;
    }, "金额必须小于99999999.99");

    // 判断浮点数value是否大于或等于0
    jQuery.validator.addMethod("isFloatGteZero", function (value, element) {
        value = parseFloat(value);
        return this.optional(element) || value >= 0;
    }, "浮点数必须大于或等于0");

    // 判断浮点数value是否不等于0 
    jQuery.validator.addMethod("isFloatNEqZero", function (value, element) {
        value = parseFloat(value);
        return this.optional(element) || value != 0;
    }, "浮点数必须不等于0");

    // 判断浮点数value是否小于0 
    jQuery.validator.addMethod("isFloatLtZero", function (value, element) {
        value = parseFloat(value);
        return this.optional(element) || value < 0;
    }, "浮点数必须小于0");

    // 判断浮点数value是否小于或等于0 
    jQuery.validator.addMethod("isFloatLteZero", function (value, element) {
        value = parseFloat(value);
        return this.optional(element) || value <= 0;
    }, "浮点数必须小于或等于0");

    // 判断浮点型  
    jQuery.validator.addMethod("isFloat", function (value, element) {
        return this.optional(element) || /^[-\+]?\d+(\.\d+)?$/.test(value);
    }, "只能包含数字、小数点等字符");

    // 匹配integer
    jQuery.validator.addMethod("isInteger", function (value, element) {
        return this.optional(element) || (/^[-\+]?\d+$/.test(value) && parseInt(value) >= 0);
    }, "匹配integer");

    // 判断数值类型，包括整数和浮点数
    jQuery.validator.addMethod("isNumber", function (value, element) {
        return this.optional(element) || /^[-\+]?\d+$/.test(value) || /^[-\+]?\d+(\.\d+)?$/.test(value);
    }, "数值类型，包括整数和浮点数");

    // 只能输入[0-9]数字
    jQuery.validator.addMethod("isDigits", function (value, element) {
        return this.optional(element) || /^[0-9]*$/.test(value);
    }, "只能输入0-9数字");

    // 判断中文字符 
    jQuery.validator.addMethod("isChinese", function (value, element) {
        return this.optional(element) || /^[\u0391-\uFFE5]+$/.test(value);
    }, "只能包含中文字符。");

    // 判断英文字符 
    jQuery.validator.addMethod("isEnglish", function (value, element) {
        return this.optional(element) || /^[A-Za-z]+$/.test(value);
    }, "只能包含英文字符。");

    // 手机号码验证    
    jQuery.validator.addMethod("isMobile", function (value, element) {
        var length = value.length;
        return this.optional(element) || (length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value));
    }, "请正确填写您的手机号码。");

    // 电话号码验证    
    jQuery.validator.addMethod("isPhone", function (value, element) {
        var tel = /^(\d{3,4}-?)?\d{7,9}$/g;
        return this.optional(element) || (tel.test(value));
    }, "请正确填写您的电话号码。");

    // 联系电话(手机/电话皆可)验证   
    jQuery.validator.addMethod("isTel", function (value, element) {
        var length = value.length;
        var mobile = /^1[3|4|5|7|8][0-9]\d{8}$/;
        //var tel = /^(\d{3,4}-?)?\d{7,9}$/g;
        var tel = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
        return this.optional(element) || tel.test(value) || (length == 11 && mobile.test(value));
    }, "请正确填写您的联系方式");

    // 匹配qq      
    jQuery.validator.addMethod("isQq", function (value, element) {
        return this.optional(element) || /^[1-9]\d{4,12}$/.test(value);
    }, "请输入正确的QQ");

    // 邮政编码验证    
    jQuery.validator.addMethod("isZipCode", function (value, element) {
        var zip = /^[0-9]{6}$/;
        return this.optional(element) || (zip.test(value));
    }, "请正确填写您的邮政编码。");

    // 匹配密码，以字母开头，长度在6-12之间，只能包含字符、数字和下划线。      
    jQuery.validator.addMethod("isPwd", function (value, element) {
        return this.optional(element) || /^[a-zA-Z]\\w{6,12}$/.test(value);
    }, "以字母开头，长度在6-12之间，只能包含字符、数字和下划线。");

    // 身份证号码验证
    jQuery.validator.addMethod("isIdCardNo", function (value, element) {
        //var idCard = /^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/;   
        return this.optional(element) || isIdCardNo(value);
    }, "请输入正确的身份证号码。");

    // IP地址验证   
    jQuery.validator.addMethod("ip", function (value, element) {
        return this.optional(element) || /^(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.)(([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))\.){2}([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))$/.test(value);
    }, "请填写正确的IP地址。");

    // 字符验证，只能包含中文、英文、数字、下划线等字符。    
    jQuery.validator.addMethod("stringCheck", function (value, element) {
        return this.optional(element) || /^[a-zA-Z0-9\u4e00-\u9fa5-_]+$/.test(value);
    }, "只能包含中文、英文、数字、下划线等字符");

    // 匹配english  
    jQuery.validator.addMethod("isEnglish", function (value, element) {
        return this.optional(element) || /^[A-Za-z]+$/.test(value);
    }, "请输入英文字母");

    // 匹配汉字  
    jQuery.validator.addMethod("isChinese", function (value, element) {
        return this.optional(element) || /^[\u4e00-\u9fa5]+$/.test(value);
    }, "请输入汉字");

    // 匹配中文(包括汉字和字符) 
    jQuery.validator.addMethod("isChineseChar", function (value, element) {
        return this.optional(element) || /^[\u0391-\uFFE5]+$/.test(value);
    }, "请输入中文(包括汉字和字符) ");

    // 判断是否为合法字符(a-zA-Z0-9-_)
    jQuery.validator.addMethod("isRightfulString", function (value, element) {
        return this.optional(element) || /^[A-Za-z0-9_-]+$/.test(value);
    }, "请输入合法字符(a-zA-Z0-9-_)");

    // 判断是否包含中英文特殊字符，除英文"-_"字符外
    jQuery.validator.addMethod("isContainsSpecialChar", function (value, element) {
        var reg = RegExp(/[(\ )(\`)(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\+)(\=)(\|)(\{)(\})(\')(\:)(\;)(\')(',)(\[)(\])(\.)(\<)(\>)(\/)(\?)(\~)(\！)(\@)(\#)(\￥)(\%)(\…)(\&)(\*)(\（)(\）)(\—)(\+)(\|)(\{)(\})(\【)(\】)(\‘)(\；)(\：)(\”)(\“)(\’)(\。)(\，)(\、)(\？)]+/);
        return this.optional(element) || !reg.test(value);
    }, "含有中英文特殊字符");

    jQuery.validator.addMethod("isUserName", function (value, element) {
        var reg = RegExp(/^[a-zA-Z0-9_]{4,16}$/);
        return this.optional(element) || reg.test(value);
    }, "请输入4到16位（字母，数字，下划线）");


    //身份证号码的验证规则
    function isIdCardNo(num) {　 //if (isNaN(num)) {alert("输入的不是数字！"); return false;} 
        　　
        var len = num.length,
            re;　　
        if (len == 15)　　 re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{2})(\w)$/);　　
        else if (len == 18)　　 re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\w)$/);　　
        else {
            //alert("输入的数字位数不对。"); 
            return false;
        }　　
        var a = num.match(re);　　
        if (a != null)　　 {　　
            if (len == 15)　　 {　　
                var D = new Date("19" + a[3] + "/" + a[4] + "/" + a[5]);　　
                var B = D.getYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];　　
            }　　
            else　　 {　　
                var D = new Date(a[3] + "/" + a[4] + "/" + a[5]);　　
                var B = D.getFullYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];　　
            }　　
            if (!B) {
                //alert("输入的身份证号 "+ a[0] +" 里出生日期不对。"); 
                return false;
            }　　
        }　　
        if (!re.test(num)) {
            //alert("身份证最后一位只能是数字和字母。");
            return false;
        }　　
        return true;
    }
    //车牌号校验
    function isPlateNo(plateNo) {
        var re = /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5}$/;
        if (re.test(plateNo)) {
            return true;
        }
        return false;
    }

});
(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery", "../jquery.validate"], factory);
    } else {
        factory(jQuery);
    }
}(function ($) {

    /*
     * Translated default messages for the jQuery validation plugin.
     * Locale: ZH (Chinese, 中文 (Zhōngwén), 汉语, 漢語)
     */
    $.extend($.validator.messages, {
        required: "这是必填字段",
        remote: "请修正此字段",
        email: "请输入有效的电子邮件地址",
        url: "请输入有效的网址",
        date: "请输入有效的日期",
        dateISO: "请输入有效的日期 (YYYY-MM-DD)",
        number: "请输入有效的数字",
        digits: "只能输入数字",
        creditcard: "请输入有效的信用卡号码",
        equalTo: "你的输入不相同",
        extension: "请输入有效的后缀",
        maxlength: $.validator.format("最多可以输入 {0} 个字符"),
        minlength: $.validator.format("最少要输入 {0} 个字符"),
        rangelength: $.validator.format("请输入长度在 {0} 到 {1} 之间的字符串"),
        range: $.validator.format("请输入范围在 {0} 到 {1} 之间的数值"),
        max: $.validator.format("请输入不大于 {0} 的数值"),
        min: $.validator.format("请输入不小于 {0} 的数值")
    });

}));