import { ICustomTableHeaderTypes } from '../../../types';
export const ItemsTableHeaders: ICustomTableHeaderTypes[] = [
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
		placeHolder: 'Enter Menu Name',
	},
	{
		label: 'Price',
		value: 'price',
		fieldType: 'number',
		placeHolder: 'Enter Item Price',
		isReadOnly: true,
	},
	{
		label: 'GST %',
		value: 'gstValue',
		fieldType: 'number',
		placeHolder: 'Enter GST in %',
		isLastColumn: true,
	},
];
