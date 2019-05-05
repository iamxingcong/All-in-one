$(function () {
    /* 获取orgCode(子公司的唯一id) */
    var parent_orgCode = parent.$("#hidesysOrgCode").val();

    /* table_a */
    //data
    var grid_dataY = [];

    var colName = ['养护计划单据编号', '商品编号', '日期', '商品名称', '生产厂家', '批号', '货位号','商品规格', '商品产地','养护类别' ,'养护原因', '是否异常',
        '养护员', '复查结果', '不合格数量', '复查意见', '备注'
    ];
    var colModel = [{
        name: 'checkPlanCode',
        index: 'checkPlanCode',
        width: 200
    }, {
        name: 'productCode',
        index: 'productCode'
    }, {
        name: 'completionDate',
        index: 'completionDate',
    }, {
        name: 'productName',
        index: 'productName'
    }, {
        name: 'manufacturerVal',
        index: 'manufacturerVal'
    }, {
        name: 'productBatch',
        index: 'productBatch'
    }, {
        name: 'locationNumber',
        index: 'locationNumber'
    }, {
        name: 'specifications',
        index: 'specifications'
    }, {
        name: 'producingArea',
        index: 'producingArea'
    },{
        name:'checkType',
        index: 'checkType',
        formatter:function (e) {
            if(e==1){
                return "重点养护"
            }else if(e==2){
                return "普通养护"
            }else {
                return e
            }
        },
    }, {
        name: 'checkStatus',
        index: 'checkStatus',
    }, {
        name: 'checkCause',
        index: 'checkCause',
        formatter:function (e) {
            if(e==1){
                return "是"
            }else if(e==2){
                return "否"
            }else {
                return e
            }
        },
        unformat:function (e) {
            if(e=="是"){
                return 1
            }else if(e=="否"){
                return 2
            }else {
                return e
            }
        }
    } ,{
        name: 'checkName',
        index: 'checkName'
    }, {
        name: 'scalerConclusion',
        index: 'scalerConclusion',
        rowtype:'#scalerConclusion_e',
        formatter:function (e,rowtype,data) {
            if(e){
                var rowId = data.id;
                setTimeout(function () {
                    if (data.scalerConclusion&&data.scalerConclusion!='0') {
                        $('#'+data.id).find('[name=scalerConclusion], [name=indeterminacySize],[name=remark] ').attr('disabled',true);
                    } else {
                        $('#'+data.id).find('[name=scalerConclusion], [name=indeterminacySize], [name=remark]').attr('disabled',false);
                    }
                }, 0);
            }
            return e

        },
        rowEvent: function (row) {
            /* 复查结果，复查意见联动 */
            var data = row.rowData;
            var id = data.id;
            var options = ['', '2','1'];
            //data.text24 = options[data.text23];
            $('#table_a').XGrid('setRowData', id, {reviewOpinion:options[data.scalerConclusion]});
        }
    }, {
        name: 'indeterminacySize',
        index: 'indeterminacySize',
        rowtype:'#indeterminacySize_e',
        formatter:function (e,rowtype,data) {
            return e;
        },
    }, {
        name: 'reviewOpinion',
        index: 'reviewOpinion',
        formatter:function (e,rowtype,data) {
            if(e=='1'){
                return "停止销售"
            }else if(e=='2'){
                return "继续销售"
            }else {
                return e?e:""
            }
        },
        unformat:function (e,rowtype,data) {
            if(e=='停止销售'){
                return "1"
            }else if(e=='继续销售'){
                return "2"
            }else {
                return e
            }
        },
    }, {
        name: 'remark',
        index: 'remark',
        rowtype:'#remark_e',
        formatter:function (e,rowtype,data) {
            return e;
        },
    },{
        name: 'id',
        index: 'id',
        hidden:true,
        hidegrid:true,
    }];
    $('#table_a').XGrid({
        data: grid_dataY,
        postData:{
            orgCode: parent_orgCode,
        },
        colNames: colName,
        colModel: colModel,
        rownumbers: true,
        key: 'id',
        rowNum: 20,
        rowList:[20,50,100],
        altRows: true, //设置为交替行表格,默认为false
        pager: '#grid_pager',
        ondblClickRow: function (id, dom, obj, index, event) {

        },
        gridComplete: function () {

        },
        onSelectRow: function (id, dom, obj, index, event) {
            //选中事件
            //回调参数：id：本行id,dom:本行DOM元素,index:下标,event:原事件
            //console.log(id, dom, obj, index, event)
        }
    });

    /* 查询 */
    $('#searchBtn').on('click', function (e) {
        //获取form数据
        var data = $('#form_a').serializeToJSON();
        console.log(data);
        //更新表格数据
        $('#table_a').XGrid('setGridParam', {
            data: grid_dataY,
            postData: {
                startTime:$("#startTime").val(),
                endTime:$("#endTime").val(),
                orgCode: parent_orgCode

            }
        }).trigger("reloadGrid");
    });

    /* 保存 */
    $('#saveRowData').on('click', function () {
        //获取所有项
        var _arr = [];
        var data = $('#table_a').XGrid('getRowData');
        if(data.length <=0){
            utils.dialog({
                title:'提示',
                content:'当前没有可保存数据',
                okValue:'确定',
                ok:function () {}
            }).showModal()
            return false;
        }
        var flag = true;
        //校验
        if(!validform('table_form').form()) return;
        $(data).each(function (index,item) {
            //判断复查结果为不合格时，不合格数量必填
            if(item.scalerConclusion=='2'&&!item.indeterminacySize){
                utils.dialog({
                    title:"提示",
                    content:"复查结果为不合格时，不合格数量必填!",
                    timeout:2000,
                }).show();
                flag = false;
            }else if(item.scalerConclusion=='1'&&item.indeterminacySize){
                utils.dialog({
                    title:"提示",
                    content:"复查结果为合格时，不合格数量必须为空!",
                    timeout:2000,
                }).show();
                flag = false;
            }else if(item.scalerConclusion=='0'||!item.scalerConclusion){
                if(item.indeterminacySize||item.remark){
                    utils.dialog({
                        title:"提示",
                        content:"请先选择复查结果，再填写不合格数量和备注!",
                        timeout:2000,
                    }).show();
                    flag = false;
                }
            }
            var _obj = {};
            _obj.id = item.id;
            _obj.scaler_conclusion = item.scalerConclusion;
            _obj.indeterminacy_size = item.indeterminacySize;
            _obj.review_opinion = item.reviewOpinion;
            _obj.remark = item.remark;
            _arr.push(_obj)
        })
    })
});
