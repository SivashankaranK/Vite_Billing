interface IapiPropsKeys {
	method: 'GET' | 'POST' | 'PUT';
	path: string;
}
interface IapiProps {
	[key: string]: IapiPropsKeys;
}
export const apiProps: IapiProps = {
	// Customers
	customersList: { method: 'GET', path: 'customers' },
	customerById: { method: 'GET', path: 'customers/:id' },
	createCustomer: { method: 'POST', path: 'customers/create' },
	updateCustomer: { method: 'PUT', path: 'customers/:id' },
	// Menu Items
	itemsList: { method: 'GET', path: 'menuItems' },
	itemById: { method: 'GET', path: 'menuItems/:id' },
	createItem: { method: 'POST', path: 'menuItems/create' },
	updateItem: { method: 'PUT', path: 'menuItems/:id' },
	// General Order
	orderList: { method: 'GET', path: 'generalOrder' },
	orderById: { method: 'GET', path: 'generalOrder/:id' },
	createOrder: { method: 'POST', path: 'generalOrder/create' },
	updateOrder: { method: 'PUT', path: 'generalOrder/:id' },
	//Export Data
	exportData: { method: 'GET', path: 'generalOrder/byDateRange/:id' },
};
