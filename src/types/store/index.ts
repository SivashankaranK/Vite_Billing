import { ICommonReducerState } from '../common';
import { ICustomerState } from '../customers';
import { IbillingState } from '../billings';
import { IItemState } from '../items';
import { IExportDataState } from '../export-data';

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
	billings: IbillingState;
	exportData: IExportDataState;
}
