import { createSlice } from "@reduxjs/toolkit"
import { ICustomerState } from "../../types";



const initialState: ICustomerState = {
    isCustomerListFetching: true,
    customerListFetchingError: '',
    customerListResposne: []
}

const CustomerReducer = createSlice({
    name: 'customers',
    initialState,
    reducers: {
        customerListRequest: (state) => {
            state.isCustomerListFetching = true;
            state.customerListFetchingError = '';
            state.customerListResposne = [];
        },
        customerListResponse: (state, action) => {
            state.isCustomerListFetching = false;
            state.customerListFetchingError = '';
            state.customerListResposne = action.payload;
        },
        customerListFailure: (state, action) => {
            state.isCustomerListFetching = true;
            state.customerListFetchingError = action.payload;
            state.customerListResposne = [];
        }
    }

})

export const { customerListRequest, customerListResponse, customerListFailure } = CustomerReducer.actions;

export default CustomerReducer.reducer;