import React, {Component} from 'react';
import {Grid, Row, Col, Nav, NavItem} from 'react-bootstrap';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import CommonCard from '../template/common-card';
import {Templates} from '../notification/template/message-template/template'
import { fetchNotification, createNotification } from '../../../ducks/notification';
import { createRules } from '../../../ducks/rules';
import NotificationContent from './NotificationContent';

const notificationList = [
  {
    index: 0,
    name: 'Notification 1'
  },
  {
    index: 1,
    name: 'Notification 2'
  },
  {
    index: 2,
    name: 'Notification 3'
  }
];

class SelectNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationItem: {
        index: null,
        name: ''
      },
      conversions: '',
      message: '',
      days: '',
      delay: '',
      mostRecent: ''
    };
    this.handleRuleChange = this.handleRuleChange.bind(this);
    this.handleRulesSubmit = this.handleRulesSubmit.bind(this);
    this.handleNotificationSubmit = this.handleNotificationSubmit.bind(this);
  }

  handleSelect(index) {
    const notification = notificationList[index];
    let notificationItem = Object.assign({}, this.state.notificationItem); //creating copy of object
    notificationItem.index = index;
    notificationItem.id = notification.id;
    notificationItem.name = notification.name; //updating value
    this.setState({notificationItem});
  }

  componentWillMount() {
    this.props.fetchNotification();
  }

  renderNotifications() {
    return notificationList.map((item, index) => <NavItem eventKey={index} title={item.name}>
        <i className="far fa-bell"></i>
        {item.name}
      </NavItem>);
  }

  handleRuleChange(value, target) {
    this.setState({[target]: value});
  }

  handleNotificationSubmit() {
    let notificationItem = Object.assign({}, this.state.notificationItem); //creating copy of object
    const notification = {
      notificationName: notificationItem.name,
      campaign: this.props.campaign._id,
    };
    this.props.createNotification(notification);
    notificationItem.index = 'rule';//updating value
    this.setState({notificationItem});
  }

  handleRulesSubmit(e) {
    e.preventDefault();
    const rules = {
      conversions: this.state.conversions,
      message: this.state.message,
      days: this.state.days,
      delay: this.state.delay,
      mostRecent: this.state.mostRecent,
      notificationTypes: this.props.notification._id
    };
    this.props.createRules(rules);
    browserHistory.push('notification');
  }

  render() {
    return (<div className="content tabs">
      <Grid fluid="fluid">
        <Row>
          <Col md={12}>
            <CommonCard
              url={this.props.campaign
                ? this.props.campaign.websiteUrl
                : 'http://localhost:3000'}
              notification={this.props.campaign
                ? this.props.campaign.campaignName
                : 'http://localhost:3000'}
              content={
              <div>
                <Nav bsStyle="pills" className="tabmenu" justified activeKey={this.state.notificationItem.index}  onSelect={k => this.handleSelect(k)}>
                  {this.renderNotifications()}
                </Nav>
                <NotificationContent
                  handleNotificationSubmit={this.handleNotificationSubmit}
                  handleRuleChange={this.handleRuleChange}
                  handleRulesSubmit={this.handleRulesSubmit}
                  {...this.state}
                />
              </div>
              }/>
          </Col>
        </Row>
      </Grid>
    </div>);
  }
}

const mapStateToProps = state => ({
  campaign: state.getIn(['campaign', 'campaign']),
  user: state.getIn(['auth', 'user']),
  profile: state.getIn(['profile', 'profile']),
  notification: state.getIn(['notification', 'notification'])
});

const mapDispatchToProps = {
  fetchNotification,
  createNotification,
  createRules
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectNotification);
