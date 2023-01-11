import { Col, Container, Row } from 'react-bootstrap';
import { CustomEditableTable } from '../../components';
import { IgeneralOrder } from '../../types';
import { generalOrderHeaders } from '../../utils';

const GeneralOrders = () => {
	const createUpdateOrders = (dataObj: any) => {
		console.log('dataObj', dataObj);
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
						data={generalOrderItems}
						headers={generalOrderHeaders}
						handleUpdate={createUpdateOrders}
					/>
				</Col>
			</Row>
		</Container>
	);
};

export default GeneralOrders;
