import { combineReducers } from "@reduxjs/toolkit";
import CustomerReducer from '../reducer/customers'

export const rootReducer = combineReducers({
  customers: CustomerReducer
});
