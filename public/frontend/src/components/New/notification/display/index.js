import React, { Component } from 'react';
import {  Row, Col } from 'react-bootstrap';
import LeftView from './left-view'
import RightView from './right-view'

export class Display extends Component{
    constructor(){
        super();
        this.state = {
            displaymap :false
        }
    }
    handleMapChange(){

    }
    render(){
        return (
            <div className="card plain inner-display">
                <div className="content">
                  <Row>
                    <Col xs={6}>
                       <LeftView/>     
                   </Col>
                    <Col xs={6}>
                       <RightView/>    
                    </Col>
                   </Row>                   
                   <Row>
                    <Col md={6}>
                        <div className="text-left"><a href="javascript:;" className="btn btn-default"><i className="fas fa-angle-left"></i> Back</a></div>
                    </Col>
                    <Col md={6}>
                        <div className="text-right"><a href="javascript:;" className="btn btn-default blue">Next <i className="fas fa-angle-right"></i></a></div>
                    </Col>
                   </Row>
                </div>
            </div>
        );
    }
}

export default Display;
