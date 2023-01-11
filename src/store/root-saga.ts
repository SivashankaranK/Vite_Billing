import { all, fork } from 'redux-saga/effects';
import { handleCustomerData, handleItemsData, handleGeneralOrdersData } from '../sagas';

export function* rootSaga() {
	yield all([fork(handleCustomerData)]);
	yield all([fork(handleItemsData)]);
	yield all([fork(handleGeneralOrdersData)]);
}
