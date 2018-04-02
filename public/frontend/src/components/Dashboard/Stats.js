import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

class StatsCard extends Component{
    render(){
        return (
            <div className={this.props.statsClass}>
                <div className="content">
                    <Row>
                        <Col xs={12}>
                            <div className="icon-big text-center">                        
                                {this.props.statsValue}
                            </div>
                        </Col>
                        </Row>
                        <Row>
                        <Col xs={12}>
                            <div className="text-center">
                                <p className="border-top">{this.props.statsText}</p>                                
                            </div>
                        </Col>
                        </Row>
                    
                   
                </div>
            </div>
        );
    }
}

export default StatsCard;
