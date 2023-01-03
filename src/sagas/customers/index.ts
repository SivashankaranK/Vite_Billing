import { put, takeLatest } from '@redux-saga/core/effects';
import { GET_CUSTOMERS_LIST } from '../../actions-types/customers';
import { apiProps } from '../../utils/constants';
import { apiCall } from '../../utils/helpers/services';
import { customerListResponse, customerListFailure } from '../../reducers';

function* getCustomersList(): Generator<any, void, any> {

  try {
    const response = yield apiCall({ method: apiProps.customersList.method, path: apiProps.customersList.path });
    if (response.status) {
      yield put(customerListResponse(response.data))
    } else {
      yield put(customerListFailure(response.error || 'Error Occured'))
    }
  }
  catch (error) {
    yield put(customerListFailure('Error Occured'))
  }
}

export function* getCustomerData() {
  yield takeLatest(GET_CUSTOMERS_LIST, getCustomersList);
}