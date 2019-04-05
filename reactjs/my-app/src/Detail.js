import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



class Detail extends  React.Component  {



	constructor(props){
		super(props);
	
	}




	render() {

		return (<span>IO{  this.props.match.params.id}{ this.props.location.state.day}</span>);

	}
}

export default Detail;