
export interface ICustomerState {
  isCustomerListFetching: boolean;
  customerListFetchingError: string;
  customerListResposne: { id: number, name: string, mobileNumber: string }[]
}