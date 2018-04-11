import React, { Component } from 'react';
import {Animated} from "react-animated-css";
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import { css } from 'glamor';
import axios from 'axios';
function validate(name, email, authEmail) {
  // true means invalid, so our conditions got reversed
  return {
    name: name.length === 0,
    email: email.length === 0,
    authEmail: authEmail ===false

  };
}
export default class Contact extends Component {
  constructor () {
    super();
    this.state = {
      name : '',
      email: '',
      msg: '',
      authEmail: false
    }

  }
   componentDidMount(){
     window.scrollTo(0, 0)
   }

  handleNameChange(evt){
    this.setState({name:  evt.target.value})
  }
  handleEmailChange(evt){
    this.setState({email:  evt.target.value})
  }
  handleMsgChange(evt){
    this.setState({msg:  evt.target.value})
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
    handleNameAuth(evt){
      if(evt.target.value == ''){
        $('#'+evt.target.id).addClass('has-error');
        toast("Enter your name", {
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

    handleSubmit(evt){
          if (!this.canBeSubmitted()) {
              evt.preventDefault();
              return;
          }else{
            evt.preventDefault();
            const data = {
                "name" : this.state.name,
                "email" :  this.state.email,
                "message": this.state.msg

            }
            
            let urls;
            if (process.env.NODE_ENV === 'production')
              urls = `${process.env.REACT_APP_PRODUCTION_URL}contact`;
            else
              urls = `${process.env.REACT_APP_DEVELOPMENT_URL}contact`

            // toast.success('Thank you for your query', {
            //      position: toast.POSITION.BOTTOM_CENTER
            // });

            axios.post(urls ,data).then(function(response){
              toast.info('We will get back to you shortly', {
                 position: toast.POSITION.BOTTOM_CENTER
              });
            }) .catch(function (error) {
              console.log(error);
          });





            this.setState({
               name : '',
               email:'',
               msg: ''
            })
          }
     }



    canBeSubmitted() {
    const errors = validate(
                    this.state.name,
                    this.state.email,
                    this.state.authEmail);

      const isDisabled = Object.keys(errors).some(x => errors[x]);
      return !isDisabled;
    }

  render() {
    const errors = validate(
                    this.state.name,
                    this.state.email,
                    this.state.authEmail,
                    );
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return (
        <div>
            <div className="page-header"><div className="page-header-overlay"><div className="centered page-header-container w-container">
            <Animated className="page-header-title"  animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>Contact us</Animated>
            </div></div></div>
            <div className="section innerpage">
                <div className="container w-container contactwrap">
                  <div className="contact-form w-form">
                    <form onSubmit={this.handleSubmit.bind(this)}  name="contact-form"
                     method="POST" action="http://formspree.io/support@useinfluence.co">
                      <input
                        className="field w-input"
                        name="name"
                        id="txtname"
                        placeholder="Enter your name"
                        type="text"
                        value = {this.state.name}
                        onBlur = {this.handleNameAuth.bind(this)}
                        onChange = {this.handleNameChange.bind(this)}
                         />


                      <input className="field w-input" name="email"
                        placeholder="Enter your email address"
                        id="txtemail"
                        name="email"
                        value ={this.state.email}
                        onBlur={this.checkEmail.bind(this)}
                        onChange = {this.handleEmailChange.bind(this)}
                        type="text" />

                      <textarea className="area field w-input"
                      value={this.state.msg}
                      onChange={this.handleMsgChange.bind(this)}
                      name="Message" placeholder="Enter message..."></textarea>
                      <input className="button submit-button w-button"
                      disabled={isDisabled}
                      type="submit" value="Submit" />
                      </form>
                      <div className="success-bg w-form-done">
                        <p>Thank you! Your submission has been received!</p>
                      </div>
                      <div className="error-bg w-form-fail">
                        <p></p>
                        </div>
                    </div>
                     <div className="address">
                    <address>
                      <img src="images/in.svg"/>
                      <span>Delhi-NCR, India</span>
                      2752-16,<br/>
                      Faridabad 121002<br/>
                      Haryana,<br/>
                      India
                    </address>
                    <address>
                      <img src="images/us.svg"/>
                      <span>Somerville, US</span>
                      25 Webster Ave,<br/>
                      Somerville<br/>
                      MA 02143,<br/>
                      United States
                    </address>
                  </div>
                  </div>


              </div>
              <ToastContainer hideProgressBar ={true}

              />
        </div>
    );
  }
}
