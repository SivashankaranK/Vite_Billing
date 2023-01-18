import { createSlice } from '@reduxjs/toolkit';
import { IActionWithOutPayload, IActionWithpayload, IApiRequest, IbillingRequest, IbillingResponce, IbillingState } from '../../types';
const initialState: IbillingState = {
	billingList: [],
	billing: {} as IbillingResponce,
	isBillingFetching: false,
};
export const billingsReducer = createSlice({
	name: 'billings',
	initialState,
	reducers: {
		getBillings: (state: IbillingState, _action: IActionWithOutPayload) => {
			state.isBillingFetching = true;
		},
		setBillings: (state: IbillingState, action: IActionWithpayload<IbillingResponce[]>) => {
			state.billingList = action.payload;
			state.isBillingFetching = false;
		},
		createUpdateBillings: (state: IbillingState, _action: IActionWithpayload<IApiRequest<IbillingRequest>>) => {
			state.isBillingFetching = true;
		},
		getBillingById: (state: IbillingState, _action: IActionWithpayload<IApiRequest<number>>) => {
			state.isBillingFetching = true;
			state.billing = {} as IbillingResponce;
		},
		setBillingById: (state: IbillingState, action: IActionWithpayload<IbillingResponce>) => {
			state.billing = action.payload;
			state.isBillingFetching = false;
		},
		updateBillingsIsFetching: (state: IbillingState, _action: IActionWithOutPayload) => {
			state.isBillingFetching = false;
		},
		resetData: (state: IbillingState, action: IActionWithpayload<string>) => {
			if (action.payload === 'billings') {
				state.billingList = []
			}
		}
	},
});

export const { createUpdateBillings, getBillingById, getBillings, setBillingById, setBillings, updateBillingsIsFetching } =
	billingsReducer.actions;
