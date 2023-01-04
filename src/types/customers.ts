import { ICustomIndexedTableBody } from "./custom-table";

export interface ICustomerState {
  isCustomerListFetching: boolean;
  customerListFetchingError: string;
  customerListResposne: ICustomerResponse[];
}

export interface ICustomerResponse extends ICustomIndexedTableBody {
  id: number;
  name: string;
  mobileNumber: number;
}