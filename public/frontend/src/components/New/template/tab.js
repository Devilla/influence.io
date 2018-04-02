import React, { Component } from 'react';
import {
    Grid, Row, Col, Nav,NavItem  
} from 'react-bootstrap';
import $ from 'jquery'
import CommonCard from './common-card';
var val = 1;
class Tabs extends Component{  
   handleSelect(e) {
     val = e;
     var data = {'active': e+1}
     this.props.callbackFromParent(data)
     
  }
  componentDidMount(){
    val = 1;
  }
    render(){
        return (
            <div className="content tabs">
                <Grid fluid>                   
                    <Row>
                        <Col md={12}>
                         <CommonCard
                          url="http://www.xyz.com"
                          notification = "Notification1" 
                          content = {    
                           <Nav bsStyle="pills" className="tabmenu" justified activeKey={val}  onSelect={k => this.handleSelect(k)}>
                              <NavItem eventKey={1} title="Install Pixel">
                                <i className="fas fa-cog"></i> Install Pixel
                                </NavItem>
                                <NavItem eventKey={2} title="Capture Leads">
                                  <i className="fas fa-chart-line"></i> Capture Leads
                                </NavItem>
                                <NavItem eventKey={3} title="Configure Notifications" >
                                  <i className="far fa-bell"></i> Configure Notifications
                                </NavItem>
                                <NavItem eventKey={4} title="Display">
                                  <i className="fas fa-tv"></i> Display
                                </NavItem>
                              </Nav>
                          }/>
                        </Col>
                    </Row>     
                 </Grid>   
            </div>
        );
    }
}

export default Tabs;

