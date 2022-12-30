import { all, fork } from 'redux-saga/effects';
import { getCustomerData } from '../saga';

export function* rootSaga() {
    yield all([
        fork(getCustomerData)
    ])
}