import { call, put, select, fork, takeLatest } from 'redux-saga/effects';
import * as api from '../services/api';
import * as actions from '../ducks/rules';
import { load, loaded } from '../ducks/loading';
import { ToastContainer, toast } from 'react-toastify';

const toastConfig = {
  position: toast.POSITION.BOTTOM_LEFT,
  autoClose: 2000
};

function* fetch(action) {
  try {
    yield put(load());
    const res = yield call(api.GET, `rules`);
    if(res.error)
      yield toast.error(res.message, toastConfig);
    else
      yield put(actions.fetchSuccess(res));
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
    const res = yield call(api.POST, `rules`, action.rules);
    if(res.error)
      yield toast.error(res.message, toastConfig);
    else
      yield put(actions.successRules(res));
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
    delete action.rules['_id'];
    const res = yield call(api.PUT, `rules/${action.rules.id}`);
    if(res.error)
      yield toast.error(res.message, toastConfig);
    else {
      let rules = action.rules;
      rules["_id"] = rules.id;
      yield put(actions.successRules(rules));
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
