
const express = require('express');
const app = express();
 
//解析表单的插件
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
	extended: false
}))
 
 
//创建数据库连接对象
const mysql = require('mysql');
const conn = mysql.createConnection({
	host: 'localhost',  
	user: 'root',  
	password: '',  
	database: 'wordpress', 
	multipleStatements: true
});
conn.connect();




app.get('/', function (req, res) {
   console.log("主页 POST 请求");
   res.send('Hello POST');
})

 
//查询出所有数据
app.get('/api/wp_posts', (req, res) => {
	const sqlStr = 'SELECT  * FROM wp_posts  WHERE post_status ="publish"'
	conn.query(sqlStr, (err, results) => {
		if (err) return res.json({
			err_code: 1,
			message: '数据不存在',
			affextedRows: 0
		})
		res.json({
			err_code: 200,
			message: results,
			affextedRows: results.affextedRows
		})
	})
});
 
//查询数据
app.get('/api/wp_users', (req, res) => {
	const number = req.query.number
	console.log(req.query)
	const sqlStr = 'select * from wp_users'
	conn.query(sqlStr, number, (err, results) => {
		if (err) return res.json({
			err_code: 1,
			message: '数据不存在',
			affextedRows: 0
		})
		res.json({
			err_code: 200,
			message: results,
			affextedRows: results.affextedRows
		})
	})
});
 

 
const server = app.listen(3000, function(){
	 const host = server.address().address
	 const port = server.address().port
 
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})
