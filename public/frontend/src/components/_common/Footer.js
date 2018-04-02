import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Footer extends Component {
  render() {
    return (
      	<div className="footer" id="contact">

        <div className="centered container w-container">
            <div className="footer-row w-row">

                <div className="footer-column w-col w-col-3">
                    <ul className="footer-list w-list-unstyled">
                        <li className="footer-list-item">
                            <a className="footer-link link" href="javascript:;">Updates</a>
                        </li>
                        <li className="footer-list-item">
                            <Link className="footer-link link" to="/how-it-works">How It Works</Link>
                        </li>
                        <li className="footer-list-item">
                            <Link className="footer-link link" to="price">Pricing</Link>
                        </li>

                    </ul>
                </div>
                <div className="footer-column w-col w-col-3">
                    <ul className="footer-list w-list-unstyled">
                        <li className="footer-list-item">
                            <Link to="/about"  className="footer-link link" >About</Link>
                        </li>
                        <li className="footer-list-item">
                            <a className="footer-link link" href="javascript:;">Blog & Press</a>
                        </li>
                        <li className="footer-list-item">
                            <a className="footer-link link" href="javascript:;">Affiliate Program</a>
                        </li>
                    </ul>
                </div>
                <div className="footer-column w-col w-col-3">
                    <ul className="footer-list w-list-unstyled">

                        <li className="footer-list-item">
                            <a className="footer-link link" href="https://useinfluence.freshdesk.com/support/home" target="_blank">FAQs</a>
                        </li>
                        <li className="footer-list-item">
                            <Link className="footer-link link" to="/privacy-policy">Privacy Policy</Link>
                        </li>
                        <li className="footer-list-item">
                            <Link className="footer-link link" to="/terms-and-condtions">Terms & Conditions</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-column w-col w-col-3">
                    <ul className="footer-list w-list-unstyled">
                        <li className="footer-list-item">
                            <a className="footer-link link" href="https://angel.co/influence-8/jobs" target="_blank">Career</a>
                        </li>
                        <li className="footer-list-item">
                            <Link className="footer-link link" to="/contact">Contact Us</Link>
                        </li>
                    </ul>
                </div>

            </div>

        </div>
        <div className="bottom-footer">
            <div className="w-container">
                <div className="bottom-footer-text">Copyright © 2018</div>
            </div>
        </div>
    </div>
    );
  }
}
