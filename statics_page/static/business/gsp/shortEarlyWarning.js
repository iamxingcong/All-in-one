var minToMAX = true;
$(function () {
    var grid_dataY = [];
    $('#Warning_Table').XGrid({
        // url:"",
        data:grid_dataY,
        colNames: ['商品编号', '商品名称', '商品规格', '生产厂家', '商品产地','库别',
            '批号','货位号', '生产日期', '有效期至', '近效期天数', '库房名称', '库存数量'],
        postData:{
            orgCode:$("#orgNum").val(),
            sort:'asc'
        },
        colModel: [
            {
                name: 'drugCode',
                index: 'drugCode',
            }
            , {
                name: 'productName',
                index: 'productName'
            }, {
                name: 'specifications',
                index: 'specifications'
            }, {
                name: 'manufacturerName',
                index: 'manufacturerName'
            }, {
                name: 'producingArea',
                index: 'producingArea'
            }, {
                name: 'library',
                index: 'library'
            }, {
                name: 'batchNum',
                index: 'batchNum'
            },{
                name: 'locationNumber',
                index: 'locationNumber'
            },  {
                name: 'productDate',
                index: 'productDate',
            }, {
                name: 'validateDate',
                index: 'validateDate',
            }, {
                name: 'effectiveTime',
                index: 'effectiveTime',

            }, {
                name: 'storageTypeName',
                index: 'storageTypeName'
            }, {
                name: 'amount',
                index: 'amount'
            }, {
                name: 'id',
                index: 'id',
                hidden:true
            }
        ],
        key:'id',
        rowNum: 20,
        rowList:[20,50,100],
        altRows: true,//设置为交替行表格,默认为false
        rownumbers: true,//是否展示序号，多选
        ondblClickRow: function (e, c, a, b) {
            console.log('双击行事件', e, c, a, b);
        },
        onSelectRow: function (e, c, a, b) {
            console.log('单机行事件', e, c, a, b);
        },
        pager: '#grid-pager',
    });
})
