import React, { Component } from 'react';
import {  Row, Col } from 'react-bootstrap';

export class Cards extends Component{
    render(){
        return (
            <div className="card card-stats journey">
                <div className="content">
                    <Row>
                        <Col xs={12}>
                            <div className="icon-big text-center">                        
                                <i className={this.props.cardIcon}></i>
                            </div>
                        </Col>
                        </Row>
                        <Row>
                        <Col xs={12}>
                            <div className="text-center">
                                <p className="border-top">{this.props.cardText}</p>                                
                            </div>
                        </Col>
                        </Row>                   
                   
                </div>
            </div>
        );
    }
}

export default Cards;

