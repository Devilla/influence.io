import React, { Component } from 'react';
export default class Features extends Component {
  componentDidMount(){
  
   } 
  render() {
  	return (  	
      <div className="products section">
      <div className="container centered pb-30">
          <h2 className="section-title">Features</h2>
          <div className="section-divider-line"></div>
      </div>


        <div className="container w-container">
          <div className="wrapper">
            <div className="models-text-block" data-ix="fade-on-scroll">
                <h2 className="large-column-title">Influence Notifications</h2>
                <div className="section-divider-line"></div>
                <p>Get your existing customers to sell your products for you on an autopilot mode. Create a unique kind of Social Stamping for your business</p>
                <a className="button dark" href="#">Start Your Free Trial</a>
                
            </div>
            <div className="models-slider" data-ix="fade-on-scroll-right">
               <img src="images/social-influncer.png"/>
            </div>
          </div>
           <div className="wrapper">
            
            <div className="models-slider" data-ix="fade-on-scroll">
               <img src="images/current-view.png"/>
            </div>
            <div className="models-text-block" data-ix="fade-on-scroll-right">
                <h2 className="large-column-title">Show Live Visitors</h2>
                <div className="section-divider-line"></div>
                <p>We’ll also show you how many people are currently seeing a particular page or website live right now. Your visitors will know they’re not the only ones buying from you.</p>
                <a className="button dark" href="#">Start Your Free Trial</a>
               
            </div>
          </div>
          <div className="wrapper">
            <div className="models-text-block" data-ix="fade-on-scroll">
                <h2 className="large-column-title">Track Your Customer Journey</h2>
                <div className="section-divider-line"></div>
                <p>Follow your customers on wherever they are and serve the right marketing campaigns at the right time.  Track your customers like a spy.</p>
                <a className="button dark" href="#">Start Your Free Trial</a>
               
            </div>
            <div className="models-slider" data-ix="fade-on-scroll-right">
               <img src="images/customer-journey.png"/>
            </div>
          </div> <div className="wrapper">
            
            <div className="models-slider" data-ix="fade-on-scroll">
               <img src="images/visitor-count.png"/>
            </div>
            <div className="models-text-block" data-ix="fade-on-scroll-right">
                <h2 className="large-column-title">Get Visitor Analytics [007 Style]</h2>
                <div className="section-divider-line"></div>
                <p>Once the visitor/customer enters in their email, we’ll show you everything that you need to know about your customer using our intelligence data servers. We’ll show you who they really are.</p>
                <a className="button dark" href="#">Start Your Free Trial</a>
                
            </div>
          </div>
          
        </div>

    </div>
  	)
  }
}