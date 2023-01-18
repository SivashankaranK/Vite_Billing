import { createSlice } from '@reduxjs/toolkit';
import { ICustomer, ICustomerState } from '../../types';
import { IActionWithOutPayload, IActionWithpayload, IApiRequest } from '../../types/store';

const initialState: ICustomerState = {
	isCustomerFetching: true,
	customerListResponse: [],
};

export const customerReducer = createSlice({
	name: 'customers',
	initialState,
	reducers: {
		customerListRequest: (state: ICustomerState, _action: IActionWithOutPayload) => {
			state.isCustomerFetching = true;
			state.customerListResponse = [];
		},
		customerListResponse: (state: ICustomerState, action: IActionWithpayload<ICustomer[]>) => {
			state.isCustomerFetching = false;
			state.customerListResponse = action.payload;
		},
		customerListFailure: (state: ICustomerState, _action: IActionWithpayload<string>) => {
			state.isCustomerFetching = false;
			state.customerListResponse = [];
		},
		createUpdateCustomerRequest: (state: ICustomerState, _action: IActionWithpayload<IApiRequest<ICustomer>>) => {
			state.isCustomerFetching = true;
		},
		createUpdateCustomerResponse: (state: ICustomerState, action: IActionWithpayload<ICustomer[]>) => {
			state.isCustomerFetching = false;
			state.customerListResponse = action.payload;
		},
		createUpdateCustomerFailure: (state: ICustomerState, _action: IActionWithpayload<string>) => {
			state.isCustomerFetching = false;
		},
		updateCustomerFetchingState: (state: ICustomerState, _action: IActionWithOutPayload) => {
			state.isCustomerFetching = false;
		},
		resetData: (state: ICustomerState, action: IActionWithpayload<string>) => {
			if (action.payload === 'customers') {
				state.customerListResponse = []
			}
		}
	},
});

export const {
	customerListRequest,
	customerListResponse,
	customerListFailure,
	createUpdateCustomerRequest,
	createUpdateCustomerFailure,
	createUpdateCustomerResponse,
	updateCustomerFetchingState
} = customerReducer.actions;
