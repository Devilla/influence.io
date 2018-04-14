import { call, put, select, fork, takeLatest } from 'redux-saga/effects';
import * as api from 'services/api';
import * as actions from 'ducks/notification';
import { load, loaded } from 'ducks/loading';
import { ToastContainer, toast } from 'react-toastify';

const toastConfig = {
  position: toast.POSITION.BOTTOM_LEFT,
  autoClose: 2000
};

function* fetch(action) {
  try {
    yield put(load());
    const res = yield call(api.GET, `notificationtypes`);
    if(res.error)
      yield toast.error(res.message, toastConfig);
    else
      yield put(actions.successNotification(res));
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
    const res = yield call(api.POST, `notificationtypes`, action.notification);
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
    const res = yield call(api.PUT, `notificationtypes/${action.notification.id}`);
    if(res.error)
      yield toast.error(res.message, toastConfig);
    else {
      let notification = action.notification;
      notification["_id"] = notification.id;
      yield put(actions.successNotification(action.notification));
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
