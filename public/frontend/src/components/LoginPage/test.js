import React, { Component } from 'react';
import {Animated} from "react-animated-css";
var CryptoJS = require("crypto-js");

export default class Banner extends Component {
  componentDidMount(){

   }
  render() {
    var abc = CryptoJS.AES.encrypt('Social Influence', 'secret key 123').toString();
    var bytes  = CryptoJS.AES.decrypt(abc, 'secret key 123');
    var plaintext = bytes.toString(CryptoJS.enc.Utf8);
    console.log("decrypted text", plaintext);
  	return (
      <div className="hero">
	      <div id="stripes">
	        <span></span>
	        <span></span>
	        <span></span>
	        <span></span>
	        <span></span>
	      </div>
        <div className="hero-overlay">
            <div className="hero-container w-container">
                <div className="hero-text-block">
                    <Animated  className="hero-title word sm" animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                      Increase Your Website Conversions Using
                    </Animated >
                    <Animated className="hero-title word" animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>{abc}</Animated>

                    <Animated className="hero-title title-2" animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>Influence helps you in converting more customers on your website by showing recent customer activity on your web pages</Animated>
                    <Animated className="hero-buttons-wrapper" animationIn="fadeInUp" animationOut="fadeOut" isVisible={true}>
                      <form className="getfrm">
                        <input type="text" placeholder="Enter Your Email" />
                        <input type="submit" className="_2 hero-button" value="Start your free trial"/>
                      </form>
                    </Animated>
                </div>

            </div>
        </div>
    </div>
  	)
  }
}
