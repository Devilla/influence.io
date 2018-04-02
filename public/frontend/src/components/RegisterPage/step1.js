import React, { Component } from 'react';
import { Link } from 'react-router';
import {Animated} from "react-animated-css";
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import Ionicon from 'react-ionicons';
import { css } from 'glamor';
import axios from 'axios';

function validate(email, password, authEmail){
    return{
      email: email.length === 0,
      password: password.length === 0,
      authEmail: authEmail === false
  };
}

export default class Step1 extends Component {
  constructor(){
    super();
    this.state = {
       email: '',
       password: '',
       authEmail: false,
       inputType: 'password',
       nextState: 2,
       success :false
    }
    this.nextstate = this.nextstate.bind(this)
  }


   componentDidMount(){
     window.scrollTo(0, 0)
   }
   handleEmailChange(evt){
    this.setState({email: evt.target.value})
   }
   handlePasswordChange(evt){
    this.setState({password: evt.target.value})
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



   showpassword(e){
     $(e.target.nodeName).toggleClass('active');
     if($(e.target.nodeName).is('.active')){
        this.setState({
           inputType : 'text'
        })
     }else{
        this.setState({
           inputType : 'password'
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

   nextstate(){
     alert()
     //this.props.callbackFromParent(this.state.nextState);
   }

   handleForm(evt){
      if(!this.canBeSubmitted()){
          evt.preventDefault();
          return;
      }else{
        const data = {
          "email" : this.state.email,
          "password" : this.state.password

        }
        const urls = 'http://localhost:3000/usercheck';
        var self = this;
        axios.post(urls ,data).then(function(response){
              if(response['data']['success'] == false){
                toast.info(response['data']['message'], {
                  position: toast.POSITION.BOTTOM_CENTER,
                  className: css({
                    background: response['data']['background'],
                    color: '#fff'
                  })
                });
              }else{

                  var reginfo = [];
                  reginfo.push(data.email,data.password);
                  localStorage.setItem('reginfo', JSON.stringify(reginfo));
                  self.props.callbackFromParent(self.state.nextState)

              }
        }).catch(function (error) {
              console.log(error);
              toast.info('Something went wrong..', {
                 position: toast.POSITION.BOTTOM_CENTER
              });
        });

      }
   }


  render() {
    const errors = validate(
                    this.state.email,
                    this.state.password,
                    this.state.authEmail,
                    );
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return (
        <div>
            <h3 className="dashed">Let's get started</h3>
            <div className="section-divider-line"></div>
            <p>Enter your work email to access your account</p>
            <div className="frmcntl">
                      <input className="field w-input"
                        id="email"
                        name="email"
                        value={this.state.email}
                        onBlur={this.checkEmail.bind(this)}
                        onChange = {this.handleEmailChange.bind(this)}
                        placeholder="Email Address"
                        type="email" />
                    </div>
                    <div className="frmcntl">
                    <input className="field w-input"
                      id="password"
                      name="password"
                      placeholder="Password"
                      type="password"
                      value = {this.state.password}
                      onBlur = {this.handlePasswordAuth.bind(this)}
                      onChange = {this.handlePasswordChange.bind(this)}
                      placeholder="Password"
                      type={this.state.inputType} />
                     <Ionicon icon="ios-eye-outline" className="svgicons input"
                     fontSize="35px" color="#999"
                     onClick={this.showpassword.bind(this)}
                     />
                    </div>
                 <div className="frmcntl">
                      <input className="button submit-button w-button"
                       type="button"
                       value="Create Account"
                       disabled={isDisabled}
                       onClick = {this.handleForm.bind(this)}
                        />
                    </div>
               <div className="frmcntl register_link">
                      Already have an account? <Link to="/login">Login here</Link>
               </div>
            <ToastContainer hideProgressBar ={true}

              />
        </div>
    );
  }
}
