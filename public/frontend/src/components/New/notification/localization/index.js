import React, { Component } from 'react';
import {  Row, Col } from 'react-bootstrap';
import Switch from 'react-flexible-switch';
export class Localization extends Component{
    constructor(){
        super();
        this.state = {
            language :false
        }
     
    }
    handleLanguageChange(){

    }
    render(){
        return (
            <div className="card plain inner-display localization">
                <div className="content">
                  <Row>
                        <Col xs={6}>
                            <div className="pnl">
                                    <Row>
                                   <Col md={2}>
                                    <Switch 
                                        circleStyles={{ onColor: 'blue', offColor: 'gray',diameter: 18 }} 
                                        switchStyles={{ width: 50 }}
                                        cssClass="alignsame"
                                        value={this.state.language}
                                        onChange={this.handleLanguageChange.bind(this)}
                                       />
                                   </Col>
                                   <Col md={10}>
                                    <span className="mt-5">Only display notifications from user's city</span>
                                   </Col> 
                                </Row>
                            </div>  
                        </Col>
                        <Col xs={6}>
                            <div className="pnl np-border">
                                    <Row>
                                   <Col md={2}>
                                    <Switch 
                                        circleStyles={{ onColor: 'blue', offColor: 'gray',diameter: 18 }} 
                                        switchStyles={{ width: 50 }}
                                        cssClass="alignsame"
                                        value={this.state.language}
                                        onChange={this.handleLanguageChange.bind(this)}
                                       />
                                   </Col>
                                   <Col md={10}>
                                    <span className="mt-5">Only display notifications from user's country</span>
                                   </Col> 
                                </Row>
                            </div>  
                        </Col>
                 </Row>                   
                   
                </div>
            </div>
        );
    }
}

export default Localization;
