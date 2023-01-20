import { AxiosResponse } from 'axios';
import { PutEffect, put, takeLatest } from 'redux-saga/effects';
import { apiCall, apiProps } from '../../utils';
import { IActionWithpayload, IApiRequest, IExportDataList, IExportDataRequest } from '../../types';
import { GET_EXPORT_DATA_LIST } from '../../actions-types';
import { setExportDataList, updateExportDataListFetching, updateToasterMessage } from '../../reducers';
import { fakeExportData } from '../../faker';

function* getExportDataList({
	payload,
}: IActionWithpayload<IApiRequest<IExportDataRequest>>): Generator<Promise<AxiosResponse | void> | PutEffect, void, AxiosResponse> {
	try {
		const response: AxiosResponse<IExportDataList[], IExportDataRequest> = yield apiCall({
			method: apiProps.exportData.method,
			path: apiProps.exportData.path.replace(':id', payload.value.customerId + ''),
			paramsObj: { start_date: payload.value.startDate, end_date: payload.value.endDate },
		});
		if (response && response.status >= 200 && response.status <= 300) {
			yield put(setExportDataList(response.data));
		} else {
			yield put(setExportDataList(fakeExportData()));
			yield put(updateToasterMessage('Error Occured in Items Request'));
			yield put(updateExportDataListFetching());
		}
	} catch (error) {
		yield put(updateToasterMessage('Error Occured in Items Request'));
		yield put(updateExportDataListFetching());
	}
}

export function* handleExportData() {
	yield takeLatest(GET_EXPORT_DATA_LIST, getExportDataList);
}
