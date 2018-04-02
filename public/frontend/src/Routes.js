import React from 'react';
import { Router, Route, browserHistory, IndexRedirect } from 'react-router';
import { store } from './index.js';

import {
  App,
  About,
  CompanyDetails,
  ContactPage,
  ForgetPassword,
  Home,
  HowItWorks,
  LoginPage,
  PricePage,
  PrivacyPage,
  Profile,
  RegisterPage,
  ResetPassword,
  Sidebar,
  StatsCard,
  TermsPage,
  Dashboard,
  Notification,
  Analytics,
  New,
  LoginFlow,
} from './components';

import {
  DashboardContainer
} from './containers';



const MyRoutes = ({routerHistory, store}) => (

  <Router history={routerHistory}>

    <Route component={DashboardContainer}>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/new" component={New} />
      <Route path="/notification" component={Notification} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/integration" component={Dashboard} />
      <Route path="/support" component={Dashboard} />
    </Route>
    <Route path="/getting-started" component={LoginFlow} />
    <Route component={App}>
      <Route path="/about" component={About} />
      <Route path="/login" component={LoginPage} />
      <Route path="/profile/company/:token" component={CompanyDetails} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/privacy-policy" component={PrivacyPage} />
      <Route path="/terms-and-condtions" component={TermsPage} />
      <Route path="/privacy-policy" component={PrivacyPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/pricing" component={PricePage} />
      <Route path="/forget-password" component={ForgetPassword} />
      <Route path="/reset-password" component={ResetPassword} />
      {/* <Redirect from='price' to="/pricing" /> */}
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="*" component={Home} />
    </Route>

  </Router>
)

export default MyRoutes;
