import React, { Component } from 'react';
import {Animated} from "react-animated-css";
export default class About extends Component {
     componentDidMount(){
     window.scrollTo(0, 0)
   } 
  render() {
    return (
        <div>
            <div className="page-header"><div className="page-header-overlay">
            <div className="centered page-header-container w-container">
            <Animated className="page-header-title" animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>About us</Animated>
            </div></div></div>
            <div className="section innerpage">
                <div className="container w-container">
                    <p>We started Influence with one mission: to cut down the advertising cost and to convert more customers on your website.</p>
            <p>We use your existing customers’ data on your website and show it to your visitors so that they are socially influenced by buying behavior of people on the website.</p>
            <p>Using this tool we’ve been able to help a lot of businesses in increasing their money making and get more conversions.</p>
            <p>Social influence is the next big thing in marketing for influencing buyers to buy more.</p>
            <p>Let’s start with your free to start trial and get making more money for you.
            </p>
                   
                </div>
              </div>
        </div>
    );
  }
}
