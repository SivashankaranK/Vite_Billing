import { lazy } from 'react';
import { IRouteListItems } from '../../../types';

export const routersList: IRouteListItems[] = [
	{
		navLabel: 'Customers',
		path: '/customers',
		component: lazy(() => import('../../../containers/customers')),
	},
	{
		navLabel: 'Items',
		path: '/items',
		component: lazy(() => import('../../../containers/items')),
	},
	{
		navLabel: 'Billing',
		path: '/billings',
		component: lazy(() => import('../../../containers/billings')),
	},
	{
		navLabel: 'Export',
		path: '/export',
		component: lazy(() => import('../../../containers/export-data')),
	},
];
