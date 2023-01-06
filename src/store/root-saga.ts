import { all, fork } from 'redux-saga/effects'
import { handleCustomerData } from '../sagas'

export function* rootSaga() {
  yield all([fork(handleCustomerData)])
}
