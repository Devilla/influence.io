import React, {Component} from 'react';
import { Animated } from "react-animated-css";
import { ToastContainer, toast } from 'react-toastify';
import { Elements, injectStripe } from 'react-stripe-elements';
import PaymentPage from './PaymentPage';
import axios from 'axios';

const toastConfig = {
  position: toast.POSITION.BOTTOM_LEFT,
  autoClose: 2000
};

class TrailPayment extends Component {

  constructor() {
    super();
    this.state = {
      checked: false,
      externalValue: true,
      country_code: 'USD',
      rate: 0,
      planPeriod: 12
    };
  }

  componentWillMount() {
      // this.props.fetchPlan();
      this.initCountry();
      this.currencyRates();
  }

  currencyRates() {
    axios.get('https://openexchangerates.org/api/latest.json?app_id=95df1c8c28bb434cbdee931132592e21&base=USD').then((response) => {
      this.setState({rate: response.data.rates.INR})
    })
    .catch(err => {
      console.log(err);
    })
  }

  initCountry(price) {
    axios.get('https://geoip-db.com/json/geoip.php').then((response) => {
      if (response.data.country_code == 'IN') {
        this.setState({country_code: 'IN'});
      } else if(response.data.country_code == 'USD') {
        this.setState({country_code: 'USD'});
      }
    }).catch(function(error) {
      console.log(error);
    });
  }

  returnRates(price) {
    if(this.state.country_code=="IN") {
      return '₹'+Math.floor(price*this.state.rate*this.state.planPeriod);
    } else {
      return '$'+Math.floor(price*this.state.planPeriod);
    }
  }

  renderPlan() {
    const { planList, selectedPlan, handleCheckChange } = this.props;
    return planList?planList.map(plans => {
      return <div className="card" style={{ width: '50%', padding: '5%', margin: '0 1%'}}>
        <div className="card-body">
          <h5 className="card-title">{plans.planName}</h5>
          <span className="card-text">
            {plans.planType}
          </span>
          <p className="card-text">
            <h5>{this.returnRates(plans.amount)}</h5>
          </p>
          <input
            type="radio"
            value={plans._id}
            checked={
              plans._id == selectedPlan ?
                "checked"
              :
                false
              }
            id="plan"
            name="plan"
            onChange={(e) => handleCheckChange(e.target, e.target.value)}
          />
        </div>
      </div>
      })
    :
      <div>No Plan to select</div>
  }

  render() {
    const { user, profile, plan, selectedPlan, username, planList, stripeError, handleCheckChange, handleStateChange, handleSubmit } = this.props;

    return (
      <div>
        <div className="authpage section innerpage">
          <div className="container">
            <div className="flow-wrapper">
              <Animated className="leftwrap center" animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                <div className="loginfrm" style={{width: '100%'}}>
                  <h3 className="dashed">Confirm you account</h3>
                  <div className="section-divider-line"></div>
                  <div className="frmcntl" style={{display: 'flex', justifyContent: 'center', width: '100%', paddingBottom: '15px'}}>
                    {this.renderPlan()}
                  </div>
                  <div className="frmcntl">
                    <input
                      className="field w-input"
                      name="username"
                      id="username"
                      placeholder="Card Holder's Name"
                      type='text'
                      value={user.name}
                      onChange={(e) => handleStateChange(e.target.value, e.target.id)}
                      required
                    />
                  </div>
                  <div className="frmcntl" style={{padding:'5%'}}>

                    <Elements >
                      <PaymentPage
                        user={user}
                        plan={plan}
                        profile={profile}
                        planList={planList}
                        stripeError={stripeError}
                        handleStateChange={handleStateChange}
                        handleSubmit={handleSubmit}
                      />
                    </Elements>
                  </div>
                </div>
              </Animated>
            </div>
          </div>
        </div>

        <ToastContainer hideProgressBar={true} />
      </div>
    )};
}


export default TrailPayment;
