import { ICommonReducerState } from '../common';
import { ICustomerState } from '../customers';
import { IItemState } from '../items';

export interface IActionWithpayload<T> {
	type: string;
	payload: T;
}

export interface IActionWithOutPayload {
	type: string;
}

export interface IApiRequestCallBack {
	status: number;
	message: string;
}

export interface IApiRequest<T> {
	value: T;
	callback?: (resp: IApiRequestCallBack) => void;
}

export interface IStore {
	customers: ICustomerState;
	common: ICommonReducerState;
	items: IItemState;
}
