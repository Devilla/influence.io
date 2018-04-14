import React, {Component} from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import CompanyInfo from './CompanyInfo';
import AboutYourself from './AboutYourself';
import TrailPayment from './TrailPayment';

import { updateUser, checkTokenExists } from 'ducks/auth';
import { createProfile, updateProfile } from 'ducks/profile';
import { createPayment } from 'ducks/payment';
import './LoginFlow.css';

import { store } from 'index.js';

class LoginFlow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flowStep: 0,
      username: '',
      state: '',
      address: '',
      phoneNumber: '',
      companyName: '',
      plan:'',
      website: '',
      stripeToken: {}
    };

    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.submitCompanyInfo = this.submitCompanyInfo.bind(this);
    this.submitAbout = this.submitAbout.bind(this);
    this.submitPayment = this.submitPayment.bind(this);
  }

  componentWillMount() {
      this.checkLogin();
      this.updateState(this.props.user, this.props.profile, this.props.plan);
  }

  componentWillReceiveProps(nextProps) {
      if(this.props != nextProps)
        this.updateState(nextProps.user, nextProps.profile, nextProps.plan);
      if(nextProps.profile && nextProps.profile.profile_payments)
        browserHistory.push('dashboard');
      if(nextProps.profile != this.props.profile) {
        if(nextProps.profile.plan)
          this.setState({flowStep:1});
      }
  }

  updateState(user, profile, plan) {
      this.setState({
        username: user?user.username:'',
        state: profile?profile.state:'',
        address: profile?profile.address:'',
        phoneNumber: profile?profile.phoneNumber:'',
        companyName: profile?profile.companyName:'',
        plan: profile?profile.plan:''
      });
  }

  checkLogin() {
    const cookie = localStorage.getItem('authToken');
    const authToken = cookie?JSON.parse(cookie):null;
    // var d = new Date(authToken.expiresOn);
    if(authToken)
      store.dispatch(checkTokenExists(authToken));
    else
      return window.location.assign(window.location.origin+'/login');
  }

  handleStateChange(state, stateName) {
    this.setState({[stateName]:state});
  }

  submitCompanyInfo(event) {
    event.preventDefault();
    this.setState({flowStep: 1});
  }

  submitAbout(event, token) {
    event.preventDefault();
    let user = this.props.user?this.props.user:{};
    user['username'] = this.state.username;
    this.props.updateUser(user);
    const profile = {
      user: this.props.user._id,
      state: this.state.state,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      companyName: this.state.companyName,
    };
    if(this.props.user.profile) {
      return this.setState({flowStep: 2});
    } else {
      this.props.createProfile(profile);
    }
    this.setState({flowStep: 2});
  }

  submitPayment(data, token) {
    let profile = this.props.profile;
    profile['id'] = profile._id;
    profile['plan'] = data.plan;
    this.props.updateProfile(profile)
    this.props.createPayment(data);
    browserHistory.push('dashboard');
  }

  handleCheckChange(checked, value, state) {
    this.setState({plan: checked?value:null})
  }


  renderPage() {
      switch (this.state.flowStep) {
        case 0:
          return <CompanyInfo
            companyName={this.state.companyName}
            website={this.state.website}
            handleStateChange={this.handleStateChange}
            handleSubmit={this.submitCompanyInfo}
          />
          break;
        case 1:
          return <AboutYourself
            username={this.state.username}
            state={this.state.state}
            address={this.state.address}
            phoneNumber={this.state.phoneNumber}
            handleStateChange={this.handleStateChange}
            handleSubmit={this.submitAbout}
          />
        case 2:
            return <TrailPayment
              selectedPlan={this.state.plan}
              user={this.props.user}
              profile={this.props.profile}
              stripeError={this.state.stripeError}
              plan={this.state.plan}
              planList={this.props.planList}
              handleCheckChange={this.handleCheckChange}
              handleStateChange={this.handleStateChange}
              handleSubmit={this.submitPayment}
            />
        default:
      }
  }

  render() {
    return (
      <div className="login-flow">
        {this.renderPage()}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.getIn(['profile', 'profile']),
  user: state.getIn(['auth','user']),
  planList: state.getIn(['plan', 'plan'])
});

const mapDispatchToProps = {
  updateUser,
  createProfile,
  updateProfile,
  createPayment
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginFlow);
