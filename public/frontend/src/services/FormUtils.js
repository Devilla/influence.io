// Common utitlity functions related to forms

import { POST, TOKEN_KEY, storeToken } from './Request';


// TODO: Set correct login api url
const LOGIN_API_URL = 'http://localhost:1337/auth/local';
const REGISTER_API_URL = 'http://localhost:1337/auth/local/register';
const COMPANY_DETAILS_API_URL = 'http://localhost:1337/company-details'


// Email regexp taken from http://emailregex.com/ (W3C standard)
const EMAIL_REGEXP = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const INVALID_EMAIL_MSG = 'Please enter a valid Email ID';

// Check if email follows valid syntax
const validateEmail = email => typeof email === 'string' && email.match(EMAIL_REGEXP) !== null;


// Password character limits
const PASSWORD_MIN_LENGTH = 5;
const PASSWORD_MAX_LENGTH = 20;

// TODO: Set appropriate password Regexp and then the message according to it.
const PASSWORD_REGEXP = new RegExp(`^(?=.*\\d).{${PASSWORD_MIN_LENGTH},${PASSWORD_MAX_LENGTH}}$`);   // http://regexlib.com/REDetails.aspx?regexp_id=30
const INVALID_PASSWORD_MSG = 'Password must be between 4 and 20 digits long and include at least one numeric digit.';

// Check if password follows valid syntax
const validatePassword = pwd => typeof pwd === 'string' && pwd.match(PASSWORD_REGEXP) !== null;


// Company Validation
const validateCompanyName = name => typeof name === 'string' && name.trim().length > 0;
const WEBSITE_REGEXP = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;   // https://www.regextester.com/93652
const validateWebsite = url => typeof url === 'string' && url.match(WEBSITE_REGEXP) !== null;


const validateFields = (email, pwd) => {
  return new Promise((resolve, reject) => {
    const errors = [];

    if (!validateEmail(email))
      errors.push({
        field: 'email',
        msg: INVALID_EMAIL_MSG
      });

    if (!validatePassword(pwd))
      errors.push({
        field: 'password',
        msg: INVALID_PASSWORD_MSG
      });

    // if has errors reject with the errors
    if (errors.length > 0) {
      reject({
        msg: 'Invalid Fields',
        errors
      });

      return;
    }

    resolve();
  });
};


// Validate fields and login. returns json response received
const login = (identifier, password) => {

  return validateFields(identifier, password).then(() => {
    // send request to server and return the response data
    return POST(LOGIN_API_URL, {
      identifier,
      password
    }, true).then(res => {
      // Try storing token in storage and throw error if failed
      if (!storeToken(res['jwt'])) {
        throw 'failed to store token';
        return;
      }

      // resolve with the response
      return res;
    });
  });

};


// Validate fields and register. returns json response received
const register = (email, password) => {
  return validateFields(email, password).then(() => {
    return POST(REGISTER_API_URL, {
      email,
      password,
      username:email.match(/^(.+)@/)[1]
    }, true).then(res => {
      console.log(res, "[[[[[[]]]]]]");
      if(res.jwt) {
        if (!storeToken(res['jwt'])) {
          throw 'failed to store token';
          return res;
        }
        return res;
      }

      if (res.statusCode !== 200) {
        throw res.message;
        return;
      }

      return res;
    });
  });
};


// validate company details fields and submit. returns json response received
const submitCompanyDetails = (companyName, website) => {
  return new Promise((resolve, reject) => {
    const errors = [];
    // continue if fields are empty or are valid
    if (companyName === '' || !validateCompanyName(companyName))
      errors.push({
        field: 'companyName',
        msg: 'Please enter company name'
      });

    if (website === '' || !validateWebsite(website))
      errors.push({
        field: 'website',
        msg: 'Please enter valid website url'
      });

    // if has errors reject with the errors
    if (errors.length > 0) {
      reject({
        msg: 'Invalid Fields',
        errors
      });

      return;
    }

    resolve();
  }).then(() => {
    return POST(COMPANY_DETAILS_API_URL, {
      companyName,
      website
    }).then(res => {
      if (res.statusCode !== 200) {
        throw res.message;
        return;
      }

      return res;
    });
  });
};



export { LOGIN_API_URL, validateEmail, validatePassword, login, register, PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH, WEBSITE_REGEXP, validateWebsite, validateCompanyName, submitCompanyDetails };
