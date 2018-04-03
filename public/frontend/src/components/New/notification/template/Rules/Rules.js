import React, {Component} from 'react';
import {Row, Col} from 'react-bootstrap';
import {Card} from '../common'
import Switch from 'react-flexible-switch';
import {Notification} from '../common/notification'
import {Setting} from '../common/settings'
import FormInputs from '../../../template/FormTemp';
import Button from '../../../template/customButton';

export class Rules extends Component {
  constructor() {
    super();
    this.state = {
      recentActivity: true,
      liveActivity: true,
      bulkActivity: true,
      disableSubmit: true,
    }
  }

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
    const {handleRulesSubmit, handleRuleChange} = this.props;
    return (
      <div>
        <Row>
          <Col md={12}>
            <Card title="Add Rules" isDisabled={this.state.bulkActivity} content={<form onSubmit = {
                handleRulesSubmit
              } >
              <FormInputs ncols={["col-md-6", "col-md-6"]} proprieties={
                [{
                 label : "Conversions",
                 type : "text",
                 bsClass : "form-control",
                 id:"conversions",
                 placeholder : "Conversions",
                 onChange: (e) => handleRuleChange(e.target.value, e.target.id),
                },
                 {
                 label : "Message",
                 type : "text",
                 bsClass : "form-control",
                 placeholder : "Notification Message",
                 id:"message",
                 onChange: (e) => handleRuleChange(e.target.value, e.target.id),
                }]
              }/>
              <FormInputs ncols={["col-md-6", "col-md-6"]} proprieties={[
                {
                 label : "Days",
                 id:"days",
                 type : "number",
                 bsClass : "form-control",
                 onChange: (e) => handleRuleChange(e.target.value, e.target.id),
                 placeholder : "Days"
                },
                {
                 label : "Delay",
                 id: "delay",
                 type : "number",
                 bsClass : "form-control",
                 onChange: (e) => handleRuleChange(e.target.value, e.target.id),
                 placeholder : "Notification Delay"
                }
              ]}/>
              <FormInputs ncols={["col-md-12"]} proprieties={[
                {
                 label : "Most Recent",
                 id: "mostRecent",
                 type : "text",
                 bsClass : "form-control",
                 onChange: (e) => handleRuleChange(e.target.value, e.target.id),
                 placeholder : "Most Recent"
                }
              ]}/>

              <Button bsStyle="info" pullRight="pullRight" fill="fill" type="submit" disabled={this.state.disableSubmit}>

                Submit >
              </Button>
              <div className="clearfix"></div>

            </form>}/>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Rules;
