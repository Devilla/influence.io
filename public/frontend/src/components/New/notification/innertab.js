import React, { Component } from 'react';
import {  Row, Col,NavItem,Nav } from 'react-bootstrap';
import Check from './check'
export class InnerTabs extends Component{
constructor(){
  super();
  this.state = {
    active : 1
  }
}
componentWillUpdate(){

}
handleSelect(selectedKey) {
  this.setState({active: selectedKey})
}
 render(){
        return (
            <div className="configNoti">
                  <Row>
                        <Col xs={12}>
                            <Nav bsStyle="tabs" bsClass="innertab" justified activeKey={this.state.active} onSelect={this.handleSelect.bind(this)}>
                                <NavItem eventKey={1}>
                                  <i className="fab fa-react"></i> Template
                                </NavItem>
                                <NavItem eventKey={2}>
                                  <i className="fas fa-tv"></i> Display
                                </NavItem>
                                <NavItem eventKey={3}>
                                  <i className="fas fa-globe"></i> Localization
                                </NavItem>
                              </Nav>
                              <Check  activeStatus = {this.state.active}/>
                        </Col>
                     </Row> 
                
            </div>
        );
    }
}

export default InnerTabs;

