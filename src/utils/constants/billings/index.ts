import { ICustomTableHeaderTypes } from '../../../types';

export const billingHeaders: ICustomTableHeaderTypes[] = [
	{
		label: 'S.No',
		value: 'sno',
		fieldType: 'number',
		isReadOnly: true,
		placeHolder: '',
	},
	{
		label: 'Item',
		value: 'menuItemId',
		fieldType: 'string',
		placeHolder: 'Select Item',
		cellType: 'Dropdown',
	},
	{
		label: 'Customer',
		value: 'customerId',
		fieldType: 'string',
		placeHolder: 'Select Customer',
		cellType: 'Dropdown',
	},
	{
		label: 'Bill Date',
		value: 'billDate',
		fieldType: 'date',
		placeHolder: 'Enter Bill Date',
	},
	{
		label: 'Qantity',
		value: 'quantity',
		fieldType: 'number',
		placeHolder: 'Enter Quantity',
		isLastColumn: true,
	},
	{
		label: 'Total Amount',
		value: 'totalAmount',
		fieldType: 'number',
		placeHolder: '',
		isReadOnly: true,
	},
];
