import { combineReducers } from "@reduxjs/toolkit";
import { commonReducer, customerReducer } from "../reducers";


export const rootReducer = combineReducers({
  customers: customerReducer.reducer,
  common: commonReducer.reducer
});
