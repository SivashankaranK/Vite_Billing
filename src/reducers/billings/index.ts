import { createSlice } from '@reduxjs/toolkit';
import { IActionWithOutPayload, IActionWithpayload, IApiRequest, IbillingRequest, IbillingResponce, IbillingState } from '../../types';
const initialState: IbillingState = {
	billings: [],
	billing: {} as IbillingResponce,
	isFetching: false,
};
export const billingsReducer = createSlice({
	name: 'billings',
	initialState,
	reducers: {
		getBillings: (state: IbillingState, _action: IActionWithOutPayload) => {
			state.isFetching = true;
		},
		setBillings: (state: IbillingState, action: IActionWithpayload<IbillingResponce[]>) => {
			state.billings = action.payload;
			state.isFetching = false;
		},
		createUpdateBillings: (state: IbillingState, _action: IActionWithpayload<IApiRequest<IbillingRequest>>) => {
			state.isFetching = true;
		},
		getBillingById: (state: IbillingState, _action: IActionWithpayload<IApiRequest<number>>) => {
			state.isFetching = true;
			state.billing = {} as IbillingResponce;
		},
		setBillingById: (state: IbillingState, action: IActionWithpayload<IbillingResponce>) => {
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
