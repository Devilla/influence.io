import React, { Component } from 'react';
import {Animated} from "react-animated-css";
export default class Privacy extends Component {
   componentDidMount(){
     window.scrollTo(0, 0)
   } 
  render() {
    return (
        <div>
            <div className="page-header"><div className="page-header-overlay">
            <div className="centered page-header-container w-container">
            <Animated className="page-header-title" animationIn="fadeInDown" animationOut="fadeOut" isVisible={true} >Privacy Policy</Animated></div></div></div>
   

   <div className="section innerpage">
    <div className="container w-container">  
        <h4>Privacy Policy</h4>      
        <p>Our privacy policy, is covered at (<a href="http://www.useinfluence.co">www.useinfluence.co</a>) or we may update it from time to time. Please check with the latest version to see updated things being covered. By using the service, you agree that the information collected through the use of our service or an an integrated service will be processed or used in accordance with the privacy policy and these terms and may be processed in a country where it was collected.</p>
        <p>&nbsp;</p>
        <h4>Data Ownership</h4>
        <p>You hereby grant us the right to use all data, information, materials or other content uploaded, submitted, posted, transferred, transmitted or otherwise provided or made available to us through the service or an integrated website, including usage reports and statistics related to the use of the 3rd party website (a) prevent or address service or technical problems, or (b) as may be required by law.</p> 
        <p>By using our service, you acknowledge and agree that we may use your data for marketing, survey and statistical usage, setting benchmarks and adding more features to the product to serve you better.</p>
        <p>&nbsp;</p>
        <h4>Indemnification</h4>
        <p>By using our product, you agree to indemnify, defend and hold us and our team harmless from and against any losses, damages, liabilities, deficiencies, claims, actions, judgements, settlements, interest, awards, penalties, fines, costs or expenses of whatever type incurred in connection with, arising out of or related to: a) any data provided by you or through your use of the service or use of any integrated website, including any processing of such data by us or on our behalf in accordance with these terms. b) any material or info provided by or on behalf of you or your users or (c) any allegation of facts that, if true, would constitute your breach of any representations, warranties, covenants or obligations under these Terms.</p>
        <p>&nbsp;</p>
        <h4>Disclaimer of Warranty</h4>
        <p>The service is provided with “ as is “ exclusive of any warranty whatsoever. We do not make any warranty of any kind, whether expressed, implied, statutory or otherwise, and we specifically disclaim all implied warranties, including any implied warranty of merchantability, fitness for a particular purpose or non infringement, to the maximum extent permitted by applicable law. </p>
        <p>&nbsp;</p>
        <h4>Limitation Of Liability</h4>
        <p>Our liability with respect to any single incident arising out of or related to these terms  or the service will not exceed the amount paid by you here under in the 12 months preceding the incident, provided that in no event will our aggregate liability arise out or related to the these terms or services exceed the total amount paid by you hereunder.</p>


    </div>
  </div>
        </div>
    );
  }
}
