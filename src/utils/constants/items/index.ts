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
	},
	{
		label: 'GST %',
		value: 'gst',
		fieldType: 'number',
		palceHolder: 'Enter GST %',
		isLastColumn: true,
	},
];
