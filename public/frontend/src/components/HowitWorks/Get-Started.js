import React, { Component } from 'react';
export default class GetStarted extends Component {
  componentDidMount(){
  
   } 
  render() {
  	return (  	
      <div className="image-section">      
        <div className="_2 image-section-overlay">
            <div className="container w-container">
                <div className="centered section-title-block">
                    <div className="section-title">Get Started In Less Than 2 Minutes</div>
                    
                    <div className="section-divider-line"></div>
                </div>
                <div className="features-row w-row">
                    <div className="feature-column w-col w-col-4" data-ix="fade-in-on-load">
                        <div className="feature-block">
                           <div className="svgicon"><img src="images/install-code.svg"/></div>
                            <h2 className="feature-title">Install Our Code</h2>
                            <h2 className="feature-title subtitle">Install our code where you want the notifications to display</h2>
                            
                           
                        </div>
                    </div>
                    <div className="feature-column w-col w-col-4" data-ix="fade-in-on-load">
                        <div className="feature-block">
                          <div className="svgicon"><img src="images/integrate.svg"/></div>
                           <h2 className="feature-title">Integrate</h2>
                           <h2 className="feature-title subtitle">Connect with your website and other online platforms </h2>
                           
                          
                        </div>
                    </div>
                    <div className="feature-column last w-col w-col-4" data-ix="fade-in-on-load">
                        <div className="feature-block">
                          
                           <div className="svgicon"><img src="images/go-live.svg"/></div>
                           <h2 className="feature-title">Go Live</h2> 
                          <h2 className="feature-title subtitle">Launch, target & convert your website visitors with Social Proof Notifications</h2>
                            
                            
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  	)
  }
}