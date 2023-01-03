import { combineReducers } from "@reduxjs/toolkit";
import CustomerReducer from '../reducers/customers'

export const rootReducer = combineReducers({
  customers: CustomerReducer
});
