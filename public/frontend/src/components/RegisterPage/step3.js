import React, { Component } from 'react';
import Ionicon from 'react-ionicons';
import {Animated} from "react-animated-css";
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import { css } from 'glamor';
import axios from 'axios';
var CryptoJS = require("crypto-js");


function validate(fname, lname, mobile, authEmail){
    return{
      fname: fname.length === 0,
      lname: lname.length === 0,
      mobile: mobile.length === 0,
      authEmail: authEmail === false
  };
}
function paymentDone(userid,paymentid){
    alert('kuchbhi')
    alert(userid)

  }
 
var timer;         
export default class Step3 extends Component {
  constructor(){
    super();
    this.state = {
       fname:'',
       lname:'',
       mobile:'',
       email: '',
       plan: 100,
       usertoken:'',
       paymentid:'',
       nextState : 4
    }
    
  }

   componentDidMount(){
     window.scrollTo(0, 0);
     var storedNames = JSON.parse(localStorage.getItem("reginfo"))
     this.setState({email: storedNames[0]})


   }
   handleFNameChange(evt){
    this.setState({fname: evt.target.value})
   }
   handleLNameChange(evt){
    this.setState({lname: evt.target.value})
   }
   handleMobileChange(evt){
    this.setState({mobile: evt.target.value})
   }
   handleselect(evt){
    this.setState({plan: evt.target.value})
   }
   handleFNameAuth(evt){
      if(evt.target.value == ''){
        $('#'+evt.target.id).addClass('has-error');
        toast("Enter your First Name", {
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
    handleLNameAuth(evt){
      if(evt.target.value == ''){
        $('#'+evt.target.id).addClass('has-error');
        toast("Enter your Last Name", {
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
    handleMobileAuth(evt){
      if(evt.target.value == ''){
        $('#'+evt.target.id).addClass('has-error');
        toast("Enter your Phone Number", {
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
         this.setState({
               authEmail: true
           })

      }
    }
    canBeSubmitted() {
    const errors = validate(
                    this.state.fname,
                    this.state.lname,
                    this.state.mobile,
                    this.state.authEmail);

      const isDisabled = Object.keys(errors).some(x => errors[x]);
      return !isDisabled;
    }

   handleForm(evt){
      if(!this.canBeSubmitted()){
          evt.preventDefault();
          return;
      }else{
        
        var reginfo = JSON.parse(localStorage.getItem("reginfo"));
        var cweb = JSON.parse(localStorage.getItem("cweb"));
        const data = {
          "email" : reginfo[0],
          "password": reginfo[1],
          "companyName": cweb[0],
          "website": cweb[1],
          "country": cweb[2],
          "fullName": this.state.fname + this.state.lname,
          "firstname": this.state.fname,
          "lastname": this.state.lname,
          "phonenumber": this.state.mobile,
          "paymentstatus":0

        }
        const urls = "http://localhost:3000/commando/register";
          let k = this;
          axios.post(urls ,data).then(function(response){
              toast.info("Success! Yoy'll move to payment page.", {
                 position: toast.POSITION.BOTTOM_CENTER
              });
              localStorage.setItem("encryptedtoken", response.data.token);
             k.setState({usertoken:response.data.token})
            }) .catch(function (error) {
              console.log(error);
          });
        //this.payment();


        //this.props.callbackFromParent(this.state.nextState);
      }
   }

 
  
    payment(){

              let options = {
                "key": "rzp_live_woaUzTcP7MxOj7",
                "amount": this.state.plan, // 2000 paise = INR 20, amount in paisa
                "name": "UseInfluence",
                "image": "/images/logo.png",

                "handler": function (response){
                  localStorage.setItem('tid',response.razorpay_payment_id);  
                },
                "prefill": {
                  "name": this.state.fname +' '+this.state.lname,
                  "email": this.state.email,
                  "contact": this.state.mobile
                },
                "notes": {
                  "address": "Hello World"
                },
                "theme": {
                  "color": "#4553ff"
                },
                "modal": {
                    "ondismiss": function(){  clearInterval(timer) }
                }
              };

              
              let rzp = new window.Razorpay(options);
              rzp.open();
              timer = window.setInterval(this.checkforvalue, 5000) 
       } 
       
       checkforvalue(){

              if(localStorage.getItem("tid") === null){
                //console.log('not found')
              }else
              {
                clearInterval(timer)
                let getpaymentid = localStorage.getItem('tid')
                let getusertoken = localStorage.getItem('encryptedtoken')
               // console.log(getpaymentid)
                localStorage.setItem('tid','');
                const data = {
                  "usertoken" : getusertoken,
                  "paymentid" : getpaymentid

                }
                const urls = 'http://localhost:3000/fetchpayment';
                axios.post(urls ,data).then(function(response){
                    console.log(response)
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
                    this.state.fname,
                    this.state.lname,
                    this.state.mobile,
                    this.state.authEmail,
                    );
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return (

        <div>

            <h3 className="dashed">Tell us about yourself</h3>
           <div className="section-divider-line"></div>  
            <div className="frmcntl col-6">
                      <input 
                        className="field w-input"
                        name="fname"
                        id="fname"
                        value={this.state.fname}
                        onBlur={this.handleFNameAuth.bind(this)}
                        onChange = {this.handleFNameChange.bind(this)} 
                        placeholder="First name"
                        type="text" />
                      <input 
                        className="field w-input"
                        name="lname"
                        id="lname"
                        value={this.state.lname}
                        onBlur={this.handleLNameAuth.bind(this)}
                        onChange = {this.handleLNameChange.bind(this)} 
                        placeholder="Last name"
                        type="text" />
                </div>
                 <div className="frmcntl col-6 plancont">

                    <input 
                      className="field w-input"
                      name="mobile"
                      id="mobile" 
                      value={this.state.mobile}
                      onBlur={this.handleMobileAuth.bind(this)}
                      onChange = {this.handleMobileChange.bind(this)} 
                      placeholder="Phone Number"
                      type="number" /> 
                  
                    <select className="field w-input col-6" id="planselect" value={this.state.plan} onChange={this.handleselect.bind(this)}>
                      <option value="100">Startups</option>
                      <option value="200">Small Businesses</option>
                      <option value="300">Advanced</option>
                      <option value="400">Pro</option>
                    </select>
                                   
                  </div>
                 <div className="frmcntl">
                      <input className="button submit-button w-button" 
                       type="button"
                       value="Proceed to payment"
                       id="rzp-button1"  
                       onClick = {this.handleForm.bind(this)}
                       disabled={isDisabled}
                       />    
                    </div>

                    
            <ToastContainer hideProgressBar ={true}

              />
        </div>
    );
  }
}
