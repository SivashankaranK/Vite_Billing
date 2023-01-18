import { createSlice } from '@reduxjs/toolkit';
import {
	IActionWithOutPayload,
	IActionWithpayload,
	IApiRequest,
	IExportDataList,
	IExportDataRequest,
	IExportDataState,
} from '../../types';

const initialState: IExportDataState = {
	exportDataList: [],
	isExaportDataFetching: false,
};
export const exportDataReducer = createSlice({
	name: 'exportData',
	initialState,
	reducers: {
		getExportDataList: (state: IExportDataState, _action: IActionWithpayload<IApiRequest<IExportDataRequest>>) => {
			state.isExaportDataFetching = true;
		},
		setExportDataList: (state: IExportDataState, action: IActionWithpayload<IExportDataList[]>) => {
			state.exportDataList = action.payload;
			state.isExaportDataFetching = false;
		},
		updateExportDataListFetching: (state: IExportDataState, _action: IActionWithOutPayload) => {
			state.isExaportDataFetching = false;
		},
	},
});

export const { getExportDataList, setExportDataList, updateExportDataListFetching } = exportDataReducer.actions;
