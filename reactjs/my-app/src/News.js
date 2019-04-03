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
		fetch("https://api.example.com/items")
		.then(res => res.json())
		.then(
			(result) => {
			  this.setState({
			    isLoaded: true,
			    items: result.items
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
    return (
    	<div>
    	<h1>ok,it is</h1>
    	</div>
    );
   }
}








export default News;
