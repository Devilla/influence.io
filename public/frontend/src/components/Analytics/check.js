import React, { Component } from 'react';
import Analytics from './analytics'
import Profile from './profile'
import Journey from './journey'
export default class Check extends Component {
 
 constructor(props){
 	super(props)
 	this.state = {
 		active: 1,
 		url: ''
 	}
 	
 }	
 componentDidMount(){
 		//this.props.callbackFromParent('2')
 } 
 activeState(val){ 	 	
 	this.setState({
 		active: val.active,
 		url: val.url,
 		data: val
 	})
 }

  render() {  	  
		switch (this.state.active) {
			case 1:
			    return <Analytics callbackFromParent ={this.activeState.bind(this)}/>
			case 2:
				return <Profile url={this.state.url} callbackFromParent ={this.activeState.bind(this)}/>	
			case 3:
				return <Journey data={this.state.data} callbackFromParent ={this.activeState.bind(this)}/>		
		}	 
	}

}
