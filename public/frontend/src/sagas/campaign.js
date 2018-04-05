import { call, put, select, fork, takeLatest } from 'redux-saga/effects';
import * as api from '../services/api';
import * as actions from '../ducks/campaign';
import { load, loaded } from '../ducks/loading';

function* fetch(action) {
  try {
    yield put(load());
    const res = yield call(api.GET, `campaign`);
    if(res.error)
      console.log(res.error);
    else
      yield put(actions.successCampaign(res));
    yield put(loaded());
  } catch (error) {
    yield put(loaded());
    console.log('Failed to fetch doc', error);
  }
}

function* create(action) {
  try {
    yield put(load());
    const res = yield call(api.POST, `campaign`, action.campaign);
    if(res.error)
      console.log(res.error);
    else
      yield put(actions.successCampaign(res));
    yield put(loaded());
  } catch (error) {
    yield put(loaded());
    console.log('Failed to fetch doc', error);
  }

}

function* update(action) {
  try {
    console.log(action);
    yield put(load());
    const res = yield call(api.PUT, `campaign/${action.campaign.id}`);
    if(res.error)
      console.log(res.error);
    else {
      let campaign = action.campaign;
      campaign["_id"] = campaign.id;
      yield put(actions.successCampaign(action.campaign));
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
