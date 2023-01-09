import { ICustomTableHeaderTypes } from '../../../types';

export const ItemsTableHeaders: ICustomTableHeaderTypes[] = [
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
		palceHolder: 'Enter Menu Name',
		isLastColumn: true,
	},
];
