export type IfieldType = 'string' | 'number';

export interface ICustomTableHeaderTypes {
	value: string;
	label: string;
	fieldType: IfieldType;
	palceHolder: string;
	regexPattern?: RegExp;
	isReadOnly?: boolean;
	isNumberOnly?: boolean;
	isLastColumn?: boolean;
}

export interface ICustomIndexedTableBody {
	[key: string]: number | string | undefined;
	className?: string;
}
