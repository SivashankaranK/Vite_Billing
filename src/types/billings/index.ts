import { ICustomIndexedTableBody } from '../custom-table';
import { ICustomer } from '../customers';
import { IItem } from '../items';

export interface Ibilling extends ICustomIndexedTableBody {
	id: number;
	billDate: string;
	quantity: number;
	menuItemId: number;
	customerId: number;
}

export interface IbillingData extends ICustomIndexedTableBody {
	id: number;
	billDate: string;
	customer: ICustomer;
	menuItem: IItem;
	quantity: number;
	totalAmount: number;
}

export interface IbillingState {
	isFetching: boolean;
	billings: Ibilling[];
	billing: Ibilling;
}
