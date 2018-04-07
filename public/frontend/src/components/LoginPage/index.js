import React, { Component } from 'react';
import { Link } from 'react-router';
import { Animated } from "react-animated-css";
import { ToastContainer, toast } from 'react-toastify';
import Ionicon from 'react-ionicons';
import { css } from 'glamor';
import { validateEmail, validatePassword, login, PASSWORD_MAX_LENGTH } from '../../services/FormUtils';
import { store } from '../../index.js';
import { loginSuccess } from '../../ducks/auth';
import { browserHistory } from 'react-router';


const toastConfig = {
  position: toast.POSITION.BOTTOM_LEFT,
  autoClose: 2000
};

export default class Login extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isPasswordShown: false,
      isEmailValid: false,
      isPwdValid: false
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    const isEmailValid = validateEmail(this.refs.email.value);
    const isPwdValid = validatePassword(this.refs.password.value);
    this.setState({ [name]: value, isEmailValid, isPwdValid });
  };

  // triggers when user leaves the email input field
  handleEmailBlur = (event) => {
    const value = event.target.value;
    const isEmailValid = validateEmail(value);
    this.setState({isEmailValid});
    if (!isEmailValid)
      toast.error("Enter a valid Email id", toastConfig);

  };

  // triggers when user leaves the password input field
  handlePasswordBlur = (event) => {
    const value = event.target.value;
    const isPwdValid = validatePassword(value);
    this.setState({isPwdValid});
    if (!isPwdValid)
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

    // TODO: Redirect to dashboard on successfull login.
    login(this.refs.email.value, this.refs.password.value).then(res => {
        store.dispatch(loginSuccess(res));
        toast.info('Successfull', toastConfig);
        window.location.assign(window.location.origin+'/dashboard');
    }).catch(err => {
      toast.error(err, toastConfig);
    });

  };

  render() {
    return (
      <div>
        <div className="authpage section innerpage">
          <div className="container">
            <div className="wrapper">
              <Animated className="leftwrap center" animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
                <form onSubmit={this.handleSubmit} className="loginfrm">
                  <h3 className="dashed">Welcome Back!</h3>
                  <div className="section-divider-line"></div>
                  <div className="frmcntl">
                    <input
                      className="field w-input"
                      name="email"
                      ref="email"
                      value={this.state.email}
                      onBlur={this.handleEmailBlur}
                      onChange={this.handleInputChange}
                      placeholder="Email Address"
                      type="email"
                    />
                  </div>
                  <div className="frmcntl">
                    <input
                      className="field w-input"
                      name="password"
                      ref="password"
                      placeholder="Password"
                      type={this.state.isPasswordShown ? 'text' : 'password'}
                      maxLength={PASSWORD_MAX_LENGTH}
                      value={this.state.name}
                      onBlur={this.handlePasswordBlur}
                      onChange={this.handleInputChange}
                    />
                    <Ionicon
                      icon="ios-eye-outline"
                      className="svgicons input"
                      fontSize="35px" color="#999"
                      onClick={this.togglePasswordShown}
                    />
                  </div>
                  <div className="frmcntl forget right">
                    <Link to="/reset-password">Forgot your password?</Link>
                  </div>

                  <div className="frmcntl">
                    <input className="button submit-button w-button"
                      type="submit"
                      value="Sign in to your account"
                      disabled={!this.state.isEmailValid || !this.state.isPwdValid}
                    />
                  </div>
                  <div className="frmcntl register_link">
                    Don't have an account yet? <Link to="/register">Sign up here</Link>
                  </div>
                </form>

              </Animated>
            </div>
          </div>
        </div>

        <ToastContainer hideProgressBar={true} />
      </div>
    );

  }
}
