import { call, put, select, fork, takeLatest } from 'redux-saga/effects';
import * as api from 'services/api';
import * as actions from 'ducks/profile';
import { load, loaded } from 'ducks/loading';
import { ToastContainer, toast } from 'react-toastify';

const toastConfig = {
  position: toast.POSITION.BOTTOM_LEFT,
  autoClose: 2000
};

const getUser = (state) => state.getIn(['auth', 'user']);

function* fetch(action) {
  try {
    yield put(load());
    const res = yield call(api.GET, `profile`);
    if(res.error)
      yield toast.error(res.message, toastConfig);
    else
      yield put(actions.successProfile(res));
    yield put(loaded());
  } catch (error) {
    yield put(loaded());
    console.log('Failed to fetch doc', error);
    // yield toast.error(error.message, toastConfig);
  }
}

function* create(action) {
  try {
    yield put(load());
    const res = yield call(api.POST, `profile`, action.profile);
    if(res.error) {
      yield toast.error(res.message, toastConfig);
    } else {
      let user = yield select(getUser);
      user['id'] = user._id;
      delete user['_id'];
      user['profile'] = res._id;
      yield call(api.PUT, `user/${user.id}`, user);
      yield put(actions.successProfile(res));
    }

    yield put(loaded());
  } catch (error) {
    yield put(loaded());
    console.log('Failed to fetch doc', error);
    yield toast.error(error.message, toastConfig);
  }
}

function* update(action) {
  try {
    yield put(load());
    delete action.profile['_id'];
    const res = yield call(api.PUT, `profile/${action.profile.id}`);
    if(res.error)
      yield toast.error(res.message, toastConfig);
    else {
      let profile = action.profile;
      profile["_id"] = profile.id;
      yield put(actions.successProfile(profile));
    }
    yield put(loaded());
  } catch (error) {
    yield put(loaded());
    console.log('Failed to fetch doc', error);
    yield toast.error(error.message, toastConfig);
  }

}

export function* watchFetch() {
  yield takeLatest(actions.FETCH, fetch);
}

export function* watchCreate() {
  yield takeLatest(actions.CREATE, create);
}

export function* watchUpdate() {
  yield takeLatest(actions.UPDATE, update);
}

export default function* rootSaga() {
  yield [
    fork(watchFetch),
    fork(watchCreate),
    fork(watchUpdate)
  ];
}
