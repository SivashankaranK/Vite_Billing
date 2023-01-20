import { ICustomTableHeaderTypes } from '../../../types';
export const ItemsTableHeaders: ICustomTableHeaderTypes[] = [
	{
		label: 'S.No',
		value: 'sno',
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
		isReadOnly: true,
	},
	{
		label: 'GST %',
		value: 'gst', //gstValue
		fieldType: 'number',
		palceHolder: 'Enter GST in %',
		isLastColumn: true,
		isReadOnly: true,
	},
];
