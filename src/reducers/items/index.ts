import { createSlice } from '@reduxjs/toolkit';
import { IActionWithOutPayload, IActionWithpayload, IApiRequest, IItem, IItemState } from '../../types';
const initialState: IItemState = {
	isItemFetching: false,
	itemList: [],
};
export const itemsReducers = createSlice({
	name: 'items',
	initialState,
	reducers: {
		getItems: (state: IItemState, _action: IActionWithOutPayload) => {
			state.isItemFetching = true;
		},
		setItems: (state: IItemState, action: IActionWithpayload<IItem[]>) => {
			state.itemList = action.payload;
			state.isItemFetching = false;
		},
		createUpdateItem: (state: IItemState, _action: IActionWithpayload<IApiRequest<IItem>>) => {
			state.isItemFetching = true;
		},
		updateItemsFetchingState: (state: IItemState, _action: IActionWithOutPayload) => {
			state.isItemFetching = false;
		},
		resetData: (state: IItemState, action: IActionWithpayload<string>) => {
			if (action.payload === 'items') {
				state.itemList = []
			}
		}
	},
});

export const { getItems, setItems, createUpdateItem, updateItemsFetchingState } = itemsReducers.actions;
