import { PutEffect, put, takeLatest } from '@redux-saga/core/effects'
import { CREATE_UPDATE_CUSTOMER, GET_CUSTOMERS_LIST } from '../../actions-types/customers'
import { apiProps } from '../../utils/constants'
import { apiCall } from '../../utils/helpers/services'
import { customerListResponse, customerListFailure, createUpdateCustomerResponse, createUpdateCustomerFailure } from '../../reducers'
import { ICustomer } from '../../types'
import { IActionWithpayload, IApiRequest } from '../../types/store'
import { AxiosError, AxiosResponse } from 'axios'

function* getCustomersList(): Generator<Promise<ICustomer[] | any> | PutEffect, void, ICustomer[] | any> {
  try {
    const response: AxiosResponse = yield apiCall({
      method: apiProps.customersList.method,
      path: apiProps.customersList.path,
    })
    if (response.status === 200) {
      yield put(customerListResponse(response.data))
    } else {
      yield put(customerListFailure('Error Occured'))
    }
  } catch (error) {
    yield put(customerListFailure('Error Occured on getCustomersList'))
  }
}

function* createUpdateCustomerRequest({ payload }: IActionWithpayload<IApiRequest<ICustomer>>): Generator<Promise<any> | PutEffect, void, any> {
  try {
    const apiPath = `${payload.value.id ? apiProps.updateCustomer.path.replace(':id', `${payload.value.id}`) : apiProps.createCustomer.path}`

    const response: AxiosResponse = yield apiCall({
      method: payload.value.id ? apiProps.updateCustomer.method : apiProps.createCustomer.method,
      path: apiPath,
      dataObj: payload.value,
    })

    if (response.status >= 200 && response.status <= 300) {
      yield put(createUpdateCustomerResponse(response.data))
    } else {
      yield put(createUpdateCustomerFailure('Error Occured'))
    }
  } catch (error) {
    yield put(createUpdateCustomerFailure('Error occured on createUpdateCustomerRequest'))
  }
}

export function* handleCustomerData() {
  yield takeLatest(GET_CUSTOMERS_LIST, getCustomersList)
  yield takeLatest(CREATE_UPDATE_CUSTOMER, createUpdateCustomerRequest)
}
