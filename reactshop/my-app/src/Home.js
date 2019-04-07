import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Home extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			items: []
		}
	}

	componentDidMount(){
		fetch("http://localhost/all-in-one/All-in-one/php/interface/wordpress_post.php")
		.then(res => res.json())
		.then(
			(result) => {
				this.setState({
					isLoaded: true,
					items: result
				})
			},
			(error) => {
				this.setState({
					isLoaded: true,
					error
				})
				
			}
		
		)
	
	}

	render(){
		const {error, isLoaded, items} = this.state;
		if( error ){
	 		return  '<h2>errorr:{error.message}</h2>';	
		} else if ( !isLoaded ){
			return '<h1> loading.... </h1>';
		
		} else {
		
		 return (
		 	<div>
				 sfsf
	
	
		 	</div>
		 
		 );
		}
	
	}

}

export default Home;
