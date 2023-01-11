import { Col, Container, Row } from 'react-bootstrap';
import { CustomEditableTable } from '../../components';
import { IApiRequest, IStore, IbillingData, Ibilling } from '../../types';
import { billingHeaders } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { createUpdateBillings, getBillings } from '../../reducers/billings';

const billings = () => {
	const dispatch = useDispatch();
	const billingList = useSelector((state: IStore) => state.billings.billings);

	useEffect(() => {
		dispatch(getBillings());
	}, []);

	const createUpdateBillingData = (dataObj: Ibilling) => {
		const dataRequest: IApiRequest<Ibilling> = {
			value: dataObj,
		};
		dispatch(createUpdateBillings(dataRequest));
	};

	// const billingItems: IbillingData[] = [
	// 	{
	// 		billDate: '2023-12-10',
	// 		customer: {
	// 			mobileNumber: '4545454545',
	// 			name: 'name',
	// 			id: 1,
	// 		},
	// 		menuItem: {
	// 			name: 'rtrtrt',
	// 			price: 23,
	// 			gst: 34,
	// 			id: 1,
	// 		},
	// 		quantity: 23,
	// 		id: 1,
	// 		totalAmount: 2300,
	// 	},
	// ];

	return (
		<Container>
			<Row>
				<Col>
					<h3>General Orders</h3>
					<hr />
				</Col>
			</Row>
			<Row>
				<Col>
					<CustomEditableTable<Ibilling>
						data={billingList}
						headers={billingHeaders}
						handleUpdate={createUpdateBillingData}
					/>
				</Col>
			</Row>
		</Container>
	);
};

export default billings;
