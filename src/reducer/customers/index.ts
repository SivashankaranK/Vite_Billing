import { createSlice } from "@reduxjs/toolkit"

interface ICustomerState {
    value: number
}

const initialState: ICustomerState = {
    value: 0
}

const CustomerReducer = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        getCustomerList: (state, action)=> {
            state.value = action.payload
        }
    }

})

export const { getCustomerList } = CustomerReducer.actions;

export default CustomerReducer.reducer;