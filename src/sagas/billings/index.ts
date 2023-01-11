import { AxiosResponse } from 'axios';
import { IActionWithpayload, IApiRequest, Ibilling } from '../../types';
import { apiCall, apiProps } from '../../utils';
import { PutEffect, put, takeLatest } from 'redux-saga/effects';
import { updateToasterMessage } from '../../reducers';
import { setBillingById, setBillings, updateBillingsIsFetching } from '../../reducers/billings';
import { CREATE_UPDATE_GENERAL_ORDERS, GET_GENERAL_ORDERS, GET_GENERAL_ORDER_BY_ID } from '../../actions-types';
import store from '../../store';

function* getbillings(): Generator<Promise<AxiosResponse | void> | PutEffect, void, AxiosResponse> {
	try {
		const response: AxiosResponse<Ibilling[]> = yield apiCall<Ibilling[]>({
			method: apiProps.orderList.method,
			path: apiProps.orderList.path,
		});
		if (response && response.status >= 200 && response.status <= 300) {
			yield put(setBillings(response.data));
		} else {
			yield put(updateToasterMessage('Error Occured in Items Request'));
			yield put(updateBillingsIsFetching());
		}
	} catch (error) {
		yield put(updateToasterMessage('Error Occured in Items Request'));
		yield put(updateBillingsIsFetching());
	}
}

function* createUpdatebillings({
	payload,
}: IActionWithpayload<IApiRequest<Ibilling>>): Generator<Promise<AxiosResponse | void> | PutEffect, void, AxiosResponse> {
	try {
		const method = payload.value.id ? apiProps.updateOrder.method : apiProps.createOrder.method;
		const path = payload.value.id ? apiProps.updateOrder.path.replace(':id', `${payload.value.id}`) : apiProps.createOrder.path;
		const response: AxiosResponse<Ibilling> = yield apiCall({
			method,
			path,
			dataObj: payload.value,
		});
		if (response && response.status >= 200 && response.status <= 300) {
			let items: Ibilling[] = store.getState().billings.billings;
			if (payload.value.id) {
				items = items.map((obj: Ibilling) => (obj.id === response.data.id ? response.data : obj));
			} else {
				items = [...items, response.data];
			}
			yield put(setBillings(items));
		} else {
			yield put(updateToasterMessage('Error Occured in Items Request'));
			yield put(updateBillingsIsFetching());
		}
	} catch (error) {
		yield put(updateToasterMessage('Error Occured in Items Request'));
		yield put(updateBillingsIsFetching());
	}
}

function* getbillingById({
	payload,
}: IActionWithpayload<IApiRequest<number>>): Generator<Promise<AxiosResponse | void> | PutEffect, void, AxiosResponse> {
	try {
		const method = apiProps.orderById.method;
		const path = apiProps.orderById.path.replace(':id', `${payload.value}`);
		const response: AxiosResponse<Ibilling> = yield apiCall({
			method,
			path,
		});
		if (response && response.status >= 200 && response.status <= 300) {
			yield put(setBillingById(response.data));
		} else {
			yield put(updateToasterMessage('Error Occured in Items Request'));
			yield put(updateBillingsIsFetching());
		}
	} catch (error) {
		yield put(updateToasterMessage('Error Occured in Items Request'));
		yield put(updateBillingsIsFetching());
	}
}

export function* handlebillingsData() {
	yield takeLatest(GET_GENERAL_ORDERS, getbillings);
	yield takeLatest(CREATE_UPDATE_GENERAL_ORDERS, createUpdatebillings);
	yield takeLatest(GET_GENERAL_ORDER_BY_ID, getbillingById);
}
