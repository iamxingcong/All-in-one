import React, {Component} from 'react';
  


class News extends  React.Component  {

	constructor(props){
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			items: []
		};
	}

	componentDidMount(){
		fetch("http://localhost/all-in-one/All-in-one/php/interface/wordpress_post.php")
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
								<div>{item.post_content}</div>

							</div>
						) )}
					 
				</div>
			);
		}
	}
}








export default News;
