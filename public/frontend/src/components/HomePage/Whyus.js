import React, { Component } from 'react';
export default class WhyUs extends Component {
  componentDidMount(){
  
   } 
  render() {
  	return (  	
      <div className="image-section">
      <div className="StripeBackground accelerated stripes-header">
        <div className="stripe s0"></div>
        <div className="stripe s1"></div>
        <div className="stripe s2"></div>
        <div className="stripe s3"></div>
        <div className="stripe s4"></div>
        <div className="stripe s5"></div>
        <div className="stripe s6"></div>
      </div>
        <div className="_2 image-section-overlay">
            <div className="container w-container">
                <div className="centered section-title-block">
                    <div className="section-title">Why Influence?</div>
                    
                    <div className="section-divider-line"></div>
                </div>
                <div className="features-row w-row">
                    <div className="feature-column w-col w-col-4" data-ix="fade-in-on-load">
                        <div className="feature-block">
                           <div className="svgicon"><img src="images/icon1.svg"/></div>
                            <h2 className="feature-title subtitle">Convert More </h2>
                            <h2 className="feature-title">Customers</h2>
                           
                        </div>
                    </div>
                    <div className="feature-column w-col w-col-4" data-ix="fade-in-on-load">
                        <div className="feature-block">
                          <div className="svgicon"><img src="images/icon2.svg"/></div>
                            <h2 className="feature-title subtitle">Lower Down Your Customer </h2>
                           <h2 className="feature-title">Acquisition Costs</h2>
                          
                        </div>
                    </div>
                    <div className="feature-column last w-col w-col-4" data-ix="fade-in-on-load">
                        <div className="feature-block">
                          
                           <div className="svgicon"><img src="images/icon3.svg"/></div>
                          <h2 className="feature-title subtitle">Add Social Influence For Your</h2>
                            <h2 className="feature-title">new visitors</h2>
                            
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  	)
  }
}