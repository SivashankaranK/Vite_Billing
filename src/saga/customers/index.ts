import { takeLatest } from '@redux-saga/core/effects';
import { GET_CUSTOMERS_LIST } from '../../actions-types/customer';

function* getCustomersList(action: any) {

  try {
    console.log('inside saga try', action.payload);
  }
  catch {

  }
}


export function* getCustomerData() {
  yield takeLatest(GET_CUSTOMERS_LIST, getCustomersList)
}