import { combineReducers } from '@reduxjs/toolkit';
import { commonReducer, customerReducer, exportDataReducer, itemsReducers } from '../reducers';
import { billingsReducer } from '../reducers/billings';

export const rootReducer = combineReducers({
	customers: customerReducer.reducer,
	common: commonReducer.reducer,
	items: itemsReducers.reducer,
	billings: billingsReducer.reducer,
	exportData: exportDataReducer.reducer,
});
