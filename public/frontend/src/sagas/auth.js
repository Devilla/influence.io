import {
  call,
  put,
  fork,
  select,
  take,
  takeLatest,
  race,
  all
} from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { browserHistory } from 'react-router';
import * as actions from '../ducks/auth';
import { fetchProfile } from '../ducks/profile';
import { fetchPlan } from '../ducks/plan';
import { fetchPayment } from '../ducks/payment';

import * as api from '../services/api';
import moment from 'moment';

export const removeAuthToken = () => localStorage.removeItem('authToken');

export function* isLoggedIn(action) {
    yield all([
      put(actions.fetchUser()),
      put(fetchProfile()),
      put(fetchPlan()),
      put(fetchPayment()),
    ]);
}

export function* checkTokenExists(token) {
  if (token) {
    if(moment().isAfter(moment(token.expiresOn)))
      return yield call(logOut);
    return yield call(isLoggedIn);
  }
  yield call(logOut);
}

export function* logOut() {
  yield call(removeAuthToken);
  yield call(browserHistory.push, '/login');
}

export function* fetchUser() {
  try {
    const res = yield call(api.GET, `user/me`);
    if(res.error)
      console.log(res.error);
    else
      yield put(actions.fetchUserSuccess(res));
  } catch (error) {
    yield console.log(error);
  }
}

export function* updateUser(action) {
  try {
    const res = yield call(api.PUT, `user/${action.user._id}`, action.user);
    if(res.error)
      console.log(res.error);
    else
      yield put(actions.fetchUserSuccess(action.user));
  } catch (error) {
    yield console.log(error);
  }
}

export function* fetchRoles() {
  try {
    const res = yield call(api.GET, `users-permissions/roles`);
    if(res.error)
      console.log(res.error);
    else
      yield put(actions.fetchRolesSuccess(res));
  } catch (error) {
    yield console.log(error);
  }
}

export function* watchCheckToken() {
  yield takeLatest(actions.CHECK_TOKEN_EXISTS, checkTokenExists);
}

export function* watchFetchUser() {
  yield takeLatest(actions.FETCH, fetchUser);
}

export function* watchFetchRoles() {
  yield takeLatest(actions.FETCHROLES, fetchRoles);
}

export function* watchUpdateUser() {
  yield takeLatest(actions.UPDATE, updateUser);
}

export default function* rootSaga() {
  yield [
    fork(watchCheckToken),
    fork(watchFetchUser),
    fork(watchUpdateUser),
    fork(watchFetchRoles)
  ];
}
