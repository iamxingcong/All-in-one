# Data Statistics
### 1. html
* 以normal_output_storage.html为例
* 文件路径
* /template/outputStorageWork/task_matching_and_scheduling/normal_output_storage.html


#### 引入文件
```html

<link rel="stylesheet" href="../../../static/module/dataStatistics/dataStatistics.css">
<script src="../../../static/module/dataStatistics/dataStatistics.js"></script>

```

#### 增加代码
```html
<div class="pull-right data-statistics" >
  <div class="data-content"></div>
  <button type="button" class="btn btn-info" id="data_statistics">
    统计
  </button>
</div>

```

### 2. js
* 以normal_output_storage.js为例
* 文件路径
* /static/business/outputStorageWork/task_matching_and_scheduling/normal_output_storage.js


#### 增加代码
```js
  var source = '共有<%=allbox%>个周转箱，当前复核台有<%=unobtain%>个周转箱未索取，<%=obtain%>个周转箱已索取'
  var method = 'get'
  var url = '/sysVersion/findAllVersionInfoList'
  var form_data = ''
  $('#data_statistics').dataStatistics({
    source: source,
    method: method,
    url: url,
    form_data: form_data
  })

```
##### 参数说明

source
* 统计数据展示的字符串
* <%=%> 中字段替换为接口返回字段

method
* 请求方式

url
* 请求路径

form_data
* 请求参数

### 3. 修改dataStatistics

* 文件路径
* /static/module/dataStatistics/dataStatistics.js


```
请求中返回值data删除，error值删除，使用ajax实际请求返回值。
```
```js
$.ajax({
                url: url,
                method: method,
                data: form_data,
                dataType: 'json',
                success: function (data) {
                    // 请求成功返回数据
                    data = {
                        "allbox": 1000,
                        "unobtain": 600,
                        "obtain": 400
                    };

                    result = tmpl(source, data);
                    $('.data-content').html(result)

                },
                error: function (error) {
                    // utils.dialog({
                    //     title: '提示',
                    //     content: '请求失败！',
                    //     timeout: 2000,
                    //     quickClose: true
                    // }).show();

                    // 请求失败
                    error = {
                        "allbox": 1000,
                        "unobtain": 600,
                        "obtain": 400
                    };

                    result = tmpl(source, error);

                    $('.data-content').html(result)
                }
            })
```
