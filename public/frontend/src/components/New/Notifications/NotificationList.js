import React, { Component } from 'react';
// import { NotificationTemplate } from '../notification/template/message-template/NotificationTemplate'
// import { Rules } from '../notification/template/Rules/Rules'
import {Row, Col} from 'react-bootstrap';
import {Card} from '../notification/template/common';

const NotificationList = ({notificationList, configure}) => {

  const renderNotifications = () => {
    return notificationList.map(notification =>
      <Col md={4}>
        <div className="card"
          style={{
            width: "25rem",
            margin: "0 auto",
            borderRadius: '10px'
          }}
          >
          <div className="view gradient-card-header blue-gradient"
            style={{
              padding: '1.6rem 1rem',
              textAlign: 'center',
              border: '1px solid #ececf1',
              backgroundColor: 'antiquewhite',
              borderTopRadiusLeft: '10px',
              borderTopRadiusRight: '10px'
            }}
            >
            <h2 className="h2-responsive">{notification.notificationType}</h2>
            <p>{notification.notificationName}</p>
          </div>
          <div style={{padding: '10px'}}>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              {/* <a href="#" className="btn btn-primary">Configure</a> */}
            </div>
          </div>
          <div className="button-config" onClick={() => configure(notification)} style={{ cursor:'pointer'}} data-toggle="modal" data-target="#notificationModal">
            <ul className="list-unstyled list-inline font-small mt-3" style={{ margin: '0 auto', padding: '10px'}}>
              <li className="list-inline-item pr-2 white-text" style={{display: 'flex', justifyContent: 'center'}}>
                Configure
              </li>
            </ul>
          </div>
        </div>
      </Col>
    )
  };

  return (
    <div>
      {renderNotifications()}
    </div>
  );
}

export default NotificationList;
