import { createSlice } from '@reduxjs/toolkit';
import { ICommonReducerState } from '../../types';
import { IActionWithpayload } from '../../types/store';

const initialState: ICommonReducerState = {
	tableValue: {},
};

export const commonReducer = createSlice({
	name: 'common',
	initialState,
	reducers: {
		updateTableValue: (state: ICommonReducerState, action: IActionWithpayload<any>) => {
			state.tableValue = action.payload;
		},
	},
});

export const { updateTableValue } = commonReducer.actions;
