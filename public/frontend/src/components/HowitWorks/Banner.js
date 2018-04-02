import React, { Component } from 'react';
import { Link } from 'react-router';

import {Animated} from "react-animated-css";
export default class Banner extends Component {
  render() {
    return (

            <div className="page-header"><div className="page-header-overlay">
            <div className="centered page-header-container w-container">
            <Animated className="page-header-title" animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>How it works</Animated>
            <Animated className="page-header-title subtitle" animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
              Show your previous customer engagements to your existing buyers and win them over by social proof and convert more sales & leads for your business.</Animated>
            <Animated className="buttonwrap" animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
              <ul>
                <li>
                 <Link to="/Signup" className="btn register">Sign up</Link></li>
                <li>
                <Link to="/Login" className="btn login">Already have an account?</Link>
                </li>
              </ul>
            </Animated>
            </div></div></div>

    );
  }
}
