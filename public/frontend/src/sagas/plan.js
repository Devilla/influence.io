import { call, put, select, fork, takeLatest } from 'redux-saga/effects';
import * as api from '../services/api';
import * as actions from '../ducks/plan';
import { load, loaded } from '../ducks/loading';

function* fetch(action) {
  try {
    yield put(load());
    const res = yield call(api.GET, `plan`);
    if(res.error)
      console.log(res.error);
    else
      yield put(actions.successPlan(res));
    yield put(loaded());
  } catch (error) {
    yield put(loaded());
    console.log('Failed to fetch doc', error);
  }
}

function* create(action) {
  try {
    yield put(load());
    const res = yield call(api.POST, `plan`, action.profile);
    if(res.error)
      console.log(res.error);
    else
      yield put(actions.successPlan(res));
    yield put(loaded());
  } catch (error) {
    yield put(loaded());
    console.log('Failed to fetch doc', error);
  }

}

function* update(action) {
  try {
    yield put(load());
    const res = yield call(api.PUT, `plan/:_id`);
    if(res.error)
      console.log(res.error);
    else
      yield put(actions.successPlan(res));
    yield put(loaded());
  } catch (error) {
    yield put(loaded());
    console.log('Failed to fetch doc', error);
  }

}

export function* watchFetchPlan() {
  yield takeLatest(actions.FETCH, fetch);
}

export function* watchCreatePlan() {
  yield takeLatest(actions.CREATE, create);
}

export function* watchUpdatePlan() {
  yield takeLatest(actions.UPDATE, update);
}

export default function* rootSaga() {
  yield [
    fork(watchFetchPlan),
    fork(watchCreatePlan),
    fork(watchUpdatePlan)
  ];
}
