import { createSlice } from "@reduxjs/toolkit"
import { ICommonReducerPorops } from "../../types";



const initialState: ICommonReducerPorops = {
    tableValue:{}
}

const CommonReducer = createSlice({
    name: 'common',
    initialState,
    reducers: {
        updateTableValue: (state, action) => {
            state.tableValue = action.payload
        }
    }

})

export const { updateTableValue } = CommonReducer.actions;

export default CommonReducer.reducer;