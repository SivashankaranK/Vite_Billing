import { combineReducers } from "@reduxjs/toolkit";
import { CommonReducer, CustomerReducer } from "../reducers";


export const rootReducer = combineReducers({
  customers: CustomerReducer.reducer,
  common: CommonReducer.reducer
});
