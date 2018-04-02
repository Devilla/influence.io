import React, { Component } from 'react';
import { Grid, Row, Col,Table } from 'react-bootstrap';
import Cards from './template/card'
import Card from '../utils/card'
import {journeyHeader, journeyData, chartdata} from './data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import $ from 'jquery';
class Journey extends Component {
    constructor(){
      super();
      this.state = {

      }
    }
   componentDidMount(){
        console.log(this.props.data)
   }
   handleBackBtn(){
       var data = {
             "url": '',
             "active": 2
       }
        this.props.callbackFromParent(data)
   }
    render() {
      var  data  = []
        for (var i = 0; i < journeyData.length; i++) {
            data.push(
                <tr key={i}>


                    <td className="date">{journeyData[i].date}</td>
                    <td className="time">{journeyData[i].time}</td>
                    <td className="visit">{journeyData[i].visit}</td>
                    <td className="click">{journeyData[i].click}</td>
                    <td className="hour">{journeyData[i].hour}</td>


                </tr>
            );
        }

        return (
            <div className="content">

                <Grid fluid>

                    <Row>
                        <Col md={12}>
                          <div className="card card-plain headtxt">
                            <div className="header">
                               <h4 className="title">Analytics Journey</h4>
                               <div className="backBtn">
                                <a href="javascript:;" onClick={this.handleBackBtn.bind(this)}><i className="fas fa-chevron-left"></i> Back </a>
                               </div>
                            </div>
                           </div>
                        </Col>
                     </Row>
                      <Row>
                          <Col md={4}>
                            <Row>
                              <Col md={6}>
                                <Cards
                                  cardIcon="far fa-bell"
                                  cardText = {this.props.data.name}
                                />
                              </Col>
                              <Col md={6}>
                                <Cards
                                  cardIcon="fas fa-envelope"
                                  cardText = {this.props.data.email}
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col md={12}>
                                <Cards
                                  cardIcon="fas fa-globe"
                                  cardText = {this.props.data.url}
                                />
                              </Col>
                            </Row>
                          </Col>
                          <Col md={8}>
                              <div className="card card-stats journey">
                              <div className="content">
                                  <Row>
                                      <Col xs={12}>
                                          <LineChart width={680} height={260} data={chartdata}
                                              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                         <XAxis dataKey="name"/>
                                         <YAxis/>
                                         <CartesianGrid strokeDasharray="3 3"/>
                                         <Tooltip/>
                                         <Legend />
                                         <Line type="monotone" dataKey="click" stroke="#8884d8" activeDot={{r: 8}}/>
                                         <Line type="monotone" dataKey="visit" stroke="#82ca9d" />
                                         <Line type="monotone" dataKey="active" stroke="#fb404b" />
                                        </LineChart>
                                      </Col>
                                  </Row>
                              </div>
                          </div>
                          </Col>
                       </Row>
                       <Row>
                          <Col md={12}>
                                <Card
                                title="Journey"
                                category=""
                                ctTableFullWidth ctTableResponsive
                                content={
                                    <div className="text-center centertbl">
                                    <Table hover>
                                        <thead>
                                            <tr>
                                               {
                                                    journeyHeader.map((prop, key) => {
                                                        return (
                                                        <th  key={key}>{prop}</th>
                                                        );
                                                    })
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                           {
                                            data
                                           }
                                        </tbody>
                                    </Table>
                                    </div>
                                }
                            />
                           </Col>
                       </Row>
                </Grid>
            </div>
        );
    }
}

export default Journey;
