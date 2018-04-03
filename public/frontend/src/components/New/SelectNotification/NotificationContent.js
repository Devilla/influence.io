import React, { Component } from 'react';
import { NotificationTemplate } from '../notification/template/message-template/NotificationTemplate'
import { Rules } from '../notification/template/Rules/Rules'
import {Row, Col} from 'react-bootstrap';
import {Card} from '../notification/template/common';

export default class NotificationContent extends Component {

 constructor(props){
 	super(props)

 }
 componentDidMount(){
 		//callbackFromParent('2')
 }


render() {
  const {
    conversions,
    message,
    days,
    delay,
    mostRecent,
    handleRuleChange,
    notificationItem,
    handleRulesSubmit,
    handleNotificationSubmit
  } = this.props;
	switch (notificationItem.index) {
		case 0:
		  return <NotificationTemplate
        notificationItem={notificationItem}
        handleNotificationSubmit={handleNotificationSubmit}
      />
		case 1:
		  return <NotificationTemplate
        notificationItem={notificationItem}
        handleNotificationSubmit={handleNotificationSubmit}
      />
		case 2:
		  return <NotificationTemplate
        notificationItem={notificationItem}
        handleNotificationSubmit={handleNotificationSubmit}
      />
    case 'rule':
      return <Rules
        conversions={conversions}
        message={message}
        days={days}
        delay={delay}
        mostRecent={mostRecent}
        handleRuleChange={handleRuleChange}
        handleRulesSubmit={handleRulesSubmit}
      />
    default:
      return <Row>
        <Col md={12}>
          <Card title="Notifications" content={
            <div>
              <div>
                <h2>Select Notification Type</h2>
              </div>
              <div className="clearfix"></div>
            </div>
          }/>
        </Col>
      </Row>
      break;
    }
  }
}
