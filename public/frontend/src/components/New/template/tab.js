import React, { Component } from 'react';
import {
    Grid, Row, Col, Nav,NavItem
} from 'react-bootstrap';
import {connect} from 'react-redux';
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
    if(this.props.active)
      val = this.props.active-1;
    else
      val = 1;
  }
    render(){
      return (
          <div className="content tabs">
              <Grid fluid>
                  <Row>
                      <Col md={12}>
                       <CommonCard
                         url={this.props.campaign
                           ? this.props.campaign.websiteUrl
                           : 'http://localhost:3000'}
                         notification={this.props.campaign
                           ? this.props.campaign.campaignName
                           : 'http://localhost:3000'}
                        content = {
                         <Nav bsStyle="pills" className="tabmenu" justified activeKey={val}  onSelect={k => this.handleSelect(k)}>
                            <NavItem eventKey={1} title="Install Pixel">
                              <i className="fas fa-cog"></i> Install Pixel
                            </NavItem>
                            <NavItem eventKey={2} title="Notifications">
                              <i className="fas fa-chart-line"></i> Notifications
                            </NavItem>
                            <NavItem eventKey={3} title="Configure" >
                              <i className="far fa-bell"></i> Configure
                            </NavItem>
                            <NavItem eventKey={4} title="Capture Leads">
                              <i className="fas fa-chart-line"></i> Capture Leads
                            </NavItem>
                            <NavItem eventKey={5} title="Display">
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

const mapStateToProps = state => ({
  campaign: state.getIn(['campaign', 'campaign']),
});

export default connect(mapStateToProps)(Tabs);
