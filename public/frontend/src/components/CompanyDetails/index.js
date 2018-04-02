import React, { Component } from 'react';
import { Animated } from "react-animated-css";
import { ToastContainer, toast } from 'react-toastify';
import { validateCompanyName, validateWebsite, submitCompanyDetails } from '../../services/FormUtils';
import { storeToken } from '../../services/Request';


const toastConfig = {
  position: toast.POSITION.BOTTOM_LEFT,
  autoClose: 2000
};

export default class CompanyDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      companyName: '',
      website: ''
    };

    // Store the token passed in params. This will be used to continue process further
    storeToken(props.match.params.token);
  }

  // Allow empty field
  isCompanyNameValid = () => (this.state.companyName === '' || validateCompanyName(this.state.companyName));

  // Allow empty field
  isWebsiteValid = () => (this.state.website === '' || validateWebsite(this.state.website));

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value});
  };

  handleCompanyNameBlur = event => {
    if(!this.isCompanyNameValid())
      toast.error("Please enter company name", toastConfig);
  };

  handleWebsiteBlur = event => {
    if(!this.isWebsiteValid())
      toast.error("Please enter a valid website url", toastConfig);
  };

  handleSubmit = event => {
    event.stopPropagation();
    event.preventDefault();

    submitCompanyDetails(this.state.companyName, this.state.website).then(res => {
      console.log(res);
      // TODO: check response before treating it as successfull
      toast.info('Successfull', toastConfig);
    }).catch(err => {
      console.log(err);
      toast.error('Something went wrong!', toastConfig);
    });
  };

  render() {
    const isFormValid = this.isCompanyNameValid() && this.isWebsiteValid();
    console.log(this.state.website, this.isWebsiteValid());
    return (
      <div className="authpage section innerpage">
        <div className="container">
          <div className="wrapper">
            <Animated className="leftwrap center" animationIn="fadeIn" animationOut="fadeOut" isVisible={true}>
              <form className="loginfrm" onSubmit={this.handleSubmit} >
                <h3 className="dashed">Tell us about your company</h3>
                <div className="section-divider-line"></div>
                <div className="frmcntl">
                  <input className="field w-input"
                    name="companyName"
                    value={this.state.companyName}
                    onBlur={this.handleCompanyNameBlur}
                    onChange={this.handleInputChange}
                    placeholder="Company Name"
                  />
                </div>
                <div className="frmcntl">
                  <input
                    className="field w-input"
                    name="website"
                    placeholder="Website"
                    value={this.state.website}
                    onBlur={this.handleWebsiteBlur}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="frmcntl">
                  <input className="button submit-button w-button"
                    type="submit"
                    value="Next"
                    disabled={!isFormValid}
                  />
                </div>

                <ToastContainer hideProgressBar={true} />
              </form>
              <div className="support"></div>
            </Animated>
          </div>
        </div>
      </div>
    );
  }
}