import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory, Link} from 'react-router';

import {Redirect} from 'react-router'
// import Header from '../../components';
// import Footer from '../../components';
// import Sidebar from '../../components';
import axios from 'axios';
import $ from 'jquery';
import {checkTokenExists} from '../../ducks/auth';
import { Spinner, Header, Footer, Sidebar } from '../../components';

// import { CookiesProvider, withCookies, Cookies } from 'react-cookie';

function getUrlVars() {
  var vars = [],
    hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for (var i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    vars.push(hash[0]);
    vars[hash[0]] = hash[1];
  }
  return vars;
}
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);

    this.state = {
      render: true
    };
  }

  componentWillMount() {
    this.checkLogin();
    this.checkUserDetails(this.props.user);
  }

  checkLogin() {
    const cookie = localStorage.getItem('authToken');
    const authToken = cookie
      ? JSON.parse(cookie)
      : null;
    if (authToken)
      this.props.checkTokenExists(authToken)
    else
      return browserHistory.push('login');
    }

  componentWillReceiveProps(nextProps) {
    console.log(this.props.user != nextProps.user);
      if (this.props.user != nextProps.user)
        this.checkUserDetails(nextProps.user);
  }

  componentDidMount() {
    this.setState({_notificationSystem: this.refs.notificationSystem});

  }

  checkUserDetails(user) {
    if (!user.profile || !user.payments) {
      browserHistory.push('getting-started')
    }
  }

  componentDidUpdate(e) {
    if (window.innerWidth < 993 && e.history.location.pathname !== e.location.pathname && document.documentElement.className.indexOf('nav-open') !== -1) {
      document.documentElement.classList.toggle('nav-open');
    }
  }

  render() {
    const { loading } = this.props;
    return (
      <div className="wrapper">
        <Spinner loading={loading} />
        {!this.state.render && <p>Please wait</p>}
        {this.state.render && <Sidebar {...this.props}/>}
        {
          this.state.render && <div id="main-panel" className="main-panel">
              <Header {...this.props}/> {this.props.children}
              <Footer/>
            </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.get('profile'),
  user: state.getIn(['auth', 'user']),
  loading: state.getIn(['loading', 'state']),
});

const mapDispatchToProps = {
  checkTokenExists
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);
