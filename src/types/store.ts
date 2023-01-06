import { ICommonReducerState } from './common'
import { ICustomerState } from './customers'

export interface IActionWithpayload<T> {
  type: string
  payload: T
}

export interface IActionWithOutPayload {
  type: string
}

export interface IApiRequestCallBack {
  status: number
  message: string
}

export interface IApiRequest<T> {
  value: T
  callback?: (resp: IApiRequestCallBack) => void
}

export interface IStore {
  customers: ICustomerState
  common: ICommonReducerState
}
