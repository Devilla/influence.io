import React, {Component} from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';

const PaymentPage = ({stripe, profile, user, plan, planList, username, setError, stripeError, handleStateChange, handleSubmit}) => {

  const findObjectByKey = (array, key, value) => {
    for (var i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
          return array[i];
      }
    }
    return null;
  }

  const submitForm = (event) => {
    event.preventDefault();

    const options = {
      name: username,
    };
    const plans = profile &&
        planList?findObjectByKey(planList, '_id', plan)
      :
        {};

    stripe.createToken(options).then((result) => {
      if (result.error) {
        handleStateChange(result.error.message, 'stripeError');
      } else {
        const data = {
          amount: plans.amount,
          paymentProvider: result.token,
          paymentType: result.token.type,
          user: user._id,
          profile: profile._id,
          plan: plan,
        };
        handleSubmit(data, result.token);
      }
    });
  }

  const style = {base: {
    height: '50px',
    fontSize: '14px',
    fontFamily: 'Raleway, sans-serif',
    border: '1px solid #cccccc',
    lineHeight: '1.42857143',
    borderColor: 'hsla(0, 0%, 100%, .2)',
    borderRadius: '2px',
    fontWeight: '100',
    color: 'black',
    '::placeholder': {
      height: '30px',
      color: '#999999',
    },
  }}


    return (
        <div className="credit-form">
          <form onSubmit={(e) => submitForm(e)}>
            <CardElement
              style={style}
            />
            <div className="frmcntl">
              <input className="button submit-button w-button"
                type="submit"
                value="Next"
              />
            </div>
          </form>
        </div>
    )
}


export default injectStripe(PaymentPage);
