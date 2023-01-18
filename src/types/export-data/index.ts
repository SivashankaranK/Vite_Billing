import { ICustomer } from '../customers';
import { IItem } from '../items';

export interface IExportDataRequest {
	customerId: number;
	startDate: string;
	endDate: string;
}

export interface IExportDataList {
	id: number;
	billDate: string;
	customer: ICustomer;
	menuItem: IItem;
	quantity: number;
	totalAmount: number;
}

export interface IExportDataState {
	isExaportDataFetching: boolean;
	exportDataList: IExportDataList[];
}
