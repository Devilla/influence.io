import React, {Component} from 'react';
import { Animated } from "react-animated-css";
import { ToastContainer, toast } from 'react-toastify';
import { Elements, injectStripe } from 'react-stripe-elements';
import PaymentPage from './PaymentPage';

const toastConfig = {
  position: toast.POSITION.BOTTOM_LEFT,
  autoClose: 2000
};

const TrailPayment = ({ user, profile, plan, selectedPlan, username, planList, stripeError, handleCheckChange, handleStateChange, handleSubmit }) => {

  const renderPlan = () => {
    return planList?planList.map(plans => {
      return <div className="card" style={{ width: '50%', padding: '5%'}}>
        <div className="card-body">
          <h5 className="card-title">{plans.planName}</h5>
          <span className="card-text">
            {plans.planType}
          </span>
          <p className="card-text">
            <h5>{plans.amount}</h5>
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

  return (
    <div>
      <div className="authpage section innerpage">
        <div className="container">
          <div className="flow-wrapper">
            <Animated className="leftwrap center" animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
              <div className="loginfrm">
                <h3 className="dashed">Confirm you account</h3>
                <div className="section-divider-line"></div>
                <div className="frmcntl" style={{display: 'flex', justifyContent: 'center'}}>
                  {renderPlan()}
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
  );
}


export default TrailPayment;
