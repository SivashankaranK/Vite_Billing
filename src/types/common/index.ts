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

export interface IDropDownOption {
	value: string;
	text: string;
	isSelected?: boolean;
	isDisabled?: boolean;
}

export interface IDropDownList {
	[key: string]: IDropDownOption[];
}
