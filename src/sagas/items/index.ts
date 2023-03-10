import { AxiosResponse } from 'axios';
import { PutEffect, put, takeLatest } from 'redux-saga/effects';
import { apiCall, apiProps } from '../../utils';
import { setItems, updateItemsFetchingState, updateToasterMessage } from '../../reducers';
import { CREATE_UPDATE_ITEM, GET_ITEMS } from '../../actions-types';
import { IActionWithpayload, IApiRequest, IItem } from '../../types';
import store from '../../store';

function* getItems(): Generator<Promise<AxiosResponse | void> | PutEffect, void, AxiosResponse> {
	try {
		const response: AxiosResponse = yield apiCall({
			method: apiProps.itemsList.method,
			path: apiProps.itemsList.path,
		});
		if (response && response.status >= 200 && response.status <= 300) {
			yield put(setItems(response.data));
		} else {
			yield put(updateToasterMessage('Error Occured in Items Request'));
			yield put(updateItemsFetchingState());
		}
	} catch (error) {
		yield put(updateToasterMessage('Error Occured in Items Request'));
		yield put(updateItemsFetchingState());
	}
}

function* createUpdateItem({
	payload,
}: IActionWithpayload<IApiRequest<IItem>>): Generator<Promise<AxiosResponse | void> | PutEffect, void, AxiosResponse> {
	try {
		const method = payload.value.id ? apiProps.updateItem.method : apiProps.createItem.method;
		const path = payload.value.id ? apiProps.updateItem.path.replace(':id', `${payload.value.id}`) : apiProps.createItem.path;
		const response: AxiosResponse<IItem, IItem> = yield apiCall({
			method,
			path,
			dataObj: payload.value,
		});
		if (response && response.status >= 200 && response.status <= 300) {
			let items: IItem[] = store.getState().items.itemList;
			if (payload.value.id) {
				items = items.map((obj: IItem) => (obj.id === response.data.id ? response.data : obj));
			} else {
				items = [...items, response.data];
			}
			yield put(setItems(items));
		} else {
			yield put(updateToasterMessage('Error Occured in Items Request'));
			yield put(updateItemsFetchingState());
		}
	} catch (error) {
		yield put(updateToasterMessage('Error Occured in Items Request'));
		yield put(updateItemsFetchingState());
	}
}

export function* handleItemsData() {
	yield takeLatest(GET_ITEMS, getItems);
	yield takeLatest(CREATE_UPDATE_ITEM, createUpdateItem);
}
