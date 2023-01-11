import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { createUpdateCustomerRequest, customerListRequest } from '../../reducers';
import { CustomEditableTable } from '../../components';
import { ICustomer, IApiRequest, IStore } from '../../types';
import { CustomerTableHeaders } from '../../utils';
import { useSelector } from 'react-redux';

const Customers = () => {
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

	const customersData: ICustomer[] = [
		{
			id: 1,
			name: 'Aximsoft India PVT LTD',
			mobileNumber: '+917904172088',
		},
		{
			id: 2,
			name: 'Aximsoft India PVT',
			mobileNumber: '+917904172088',
		},
		{
			id: 3,
			name: 'Aximsoft India',
			mobileNumber: '+917904172088',
		},
		{
			id: 4,
			name: 'Aximsoft',
			mobileNumber: '+917904172088',
		},
	];

	return (
		<Container>
			<Row>
				<Col>
					<h3>Customers</h3>
					<hr />
				</Col>
			</Row>
			<Row>
				<Col>
					<CustomEditableTable<ICustomer>
						data={customers}
						headers={CustomerTableHeaders}
						handleUpdate={createUpdateCustomer}
					/>
				</Col>
			</Row>
		</Container>
	);
};

export default Customers;
