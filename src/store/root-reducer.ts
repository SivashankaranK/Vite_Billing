import { combineReducers } from '@reduxjs/toolkit';
import { commonReducer, customerReducer, itemsReducers } from '../reducers';
import { generalOrdersReducer } from '../reducers/general-orders';

export const rootReducer = combineReducers({
	customers: customerReducer.reducer,
	common: commonReducer.reducer,
	items: itemsReducers.reducer,
	generalOrders: generalOrdersReducer.reducer,
});
