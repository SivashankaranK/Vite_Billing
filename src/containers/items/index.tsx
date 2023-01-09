import { Col, Container, Row } from 'react-bootstrap';
import { CustomEditableTable } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { IApiRequest, ICustomer, IItems, IStore } from '../../types';
import { useEffect } from 'react';
import { headerColumns } from '../../utils/constants/customers';
import { createUpdateCustomerRequest, customerListRequest } from '../../reducers';

const ItemsList = () => {
	const dispatch = useDispatch();
	const customers = useSelector((state: IStore) => state.customers.customerListResponse);

	useEffect(() => {
		dispatch(customerListRequest());
	}, []);

	const createUpdateCustomer = (dataObj: ICustomer) => {
		const dataRequest: IApiRequest<ICustomer> = {
			value: dataObj,
		};
		dispatch(createUpdateCustomerRequest(dataRequest));
	};

	const menuItems: IItems[] = [
		{
			id: 1,
			name: 'Home',
			isActive: true,
		},
		{
			id: 2,
			name: 'Customers',
			isActive: true,
		},
	];

	return (
		<Container>
			<Row>
				<Col>
					<h3>Items</h3>
					<hr />
				</Col>
			</Row>
			<Row>
				<Col>
					<CustomEditableTable<IItems>
						data={menuItems}
						headers={headerColumns}
						handleUpdate={createUpdateCustomer}
					/>
				</Col>
			</Row>
		</Container>
	);
};

export default ItemsList;
