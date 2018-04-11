import React, { Component } from 'react';
import {connect} from 'react-redux';
import NewUser from './new'
import InstallPixel from './install-pixel'
import ConfigLeads from './capture-leads'
import ConfigNotification from './configure-notification'
import Notifications from './Notifications/Notifications';

class Check extends Component {

 constructor(props){
 	super(props)
 	this.state = {
 		active : 1
 	}
 	this.activeState = this.activeState.bind(this);
 }
 componentDidmount(){

 }
 activeState(val){
 	if(val.tab){
 		this.setState({
 			active: val.tab.active
 		})

 	}else{
 		this.setState({
 			active: val.active
 		})
 	}

 }

  render() {
		switch (this.state.active) {
			case 1:
			   return <NewUser  callbackFromParent ={this.activeState}/>
      case 2:
			   return <InstallPixel campaign={this.props.campaign} callbackFromParent ={this.activeState}/>
			case 3:
			   return <Notifications  callbackFromParent ={this.activeState}/>
      case 4:
			   return <ConfigNotification  callbackFromParent ={this.activeState}/>
      case 5:
			   return <ConfigLeads  callbackFromParent ={this.activeState}/>
		}
	}
}

const mapStateToProps = state => ({
  campaign: state.getIn(['campaign', 'campaign'])
});

export default connect(mapStateToProps)(Check);
