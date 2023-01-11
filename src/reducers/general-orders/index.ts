import { createSlice } from '@reduxjs/toolkit';
import { IActionWithOutPayload, IActionWithpayload, IApiRequest, IgeneralOrder, IgeneralOrderState } from '../../types';
const initialState: IgeneralOrderState = {
	generalOrders: [],
	generalOrder: {} as IgeneralOrder,
	isFetching: false,
};
export const generalOrdersReducer = createSlice({
	name: 'generalOrders',
	initialState,
	reducers: {
		getGeneralOrders: (state: IgeneralOrderState, _action: IActionWithOutPayload) => {
			state.isFetching = true;
		},
		setGeneralOrders: (state: IgeneralOrderState, action: IActionWithpayload<IgeneralOrder[]>) => {
			state.generalOrders = action.payload;
			state.isFetching = false;
		},
		createUpdateGeneralOrders: (state: IgeneralOrderState, _action: IActionWithpayload<IApiRequest<IgeneralOrder>>) => {
			state.isFetching = true;
		},
		getGeneralOrderById: (state: IgeneralOrderState, _action: IActionWithpayload<IApiRequest<number>>) => {
			state.isFetching = true;
			state.generalOrder = {} as IgeneralOrder;
		},
		setGeneralOrderById: (state: IgeneralOrderState, action: IActionWithpayload<IgeneralOrder>) => {
			state.generalOrder = action.payload;
			state.isFetching = false;
		},
		updateGeneralOrdersIsFetching: (state: IgeneralOrderState, _action: IActionWithOutPayload) => {
			state.isFetching = false;
		},
	},
});

export const {
	createUpdateGeneralOrders,
	getGeneralOrderById,
	getGeneralOrders,
	setGeneralOrderById,
	setGeneralOrders,
	updateGeneralOrdersIsFetching,
} = generalOrdersReducer.actions;
