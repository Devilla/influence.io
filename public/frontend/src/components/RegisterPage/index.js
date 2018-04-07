import React, {Component} from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import {Animated} from "react-animated-css";
import {ToastContainer, toast} from 'react-toastify';
import Ionicon from 'react-ionicons';
import {css} from 'glamor';
import {Alert} from 'react-bootstrap';
import {validateEmail, validatePassword, register, PASSWORD_MAX_LENGTH} from '../../services/FormUtils';
import {store} from '../../index.js';
import {loginSuccess, fetchRoles} from '../../ducks/auth';
import {browserHistory} from 'react-router';


const toastConfig = {
  position: toast.POSITION.BOTTOM_LEFT,
  autoClose: 2000
};

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isPasswordShown: false,
      isRegistered: false
    };
  }

  componentWillMount() {
    store.dispatch(fetchRoles());
  }

  handleInputChange = event => {
    const {name, value} = event.target;

    this.setState({[name]: value});
  };

  // triggers when user leaves the email input field
  handleEmailBlur = event => {
    const value = event.target.value;

    if (!validateEmail(value))
      toast.error("Enter a valid Email id", toastConfig);

    };

  // triggers when user leaves the password input field
  handlePasswordBlur = event => {
    const value = event.target.value;

    if (!validatePassword(value))
      toast.error("Enter valid Password!", toastConfig);
    };

  togglePasswordShown = () => {
    this.setState({
      isPasswordShown: !this.state.isPasswordShown
    });
  };

  // Submit form
  handleSubmit = (event) => {
    event.stopPropagation();
    event.preventDefault();

    // TODO: Show 'Check email for further instructions.' message on success
    register(this.state.email, this.state.password).then(res => {
        toast.info('Successfull', toastConfig);
        store.dispatch(loginSuccess(res));
        window.location.assign(window.location.origin+'/getting-started');
        // browserHistory.push('/getting-started');
        this.setState({isRegistered: true});
      // TODO: check response before treating it as successfull
    }).catch(err => {
      toast.error(err, toastConfig);
    });

  };

  render() {

    const isEmailValid = validateEmail(this.state.email);
    const isPwdValid = validatePassword(this.state.password);
    const isFormValid = isEmailValid && isPwdValid;

    // if registered show 'check mail' message else show the registration form
    const formContent = this.state.isRegistered
      ? (<Alert bsStyle="success">
        Please check your mail for further instructions.
      </Alert>)
      : (<div>
        <h3 className="dashed">Let's get started</h3>
        <div className="section-divider-line"></div>
        <p>Enter your work email to access your account</p>
        <div className="frmcntl">
          <input className="field w-input" name="email" value={this.state.email} onBlur={this.handleEmailBlur} onChange={this.handleInputChange} placeholder="Email Address" type="email"/>
        </div>
        <div className="frmcntl">
          <input className="field w-input" name="password" placeholder="Password" maxLength={PASSWORD_MAX_LENGTH} value={this.state.name} onBlur={this.handlePasswordBlur} onChange={this.handleInputChange} type={this.state.isPasswordShown
              ? 'text'
              : 'password'}/>
          <Ionicon icon="ios-eye-outline" className="svgicons input" fontSize="35px" color="#999" onClick={this.togglePasswordShown}/>
        </div>
        <div className="frmcntl">
          <input className="button submit-button w-button" type="submit" value="Create Account" disabled={!isEmailValid || !isPwdValid}/>
        </div>
        <div className="frmcntl register_link">
          Already have an account?
          <Link to="/login">Login here</Link>
        </div>

        <ToastContainer hideProgressBar={true}/>
      </div>);

    return (<div>
      <div className="authpage section innerpage">
        <div className="container">
          <div className="wrapper">
            <Animated className="leftwrap center" animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
              <form className="loginfrm" onSubmit={this.handleSubmit}>
                {formContent}
              </form>
              <div className="support"></div>
            </Animated>
          </div>
        </div>
      </div>
    </div>);
  }
}
