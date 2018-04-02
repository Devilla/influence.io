import React, { Component } from 'react';
import { Grid, Row, Col,Table } from 'react-bootstrap';
import Card from '../utils/card'
import {thArray, tdArray} from './data';
import Graph from './graph';
import $ from 'jquery';
class Analytics extends Component {
    constructor(){
      super();
      this.state = {
         url : '',
         vistor: '',
         signups: '',
         liveuser : '',
         conversion: '',
         showGraph: false

      }
    }

    handleGraph(e){
      var url = $(e.target).parents('tr').find('.website a').text(),
          vistor = $(e.target).parents('tr').find('.vistor').text(),
          signups = $(e.target).parents('tr').find('.pname b').text(),
          liveuser = $(e.target).parents('tr').find('.liveuser').text(),
          conversion = $(e.target).parents('tr').find('.conversion').text();


          this.setState({
             url : url,
             vistor: vistor,
             signups: signups,
             liveuser : liveuser,
             conversion: conversion,
             showGraph: true
          })

    }
     activeState(val){
      this.setState({
         showGraph: val,
         url : '',
         vistor: '',
         signups: '',
         liveuser : '',
         conversion: '',
      })
    }
    handleViewProfile(e){
         var url = $(e.target).parents('tr').find('.website a').text();
         var data = {
             "url": url,
             "active": 2
         }
        this.props.callbackFromParent(data)
    }

    render() {
        var  tasks  = []
        for (var i = 0; i < tdArray.length; i++) {
            tasks.push(
                <tr key={i}>

                    <td className="website"><i className="fas fa-globe"></i> <a href={tdArray[i].website} target="_blank">{tdArray[i].website}</a></td>
                    <td className="vistor">{tdArray[i].tvisitor}</td>
                    <td><a href="javascript:;" onClick={this.handleViewProfile.bind(this)} className="pname">
                        <b>{tdArray[i].signups}</b> <span>View Profile</span></a>
                    </td>
                    <td className="liveuser">{tdArray[i].liveuser}</td>
                    <td className="conversion">{
                        tdArray[i].tvisitor * tdArray[i].signups / 100
                    } %</td>
                  <td>
                    <a href="javascript:;" onClick={this.handleGraph.bind(this)}><i className="fas fa-chart-area"></i> Show Graph</a>
                  </td>
                </tr>
            );
        }
        return (
            <div className="content fill">
                <Grid fluid>

                    <Row>
                        <Col md={12}>
                            <Card
                                plain
                                title="Analytics"
                                category=""
                                ctTableFullWidth ctTableResponsive
                                content={
                                    <div className="text-center centertbl">
                                    <Table hover>
                                        <thead>
                                            <tr>
                                               {
                                                    thArray.map((prop, key) => {
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
                      <Col md={12}>
                        <p className="text-center">
                        Get one of our experts to do it all for you!
                        &nbsp;
                         <a href="javascript:;">Click here</a></p>
                      </Col>
                    </Row>

                </Grid>

               <Graph
                showGraph={this.state.showGraph}
                website = {this.state.url}
                vistor =  {this.state.vistor}
                signups = {this.state.signups}
                liveuser = {this.state.liveuser}
                conversion = {this.state.conversion}
                callbackFromParent ={this.activeState.bind(this)}

               />

            </div>
        );
    }
}

export default Analytics;
