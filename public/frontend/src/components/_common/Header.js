import React, { Component } from 'react';
import { Link } from 'react-router';


export default class Header extends Component {
  render() {
    return (
      	<nav className="navbar mr-auto navbar-expand-lg navbar-dark navbar-stick-dark" data-navbar="static"  data-animation="over-right" data-collapse="medium" data-contain="1" data-duration="400">
        <div className="container">
          <div className="navbar-left">
            <button className="navbar-toggler" type="button">&#9776;</button>
            <Link className="navbar-brand" to="/">
               <img className="logo-dark" src="../../assets/img/logo.png"/>
            </Link>
          </div>
          <section className="navbar-mobile">
            <span className="navbar-divider d-mobile-none"/>
            <ul className="nav nav-navbar">
              <li className="nav-item">
                <Link className="nav-link w-nav-link" to="/how-it-works">How It Works</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link w-nav-link" to="/pricing">Pricing</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link w-nav-link" href="javascript:;">Integrations</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">About <span className="arrow"/></a>
                <nav className="nav">
                  <a className="nav-link" href="/contact">Contact Us</a>
                </nav>
              </li>
            </ul>
            <div>
              <Link className="btn btn-xl btn-round btn-light  ml-lg-12 mr-5 login" to="/login">Login <em className="ion-ios-arrow-thin-right"></em></Link>
              <Link className="btn btn-xl btn-round btn-success ml-lg-5 mr-2 signup" to="/register">Signup <em className="ion-ios-arrow-thin-right"></em></Link>
            </div>
          </section>


          <div className="menu-button w-nav-button">
                <div className="w-icon-nav-menu"></div>
            </div>
        </div>
    </nav>
    );
  }
}
