import React, {Component} from 'react';
import {Row, Col, FormGroup, FormControl} from 'react-bootstrap';
import Switch from 'react-flexible-switch';

class RightView extends Component {
  constructor() {
    super();
  }

  render() {
    const {
      handleStateChange,
      initialDelay,
      displayTime,
      delayBetween,
      displayPosition
    } = this.props;

    return (<div className="pnl np-border">
      <Row>
        <Col md={8}>
          <span className="mt-5">Initial delay in starting first notification</span>
        </Col>
        <Col md={4}>
          <FormGroup>
            <FormControl
              type="number"
              value={initialDelay}
              bsSize="sm"
              onChange={(e) => handleStateChange('initialDelay', e.target.value)}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <span className="mt-5">Display time for each notification</span>
        </Col>
        <Col md={4}>
          <FormGroup>
            <FormControl
              type="number"
              value={displayTime}
              bsSize="sm"
              onChange={(e) => handleStateChange('displayTime', e.target.value)}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <span className="mt-5">Delay between subsequent notifications</span>
        </Col>
        <Col md={4}>
          <FormGroup>
            <FormControl
              type="number"
              value={delayBetween}
              bsSize="sm"
              onChange={(e) => handleStateChange('delayBetween', e.target.value)}/>
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <span className="mt-5">Display position on Desktop</span>
        </Col>
        <Col md={6}>
          <FormGroup>
            <FormControl value={displayPosition} onChange={(e) => handleStateChange('displayPosition', e.target.value)} componentClass="select" bsSize="sm" placeholder="select">
              <option value="Bottom Left">Bottom Left</option>
              <option value="Bottom Right">Bottom Right</option>
              <option value="Bottom Center">Bottom Center</option>
              <option value="Top Left">Top Left</option>
              <option value="Top Right">Top Right</option>
              <option value="Top Center">Top Center</option>
            </FormControl>
          </FormGroup>
        </Col>
      </Row>
    </div>);

  }

}

export default RightView;
