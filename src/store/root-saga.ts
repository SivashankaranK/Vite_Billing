import { all, fork } from 'redux-saga/effects';
import { handleCustomerData, handleExportData, handleItemsData, handlebillingsData } from '../sagas';

export function* rootSaga() {
	yield all([fork(handleCustomerData)]);
	yield all([fork(handleItemsData)]);
	yield all([fork(handlebillingsData)]);
	yield all([fork(handleExportData)]);
}
