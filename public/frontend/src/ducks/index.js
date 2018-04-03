import { combineReducers } from 'redux-immutable';
import { routerReducer } from 'react-router-redux'

import profile from './profile';
import auth from './auth';
import plan from './plan';
import payment from './payment';
import notification from './notification';
import campaign from './campaign';
import rules from './rules';

const reducer = combineReducers({
  profile,
  auth,
  plan,
  payment,
  notification,
  campaign,
  rules,
  router: routerReducer
});

export default reducer;
