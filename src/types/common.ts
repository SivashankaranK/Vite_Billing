export interface IApiCallProps {
  method: string;
  path: string;
  paramsObj?: { [key: string]: any };
  dataObj?: { [key: string]: any };
}

export interface ICommonReducerState {
  tableValue: { [key: string]: string | number }
}