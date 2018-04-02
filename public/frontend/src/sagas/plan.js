import { call, put, select, fork, takeLatest } from 'redux-saga/effects';
import * as api from '../services/api';
import * as actions from '../ducks/plan';

function* fetch(action) {
  try {
    const res = yield call(api.GET, `plan`);
    if(res.error)
      console.log(res.error);
    else
      yield put(actions.successPlan(res));
  } catch (error) {
    console.log('Failed to fetch doc', error);
  }
}

function* create(action) {
  try {
    const res = yield call(api.POST, `plan`, action.profile);
    if(res.error)
      console.log(res.error);
    else
      yield put(actions.successPlan(res));
  } catch (error) {
    console.log('Failed to fetch doc', error);
  }

}

function* update(action) {
  try {
    const res = yield call(api.PUT, `plan/:_id`);
    if(res.error)
      console.log(res.error);
    else
      yield put(actions.successPlan(res));
  } catch (error) {
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
