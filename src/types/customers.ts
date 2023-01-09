import { ICustomIndexedTableBody } from './custom-table'

export interface ICustomerState {
  isFetching: boolean
  customerListResponse: ICustomer[]
}

export interface ICustomer extends ICustomIndexedTableBody {
  id?: number
  name: string
  mobileNumber: string
}
