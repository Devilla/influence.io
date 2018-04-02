import React, { Component } from 'react';
export default class Powerful extends Component {
  componentDidMount(){
  
   } 
  render() {
  	return (  	
      <div className="image-section powerful">
      <div className="powerstripes">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
        <div className="_2 image-section-overlay">
            <div className="container w-container">
                <div className="centered section-title-block">

                    <h2 className="section-title">Powerful Conversion Tool</h2>
                    <h6 className="section-title smtxt">Convert new visitors using your existing customers and their engagement on your website</h6>
                    <div className="section-divider-line"></div>
                </div>
                 <div className="features-row w-row">
                    <div className="feature-column w-col w-col-4">
                        <div className="feature-block">
                            <div className="icon"><img src="images/recent-purchases.svg"/></div>
                            <h2 className="feature-title">Recent Purchases</h2>
                            Display recent sales & activity and drive users to convert on your website.
                           
                        </div>

                    </div>
                    <div className="feature-column w-col w-col-4">
                        <div className="feature-block">
                        <div className="icon"><img src="images/currently-viewing.svg"/></div>
                          <h2 className="feature-title">Currently viewing</h2>
                            You can even control to show your customers how many people are seeing your website right now.

                           
                        </div>
                        
                    </div>
                    <div className="feature-column w-col w-col-4">
                        <div className="feature-block">
                        <div className="icon"><img src="images/customer-journey.svg"/></div>
                          <h2 className="feature-title">Customer journey</h2>
                            We’ll provide you information for your customer so that you know who exactly you are dealing
                           
                        </div>
                        
                    </div>
                    
                   
                </div>
                <div className="features-row w-row">
                    <div className="feature-column w-col w-col-4">
                        <div className="feature-block">
                        <div className="icon"><img src="images/profiling.svg"/></div>
                          <h2 className="feature-title">Profiling</h2>
                             We will get data for your customer so that you know exactly who are you dealing with and how to get them to buy more.
                           
                        </div>

                    </div>
                    <div className="feature-column w-col w-col-4">
                        <div className="feature-block">
                        <div className="icon"><img src="images/popup-timings.svg"/></div>
                            <h2 className="feature-title">Popup timings</h2>
                           You can control for when, how long and how should your notifications look like.

                           
                        </div>
                        
                    </div>
                    <div className="feature-column w-col w-col-4">
                        <div className="feature-block">
                        <div className="icon"><img src="images/mobile-ready.svg"/></div>
                          <h2 className="feature-title">Mobile Ready</h2>
                            We are a mobile friendly application. We will show notifications to your mobile users as well.
                        </div>
                        
                    </div>
                   
                </div>
               
                <div className="features-row w-row centered ">
                    <div className="feature-column w-col w-col-4">
                        <div className="feature-block">
                        <div className="icon"><img src="images/localisation.svg"/></div>
                           <h2 className="feature-title">Localisation</h2>
                            Change your language to any language you want.
                        </div>

                    </div>
                    
                   
                </div>
            </div>
        </div>
    </div>
  	)
  }
}