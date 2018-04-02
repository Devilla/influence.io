import React, { Component } from 'react';
import Display from './display'
import Localization from './localization'
import Template from './template'

export default class Check extends Component {
 
 constructor(props){
 	super(props)
  	
 }	
 componentDidMount(){
 		//this.props.callbackFromParent('2')
 } 


render() {  	  
		switch (this.props.activeStatus) {
			case 1:			
			   return <Template/>
			case 2:
			   return <Display/>  
			case 3: 
		}	   return <Localization/>
	}

}


