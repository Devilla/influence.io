import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Table } from 'react-bootstrap';
import Card from 'components/utils/card'
// import { thArray, tdArray } from './data';
import Switch from 'react-flexible-switch';
import {getCookie} from 'components/Common/function';
import moment from 'moment';

import { fetchCampaign } from 'ducks/campaign';


const notificationFields = [ 'S.No', 'Campaign', 'Domain', 'Status', 'Tracking ID', 'Log', 'Modified', 'Created' ];

class Notification extends Component {
  constructor() {
    super();
    this.state = {
      notifications: [],
    }
  }

  componentDidMount() {
    this.props.fetchCampaign();
  }

  // Map the notification data into table rows and return
  getNotificationRows = () => {
    return this.props.campaigns?this.props.campaigns.map((campaign, i) => (
      <tr key={campaign._id}>
        <td>{i + 1 /* S.No */}</td>
        <td>{campaign.campaignName}</td>
        <td><i className="fas fa-globe"></i> <a href={campaign.websiteUrl} target="_blank">{campaign.websiteUrl}</a></td>
        <td>
          {
            campaign.isActive ?
              <Switch switchStyles={{ width: 50 }}
                value={campaign.isActive}
                locked
                circleStyles={{ onColor: 'blue', offColor: 'blue', diameter: 18 }}
              />
              : <Switch switchStyles={{ width: 50 }}
                value={campaign.isActive}
                locked
                circleStyles={{ onColor: 'gray', offColor: 'gray', diameter: 18 }}
              />
          }
        </td>
        <td>{campaign.trackingId}</td>
        <td>{campaign.log}</td>
        <td>{moment(campaign.updatedAt).format('MM/DD/YYYY')}</td>
        <td>{moment(campaign.createdAt).format('MM/DD/YYYY')}</td>
      </tr>
    ))
    :
      <div></div>
  }

  render() {
    console.log(this.props, "========notification");
    return (
      <div className="content">
        <Grid fluid>

          <Row>
            <Col md={12}>
              <Card
                plain
                title="Manage Notifications"
                category=""
                ctTableFullWidth ctTableResponsive
                content={
                  <Table hover>
                    <thead>
                      <tr>
                        {
                          notificationFields.map((prop, key) => {
                            return (
                              <th key={key}>{prop}</th>
                            );
                          })
                        }
                      </tr>
                    </thead>
                    <tbody>{ this.getNotificationRows() }</tbody>
                  </Table>
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <p className="text-center">
                Get one of our experts to do it all for you! &nbsp; <a href="javascript:;">Click here</a>
              </p>
            </Col>
          </Row>

        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  campaigns: state.getIn(['campaign', 'campaigns'])
});

const mapDispatchToProps = {
  fetchCampaign
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
