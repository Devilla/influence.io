import React, { Component } from 'react';
import {  Row, Col } from 'react-bootstrap';
import {Templates} from './message-template/template'
export class Template extends Component{
    render(){
        return (
            <div className="card card-stats inner-display">
                <div className="content">
                  <Row>
                        <Col xs={6}>
                            <div className="header">
                                <h3>Message Template</h3>
                            </div>
                        </Col>
                        <Col xs={6}>
                            <div className="header np-border">
                                <h3>Appearance Settings</h3>
                            </div>
                        </Col>                
                 </Row> 
                 <Row>
                    <Col xs={12}>
                        <Templates/>
                    </Col>
                 </Row>                  
                   
                </div>
            </div>
        );
    }
}

export default Template;
