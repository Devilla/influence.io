import React, { Component } from 'react';
import Powerful from '../HomePage/Powerful'
import Features from '../HomePage/Features'
import Join from '../HomePage/Join'
import Banner from './Banner'
import GetStarted from './Get-Started'
import {Animated} from "react-animated-css";
export default class HIW extends Component {
     componentDidMount(){
     window.scrollTo(0, 0)
   } 
  render() {
    return (
        <div className="hiw">
           <Banner/>
           <GetStarted/>
           <Powerful/>
           <Features/>
           <Join/>
        </div>
    );
  }
}
