import { call, put, select, fork, takeLatest } from 'redux-saga/effects';
import * as api from '../services/api';
import * as actions from '../ducks/rules';
import { load, loaded } from '../ducks/loading';

function* fetch(action) {
  try {
    yield put(load());
    const res = yield call(api.GET, `rules`);
    if(res.error)
      console.log(res.error);
    else
      yield put(actions.fetchSuccess(res));
    yield put(loaded());
  } catch (error) {
    yield put(loaded());
    console.log('Failed to fetch doc', error);
  }
}

function* create(action) {
  try {
    yield put(load());
    const res = yield call(api.POST, `rules`, action.rules);
    if(res.error)
      console.log(res.error);
    else
      yield put(actions.successRules(res));
    yield put(loaded());
  } catch (error) {
    yield put(loaded());
    console.log('Failed to fetch doc', error);
  }

}

function* update(action) {
  try {
    yield put(load());
    delete action.rules['_id'];
    const res = yield call(api.PUT, `rules/${action.rules.id}`);
    if(res.error)
      console.log(res.error);
    else {
      let rules = action.rules;
      rules["_id"] = rules.id;
      yield put(actions.successRules(rules));
    }
    yield put(loaded());
  } catch (error) {
    yield put(loaded());
    console.log('Failed to fetch doc', error);
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
