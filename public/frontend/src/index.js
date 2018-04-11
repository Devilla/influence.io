import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import registerServiceWorker from './registerServiceWorker';
import { browserHistory } from 'react-router';

import './assets/css/bootstrap.min.css';
import './assets/css/animate.min.css';
import './assets/css/demo.css';
import './assets/css/pe-icon-7-stroke.css';
import 'react-select/dist/react-select.css';
// import './assets/stylesheets/style.css';
// import './assets/assets/css/page.css';
// import './assets/sass/light-bootstrap-dashboard.css';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootSaga from './sagas';
import reducer from './ducks';
import thunk from 'redux-thunk';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
import {  loadState, saveState } from './services/localStorage';
import { StripeProvider } from 'react-stripe-elements';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(sagaMiddleware, thunk)
));

const routerHistory = syncHistoryWithStore(browserHistory, store, {selectLocationState: state => state.get('router')});


sagaMiddleware.run(rootSaga);

const rootEl = document.getElementById('root');

const render = Component =>
  ReactDOM.render(
    <Provider store={store}>
      <StripeProvider apiKey={process.env.REACT_APP_STRIPE_KEY}>
        <Component routerHistory={routerHistory} />
      </StripeProvider>
    </Provider>,
    rootEl
  );

render(Routes);

registerServiceWorker();
