import { Col, Container, Row } from 'react-bootstrap';
import { CustomEditableTable } from '../../components';
import { IgeneralOrder } from '../../types';
import { generalOrderHeaders } from '../../utils';

const GeneralOrders = () => {
	const createUpdateOrders = (dataObj: any) => {
		console.log('dataObj', dataObj);
	};

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
					<CustomEditableTable<IgeneralOrder>
						data={[]}
						headers={generalOrderHeaders}
						handleUpdate={createUpdateOrders}
					/>
				</Col>
			</Row>
		</Container>
	);
};

export default GeneralOrders;
