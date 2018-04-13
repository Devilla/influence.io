import { call, put, select, fork, takeLatest } from 'redux-saga/effects';
import * as api from 'services/api';
import * as actions from 'ducks/configuration';
import { load, loaded } from 'ducks/loading';
import { ToastContainer, toast } from 'react-toastify';

const toastConfig = {
  position: toast.POSITION.BOTTOM_LEFT,
  autoClose: 2000
};

function* fetch(action) {
  try {
    yield put(load());
    const res = yield call(api.GET, `configuration`);
    if(res.error)
      yield toast.error(res.message, toastConfig);
    else
      yield put(actions.createSuccess(res));
    yield put(loaded());
  } catch (error) {
    yield put(loaded());
    console.log('Failed to fetch doc', error);
    // yield toast.error(error.message, toastConfig);
  }
}

function* fetchCampaignConfiguration(action) {
  try {
    yield put(load());
    const res = yield call(api.GET, `configuration/campaign/${action.campId}/${action.notifId}`);
    if(res.error)
      yield toast.error(res.message, toastConfig);
    else
      yield put(actions.createSuccess(res));
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
    const res = yield call(api.POST, `configuration`, action.configuration);
    if(res.error)
      yield toast.error(res.message, toastConfig);
    else
      yield put(actions.createSuccess(res));
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
    const res = yield call(api.PUT, `configuration/${action.configuration.id}`, action.configuration);
    if(res.error)
      yield toast.error(res.message, toastConfig);
    else {
      let configuration = action.configuration;
      configuration["_id"] = configuration.id;
      yield put(actions.successConfiguration(action.configuration));
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

export function* watchFetchCampaignConfig() {
  yield takeLatest(actions.FETCH_CAMPAIGN_CONFIG, fetchCampaignConfiguration);
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
    fork(watchUpdate),
    fork(watchFetchCampaignConfig)
  ];
}
