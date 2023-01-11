import { Col, Container, Row } from 'react-bootstrap';
import { CustomEditableTable } from '../../components';
import { IApiRequest, IStore, IgeneralOrder } from '../../types';
import { generalOrderHeaders } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { createUpdateGeneralOrders, getGeneralOrders } from '../../reducers/general-orders';

const GeneralOrders = () => {
	const dispatch = useDispatch();
	const billingList = useSelector((state: IStore) => state.generalOrders.generalOrders);

	useEffect(() => {
		dispatch(getGeneralOrders());
	}, []);

	const createUpdateBillings = (dataObj: IgeneralOrder) => {
		const dataRequest: IApiRequest<IgeneralOrder> = {
			value: dataObj,
		};
		dispatch(createUpdateGeneralOrders(dataRequest));
	};

	const generalOrderItems: IgeneralOrder[] = [
		{
			billDate: '2023-12-10',
			customerId: 1,
			id: 1,
			menuItemId: 1,
			quantity: 23,
		},
	];

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
					<CustomEditableTable<IgeneralOrder>
						data={billingList}
						headers={generalOrderHeaders}
						handleUpdate={createUpdateBillings}
					/>
				</Col>
			</Row>
		</Container>
	);
};

export default GeneralOrders;
