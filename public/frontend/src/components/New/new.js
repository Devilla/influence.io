import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Grid, Row, Col,
    FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';
import { browserHistory } from 'react-router';
import CardHeader from './template/card-with-header'
import FormInputs from './template/FormTemp';
import Button from './template/customButton';
import Switch from 'react-flexible-switch';
import $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';
import { css } from 'glamor';
import {validatewebsite,validateemail,validphone,getCookie} from '../../components/Common/function';
import { createCampaign } from '../../ducks/campaign';




function validate(campaignname, website) {
  // true means invalid, so our conditions got reversed
  return {
    name: campaignname.length === 0,
    email: website.length === 0
  };
}

export class NewUser extends Component{
  constructor(){
    super();
    this.state = {
        campaignname : '',
        website:'',
        source: '',
        medium: '',
        cobrand: false,
        status: {}
    }

    this.handleNextButton = this.handleNextButton.bind(this)
  }
  handleCampaignNameChange(evt){
    this.setState({campaignname : evt.target.value})
  }
  handleWebsiteChange(evt){
    this.setState({website:  evt.target.value})
  }
  handleSourceChange(evt){
    this.setState({source:  evt.target.value})
  }
  handleMediumChange(evt){
    this.setState({medium:  evt.target.value})
  }
  handleCampaignAuth(evt){
    if(evt.target.value == ''){
        $('#'+evt.target.id).addClass('has-error');
        toast("Enter campaign name", {
            position: toast.POSITION.BOTTOM_LEFT,
            className: css({
              background: "#dd5258",
              color: '#fff'
            }),
            autoClose: 2000
          });
    }else{
        $('#'+evt.target.id).removeClass('has-error')
    }
  }
  handleWebsiteAuth(evt){
      if(!validatewebsite(evt.target.value)){
        toast("Enter valid website name", {
            position: toast.POSITION.BOTTOM_LEFT,
            className: css({
              background: "#dd5258",
              color: '#fff'
            }),
            autoClose: 2000
          });

      }else{
           $('.error-bg').fadeOut().html('')
            $('#'+evt.target.id).removeClass('has-error')

       }
    }


    canBeSubmitted() {
    const errors = validate(
                    this.state.campaignname,
                    this.state.website);

      const isDisabled = Object.keys(errors).some(x => errors[x]);
      return !isDisabled;
    }
  handleBrandingChnage(){

  }
   handleCheckCookie(){

    var usertoken = localStorage.getItem("authToken");
     if (usertoken != "") {
        return usertoken;
     }else{
        this.setState({render: false});
        browserHistory.push('/login');
     }

    }
  handleNextButton(evt){
    var tokenverify = this.handleCheckCookie();
    const data = {
      campaignName: this.state.campaignname,
      websiteUrl: this.state.website,
      utmSource: this.state.source,
      utmMedium: this.state.medium,
      profile: this.props.profile._id
    };

    this.props.createCampaign(data);
    browserHistory.push('notifications')
    // if(!this.canBeSubmitted()){
    //         evt.preventDefault();
    //           return;

    //     }else{
    //         evt.preventDefault();
    //         var settings = {
    //           "async": true,
    //           "crossDomain": true,
    //           "url": "http://strapi.useinfluence.co/website",
    //           "method": "POST",
    //           "headers": {
    //             "authorization": "JWT "+tokenverify,
    //             "content-type": "application/x-www-form-urlencoded",
    //             "cache-control": "no-cache",

    //           },
    //           "data": {
    //             "campaignName": this.state.campaignname,
    //             "domain": this.state.website,
    //           }
    //         }
    //         var k = this;
    //         $.ajax(settings).done(function (response) {
    //           console.log(response);
    //           var data = {'active' : 2}
    //           console.log(k.props.callbackFromParent(data))
    //           // alert('yes');
    //         });

    //     }

    // this.props.callbackFromParent({'active': 2});

  }

    render(){
        const errors = validate(
                    this.state.campaignname,
                    this.state.website

                    );
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return (
            <div className="content fill">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                          <CardHeader
                            title = "Website"
                            content = {
                                <form onSubmit={this.handleNextButton}>

                                        <FormInputs
                                            ncols = {["col-md-6","col-md-6"]}
                                            proprieties = {[
                                                {
                                                 label : "Name",
                                                 type : "text",
                                                 bsClass : "form-control",
                                                 id:"campaignname",
                                                 placeholder : "example: Acme Co, Blog, Online Store",
                                                 onChange: this.handleCampaignNameChange.bind(this),
                                                 onBlur : this.handleCampaignAuth.bind(this),
                                                 value: this.state.campaignname
                                                },
                                                 {
                                                 label : "Website URL",
                                                 type : "text",
                                                 bsClass : "form-control",
                                                 placeholder : "http://",
                                                 id:"website",
                                                 onChange: this.handleWebsiteChange.bind(this),
                                                 onBlur : this.handleWebsiteAuth.bind(this),
                                                 value: this.state.website

                                                }

                                            ]}
                                        />
                                        <FormInputs
                                            ncols = {["col-md-6" , "col-md-6"]}
                                            proprieties = {[
                                                {
                                                 label : "Campaign Source (UTM Source) ",
                                                 type : "text",
                                                 bsClass : "form-control",
                                                 onChange: this.handleSourceChange.bind(this),
                                                 placeholder : "UTM Source"
                                                },
                                                {
                                                 label : "Campaign Medium (UTM Medium)",
                                                 type : "text",
                                                 bsClass : "form-control",
                                                 onChange: this.handleMediumChange.bind(this),
                                                 placeholder : "UTM Medium"
                                                }
                                            ]}
                                        />



                                        <Row>
                                            <Col md={1}>
                                                      <Switch
                                                        circleStyles={{ onColor: 'blue', offColor: 'gray',diameter: 18 }}
                                                        switchStyles={{ width: 50 }}
                                                        cssClass="alignsame"
                                                         value={this.state.cobrand}
                                                         onChange={this.handleBrandingChnage.bind(this)}
                                                    />


                                            </Col>
                                            <Col md={9}>
                                                <span className="mt-5">Enable Custom 'POWERED BY' CO-Branding </span>
                                            </Col>

                                        </Row>
                                        <Button
                                            bsStyle="info"
                                            pullRight
                                            fill
                                            type="submit"
                                            disabled={isDisabled}
                                            >

                                            Next >
                                        </Button>
                                        <div className="clearfix"></div>

                                    </form>
                            }
                          />
                        </Col>
                    </Row>
                 </Grid>
                 <ToastContainer hideProgressBar ={true}

              />
            </div>
        );
    }
}

const mapStateToProps = state => ({
  profile: state.get('profile')
});

const mapDispatchToProps = {
  createCampaign
};

export default connect(mapStateToProps, mapDispatchToProps)(NewUser);
