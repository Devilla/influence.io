import React, { Component } from 'react';
import Ionicon from 'react-ionicons';
import {Animated} from "react-animated-css";
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import { css } from 'glamor';
function validate(cname, website, authEmail){
    return{
      cname: cname.length === 0,
      website: website.length === 0,
      authEmail: authEmail === false
    };
  }

export default class Step2 extends Component {
  constructor(){
    super();
    this.state = {
      cname:'',
      website:'',
      country:'USA',
      authEmail: false,
      nextState: 3
    }
    
  }
   componentDidMount(){
     window.scrollTo(0, 0)
    // alert(this.props.value)
   }
   handleCNameChange(evt){
    this.setState({cname: evt.target.value})
   }
   handleWebsiteChange(evt){
    this.setState({website: evt.target.value})
   }

    handleCNameAuth(evt){
      if(evt.target.value == ''){
        $('#'+evt.target.id).addClass('has-error');
        toast("Enter your Company Name", {
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

    handleWebsiteAuth(evt){
      var webexpr = /[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/;
      if(!webexpr.test(evt.target.value)){
        $('#'+evt.target.id).addClass('has-error');
        toast("Enter a valid website name", {
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
           
       }
   }

   handleselect(evt) {
     this.setState({country: evt.target.value})
   }   
  canBeSubmitted() {
    const errors = validate(
                    this.state.cname,
                    this.state.website,
                    this.state.authEmail);

      const isDisabled = Object.keys(errors).some(x => errors[x]);
      return !isDisabled;
    }

   handleForm(evt){
      if(!this.canBeSubmitted()){
          evt.preventDefault();
          return;
      }else{
        var cweb = [];
        cweb.push(this.state.cname,this.state.website,this.state.country);
        localStorage.setItem('cweb', JSON.stringify(cweb));
        this.props.callbackFromParent(this.state.nextState);
      }
   } 
   
  render() {
    const errors = validate(
                    this.state.cname,
                    this.state.website,
                    this.state.authEmail,
                    );
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return (
        <div>
            <h3 className="dashed">Tell us about your company</h3>
            <div className="section-divider-line"></div>  
            <div className="frmcntl">
                      <input 
                        className="field w-input"
                        id="cname" 
                        name="cname"
                        value={this.state.cname}
                        onBlur={this.handleCNameAuth.bind(this)}
                        onChange = {this.handleCNameChange.bind(this)}
                        placeholder="Company name"
                        type="text" />
                    </div>
                    <div className="frmcntl">
                    <input 
                      className="field w-input"
                      id="website"
                      name="website" 
                      type="text"
                      value = {this.state.website}
                      onBlur = {this.handleWebsiteAuth.bind(this)}
                      onChange = {this.handleWebsiteChange.bind(this)}
                      placeholder="Website"
                       />                    
                    </div>
                    <div className="frmcntl">
                      <select className="field w-input" onChange={this.handleselect.bind(this)}>
                        <option value="USA">USA</option>
                        <option value="India">India</option>
                        <option value="other">Other</option>
                      </select>
                  </div><br />
                 <div className="frmcntl">
                      <input className="button submit-button w-button" 
                       type="button"
                       value="Next" 
                       disabled={isDisabled}
                       onClick = {this.handleForm.bind(this)}
                        />    
                    </div>
              <ToastContainer hideProgressBar ={true}

              />
        </div>
    );
  }
}
