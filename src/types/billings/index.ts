import { ICustomIndexedTableBody } from '../custom-table';
import { ICustomer } from '../customers';
import { IItem } from '../items';

export interface IbillingRequest {
	id: number;
	billDate: string;
	quantity: number;
	menuItemId: number;
	customerId: number;
}

export interface IbillingResponce {
	id: number;
	billDate: string;
	customer: ICustomer;
	menuItem: IItem;
	quantity: number;
	totalAmount: number;
}

export interface IbillingView extends ICustomIndexedTableBody, IbillingRequest {
	totalAmount: number;
}

export interface IbillingState {
	isBillingFetching: boolean;
	billingList: IbillingResponce[];
	billing: IbillingResponce;
}
