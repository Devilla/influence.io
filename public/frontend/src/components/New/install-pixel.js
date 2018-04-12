import React, { Component } from 'react';
import {
    Grid, Row, Col,  FormGroup, ControlLabel, FormControl,ButtonToolbar,Button
} from 'react-bootstrap';

import Tabs from './template/tab';
import Highlight from 'react-highlight';
class InstallPixel extends Component{
  constructor(){
    super();
    this.state = {

    };

  }
  activeState(val){
    var data = {'tab' : val};
    this.props.callbackFromParent(data);
  }
  render(){
    return (
            <div className="content">
                <Grid fluid>
                       <Tabs active="2" callbackFromParent ={this.activeState.bind(this)}/>
                   <div className="tabscontent">
                       <Row>
                        <Col md={12}>
                           <h4>Install Pixel to Your Website</h4>
                        </Col>
                       </Row>
                       <Row>
                         <Col md={12}>
                            <small>Follow the instructions below Or Get Our <a href="javascript:;">Expert's Help</a></small><br/>
                            <small>If you're using a third-party platform (Wordpress, Squarespace, etc) there are <a href="javascript:;">instructions here</a>.</small>
                            <p>&nbsp;</p>
                          </Col>
                       </Row>
                        <Row>
                          <Col md={12}>
                            <h4>Step 1 </h4>
                            <FormGroup controlId="formstep1">
                               <ControlLabel>Add Code:  Copy & Paste this code into The Header. Add this to every page of your website that you plan to track, display or capture.</ControlLabel>
                              <Highlight innerHTML={false}>
                                {`<script src="https://cdninfluence.nyc3.digitaloceanspaces.com/influence-analytics.js"></script>
                                  <script> new Influence({
                                trackingId:   ${this.props.campaign?this.props.campaign.trackingId:'INF-XXXXXXX'}
                                    });
                                  </script>` }
                              </Highlight>
                              <ButtonToolbar>
                                <Button bsStyle="default" className="blue" bsSize="small">
                                  Verify Pixel Status
                                </Button>
                                <Button bsSize="small" bsStyle="default">Copy to clipboard</Button>
                              </ButtonToolbar>
                            </FormGroup>
                           </Col>
                       </Row>
                       <Row>
                          <Col md={12}>
                            <h4>Step 2 </h4>
                            <FormGroup controlId="formstep2">
                               <ControlLabel>Wait for your Pixel to get 'Live': Look for 'Your Pixel Status' shown above. Status will show 'Live' when active.</ControlLabel>
                            </FormGroup>
                           </Col>
                       </Row>
                       <Row>
                            <Col md={12}>
                                <div className="px-2 py-2 text-center font-small-2">
                                  Problem in getting Pixel Live?  To make sure that you installed correctly, please visit our '<a href="javascript:;">Help Guides</a>' or '<a href="javascript:;">Installation Videos</a>' or Get 'Our Help'
                                </div>

                            </Col>
                       </Row>
                       <Row>
                            <Col md={12}>
                                <p>&nbsp;</p>
                                <div className=" text-right">
                                    <a href="javascript:;" className="blue btn">Next >></a>
                                </div>
                            </Col>
                       </Row>
                   </div>

                 </Grid>
            </div>
    );
  }
}


export default InstallPixel;
