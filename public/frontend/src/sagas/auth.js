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
import { ToastContainer, toast } from 'react-toastify';
import { push } from 'react-router-redux';
import { browserHistory } from 'react-router';
import * as actions from '../ducks/auth';
import { fetchProfile } from '../ducks/profile';
import { fetchPlan } from '../ducks/plan';
import { fetchPayment } from '../ducks/payment';
import { load, loaded } from '../ducks/loading';

import * as api from '../services/api';
import moment from 'moment';

const toastConfig = {
  position: toast.POSITION.BOTTOM_LEFT,
  autoClose: 2000
};

export const removeAuthToken = () => localStorage.removeItem('authToken');

export function* isLoggedIn(action) {
    yield all([
      put(actions.fetchUser()),
      put(fetchProfile()),
      put(fetchPlan()),
      put(fetchPayment()),
    ]);
}

export function* checkTokenExists(action) {
  const token = action.token;
  if (token) {
    if(moment().isAfter(moment(token.expiresOn)))
      return yield call(logOut);
    return yield call(isLoggedIn);
  }
  yield call(logOut);
}

export function* logOut() {
  yield call(removeAuthToken);
  window.location.assign(window.location.origin+'/dashboard');
  // yield call(browserHistory.push, '/login');
}

export function* fetchUser() {
  try {
    yield put(load());
    const res = yield call(api.GET, `user/me`);
    if(res.error)
      yield toast.error(res.message, toastConfig);
    else
      yield put(actions.fetchUserSuccess(res));
    yield put(loaded());
  } catch (error) {
    yield put(loaded());
    yield console.log(error);
  }
}

export function* updateUser(action) {
  try {
    yield put(load());
    const res = yield call(api.PUT, `user/${action.user._id}`, action.user);
    if(res.error)
      yield toast.error(res.message, toastConfig);
    else
      yield put(actions.fetchUserSuccess(action.user));
    yield put(loaded());
  } catch (error) {
    yield put(loaded());
    yield toast.error(error.message, toastConfig);
    yield console.log(error);
  }
}

export function* fetchRoles() {
  try {
    yield put(load());
    const res = yield call(api.GET, `users-permissions/roles`);
    if(res.error)
      yield toast.error(res.message, toastConfig);
    else
      yield put(actions.fetchRolesSuccess(res));
    yield put(loaded());
  } catch (error) {
    yield put(loaded());
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
