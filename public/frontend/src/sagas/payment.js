import { call, put, select, fork, takeLatest } from 'redux-saga/effects';
import * as api from '../services/api';
import * as actions from '../ducks/payment';
import { updateProfile } from '../ducks/profile';


const getProfile = state => state.getIn(['profile', 'profile']);


function* fetch(action) {
  try {
    const res = yield call(api.GET, `payment`);
    if(res.error)
      console.log(res.error);
    else
      yield put(actions.successPayment(res));
  } catch (error) {
    console.log('Failed to fetch doc', error);
  }
}

function* create(action) {
  try {
    const res = yield call(api.POST, `payment`, action.payment);
    if(res.error)
      console.log(res.error);
    else {
      let profile = yield select(getProfile);
      profile['id'] = profile._id;
      delete profile['_id'];
      profile['profile_payments'] = res._id
      yield put(updateProfile(profile));
      yield put(actions.successPayment(res));
    }

  } catch (error) {
    console.log('Failed to fetch doc', error);
  }

}

function* update(action) {
  try {
    const res = yield call(api.PUT, `payment/${action.id}`);
    if(res.error)
      console.log(res.error);
    else
      yield put(actions.successPayment(res));
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
