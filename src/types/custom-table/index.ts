export type IfieldType = 'string' | 'number' | 'date';

export interface ICustomTableHeaderTypes {
	value: string;
	label: string;
	fieldType: IfieldType;
	palceHolder: string;
	regexPattern?: RegExp;
	isReadOnly?: boolean;
	isLastColumn?: boolean;
	cellType?: 'Dropdown' | 'Checkbox';
}

export interface ICustomIndexedTableBody {
	[key: string]: any;
	className?: string;
}
