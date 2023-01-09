import { PutEffect, put, takeLatest } from '@redux-saga/core/effects'
import { CREATE_UPDATE_CUSTOMER, GET_CUSTOMERS_LIST } from '../../actions-types/customers'
import { apiProps } from '../../utils/constants'
import { apiCall } from '../../utils/helpers/services'
import { customerListResponse, customerListFailure, createUpdateCustomerResponse, stopCustomerFetching } from '../../reducers'
import { ICustomer } from '../../types'
import { IActionWithpayload, IApiRequest } from '../../types/store'
import { AxiosError, AxiosResponse } from 'axios'

function* getCustomersList(): Generator<Promise<AxiosResponse | void> | PutEffect, void, AxiosResponse> {
  try {
    const response: AxiosResponse = yield apiCall({
      method: apiProps.customersList.method,
      path: apiProps.customersList.path,
    })
    if (response && response.status >= 200 && response.status <= 300) {
      yield put(customerListResponse(response.data))
    } else {
      yield put(stopCustomerFetching())
      console.log('api error:unable to get response')
    }
  } catch (error) {
    console.log('error occured on createUpdateCustomerRequest')
  }
}

function* createUpdateCustomerRequest({
  payload,
}: IActionWithpayload<IApiRequest<ICustomer>>): Generator<Promise<AxiosResponse | void> | PutEffect, void, AxiosResponse> {
  try {
    const apiPath = `${payload.value.id ? apiProps.updateCustomer.path.replace(':id', `${payload.value.id}`) : apiProps.createCustomer.path}`

    const response: AxiosResponse = yield apiCall({
      method: payload.value.id ? apiProps.updateCustomer.method : apiProps.createCustomer.method,
      path: apiPath,
      dataObj: payload.value,
    })

    if (response && response.status >= 200 && response.status <= 300) {
      yield put(createUpdateCustomerResponse(response.data))
    } else {
      yield put(stopCustomerFetching())
      console.log('api error:unable to get response')
    }
  } catch (error) {
    console.log('error occured on createUpdateCustomerRequest')
  }
}

export function* handleCustomerData() {
  yield takeLatest(GET_CUSTOMERS_LIST, getCustomersList)
  yield takeLatest(CREATE_UPDATE_CUSTOMER, createUpdateCustomerRequest)
}
