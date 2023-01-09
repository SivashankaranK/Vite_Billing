import { createSlice } from '@reduxjs/toolkit'
import { ICustomer, ICustomerState } from '../../types'
import { IActionWithOutPayload, IActionWithpayload, IApiRequest } from '../../types/store'

const initialState: ICustomerState = {
  isFetching: true,
  customerListResponse: [],
}

export const customerReducer = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    customerListRequest: (state: ICustomerState, _action: IActionWithOutPayload) => {
      state.isFetching = true;
      state.customerListResponse = [];
    },
    customerListResponse: (state: ICustomerState, action: IActionWithpayload<ICustomer[]>) => {
      state.isFetching = false;
      state.customerListResponse = action.payload;
    },
    customerListFailure: (state: ICustomerState, _action: IActionWithpayload<string>) => {
      state.isFetching = false;
      state.customerListResponse = [];
    },
    createUpdateCustomerRequest: (state: ICustomerState, _action: IActionWithpayload<IApiRequest<ICustomer>>) => {
      state.isFetching = true;
    },
    createUpdateCustomerResponse: (state: ICustomerState, action: IActionWithpayload<ICustomer>) => {
      state.isFetching = false;
      const findIndex = state.customerListResponse.findIndex((obj) => obj.id === action.payload.id);
      if (findIndex) {
        state.customerListResponse[findIndex] = action.payload;
      } else {
        state.customerListResponse.push(action.payload);
      }
    },
    createUpdateCustomerFailure: (state: ICustomerState, _action: IActionWithpayload<string>) => {
      state.isFetching = false;
    },
    updateCustomerFetchingState: (state: ICustomerState, _action: IActionWithOutPayload) => {
      state.isFetching = false;
    },
  },
})

export const {
  customerListRequest,
  customerListResponse,
  customerListFailure,
  createUpdateCustomerRequest,
  createUpdateCustomerFailure,
  createUpdateCustomerResponse,
  updateCustomerFetchingState,
} = customerReducer.actions
