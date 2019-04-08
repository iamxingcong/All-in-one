import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



class Detail extends  React.Component  {



	constructor(props){
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			items: [],

		};
	}

	componentDidMount(){
		var ids = this.props.match.params.id;
		fetch("http://localhost/all-in-one/All-in-one/php/interface/wp_detail.php?id="+ids)
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
		const ok = items.post_content ;
		 
		 
		 

		if( error ){
			return <div> Error: {error.message} </div>;
		}else if( !isLoaded ){
			return <div> 正在加载 ... </div>
		} else {

			
			return (
				<div className='content'>
					<h1>
						{this.props.match.params.id}::
						{this.props.location.state.day}
						{items.post_title}
					</h1>
					<div className='post'>
						{   ok.replace(/wp:paragraph/g, "")    }
					</div>
				</div>
			);
		}	

	}
}

export default Detail;