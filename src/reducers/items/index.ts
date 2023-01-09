import { createSlice } from '@reduxjs/toolkit';
import { IActionWithOutPayload, IActionWithpayload, IApiRequest, IItem, IItemState, IStore } from '../../types';
const initialState: IItemState = {
	isFetching: false,
	itemList: [],
};
export const itemsReducers = createSlice({
	name: 'items',
	initialState,
	reducers: {
		getItems: (state: IItemState, action: IActionWithOutPayload) => {
			state.isFetching = true;
		},
		setItems: (state: IItemState, action: IActionWithpayload<IItem[]>) => {
			state.itemList = action.payload;
			state.isFetching = false;
		},
		createUpdateItem: (state: IItemState, action: IActionWithpayload<IApiRequest<IItem>>) => {
			state.isFetching = true;
		},
		updateItemsFetchingState: (state: IItemState, action: IActionWithOutPayload) => {
			state.isFetching = false;
		},
	},
});

export const { getItems, setItems, createUpdateItem, updateItemsFetchingState } = itemsReducers.actions;
