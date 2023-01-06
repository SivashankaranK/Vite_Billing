import { createSlice } from '@reduxjs/toolkit'
import { ICustomer, ICustomerState } from '../../types'
import { IActionWithOutPayload, IActionWithpayload, IApiRequest } from '../../types/store'

const initialState: ICustomerState = {
  isFetching: true,
  responseMessage: '',
  responseStatus: 0,
  customerListResponse: [],
}

export const CustomerReducer = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    customerListRequest: (state: ICustomerState, _action: IActionWithOutPayload) => {
      state.isFetching = true
      state.responseMessage = ''
      state.customerListResponse = []
    },
    customerListResponse: (state: ICustomerState, action: IActionWithpayload<ICustomer[]>) => {
      state.isFetching = false
      state.responseMessage = ''
      state.customerListResponse = action.payload
    },
    customerListFailure: (state: ICustomerState, action: IActionWithpayload<string>) => {
      state.isFetching = true
      state.responseMessage = action.payload
      state.customerListResponse = []
    },
    createUpdateCustomerRequest: (state: ICustomerState, _action: IActionWithpayload<IApiRequest<ICustomer>>) => {
      state.isFetching = true
      state.responseMessage = ''
    },
    createUpdateCustomerResponse: (state: ICustomerState, action: IActionWithpayload<ICustomer>) => {
      debugger
      state.isFetching = false
      state.responseMessage = ''
      console.log(state.customerListResponse.push(action.payload))
      state.customerListResponse.push(action.payload)
    },
    createUpdateCustomerFailure: (state: ICustomerState, action: IActionWithpayload<string>) => {
      state.isFetching = false
      state.responseMessage = action.payload
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
} = CustomerReducer.actions
