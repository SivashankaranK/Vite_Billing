import { ICustomIndexedTableBody } from "./custom-table";

export interface ICustomerState {
  isCustomerListFetching: boolean;
  customerListFetchingError: string;
  customerListResposne: { id: number, name: string, mobileNumber: string }[]
}



export interface ICustomers extends ICustomIndexedTableBody {
  id: number;
  name: string;
  mobileNumber: string;
}