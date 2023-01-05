export interface IApiCallProps {
  method: string;
  path: string;
  paramsObj?: { [key: string]: any };
  dataObj?: { [key: string]: any };
}

export interface ICommonReducerPorops {
  tableValue: { [key: string]: string | number }
}