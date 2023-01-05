import { combineReducers } from "@reduxjs/toolkit";
import CustomerReducer from '../reducers/customers'
import CommonReducer from '../reducers/common';
import { ICommonReducerPorops, ICustomerState } from "../types";


interface IRootReducer{
  customers: ICustomerState;
  common: ICommonReducerPorops;
}

export const rootReducer= combineReducers({
  customers: CustomerReducer,
  common: CommonReducer
});
