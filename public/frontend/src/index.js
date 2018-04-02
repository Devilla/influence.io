import React from 'react';
import ReactDOM from 'react-dom';
// import Dashboard from './containers/App/App';
import Routes from './Routes';
import registerServiceWorker from './registerServiceWorker';
import { browserHistory } from 'react-router';

import './assets/css/bootstrap.min.css';
import './assets/css/animate.min.css';
import './assets/css/demo.css';
import './assets/css/pe-icon-7-stroke.css';
import 'react-select/dist/react-select.css';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootSaga from './sagas';
import reducer from './ducks';
import thunk from 'redux-thunk';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';
import {  loadState, saveState } from './services/localStorage';
// import throttle from 'lodash/throttle';
// import Immutable from 'immutable';
import { StripeProvider } from 'react-stripe-elements';

// import { PersistGate } from 'redux-persist/integration/react'
// import immutableTransform from 'redux-persist-transform-immutable'
//
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
// //
// const persistConfig = {
//   transforms: [immutableTransform()],
//   key: 'root',
//   storage,
// }

const sagaMiddleware = createSagaMiddleware();

// const persistedState = loadState();

// const localStorageConfig = {
//   slicer: (paths) => (state) => (paths ? state.filter((v, k) => paths.indexOf(k) > -1) : state),
//   serialize: (subset) => JSON.stringify(subset.toJS()),
//   deserialize: (serializedData) => Immutable.fromJS(JSON.parse(serializedData)),
//   merge: (initialState, persistedState) => initialState.mergeDeep(persistedState),
// };

// const persistedReducer = persistReducer(persistConfig, reducer)
//


export const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(sagaMiddleware, thunk)
));

// let persistor = persistStore(store);

// store.subscribe(throttle(() => {
  // saveState(store.getState())
//   saveState({
//     auth: store.getState().auth,
//     profile: store.getState().profile
//   });
// }, 1000));

const routerHistory = syncHistoryWithStore(browserHistory, store, {selectLocationState: state => state.get('router')});


sagaMiddleware.run(rootSaga);

const rootEl = document.getElementById('root');


const render = Component =>
  ReactDOM.render(
    <Provider store={store}>
      <StripeProvider apiKey="pk_test_He989Wakdl6zrKH5zU7QEZaj">
      {/* <PersistGate loading={null} persistor={persistor}> */}
        <Component routerHistory={routerHistory} />
      {/* </PersistGate> */}
      </StripeProvider>
    </Provider>,
    rootEl
  );

render(Routes);

// ReactDOM.render((
//   <Provider store={store}>
//     <Routes />
//   </Provider>), document.getElementById('root'));

registerServiceWorker();
