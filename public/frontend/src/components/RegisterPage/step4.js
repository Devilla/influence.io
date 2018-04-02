import React, { Component } from 'react';
import MaskedInput from 'react-maskedinput'
import { Link } from 'react-router';
export default class Step4 extends Component {
  constructor(){
    super();

  }

   componentDidMount(){
     window.scrollTo(0, 0)
   }



  render() {
    return (
        <div>
           <h3 className="dashed">Confirm you account</h3>
           <div className="section-divider-line"></div>
           <p>Try any plan free for 7 days</p>
            <div className="frmcntl">
                    <select className="field w-input" >
                      <option>Startups</option>
                      <option>Small Businesses</option>
                      <option>Advanced</option>
                      <option>Pro</option>
                    </select>
                </div>
                 <div className="frmcntl cc">
                    <MaskedInput className="field w-input ccname"
                    mask="1111 1111 1111 1111" name="card"
                    placeholder="Credit Card" size="20" />
                    <MaskedInput mask="11/1111" name="expiry" className="field w-input expiry"
                    placeholder="mm/yyyy" />
                    <MaskedInput  mask="111"  name="cvv" className="field w-input cvv"
                    placeholder="CVV" />

                  </div>
                 <div className="frmcntl">
                      <input className="button submit-button w-button"
                       type="button"
                       value="Next"  />
                    </div>

             <div className="frmcntl register_link">
                    <em>Your card will not be charged until the end of your 7-day trial.</em>
                    <br/>
                    Self-cancel at any time
               </div>

               <div className="frmcntl register_link">
                    <br/>
                    <br/>
                    <b>Our 24/7 Support is there to help you at every step.</b>
               </div>
        </div>
    );
  }
}
