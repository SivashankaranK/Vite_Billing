import { createSlice } from '@reduxjs/toolkit';
import { IActionWithOutPayload, IActionWithpayload, IApiRequest, Ibilling, IbillingState } from '../../types';
const initialState: IbillingState = {
	billings: [],
	billing: {} as Ibilling,
	isFetching: false,
};
export const billingsReducer = createSlice({
	name: 'billings',
	initialState,
	reducers: {
		getBillings: (state: IbillingState, _action: IActionWithOutPayload) => {
			state.isFetching = true;
		},
		setBillings: (state: IbillingState, action: IActionWithpayload<Ibilling[]>) => {
			state.billings = action.payload;
			state.isFetching = false;
		},
		createUpdateBillings: (state: IbillingState, _action: IActionWithpayload<IApiRequest<Ibilling>>) => {
			state.isFetching = true;
		},
		getBillingById: (state: IbillingState, _action: IActionWithpayload<IApiRequest<number>>) => {
			state.isFetching = true;
			state.billing = {} as Ibilling;
		},
		setBillingById: (state: IbillingState, action: IActionWithpayload<Ibilling>) => {
			state.billing = action.payload;
			state.isFetching = false;
		},
		updateBillingsIsFetching: (state: IbillingState, _action: IActionWithOutPayload) => {
			state.isFetching = false;
		},
	},
});

export const { createUpdateBillings, getBillingById, getBillings, setBillingById, setBillings, updateBillingsIsFetching } =
	billingsReducer.actions;
