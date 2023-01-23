import { ICustomTableHeaderTypes } from '../../../types';

export const CustomerTableHeaders: ICustomTableHeaderTypes[] = [
	{
		label: 'S.No',
		value: 'sno',
		fieldType: 'number',
		isReadOnly: true,
		placeHolder: '',
	},
	{
		label: 'Name',
		value: 'name',
		fieldType: 'string',
		placeHolder: 'Add Name',
	},
	{
		label: 'Mobile Number',
		value: 'mobileNumber',
		fieldType: 'string',
		placeHolder: 'Add Mobile Number',
		regexPattern: /^\+?\d*$/,
		isLastColumn: true,
	},
];
