import React, { Component } from 'react';
import {  Row, Col,FormGroup,FormControl } from 'react-bootstrap';
import Switch from 'react-flexible-switch';
class LeftView extends Component{
    constructor(){
        super();
        this.state = {
            displaymap :false,
            limit : 120,
            notilimit: 60
        }
        this.handlelimit = this.handlelimit.bind(this);
        this.handlenotilimit =this.handlenotilimit.bind(this)
    }
    handleMapChange(){

    }
    handlelimit(e){
    	this.setState({
    		limit: e.target.value
    	})
    }
    handlenotilimit(e){
    	this.setState({
    		notilimit: e.target.value
    	})
    }
    render(){
       return (
       		<div className="pnl">
       			<Row>
                           <Col md={2}>
                            <Switch 
                                circleStyles={{ onColor: 'blue', offColor: 'gray',diameter: 18 }} 
                                switchStyles={{ width: 50 }}
                                cssClass="alignsame"
                                value={this.state.displaymap}
                                onChange={this.handleMapChange.bind(this)}
                               />
                           </Col>
                           <Col md={10}>
                            <span className="mt-5">Display Maps Only</span>
                           </Col> 
                        </Row>
                         <Row>
                           <Col md={2}>
                            <Switch 
                                circleStyles={{ onColor: 'blue', offColor: 'gray',diameter: 18 }} 
                                switchStyles={{ width: 50 }}
                                cssClass="alignsame"
                                value={this.state.displaymap}
                                onChange={this.handleMapChange.bind(this)}
                               />
                           </Col>
                           <Col md={10}>
                            <span className="mt-5">Display a custom image</span>
                           </Col> 
                        </Row> 
                        <Row>
                           <Col md={2}>
                            <Switch 
                                circleStyles={{ onColor: 'blue', offColor: 'gray',diameter: 18 }} 
                                switchStyles={{ width: 50 }}
                                cssClass="alignsame"
                                value={this.state.displaymap}
                                onChange={this.handleMapChange.bind(this)}
                               />
                           </Col>
                           <Col md={10}>
                            <span className="mt-5">Hide notifications on mobile</span>
                           </Col> 
                        </Row>  
                        
                                                
                        <Row>
                           <Col md={2}>
                            <Switch 
                                circleStyles={{ onColor: '#x4553ff', offColor: 'gray',diameter: 18 }} 
                                switchStyles={{ width: 50 }}
                                cssClass="alignsame"
                                value={this.state.displaymap}
                                onChange={this.handleMapChange.bind(this)}
                               />
                           </Col>
                           <Col md={10}>
                            <span className="mt-5">Loop notifications
                            </span>
                           </Col> 
                        </Row>   
                        <Row>
                           <Col md={2}>
                            <Switch 
                                circleStyles={{ onColor: 'blue', offColor: 'gray',diameter: 18 }} 
                                switchStyles={{ width: 50 }}
                                cssClass="alignsame"
                                value={this.state.displaymap}
                                onChange={this.handleMapChange.bind(this)}
                               />
                           </Col>
                           <Col md={10}>
                            <span className="mt-5">Randomize delay between notifications
                            </span>
                           </Col> 
                        </Row> 
                        <Row>
                           <Col md={2}>
                            <Switch 
                                circleStyles={{ onColor: 'blue', offColor: 'gray',diameter: 18 }} 
                                switchStyles={{ width: 50 }}
                                cssClass="alignsame"
                                value={this.state.displaymap}
                                onChange={this.handleMapChange.bind(this)}
                               />
                           </Col>
                           <Col md={10}>
                            <span className="mt-5">Allow users to close notifications 	
                            </span>
                           </Col> 
                     </Row>  
                      <Row>
                           <Col md={2}>
                            <Switch 
                                circleStyles={{ onColor: 'blue', offColor: 'gray',diameter: 18 }} 
                                switchStyles={{ width: 50 }}
                                cssClass="alignsame"
                                value={this.state.displaymap}
                                onChange={this.handleMapChange.bind(this)}
                               />
                           </Col>
                           <Col md={10}>
                            <span className="mt-5">Hide anonymous conversions   
                            </span>
                           </Col> 
                     </Row>
                       
                     	 
       		</div>
      );

    }
    
  }  

export default LeftView;  