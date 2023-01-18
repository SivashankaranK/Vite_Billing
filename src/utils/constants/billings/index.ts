import { ICustomTableHeaderTypes } from '../../../types';

export const billingHeaders: ICustomTableHeaderTypes[] = [
	{
		label: 'S.No',
		value: 'sno',
		fieldType: 'number',
		isReadOnly: true,
		palceHolder: '',
	},
	{
		label: 'Item',
		value: 'menuItemId',
		fieldType: 'string',
		palceHolder: 'Select Item',
		cellType: 'Dropdown',
	},
	{
		label: 'Customer',
		value: 'customerId',
		fieldType: 'string',
		palceHolder: 'Select Customer',
		cellType: 'Dropdown',
	},
	{
		label: 'Bill Date',
		value: 'billDate',
		fieldType: 'date',
		palceHolder: 'Enter Bill Date',
	},
	{
		label: 'Qantity',
		value: 'quantity',
		fieldType: 'number',
		palceHolder: 'Enter Quantity',
		isLastColumn: true,
	},
	{
		label: 'Total Amount',
		value: 'totalAmount',
		fieldType: 'number',
		palceHolder: '',
		isReadOnly: true,
	},
];