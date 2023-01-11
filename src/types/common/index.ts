export interface IApiCallProps {
  method: string;
  path: string;
  paramsObj?: { [key: string]: any };
  dataObj?: { [key: string]: any };
}

export interface ICommonReducerState {
  toasterMessage: string;
}

export interface IRouteListItems {
  navLabel: string;
  path: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
}