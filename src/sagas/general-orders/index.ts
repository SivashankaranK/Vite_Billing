import { AxiosResponse } from 'axios';
import { IActionWithpayload, IApiRequest, IgeneralOrder } from '../../types';
import { apiCall, apiProps } from '../../utils';
import { PutEffect, put, takeLatest } from 'redux-saga/effects';
import { updateToasterMessage } from '../../reducers';
import { setGeneralOrderById, setGeneralOrders, updateGeneralOrdersIsFetching } from '../../reducers/general-orders';
import { CREATE_UPDATE_GENERAL_ORDERS, GET_GENERAL_ORDERS, GET_GENERAL_ORDER_BY_ID } from '../../actions-types';
import store from '../../store';

function* getGeneralOrders(): Generator<Promise<AxiosResponse | void> | PutEffect, void, AxiosResponse> {
	try {
		const response: AxiosResponse<IgeneralOrder[]> = yield apiCall<IgeneralOrder[]>({
			method: apiProps.orderList.method,
			path: apiProps.orderList.path,
		});
		if (response && response.status >= 200 && response.status <= 300) {
			yield put(setGeneralOrders(response.data));
		} else {
			yield put(updateToasterMessage('Error Occured in Items Request'));
			yield put(updateGeneralOrdersIsFetching());
		}
	} catch (error) {
		yield put(updateToasterMessage('Error Occured in Items Request'));
		yield put(updateGeneralOrdersIsFetching());
	}
}

function* createUpdateGeneralOrders({
	payload,
}: IActionWithpayload<IApiRequest<IgeneralOrder>>): Generator<Promise<AxiosResponse | void> | PutEffect, void, AxiosResponse> {
	try {
		const method = payload.value.id ? apiProps.updateOrder.method : apiProps.createOrder.method;
		const path = payload.value.id ? apiProps.updateOrder.path.replace(':id', `${payload.value.id}`) : apiProps.createOrder.path;
		const response: AxiosResponse<IgeneralOrder> = yield apiCall({
			method,
			path,
			dataObj: payload.value,
		});
		if (response && response.status >= 200 && response.status <= 300) {
			let items: IgeneralOrder[] = store.getState().generalOrders.generalOrders;
			if (payload.value.id) {
				items = items.map((obj: IgeneralOrder) => (obj.id === response.data.id ? response.data : obj));
			} else {
				items = [...items, response.data];
			}
			yield put(setGeneralOrders(items));
		} else {
			yield put(updateToasterMessage('Error Occured in Items Request'));
			yield put(updateGeneralOrdersIsFetching());
		}
	} catch (error) {
		yield put(updateToasterMessage('Error Occured in Items Request'));
		yield put(updateGeneralOrdersIsFetching());
	}
}

function* getGeneralOrderById({
	payload,
}: IActionWithpayload<IApiRequest<number>>): Generator<Promise<AxiosResponse | void> | PutEffect, void, AxiosResponse> {
	try {
		const method = apiProps.orderById.method;
		const path = apiProps.orderById.path.replace(':id', `${payload.value}`);
		const response: AxiosResponse<IgeneralOrder> = yield apiCall({
			method,
			path,
		});
		if (response && response.status >= 200 && response.status <= 300) {
			yield put(setGeneralOrderById(response.data));
		} else {
			yield put(updateToasterMessage('Error Occured in Items Request'));
			yield put(updateGeneralOrdersIsFetching());
		}
	} catch (error) {
		yield put(updateToasterMessage('Error Occured in Items Request'));
		yield put(updateGeneralOrdersIsFetching());
	}
}

export function* handleGeneralOrdersData() {
	yield takeLatest(GET_GENERAL_ORDERS, getGeneralOrders);
	yield takeLatest(CREATE_UPDATE_GENERAL_ORDERS, createUpdateGeneralOrders);
	yield takeLatest(GET_GENERAL_ORDER_BY_ID, getGeneralOrderById);
}
