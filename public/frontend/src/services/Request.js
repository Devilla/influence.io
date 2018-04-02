/**
 * A service to make REST API calls to server
 *
 * Example Usage:
 *  GET('https://api.example.com/getdata').then(data => {console.log(data);});
 */


const TOKEN_KEY = 'authToken';
const TOKEN_DEFAULT_EXPIRY_TIME = 24; // in hours
const LOGIN_PAGE_URL = 'http://localhost:3000/login';

// Add the token to local storage
const storeToken = (token, expireInHours) => {
  // if token string is empty return false
  if (!token.trim()) return false;

  if (!expireInHours)
    expireInHours = TOKEN_DEFAULT_EXPIRY_TIME;

  // Current date plus given hours
  const expiresOn = Date.now() + (expireInHours + (60 * 60 * 1000));

  // else store token and expiry time in localstorage and return true
  localStorage.setItem(TOKEN_KEY, JSON.stringify({
    token,
    expiresOn
  }));

  return true;
};

// Check if user is Authenticated
const isAuthenticated = () => {
  return new Promise((resolve, reject) => {

    // Get the token from localstorage
    const authToken = JSON.parse(localStorage.getItem(TOKEN_KEY));

    // if token not found or is expired, reject and redirect to login page
    if (authToken === null || Date.now() > authToken.expiresOn) {
      reject('User not logged in!');
      window.location.assign(LOGIN_PAGE_URL);
    } else // else resolve and pass the token
      resolve(authToken);

  });
};

// Check for Authentication (if noAuth is not set) and make Request using given method, url and body
const _makeRequest = (method = 'GET', url, body, noAuth = false) => {
  // Check for token unless noAuth is true
  return new Promise((resolve, reject) => {
    if (noAuth === true)
      resolve();
    else
      resolve(isAuthenticated());
  }).then(token => {
    const headers = new Headers({ 'Content-Type': 'application/json' });

    if(body !== undefined)
      body = JSON.stringify(body);

    // Pass token in header if 'noAuth' is not true
    if (noAuth !== true)
      headers.Authorization = token;
    console.log(body);
    return fetch(url, {
      headers,
      body,
      method
    }).then(res =>
      res.json()    // return json response
    );
  });
};

// GET Request
const GET = (url, noAuth) => _makeRequest('GET', url, undefined, noAuth);


// POST Request
const POST = (url, body, noAuth) => _makeRequest('POST', url, body, noAuth);


// PUT Request
const PUT = (url, body, noAuth) => _makeRequest('PUT', url, body, noAuth);



// Export the functions
export { GET, POST, PUT, storeToken, isAuthenticated, TOKEN_KEY };
