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
		navLabel: 'General Orders',
		path: '/general-orders',
		component: lazy(() => import('../../../containers/general-orders')),
	},
];
