import { createSlice } from '@reduxjs/toolkit';
import { ICommonReducerState } from '../../types';
import { IActionWithpayload } from '../../types/store';

const initialState: ICommonReducerState = {
  toasterMessage: ''
}

export const commonReducer = createSlice({
  name: 'common',
  initialState,
  reducers: {
    updateToasterMessage: (
      state: ICommonReducerState,
      action: IActionWithpayload<string>) => {
      state.toasterMessage = action.payload;
    }
  },
})

export const { updateToasterMessage } = commonReducer.actions
