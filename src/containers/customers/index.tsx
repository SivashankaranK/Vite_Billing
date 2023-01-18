import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { createUpdateCustomerRequest, customerListRequest } from '../../reducers';
import { CustomEditableTable, ProgressBar } from '../../components';
import { ICustomer, IApiRequest, IStore } from '../../types';
import { CustomerTableHeaders } from '../../utils';
import { useSelector } from 'react-redux';

const Customers = () => {
	const dispatch = useDispatch();
	const customerListResponse = useSelector((state: IStore) => state.customers.customerListResponse);
	const isCustomerFetching = useSelector((state: IStore) => state.customers.isCustomerFetching);
	useEffect(() => {
		dispatch(customerListRequest());
	}, []);

	const createUpdateCustomer = (dataObj: ICustomer) => {
		const dataRequest: IApiRequest<ICustomer> = {
			value: dataObj,
		};
		dispatch(createUpdateCustomerRequest(dataRequest));
	};

	// const customersData: ICustomer[] = Array.from({ length: 20 }, () => ({
	// 	id: 1,
	// 	name: Math.random().toString(36).substr(2, 10),
	// 	mobileNumber: `+91${Math.random().toString(9).substr(2, 10)}`,
	// }));

	return (
		<>
			{isCustomerFetching ? <ProgressBar isLoading={true} /> : null}

			<Container fluid>
				<Row>
					<Col>
						<h3>Customers</h3>
						<hr />
					</Col>
				</Row>
				<Row>
					<Col>
						<CustomEditableTable<ICustomer>
							data={customerListResponse}
							headers={CustomerTableHeaders}
							handleUpdate={createUpdateCustomer}
						/>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Customers;
