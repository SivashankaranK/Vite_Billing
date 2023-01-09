import { ICustomTableHeaderTypes } from '../../../types';

export const CustomerTableHeaders: ICustomTableHeaderTypes[] = [
	{
		label: 'Id',
		value: 'id',
		fieldType: 'number',
		isReadOnly: true,
		palceHolder: '',
	},
	{
		label: 'Name',
		value: 'name',
		fieldType: 'string',
		palceHolder: 'Add Name',
	},
	{
		label: 'Mobile Number',
		value: 'mobileNumber',
		fieldType: 'string',
		palceHolder: 'Add Mobile Number',
		isNumberOnly: true,
		isLastColumn: true,
	},
];
