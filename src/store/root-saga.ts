import { all, fork } from 'redux-saga/effects';
import { handleCustomerData, handleItemsData } from '../sagas';

export function* rootSaga() {
	yield all([fork(handleCustomerData)]);
	yield all([fork(handleItemsData)]);
}
