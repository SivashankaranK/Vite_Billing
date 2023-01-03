import { all, fork } from 'redux-saga/effects';
import { getCustomerData } from '../sagas';

export function* rootSaga() {
    yield all([
        fork(getCustomerData)
    ])
}