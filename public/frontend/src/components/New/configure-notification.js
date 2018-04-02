import React, { Component } from 'react';
import {
    Grid, Row, Col
} from 'react-bootstrap';
import Tabs from './template/tab'
import InnerTabs from './notification/innertab'
class ConfigNotification extends Component{
  constructor(){
    super();
    this.state = {
       
    }
   
  }  
   activeState(val){
      var data = {'tab' : val}  
      this.props.callbackFromParent(data)
   }
    render(){      
        return (
            <div className="content">
                <Grid fluid>  
                 <Tabs active="3" callbackFromParent ={this.activeState.bind(this)}/> 
                  <InnerTabs/>  
                      
                 </Grid>   
            </div>
        );
    }
}


export default ConfigNotification;

