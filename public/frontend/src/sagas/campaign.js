import { call, put, select, fork, takeLatest } from 'redux-saga/effects';
import * as api from '../services/api';
import * as actions from '../ducks/campaign';

function* fetch(action) {
  try {
    const res = yield call(api.GET, `campaign`);
    if(res.error)
      console.log(res.error);
    else
      yield put(actions.successCampaign(res));
  } catch (error) {
    console.log('Failed to fetch doc', error);
  }
}

function* create(action) {
  try {
    const res = yield call(api.POST, `campaign`, action.campaign);
    if(res.error)
      console.log(res.error);
    else
      yield put(actions.successCampaign(res));
  } catch (error) {
    console.log('Failed to fetch doc', error);
  }

}

function* update(action) {
  try {
    console.log(action);

    const res = yield call(api.PUT, `campaign/${action.campaign.id}`);
    if(res.error)
      console.log(res.error);
    else {
      let campaign = action.campaign;
      campaign["_id"] = campaign.id;
      yield put(actions.successCampaign(action.campaign));
    }

  } catch (error) {
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
