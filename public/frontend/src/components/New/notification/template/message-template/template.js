import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Card } from '../common'
import Switch from 'react-flexible-switch';
import { Notification } from '../common/notification'
import { Setting } from '../common/settings'

export class Templates extends Component {
  constructor() {
    super();
    this.state = {
      recentActivity: true,
      liveActivity: true,
      bulkActivity: true,
      notificationPanelStyle: {   // TODO: Take style values from server
        radius: 35,
        borderWidth: 0,
        borderColor: { r: 200, g: 200, b: 200, a: 1 },
        shadow: 0,
        blur: 2,
        color: {r: 0, g: 0, b: 0},
        backgroundColor: { r: 255, g: 255, b: 255, a: 1 },
        fontFamily: 'inherit',
        fontWeight: 'normal'
      }
    }
  }
  handleRecentChange(e) {
    this.setState({
      recentActivity: e
    })
  }
  handleLiveActivity(e) {
    this.setState({
      liveActivity: e
    })
  }
  handleBulkActivity(e) {
    this.setState({
      bulkActivity: e
    })
  }

  handleNotificationStyleChange = style => {
    const notificationStyle = Object.assign({}, this.state.notificationPanelStyle);
    notificationStyle[style.prop] = style.value;
    this.setState({
      notificationPanelStyle: notificationStyle
    });
  };

  render() {
    return (
      <div>
        <Row>
          <Col md={12}>
            <Card title="Recent User Activity"
              isDisabled={this.state.recentActivity}
              status={
                <Switch
                  circleStyles={{ onColor: 'blue', offColor: 'gray', diameter: 18 }}
                  switchStyles={{ width: 50 }}
                  cssClass="alignsame"
                  value={this.state.recentActivity}
                  onChange={this.handleRecentChange.bind(this)}
                />
              }
              content={
                <Row>
                  <Col md={6}>
                    <Notification notificationPanelStyle={this.state.notificationPanelStyle} />
                  </Col>
                  <Col md={6}>
                    <Setting notificationPanelStyle={this.state.notificationPanelStyle} onConfigChange={this.handleNotificationStyleChange} />
                  </Col>
                </Row>
              }

            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Card title="Live Activity"
              isDisabled={this.state.liveActivity}
              status={
                <Switch
                  circleStyles={{ onColor: 'blue', offColor: 'gray', diameter: 18 }}
                  switchStyles={{ width: 50 }}
                  cssClass="alignsame"
                  value={this.state.liveActivity}
                  onChange={this.handleLiveActivity.bind(this)}
                />
              }
              content={
                <Row>
                  <Col md={6}>
                    sdfs
                            </Col>
                  <Col md={6}>
                    sfsffs
                            </Col>
                </Row>
              }

            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Card title="Bulk Activity"
              isDisabled={this.state.bulkActivity}
              status={
                <Switch
                  circleStyles={{ onColor: 'blue', offColor: 'gray', diameter: 18 }}
                  switchStyles={{ width: 50 }}
                  cssClass="alignsame"
                  value={this.state.bulkActivity}
                  onChange={this.handleBulkActivity.bind(this)}
                />
              }
              content={
                <Row>
                  <Col md={6}>
                    sdfs
                            </Col>
                  <Col md={6}>
                    sfsffs
                            </Col>
                </Row>
              }

            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Templates;
