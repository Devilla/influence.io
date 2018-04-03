import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import {Card} from '../common'
import Switch from 'react-flexible-switch';
import {Notification} from '../common/notification'
import {Setting} from '../common/settings'
import FormInputs from '../../../template/FormTemp';
import Button from '../../../template/customButton';

export class NotificationTemplate extends Component {
  constructor() {
    super();
    this.state = {
      recentActivity: true,
      liveActivity: true,
      bulkActivity: true,
      disableSubmit: true,
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
      }
    }
  }
  handleRecentChange(e) {
    this.setState({recentActivity: e})
  }
  handleLiveActivity(e) {
    this.setState({liveActivity: e})
  }
  handleBulkActivity(e) {
    this.setState({bulkActivity: e})
  }

  handleNotificationStyleChange = style => {
    const notificationStyle = Object.assign({}, this.state.notificationPanelStyle);
    notificationStyle[style.prop] = style.value;
    this.setState({notificationPanelStyle: notificationStyle});
  };

  isDisabled() {
    const {conversions, message, days, delay, mostRecent} = this.props;
    if (!conversions || !message || !days || !delay || !mostRecent)
      return this.setState({disableSubmit: true});
    else
      return this.setState({disableSubmit: false});
  }

  componentWillReceiveProps(nextProps) {
    this.isDisabled();
  }

  render() {
    const { handleNotificationSubmit } = this.props;
    return (<div>
      <Row>
        <Col md={12}>
          <Card title="Recent User Activity" isDisabled={this.state.recentActivity} status={<Switch
            circleStyles = {{ onColor: 'blue', offColor: 'gray', diameter: 18 }}
            switchStyles = {{ width: 50 }}
            cssClass = "alignsame"
            value = {
              this.state.recentActivity
            }
            onChange = {
              this.handleRecentChange.bind(this)
            }
            />} content={<Row > <Col md={6}>
              <Notification notificationPanelStyle={this.state.notificationPanelStyle}/>
            </Col>
            <Col md={6}>
              <Setting notificationPanelStyle={this.state.notificationPanelStyle} onConfigChange={this.handleNotificationStyleChange}/>
            </Col>
          </Row>}/>
          <Button bsStyle="info" pullRight="pullRight" fill="fill" type="button" onClick={handleNotificationSubmit} >

            Submit >
          </Button>
        </Col>
      </Row>
    </div>);
  }
}

export default NotificationTemplate;
