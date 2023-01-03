export interface IApiCallProps {
  method: string;
  path: string;
  paramsObj?: { [key: string]: any };
  dataObj?: { [key: string]: any };
}