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
	},
	{
		label: 'Price',
		value: 'price',
		fieldType: 'number',
		palceHolder: 'Enter Item Price',
		isNumberOnly: true,
		isReadOnly: true,
	},
	{
		label: 'GST %',
		value: 'gstValue',
		fieldType: 'number',
		palceHolder: 'Enter GST %',
		isLastColumn: true,
		isNumberOnly: true,
		isReadOnly: true,
	},
];
