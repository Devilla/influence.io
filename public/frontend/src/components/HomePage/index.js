import React, { Component } from 'react';
import Banner  from './Banner'
import Brands  from './Brands'
import Features  from './Features'
import WhyUs from './Whyus'
import Powerful from './Powerful'
import Join from './Join'
export default class Home extends Component {
  componentDidMount(){
     window.scrollTo(0, 0)

   } 
  render() {
  	return (
  	 <div>	
        <Banner/>
        <Brands/>
        <WhyUs/>
        <Features/>
        <Powerful/>
        <Join/>
    </div>
  	)
  }
}