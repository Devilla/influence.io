import React, { Component } from 'react';
import {Animated} from "react-animated-css";
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import { css } from 'glamor';
import axios from 'axios';
import Ionicon from 'react-ionicons';
function validate(password, authEmail) {
  return {
    password: password.length === 0,
    authEmail: authEmail===false
  };
}

export default class forget extends Component {
  constructor () {
    super();
    this.state = {
      email: '',
      authEmail: false
    }

  }
   componentDidMount(){
     window.scrollTo(0, 0)
   }
   handleEmailChange(evt){
    this.setState({email:  evt.target.value})
  }
   checkEmail(evt){
       var Emailexpr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
       if(!Emailexpr.test(evt.target.value)){
           $('#'+evt.target.id).addClass('has-error');
           toast("Enter a valid Email id", {
            position: toast.POSITION.BOTTOM_LEFT,
            className: css({
              background: "#dd5258",
              color: '#fff'
            }),
            autoClose: 2000
          });

       }else{
           $('.error-bg').fadeOut().html('')
            $('#'+evt.target.id).removeClass('has-error')
           this.setState({
               authEmail: true
           })
       }

    }
  handleSubmit(evt){
          if (!this.canBeSubmitted()) {
              evt.preventDefault();
              return;
          }else{
            evt.preventDefault();
            const data = {
                "email" :  this.state.email
            }

            let urls;

            if (process.env.NODE_ENV === 'production')
              urls = `${process.env.REACT_APP_PRODUCTION_URL}auth/forgot_password`;
            else
              urls = `${process.env.REACT_APP_DEVELOPMENT_URL}auth/forgot_password`

          axios.post(urls ,data).then(function(response){
              console.log(response);
              toast.info(response['data']['message'], {
                 position: toast.POSITION.BOTTOM_CENTER
              });
            }) .catch(function (error) {
              console.log(error);
              toast.info('Email Id does not exist.', {
                 position: toast.POSITION.BOTTOM_CENTER,
                 className: css({
                    background: "#dd5258",
                    color: '#fff'
                  })
              });
          });

            this.setState({
               email:'',
            })
          }
     }
   canBeSubmitted() {
    const errors = validate(
                    this.state.email,
                    this.state.password,
                    this.state.authEmail);

      const isDisabled = Object.keys(errors).some(x => errors[x]);
      return !isDisabled;
    }
  render() {
    const errors = validate(
                    this.state.email,
                    this.state.authEmail
                    );
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    const verifyCallback = response => console.log(response);
    return (
        <div>
            <div className="authpage section innerpage">
        <div className="container">
            <div className="wrapper">
            <Animated className="leftwrap center" animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                 <form onSubmit={this.handleSubmit.bind(this)} method="POST" data-name="Login Form"  className="loginfrm">
                    <h3 className="dashed">Forgot your password</h3>
                    <div className="section-divider-line"></div>
                    <div className="frmcntl">
                    Enter your email address below and we'll send you a link to reset your password.
                    </div>
                    <div className="frmcntl">

                      <input
                       className="field w-input"
                       id="email"
                       name="email"
                       value={this.state.email}
                       onBlur={this.checkEmail.bind(this)}
                       onChange = {this.handleEmailChange.bind(this)}
                       placeholder="Email Address"
                       type="email" />

                    </div>



                    <div className="frmcntl">
                      <input className="button submit-button w-button" type="submit" value="Send reset password email" />
                    </div>

                    </form>

                    <div className="support">
                      <h4>Trouble logging in?</h4>
                      <a href="javascript:;"><Ionicon icon="ios-call-outline" className="svgicons btn" fontSize="25px" color="#fff"/> Talk to our Support</a>
                    </div>

            </Animated>

        </div>
        </div>
    </div>
    <ToastContainer hideProgressBar ={true}

              />
        </div>
    );
  }
}
