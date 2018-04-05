import React, { Component } from 'react';
import { Link } from 'react-router';


export default class Header extends Component {
  render() {
    return (
      	<div className="navbar w-nav" data-animation="over-right" data-collapse="medium" data-contain="1" data-duration="400">

        <div className="w-container">
            <Link className="logo-container w-nav-brand" to="/">
               <img src="images/logo.png"/>
            </Link>

            <nav className="nav-menu w-nav-menu" role="navigation">

                <Link className="nav-link w-nav-link" to="/how-it-works">How It Works</Link>
                <Link className="nav-link w-nav-link" to="/pricing">Pricing</Link>
                <a className="nav-link w-nav-link" href="javascript:;">Integrations</a>
                <div className="dropdown w-dropdown" data-delay="0">
                <div className="dropdown-toggle w-dropdown-toggle">
                <div>About</div><div className="dropdown-icon w-icon-dropdown-toggle"></div>
                </div>
                <nav className="dropdown-list w-dropdown-list">
                <Link className="dropdown-link w-dropdown-link" to="/about">About us</Link>
                <Link className="dropdown-link w-dropdown-link" to="/contact">Contact Us</Link>
                </nav></div>
                &nbsp; &nbsp; &nbsp;
                <Link className="nav-link w-nav-link btn-sm login" to="/login">Login <em className="ion-ios-arrow-thin-right"></em></Link>

                <Link className="nav-link btn-sm w-nav-link signup" to="/register">Signup <em className="ion-ios-arrow-thin-right"></em></Link>
            </nav>


            <div className="menu-button w-nav-button">
                <div className="w-icon-nav-menu"></div>
            </div>
        </div>
    </div>
    );
  }
}
