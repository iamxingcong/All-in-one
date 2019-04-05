import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



class News extends  React.Component  {

	constructor(props){
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			items: [],
		
		};
	}

	componentDidMount(){
		fetch("http://localhost/a/show_clms.php")
		.then(res => res.json())
		.then(
			(result) => {
			  this.setState({
			    isLoaded: true,
			    items: result
			  });
			},
			// 注意：需要在此处处理错误
			// 而不是使用 catch() 去捕获错误
			// 因为使用 catch 去捕获异常会掩盖掉组件本身可能产生的 bug
			(error) => {
			  this.setState({
			    isLoaded: true,
			    error
			  });
			}
		)
	}



	render() {
		const {error, isLoaded, items} = this.state;
		if( error ){
			return <div> Error: {error.message} </div>;
		}else if( !isLoaded ){
			return <div> 正在加载 ... </div>
		} else {

			return (
				<div>

				
					 
						{items.map(item => (

							<div key = {item.ID}>	
								<h2>{item.post_title}</h2>
								<div>{item.post_title}</div>

						<Link  to={{
						        pathname: `detail/${item.ID}`,
						        state: {day: 'koo'}
						        }}>点击跳转
						</Link> 


								<div>{  item.ID  }</div>
								
							</div>
						) )}
					 
				</div>
			);
		}
	}
}








export default News;
