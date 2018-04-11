import React, {Component} from 'react';
import {Animated} from "react-animated-css";
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify'; 
import Ionicon from 'react-ionicons';
import { css } from 'glamor';
import axios from 'axios';
function validate(newPassword,verifyPassword, authEmail) {
  return {
    newPassword: newPassword.length === 0,
    verifyPassword: verifyPassword.length === 0,
    authEmail: authEmail===false
  };
}


export default class forget extends Component{
  constructor () {
    super();
    this.state = {
      newPassword: '',
      verifyPassword: '',
      authEmail: false
    }

  }
	componentDidMount(){
		window.scrollTo(0,0)
	}
  handlePasswordChange(evt){
    this.setState({newPassword:  evt.target.value})
  }
  handlePasswordverifyChange(evt){
    this.setState({verifyPassword:  evt.target.value})
  }
  handlePasswordAuth(evt){
      if(evt.target.value == ''){
        $('#'+evt.target.id).addClass('has-error');
        toast("Enter your password", {
            position: toast.POSITION.BOTTOM_LEFT,
            className: css({
              background: "#dd5258",
              color: '#fff'
            }),
            autoClose: 2000
          });
      }else
      {
         $('#'+evt.target.id).removeClass('has-error')

      }
    }
    handlePasswordverifyAuth(evt){
      if(evt.target.value == ''){
        $('#'+evt.target.id).addClass('has-error');
        toast("Enter password again to verify", {
            position: toast.POSITION.BOTTOM_LEFT,
            className: css({
              background: "#dd5258",
              color: '#fff'
            }),
            autoClose: 2000
          });
      }else
      {
         $('#'+evt.target.id).removeClass('has-error');
         this.setState({
               authEmail: true
           });

      }
    }
    handleSubmit(evt){
          if (!this.canBeSubmitted()) {
              evt.preventDefault();
              return;
          }else{
            
            evt.preventDefault();
            var token = document.location.href.split('token=')[1];
            const data = {
                "newPassword" :  this.state.newPassword,
                "verifyPassword": this.state.verifyPassword,
                "token": token

            }
            const urls = 'http://strapi.useinfluence.co/auth/reset_password';
          
          axios.post(urls ,data).then(function(response){
              toast.info(response['data']['message'], {
                 position: toast.POSITION.BOTTOM_CENTER,
                 className: css({
                  background: response['data']['background'],
                  color: '#fff'
                })
              });
            }) .catch(function (error) {
              console.log(error);
              toast.info('Something went wrong..', {
                 position: toast.POSITION.BOTTOM_CENTER
              });
          });
            
            this.setState({
               newPassword:'',
               verifyPassword: ''
            })
          }
     }
     canBeSubmitted() {
      const errors = validate(
                    this.state.newPassword,
                    this.state.verifyPassword,
                    this.state.authEmail);

        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return !isDisabled;
    }
	render(){
    const errors = validate(
                    this.state.newPassword,
                    this.state.verifyPassword,
                    this.state.authEmail
                    );
    const isDisabled = Object.keys(errors).some(x => errors[x]);
		const verifyCallback = response => console.log(response);
		return(
			<div>
            <div className="authpage section innerpage">
        <div className="container">
            <div className="wrapper">    
            <Animated className="leftwrap center" animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                 <form onSubmit={this.handleSubmit.bind(this)} method="POST" data-name="Login Form"  className="loginfrm">
                    <h3 className="dashed">Reset your password</h3>
                    <div className="section-divider-line"></div>
                   
                    <div className="frmcntl">
                      <input className="field w-input"
                         id="newPassword"
                         name="newPassword"
                         placeholder="New Password"
                         value={this.state.newPassword}
                         onBlur={this.handlePasswordAuth.bind(this)}
                         onChange = {this.handlePasswordChange.bind(this)}
                         type="password" />
                    </div>
                    <div className="frmcntl">
                      <input className="field w-input"
                         id="verifyPassword"
                         name="verifyPassword"
                         placeholder="Verify New Password"
                         value={this.state.verifyPassword}
                         onBlur={this.handlePasswordverifyAuth.bind(this)}
                         onChange = {this.handlePasswordverifyChange.bind(this)}
                         type="password" />
                    </div>
                    
                                        

                    <div className="frmcntl">
                      <input className="button submit-button w-button"
                       type="submit"
                       disabled={isDisabled}
                        value="Reset Password Now" />    
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