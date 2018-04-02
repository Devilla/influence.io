import React, { Component } from 'react';
import {Animated} from "react-animated-css";
import $ from 'jquery';
import axios from 'axios';
import Switch from 'react-flexible-switch';
const data = {
                  "startups":{
                    "inr":{
                        "monthly":  "INR 950",
                        "yearly" : "INR 780"
                    },
                    "usd":{
                        "monthly":  "$25",
                        "yearly" : "$19"
                    }
                  },
                  "smallbusinesses":{
                    "inr":{
                        "monthly":  "INR 2250",
                        "yearly" : "INR 1800"
                    },
                    "usd":{
                        "monthly":  "$55",
                        "yearly" : "$45"
                    }
                  },
                  "advanced":{
                    "inr":{
                        "monthly":  "INR 3800",
                        "yearly" : "INR 3100"
                    },
                    "usd":{
                        "monthly":  "$90",
                        "yearly" : "$73"
                    }
                  },
                  "pro":{
                    "inr":{
                        "monthly":  "INR 8900",
                        "yearly" : "INR 7200"
                    },
                    "usd":{
                        "monthly":  "$210",
                        "yearly" : "$180"
                    }
                  }
 };
export default class Price extends Component {
 constructor() {
    super();
    this.state = { 
                checked: false, 
                externalValue: true,
                sprice : '',
                sbprice : '',
                advprice : '',
                proprice : '' 
            };
    this.handleChange = this.handleChange.bind(this);


  }
   componentDidMount(){
     window.scrollTo(0, 0)
     this.init('Yearly')
     this.accordian();
   } 

  handleChange(checked) {
    this.setState({ checked });
  }
  handleMonthChange(){
     this.setState({ externalValue: false })
     this.init('Monthly')
  }
  handleYearChange(){    
    this.setState({ externalValue: true })
    this.init('Yearly')
  }
  handleSwitchChange(value){
    if(value){
      this.setState({externalValue: true})
      this.init('Yearly')
    }else{
      this.setState({externalValue: false})
      this.init('Monthly')
    }
  }


  accordian(){
    $('.faq .faqwrap ul li .questions').on('click',function(){
        $('.faq .faqwrap ul li .questions').removeClass('active');
        $(this).parent().toggleClass('active');
        $(this).next().slideToggle(300)   
        
    })
  }
  init(mode){    
    let k = this;

    axios.get('https://geoip-db.com/json/geoip.php')
      .then(function (response) {
       // console.log(response)
        if(response.data.country_code=='IN'){         
              switch(mode){
                case 'Monthly':
                    k.setState({
                        sprice:  data.startups.inr.monthly,
                        sbprice : data.smallbusinesses.inr.monthly,
                        advprice : data.advanced.inr.monthly,
                        proprice : data.pro.inr.monthly
                    })
                 break;
                 case 'Yearly':                 
                  k.setState({
                    sprice:  data.startups.inr.yearly,
                    sbprice : data.smallbusinesses.inr.yearly,
                    advprice : data.advanced.inr.yearly,
                    proprice : data.pro.inr.yearly
                 })
                 break;    

              }
        }else{
            switch(mode){
                case 'Monthly':
                    k.setState({
                        sprice:  data.startups.usd.monthly,
                        sbprice : data.smallbusinesses.usd.monthly,
                        advprice : data.advanced.usd.monthly,
                        proprice : data.pro.usd.monthly
                    })
                 break;
                 case 'Yearly':                 
                  k.setState({
                    sprice:  data.startups.usd.yearly,
                    sbprice : data.smallbusinesses.usd.yearly,
                    advprice : data.advanced.usd.yearly,
                    proprice : data.pro.usd.yearly
                 })
                 break;  
             }
         }
      })
      .catch(function (error) {
        console.log(error);
      });
  }





  render() {
    return (
        <div>
        <div className="page-header ">
        <div className="page-header-overlay">
        <div className="centered page-header-container w-container">
        <Animated className="page-header-title subtitle" animationIn="fadeInDown" animationOut="fadeOut" isVisible={true}>
                Simple, honest & affordable pricing
                
            </Animated></div></div>
           <Animated className="offerblurb" animationIn="zoomIn" animationOut="fadeOut" isVisible={true}>
            <div className="innerwrap">
                You'll save <span>20%</span> with our <br/>Yearly Plan
            </div>
            </Animated>
           
        </div>

        <div className="section innerpage">
            <div className="container w-container newprice price">
                <div className="pricing-row w-row">
                      <div className="w-col filter">
                      <ul>
                      <li>
                      <a href="javascript:;" className={
                        !this.state.externalValue ? 'active' : 'hidden'
                      } onClick={this.handleMonthChange.bind(this)}>Monthly</a></li>
                      <li>
                      <Switch 
                        circleStyles={{ onColor: 'blue', offColor: 'blue',diameter: 18 }} 
                        switchStyles={{ width: 50 }}
                         value={this.state.externalValue}
                         onChange={this.handleSwitchChange.bind(this)}
                     />
                     </li>
                     <li>
                      <a href="javascript:;"
                        className={
                        this.state.externalValue ? 'active' : 'hidden'
                      }
                       onClick={this.handleYearChange.bind(this)}>Yearly</a>
                      </li></ul>
                      </div>  
                </div>

                 <div className="pricing-row w-row">
                    <div className="pricing-column w-col w-col-3" >
                        <div className="pricing-block">
                            <div className="pricing-price-wrapper">
                                <h2 className="pricing-title">Startups</h2>
                                <h2 className="price pricing-title p1">
                                    {this.state.sprice}
                                </h2>
                                <h2 className="monthly pricing-title d1">{
                                    this.state.externalValue ? 'Per month, billed annually' : 'Per month'  
                                }</h2>
                                <div className="feature-divider section-divider-line"></div>
                            </div>
                            <ul className="pricing-feature-list w-list-unstyled">
                                <li className="pricing-feature-list-item">
                                    <div className="pricing-feature-text">
                                        <strong>Unlimited notifications</strong>
                                     </div>
                                </li>
                                <li className="pricing-feature-list-item">
                                    <div className="pricing-feature-text">
                                        <b>5,000</b> unique visitors
                                    </div>
                                </li>
                                <li className="pricing-feature-list-item">
                                    <div className="pricing-feature-text">
                                      2 domains
                                    </div>
                                </li>
                                <li className="pricing-feature-list-item">
                                    <div className="pricing-feature-text">
                                        Influence branding
                                    </div>
                                </li>
                                <li className="pricing-feature-list-item">
                                    <div className="pricing-feature-text">
                                        Support in &lt;3 hours
                                    </div>
                                </li>
                                <li className="pricing-feature-list-item">
                                    <div className="pricing-feature-text">
                                         Essential customizations
                                    </div>
                                </li>
                                   <li className="pricing-feature-list-item">
                                    <div className="pricing-feature-text">
                                       Basic integrations
                                    </div>
                                </li>
                            </ul>
                            <div className="pricing-button-wrapper">
                                <a className="button price-button trial" href="javascript:;">Free Trial</a>
                                <a className="button price-button" href="javascript:;">Buy Now</a>
                            </div>
                        </div>
                    </div>
                     <div className="last pricing-titlecolumn w-col w-col-3">
                        <div className="pricing-block">
                            <div className="pricing-price-wrapper">
                                <h2 className="pricing-title"><span>Small</span> Businesses</h2>
                                <h2 className="price pricing-title p2">
                                    {this.state.sbprice}
                                </h2>
                                <h2 className="monthly pricing-title d1">{
                                    this.state.externalValue ? 'Per month, billed annually' : 'Per month'  
                                }</h2>
                                <div className="feature-divider section-divider-line"></div>
                            </div>
                            <ul className="pricing-feature-list w-list-unstyled">
                                <li className="pricing-feature-list-item">
                                    <div className="pricing-feature-text">
                                       <strong>Unlimited notifications</strong>
                                    </div>
                                </li>
                                <li className="pricing-feature-list-item">
                                    <div className="pricing-feature-text">
                                      <b>15,000</b> unique visitors
                                    </div>
                                </li>
                                <li className="pricing-feature-list-item">
                                    <div className="pricing-feature-text">
                                      5 domains
                                    </div>
                                </li>
                                <li className="pricing-feature-list-item">
                                    <div className="pricing-feature-text">
                                        Influence branding
                                    </div>
                                </li>
                                <li className="pricing-feature-list-item">
                                    <div className="pricing-feature-text">
                                      Support in &lt;3 hour
                                    </div>
                                </li>
                                <li className="pricing-feature-list-item">
                                    <div className="pricing-feature-text">
                                      Advance customizations
                                    </div>
                                </li>
                                   <li className="pricing-feature-list-item">
                                    <div className="pricing-feature-text">
                                      Advance integrations
                                    </div>
                                </li>
                            </ul>
                            <div className="pricing-button-wrapper">
                                <a className="button price-button trial" href="javascript:;">Free Trial</a>
                                <a className="button price-button" href="javascript:;">Buy Now</a>
                            </div>
                        </div>
                    </div>
                    <div className="pricing-column w-col w-col-3">
                       <div className="pricing-block">
                            <div className="pricing-price-wrapper">
                                <h2 className="_3 pricing-title">Advanced</h2>
                                <h2 className="price pricing-title p3">
                                    {this.state.advprice}
                                </h2>
                                <h2 className="monthly pricing-title d1">{
                                    this.state.externalValue ? 'Per month, billed annually' : 'Per month'  
                                }</h2>
                                <div className="feature-divider section-divider-line"></div>
                            </div>
                            <ul className="pricing-feature-list w-list-unstyled">
                                <li className="pricing-feature-list-item">
                                    <div className="pricing-feature-text">
                                       <strong>Unlimited notifications</strong>
                                     </div>
                                </li>
                                <li className="pricing-feature-list-item">
                                    <div className="pricing-feature-text">
                                       <b>80,000</b> unique visitors
                                      </div>
                                </li>
                                <li className="pricing-feature-list-item">
                                    <div className="pricing-feature-text">
                                      Unlimited domains
                                    </div>
                                </li>
                                <li className="pricing-feature-list-item">
                                    <div className="pricing-feature-text">
                                        White label
                                    </div>
                                </li>
                                <li className="pricing-feature-list-item">
                                    <div className="pricing-feature-text">
                                      Priority support
                                    </div>
                                </li>
                                <li className="pricing-feature-list-item">
                                    <div className="pricing-feature-text">
                                      Advance customizations
                                    </div>
                                </li>
                                   <li className="pricing-feature-list-item">
                                    <div className="pricing-feature-text">
                                      Advance integrations
                                    </div>
                                </li>
                            </ul>
                            <div className="pricing-button-wrapper">
                                <a className="button price-button trial" href="javascript:;">Free Trial</a>
                                <a className="button price-button" href="javascript:;">Buy Now</a>
                            </div>
                        </div>
                    </div>
                    <div className="last pricing-column w-col w-col-3">
                        <div className="pricing-block">
                            <div className="pricing-price-wrapper">
                                <h2 className="pricing-title">Pro</h2>
                                <h2 className="price pricing-title p4">
                                    {this.state.proprice}
                                </h2>
                                <h2 className="monthly pricing-title d1">{
                                    this.state.externalValue ? 'Per month, billed annually' : 'Per month'  
                                }</h2>
                                <div className="feature-divider section-divider-line"></div>
                            </div>
                            <ul className="pricing-feature-list w-list-unstyled">
                                <li className="pricing-feature-list-item">
                                    <div className="pricing-feature-text">
                                       <strong>Unlimited notifications</strong>
                                    </div>
                                </li>
                                <li className="pricing-feature-list-item">
                                    <div className="pricing-feature-text">
                                      <b>300,000</b> unique visitors
                                    </div>
                                </li>
                                <li className="pricing-feature-list-item">
                                    <div className="pricing-feature-text">
                                        Unlimited domains
                                    </div>
                                </li>
                                <li className="pricing-feature-list-item">
                                    <div className="pricing-feature-text">
                                        White label
                                    </div>
                                </li>
                                <li className="pricing-feature-list-item">
                                    <div className="pricing-feature-text">
                                      Priority support 
                                    </div>
                                </li>
                                <li className="pricing-feature-list-item">
                                    <div className="pricing-feature-text">
                                      Advance customizations
                                    </div>
                                </li>
                                   <li className="pricing-feature-list-item">
                                    <div className="pricing-feature-text">
                                      Advance integrations
                                    </div>
                                </li>
                            </ul>
                            <div className="pricing-button-wrapper">
                                <a className="button price-button trial" href="javascript:;">Free Trial</a>
                                <a className="button price-button" href="javascript:;">Buy Now</a>
                            </div>
                        </div>
                    </div>
                     
               </div>
               <div className="pricing-row w-row msg-bb">
                    <div className="w-col w-col-12">
                        <h3><strong>24 x 7 email support</strong> and <strong> 24 x 5 phone support</strong> included with all plans</h3>
                    </div>    
               </div>
               <div className="pricing-row w-row msg-bb cta">
                    <div className="w-col w-col-12">
                        <h3><strong>Need a higher traffic plan?</strong> <a href="javascript:;" className="btn">Contact us</a></h3>

                    </div>    
               </div>
               <div className="pricing-row w-row pledge">
                    <div className="w-col w-col-4 logo">
                        <img src="images/pledge-logo.png"/>
                    </div>
                    <div className="w-col w-col-8">
                        <h6>Your plan gives back</h6>
                        <p>We give one dollar to Disabled & Under-Privileged Children Societies for every new plan purchase during your first year of subscription.</p>
                    </div>
               </div>

            </div>



        </div>
        <div className="section innerpage faq">
            <div className="container  w-container  centered pb-30">
                <h2 className="section-title">Frequently asked questions, answered.</h2>
                <div className="section-divider-line"></div>


                <div className="faqwrap">
                    <ul>
                        <li>
                            <div className="questions">What do you mean by visitors?</div>
                            <div className="ans">
                                The billing counts unique visitors as the metric for billing. A unique visitor who visits the website page where the pixel code is installed will be counted as visiting page.  A visitor can visit the page multiple times on all the pixelated pages but that will be counted as one unique visit only.
                            </div>
                        </li>
                        <li>
                            <div className="questions">But will it work for me?</div>
                            <div className="ans">
                                Influence works for all the websites and platforms that are out there. We are rolling out more and more integrations every month so that you can sync them up with your favorite services and marketing tools. You can even see the integrations we have listed on our integrations section.
                            </div>
                        </li>
                        <li>
                            <div className="questions">Will Influence work for all the customers on my website?</div>
                            <div className="ans">
                                Influence not only works for customer details capturing, but it also works for lead captures, webinar pages and other places where you can capture the customer’s details.
                            </div>
                        </li>
                        <li>
                            <div className="questions">Are these notifications legit?</div>
                            <div className="ans">
                                When we thought of building this product, we thought of helping brands and customers bring transparency to each other in the nicest possible manner.<br/><br/>
                                If we get to work together and you use our product, all the notifications that you will see on your website will be 100% legit and the data would be the one which your customers would use.

                            </div>
                        </li>
                        <li>
                            <div className="questions">Can I cancel it anytime?</div>
                            <div className="ans">Yes. You can cancel the subscription whenever you want. If you are in monthly contract you will only be billed on a monthly basis.</div>
                        </li>
                        <li>
                            <div className="questions">What will happen if I get more unique visitors on plan? Will it charge me automatically?
                            </div>
                            <div className="ans">
                                Once you start inching closer to your traffic limit, we’ll send you notifications before you even actually hit that limit.  Once you go above your plan limit we’ll automatically upgrade you for the next plan.
                            </div>
                        </li>
                        
                    </ul>

                </div>



            </div>





        </div>
        <div className="section innerpage moreques">
            <div className="container  w-container  centered pb-30">
                <h3>More questions?</h3>
                <h4>Our <a href="javascript:;">help center</a> is open 24/7</h4>
                 <h4>or</h4>
                <h4>Reach out to our global support team. <a href="javascript:;">We're here to help.</a></h4>
            </div>
        </div>


        </div>
    );
  }
  
}
