import { call, put, select, fork, takeLatest } from 'redux-saga/effects';
import * as api from '../services/api';
import * as actions from '../ducks/notification';

function* fetch(action) {
  try {
    const res = yield call(api.GET, `notificationtypes/campaign`);
    if(res.error)
      console.log(res.error);
    else
      yield put(actions.successNotification(res));
  } catch (error) {
    console.log('Failed to fetch doc', error);
  }
}

function* create(action) {
  try {
    const res = yield call(api.POST, `notificationtypes`, action.notification);
    if(res.error)
      console.log(res.error);
    else
      yield put(actions.successNotification(res));
  } catch (error) {
    console.log('Failed to fetch doc', error);
  }

}

function* update(action) {
  try {
    console.log(action);

    const res = yield call(api.PUT, `notificationtypes/${action.notification.id}`);
    if(res.error)
      console.log(res.error);
    else {
      let notification = action.notification;
      notification["_id"] = notification.id;
      yield put(actions.successNotification(action.notification));
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
