import React, { Component } from 'react';
import {  Row, Col } from 'react-bootstrap';
import {connect} from 'react-redux';
import LeftView from './left-view'
import RightView from './right-view'
import Localization from '../localization';
import { fetchOneRules, createRules, updateRules, clearRules } from '../../../../ducks/rules';

export class Display extends Component{
  constructor(){
    super();
    this.state = {
      hideNotification: false,
      loopNotification: false,
      delayNotification: false,
      closeNotification: false,
      hideAnonymous: false,
      displayNotifications: false,
      initialDelay: 120,
      displayTime: 120,
      delayBetween: 120,
      displayPosition: 'bottom'
    };
    this.handleStateChange = this.handleStateChange.bind(this);
    this.saveRules = this.saveRules.bind(this);

  }

  componentDidMount() {
    if(this.props.campaign)
      this.props.fetchOneRules(this.props.campaign._id);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.rules != this.props.rules) {
      this.setRules(nextProps.rules);
    }
  }

  setRules(rules) {
    this.setState({
      hideNotification: rules.hideNotification,
      loopNotification: rules.loopNotification,
      delayNotification: rules.delayNotification,
      closeNotification: rules.closeNotification,
      hideAnonymous: rules.hideAnonymous,
      displayNotifications: rules.displayNotifications,
      initialDelay: rules.initialDelay,
      displayTime: rules.displayTime,
      delayBetween: rules.delayBetween,
      displayPosition: rules.displayPosition
    });
  }

  handleStateChange(state, value){
    this.setState({[state]: value});
  }

  saveRules() {
    const rules = !this.props.rules?null:this.props.rules;
    let rule = this.state;
    rule['campaign']=this.props.campaign._id;
    if(rules) {
      rule['id'] = rules._id;
      this.props.updateRules(rule);
    } else {
      this.props.createRules(rule)
    }
  }

  render(){
    return (
      <div className="card plain inner-display" style={{width:'95%'}}>
        <div className="content">
          <Row>
            <Col xs={6}>
              <LeftView
                handleStateChange={this.handleStateChange}
                {...this.state}
              />
           </Col>
            <Col xs={6}>
               <RightView
                 handleStateChange={this.handleStateChange}
                 {...this.state}
               />
            </Col>
           </Row>
           <Row>
            <Col md={12}>
                <div className="text-right">
                  <button href="javascript:;" className="btn btn-default blue" onClick={this.saveRules}>
                    Save
                    <i className="fas fa-angle-right"></i>
                  </button>
                </div>
            </Col>
           </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  rules: state.getIn(['rules', 'rule']),
  campaign: state.getIn(['campaign', 'campaign']),
});

const mapDispatchToProps = {
  fetchOneRules,
  createRules,
  updateRules,
  clearRules
};

export default connect(mapStateToProps, mapDispatchToProps)(Display);


// export default Display;
