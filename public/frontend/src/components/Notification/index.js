import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Table } from 'react-bootstrap';
import Card from '../utils/card'
import { thArray, tdArray } from './data';
import Switch from 'react-flexible-switch';
import {getCookie} from '../../components/Common/function';
import moment from 'moment';

import { fetchNotification } from '../../ducks/notification';


const notificationFields = [ 'S.No', 'Campaign', 'Domain', 'Status', 'Tracking ID', 'Log', 'Modified', 'Created' ];

class Notification extends Component {
  constructor() {
    super();
    this.state = {
      notifications: [],
    }
  }

  componentDidMount() {
    this.props.fetchNotification();
  }

  // Map the notification data into table rows and return
  getNotificationRows = () => {
    return this.props.notifications.map((notification, i) => (
      <tr key={notification._id}>
        <td>{i + 1 /* S.No */}</td>
        <td>{notification.campaign.campaignName}</td>
        <td><i className="fas fa-globe"></i> <a href={notification.domain} target="_blank">{notification.campaign.websiteUrl}</a></td>
        <td>
          {
            notification.status ?
              <Switch switchStyles={{ width: 50 }}
                value={notification.status}
                locked
                circleStyles={{ onColor: 'blue', offColor: 'blue', diameter: 18 }}
              />
              : <Switch switchStyles={{ width: 50 }}
                value={notification.status}
                locked
                circleStyles={{ onColor: 'gray', offColor: 'gray', diameter: 18 }}
              />
          }
        </td>
        <td>{notification.trackingid}</td>
        <td>{notification.log}</td>
        <td>{moment(notification.updatedAt).format('MM/DD/YYYY')}</td>
        <td>{moment(notification.createdAt).format('MM/DD/YYYY')}</td>
      </tr>
    ));
  }

  render() {
    console.log(this.props.notifcations, "========notification");
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
  notifications: state.getIn(['notification', 'notifications'])
});

const mapDispatchToProps = {
  fetchNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
