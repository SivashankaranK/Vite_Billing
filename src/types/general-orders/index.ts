import { ICustomIndexedTableBody } from '../custom-table';

export interface IgeneralOrder extends ICustomIndexedTableBody {
	id: number;
	billDate: string;
	quantity: number;
	menuItemId: number;
	customerId: number;
}

export interface IgeneralOrderState {
	isFetching: boolean;
	generalOrders: IgeneralOrder[];
	generalOrder: IgeneralOrder;
}
