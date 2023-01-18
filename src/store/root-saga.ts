import { all, fork } from 'redux-saga/effects';
import { handleCustomerData, handleExportData, handleItemsData, handlebillingsData } from '../sagas';

export function* rootSaga() {
	yield all([fork(handleCustomerData), fork(handleItemsData), fork(handlebillingsData), fork(handleExportData)]);
}
