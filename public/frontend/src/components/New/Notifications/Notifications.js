import React, {Component} from 'react';
// import { NotificationTemplate } from '../notification/template/message-template/NotificationTemplate'
// import { Rules } from '../notification/template/Rules/Rules'
import {Grid, Row, Col} from 'react-bootstrap';
import {Card} from '../notification/template/common';
import {connect} from 'react-redux';
import $ from 'jquery';
import {fetchNotification, createNotification} from '../../../ducks/notification';
import {createConfiguration, fetchConfiguration, fetchCampaignConfiguration, clearConfiguration, updateConfiguration} from '../../../ducks/configuration';
import NotificationList from './NotificationList';
import NotificationConfigure from './NotificationConfigure';
import './Notifications.css';
import Tabs from '../template/tab'

class Notifications extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notification: '',
      activity: true,
      notificationPanelStyle: { // TODO: Take style values from server
        radius: 35,
        borderWidth: 0,
        borderColor: {
          r: 200,
          g: 200,
          b: 200,
          a: 1
        },
        shadow: 0,
        blur: 2,
        color: {
          r: 0,
          g: 0,
          b: 0
        },
        backgroundColor: {
          r: 255,
          g: 255,
          b: 255,
          a: 1
        },
        fontFamily: 'inherit',
        fontWeight: 'normal'
      },
      contentText: ''
    };
    this.configure = this.configure.bind(this);
    this.handleActivityChange = this.handleActivityChange.bind(this);
    this.handleNotificationStyleChange = this.handleNotificationStyleChange.bind(this);
    this.saveConfiguration = this.saveConfiguration.bind(this);
    this.backConfiguration = this.backConfiguration.bind(this);
    this.setNewConfig = this.setNewConfig.bind(this);
  }

  componentWillMount() {
    this.props.fetchNotification();
  }


  componentWillReceiveProps(nextProps) {
    if(nextProps.configuration != this.props.configuration) {
      this.setNewConfig(nextProps.configuration);
    }
  }

  setNewConfig(config) {
    if(config) {
      const panelStyle = config.panelStyle;
      this.setState({
        activity: config.activity,
        notificationPanelStyle: config.panelStyle,
        // config.panelStyle,
        contentText: config.contentText
      });
    }
  }

  setInitialState() {
    this.setState({
      notification: '',
      activity: true,
      notificationPanelStyle: { // TODO: Take style values from server
        radius: 35,
        borderWidth: 0,
        borderColor: {
          r: 200,
          g: 200,
          b: 200,
          a: 1
        },
        shadow: 0,
        blur: 2,
        color: {
          r: 0,
          g: 0,
          b: 0
        },
        backgroundColor: {
          r: 255,
          g: 255,
          b: 255,
          a: 1
        },
        fontFamily: 'inherit',
        fontWeight: 'normal'
      },
      contentText: ''
    });
  }

  componentDidMount() {
    //callbackFromParent('2')
  }

  handleActivityChange(e) {
    this.setState({activity: e})
  }

  handleNotificationStyleChange = style => {
    const notificationStyle = Object.assign({}, this.state.notificationPanelStyle);
    notificationStyle[style.prop] = style.value;
    this.setState({notificationPanelStyle: notificationStyle});
  };

  activeState(val) {
    var data = {
      'tab': val
    }
    this.props.callbackFromParent(data)
  }

  configure(notification) {
    this.setState({notification: notification});
    this.props.fetchCampaignConfiguration(this.props.campaign._id, notification._id);
  }


  saveConfiguration() {
    const configure = {
      activity: this.state.activity,
      notificationType: this.state.notification._id,
      panelStyle: this.state.notificationPanelStyle,
      contentText: this.state.contentText,
      campaign: this.props.campaign._id
    };
    let configuration = this.props.configuration.size?null:this.props.configuration;
    if(configuration && configuration._id) {
      configure['id'] = configuration._id;
      this.props.updateConfiguration(configure);
    } else {
      this.props.createConfiguration(configure);
    }
    this.props.clearConfiguration();
    this.setInitialState();
  }

  backConfiguration() {
    this.props.clearConfiguration();
    this.setInitialState();
  }

  render() {
    const {notifications} = this.props;
    return (<div className="content">
      <Grid fluid>
        <Tabs active="3" callbackFromParent={this.activeState.bind(this)}/>
        <div className="tabscontent">
          {
            !this.state.notification
              ?
                <Row>
                  <NotificationList
                    notificationList={notifications}
                    configure={this.configure}
                  />
                </Row>
              :
                <Row>
                  <NotificationConfigure
                    notification={this.state.notification}
                    activity={this.state.activity}
                    notificationPanelStyle={this.state.notificationPanelStyle}
                    handleActivityChange={this.handleActivityChange}
                    handleNotificationStyleChange={this.handleNotificationStyleChange}
                    saveConfiguration = {this.saveConfiguration}
                    backConfiguration = {this.backConfiguration}
                  />
                </Row>
            }
        </div>
      </Grid>
    </div>);
  }
}

const mapStateToProps = state => ({
  configuration: state.getIn(['configuration', 'configuration']),
  campaign: state.getIn(['campaign', 'campaign']),
  // profile: state.getIn(['profile', 'profile']),
  notifications: state.getIn(['notification', 'notifications'])
});

const mapDispatchToProps = {
  fetchNotification,
  createConfiguration,
  fetchCampaignConfiguration,
  updateConfiguration,
  clearConfiguration
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
