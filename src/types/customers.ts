import { ICustomIndexedTableBody } from "./custom-table";

export interface ICustomerState {
  isCustomerListFetching: boolean;
  customerListFetchingError: string;
  customerListResposne: ICustomerListResposne[];
}

export interface ICustomerListResposne {
  id: number;
  name: string;
  mobileNumber: string;
}