import React, { Component } from 'react';
import Step1 from './step1'
import Step2 from './step2'
import Step3 from './step3'
import Step4 from './step4'

export default class Login extends Component {
 
 constructor(props){
 	super(props)
 	
 }	
 componentDidMount(){
 		//this.props.callbackFromParent('2')
 } 
 activeState(val){
 	this.props.callbackFromParent(val)
 }

  render() {  	  
		switch (this.props.active) {
			case 1:
			    return <Step1 callbackFromParent ={this.activeState.bind(this)}/>
			case 2:
				return <Step2 callbackFromParent ={this.activeState.bind(this)}/>
			case 3:
				return <Step3 callbackFromParent ={this.activeState.bind(this)}/>
			case 4:
				return <Step4 callbackFromParent ={this.activeState.bind(this)}/>		
		}	 
	}

}

