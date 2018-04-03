import { fork } from 'redux-saga/effects';
import auth from './auth';
import profile from './profile';
import plan from './plan';
import payment from './payment';
import notification from './notification';
import campaign from './campaign';
import rules from './rules';

  export default function* rootSaga() {
    yield [
      fork(auth),
      fork(profile),
      fork(plan),
      fork(payment),
      fork(notification),
      fork(campaign),
      fork(rules)
    ];
  }
