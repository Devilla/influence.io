import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

class BottomLink extends Component{
    render(){
        return (
            <div>
                
                    <Row>
                        <Col xs={12}>
                            <p className="text-center">
                            Get one of our experts to do it all for you!  
                            &nbsp;
                         <a href="javascript:;">Click here</a></p>
                        </Col>
                    </Row>   
                   
              
            </div>
        );
    }
}

export default BottomLink;
