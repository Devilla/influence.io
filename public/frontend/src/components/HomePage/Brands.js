import React, { Component } from 'react';
import Slider from 'react-slick';
export default class Brands extends Component {
  componentDidMount(){
    
   } 
  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      arrows:false
    };
  	return (
 	    <div className="section brand">
        <div className="centered container w-container">
            <div className="centered section-title-block">
                <div className="section-title">We work with the finest brands!</div>
                <div className="section-divider-line"></div>
            </div>
              
              <Slider {...settings} className="brand-slider">
            <div> <img className="brand-logo" src={process.env.PUBLIC_URL +'images/551adbab15ec9fa344fb876f_logo-netflix.png'}/></div>
            <div><img className="brand-logo" src="images/551adbec6d9dc0a2445e1041_logo-adobe.png"/></div>
            <div><img className="brand-logo" src="images/551adbf5af91bd2c36f4fe8d_logo-google.png"/></div>
            <div><img className="brand-logo"  src="images/551adbfcaf91bd2c36f4fe90_logo-webflow.png"/></div>
            <div><img className="brand-logo" src="images/551adc04af91bd2c36f4fe94_Logo-spotify.png"/></div>
            <div><img className="brand-logo" src="images/551adbab15ec9fa344fb876f_logo-netflix.png"/></div>
            <div><img className="brand-logo" src="images/551adc0c15ec9fa344fb877b_Logo-skype.png"/></div>
            </Slider>
           
          </div>
    </div>
      
  	)
  }
}