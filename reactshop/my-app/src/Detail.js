import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Detail extends React.Component{
	constructor(props){
			super(props);
	}


	render(){
		return (
				<div>
					{this.props.match.params.id}
	 
				</div>
			);
	}


}
export default Detail;