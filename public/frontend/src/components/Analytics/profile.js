import React, { Component } from 'react';
import { Grid, Row, Col,Table } from 'react-bootstrap';
import Card from '../utils/card'
import {profileHeader, profileData} from './data';
import $ from 'jquery';
class Profile extends Component {
    constructor(){
      super();
      this.state = {

      }
    }
   componentDidMount(){

   }
   handleBackBtn(){
       var data = {
             "url": '',
             "active": 1
       }
        this.props.callbackFromParent(data)
   }
   handleJourney(e){
      var name = $(e.target).parents('tr').find('.name').text();
      var email = $(e.target).parents('tr').find('.email').text();
         var data = {
             "name": name,
             "email": email,
             "url": this.props.url,
             "active": 3
         }
        this.props.callbackFromParent(data)
   }
    render() {
      var  data  = []
        for (var i = 0; i < profileData.length; i++) {
            data.push(
                <tr key={i}>

                    <td className="img"><img src={profileData[i].image} /></td>
                    <td className="name">{profileData[i].Name}</td>
                    <td className="email">{profileData[i].Email}</td>
                    <td className="location">{profileData[i].Location}</td>
                    <td className="country">{profileData[i].country}</td>
                    <td className="social">{profileData[i].social}</td>
                    <td className="pview">{profileData[i].pview}</td>
                    <td className="lastseen">{profileData[i].lastseen}</td>
                    <td className="firstseen">{profileData[i].firstseen}</td>
                    <td><a href="javascript:;" onClick={this.handleJourney.bind(this)}>View Journey</a></td>

                </tr>
            );
        }

        return (
            <div className="content">

                <Grid fluid>

                    <Row>
                        <Col md={12}>
                            <div className="backBtn">
                            <a href="javascript:;" onClick={this.handleBackBtn.bind(this)}><i className="fas fa-chevron-left"></i> Back </a>
                            </div>
                            <Card
                                plain
                                title="Analytics"
                                category="View Profile"
                                ctTableFullWidth ctTableResponsive
                                content={
                                    <div className="text-center centertbl">
                                    <Table hover>
                                        <thead>
                                            <tr>
                                               {
                                                    profileHeader.map((prop, key) => {
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
                    <Row>
                      <Col md={12}>
                        <p className="text-center">
                        Get one of our experts to do it all for you!
                        &nbsp;
                         <a href="javascript:;">Click here</a></p>
                      </Col>
                    </Row>

                </Grid>



            </div>
        );
    }
}

export default Profile;
