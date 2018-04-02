import React, { Component } from 'react';
import {  Row, Col,FormGroup,FormControl } from 'react-bootstrap';
import Switch from 'react-flexible-switch';
class RightView extends Component{
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
       		<div className="pnl np-border">
       			<Row>
       				 <Col md={8}>
                          <span className="mt-5">Initial delay in starting first notification</span>
                      </Col>
                           <Col md={4}>
                                <FormGroup>                                  
                                <FormControl
						            type="text"
						            value={this.state.limit}
						            bsSize="sm"
						            onChange={this.handlelimit}
						          />
                                </FormGroup>
                       </Col>
       			</Row>
       			<Row>
       				 <Col md={8}>
                          <span className="mt-5">Display time for each notification</span>
                      </Col>
                           <Col md={4}>
                                <FormGroup>                                  
                                <FormControl
						            type="text"
						            value={this.state.limit}
						            bsSize="sm"
						            onChange={this.handlelimit}
						          />
                                </FormGroup>
                       </Col>
       			</Row>	
       			<Row>
       				 <Col md={8}>
                          <span className="mt-5">Delay between subsequent notifications</span>
                      </Col>
                           <Col md={4}>
                                <FormGroup>                                  
                                <FormControl
						            type="text"
						            value={this.state.limit}
						            bsSize="sm"
						            onChange={this.handlelimit}
						          />
                                </FormGroup>
                       </Col>
       			</Row>		
       			
       			<Row>
       				 <Col md={12}>
                          <span className="mt-5 inline">Only show the conversions from last</span>
                     		<div className="inline">
                                <FormGroup>                                  
	                                <FormControl
							            type="text"
							            value={this.state.limit}
							            bsSize="sm"
							            onChange={this.handlelimit}
							          />
                                </FormGroup>
                             </div>   
                            <span className="mt-5 inline">days</span>
                       </Col>
                     
       			</Row>
       			<Row>
       				 <Col md={12}>
                          <span className="mt-5 inline">Only display if there are at least</span>
                     		<div className="inline">
                                <FormGroup>                                  
	                                <FormControl
							            type="text"
							            value={this.state.limit}
							            bsSize="sm"
							            onChange={this.handlelimit}
							          />
                                </FormGroup>
                             </div>   
                            <span className="mt-5 inline">conversions</span>
                       </Col>
                     
	       			</Row>	
	       			                    	
                    
                     <Row>
       				 <Col md={12}>
                          <span className="mt-5 inline">Timeago threshold</span>
                     		<div className="inline">
                                <FormGroup>                                  
	                                <FormControl
							            type="text"
							            value={this.state.limit}
							            bsSize="sm"
							            onChange={this.handlelimit}
							          />
                                </FormGroup>
                             </div>   
                            <span className="mt-5 inline">(in hours)</span>
                       </Col>
                     
	       			</Row>	
              <Row>
                           <Col md={6}>
                                <span className="mt-5">Display position on Desktop</span>
                           </Col>
                           <Col md={6}>
                                <FormGroup>                                  
                                  <FormControl componentClass="select" bsSize="sm" placeholder="select">
                                      <option value="Bottom Left">Bottom Left</option>
                                          <option value="Bottom Right">Bottom Right</option>
                                          <option value="Bottom Center"> Bottom Center</option>
                                          <option value="Top Left">Top Left</option>
                                          <option value="Top Right">Top Right</option>
                                          <option value="Top Center">Top Center</option>
                                  </FormControl>
                                </FormGroup>
                           </Col> 
                        </Row>        			
       		</div>
      );

    }
    
  }  

export default RightView;  