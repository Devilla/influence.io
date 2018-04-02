import React, { Component } from 'react';
import {
    Grid, Row, Col, Table,  ControlLabel, InputGroup, FormControl,ButtonToolbar,Button 
} from 'react-bootstrap';
import CardHeader from './template/card-with-header'
import FormInputs from './template/FormTemp';
import Tabs from './template/tab'
import CardTable from './template/card-with-page-table'
import {pagethArray,pagetdArray} from './template/data'
class ConfigLeads extends Component{
  constructor(){
    super();
    this.state = {
       
    }
   
  }  
  activeState(val){     
      this.props.callbackFromParent(val)
  }
    render(){
        var  tasks  = []
        for (var i = 0; i < pagetdArray.length; i++) {
            tasks.push(
                <tr key={i}>      
                   <td className="serial">{i+1}</td>
                   <td className="url">{pagetdArray[i].url}</td>
                   <td className="status"><span className={pagetdArray[i].class}></span> {pagetdArray[i].status}</td>
                   <td><a href="javascript:;"><i className="far fa-trash-alt"></i></a> </td>
                </tr>
            );
        }
        return (
            <div className="content">
                <Grid fluid>   
                       <Tabs active="2" callbackFromParent ={this.activeState.bind(this)}/>
                   <div className="tabscontent">
                       <Row>   
                        <Col md={12}>
                           <h4>Details Of Your Lead Capturing Page</h4>     
                        </Col>
                       </Row> 
                       <Row>
                         <Col md={12}>
                            <p>Enter URL of page you are capturing conversions on. </p>
                            <small>This page must have:<br/>
                                    <i className="fas fa-angle-right"></i> An email form field<br/>
                                    <i className="fas fa-angle-right"></i> Your Pixel installed (if not, Go to Install Pixel)</small>
                            <p>&nbsp;</p>
                          </Col>
                       </Row>      
                       <Row>
                        <Col md={12}>
                           <div className="input-group">
                              <input type="text" className="form-control txtpageurl" placeholder="Page URL" aria-describedby="urladd"/>
                              <span className="input-group-btn" id="urladd">
                                <a className="btn btn-raised btn-primary blue" href="javascript:;">Add</a>
                              </span>
                            </div>

                        </Col>                        
                       </Row>  
                       <Row>
                        <Col md={12}>
                            <div className="status">
                                <ul>
                                  <li><span className="green"></span> Active</li>
                                  <li><span className="blue"></span> Last seen over 24 hrs ago</li>
                                  <li><span className="yellow"></span> Has Never Been Tracked</li>
                                  <li><span className="red"></span> Invalid URL</li>
                                </ul>
                              </div>
                        </Col>
                       </Row>                          
                       <Row>
                        <Col md={12}>
                            <CardTable
                                content ={
                                    <div className="text-center centertbl">
                                        <Table>
                                            <thead>
                                             <tr>
                                               {
                                                    pagethArray.map((prop, key) => {
                                                        return (
                                                        <th  key={key}>{prop}</th>
                                                        );
                                                    })
                                                }
                                            </tr>

                                        </thead>
                                        <tbody>
                                            {
                                                tasks
                                            }
                                        </tbody>
                                        </Table>
                                    </div>
                                }
                            />
                        </Col>
                       </Row>

                            
                       

                       <Row>

                          <div className="text-center">  
                            <Col md={12}> 
                            <p>&nbsp;</p> <p>&nbsp;</p>                              
                                  Having problems with Auto Lead Capture in your current setup? &nbsp;&nbsp; <a href="javascript:;" className="btn blue btn-sm">Use Webhook Integration</a>                                
                            </Col>                            
                           </div>
                       </Row>
                       <Row>
                          <Col md={6}>
                                <p>&nbsp;</p>
                                <div className=" text-left">
                                    <a href="javascript:;" className="btn btn-default"> <i className="fas fa-angle-left"></i> Back</a>
                                </div>
                            </Col>
                            <Col md={6}>
                                <p>&nbsp;</p>
                                <div className=" text-right">
                                    <a href="javascript:;" className="blue btn btn-default">Next <i className="fas fa-chevron-right"></i></a>
                                </div>
                            </Col>
                       </Row>




                   </div> 
                      
                 </Grid>   
            </div>
        );
    }
}


export default ConfigLeads;

