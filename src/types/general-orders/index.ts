export interface IgeneralOrder {
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
