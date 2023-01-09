import { Col, Container, Row } from 'react-bootstrap';
import { CustomEditableTable } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { IApiRequest, ICustomer, IItem, IStore } from '../../types';
import { useEffect } from 'react';
import { ItemsTableHeaders } from '../../utils';
import { getItems, createUpdateItem } from '../../reducers';

const ItemsList = () => {
	const dispatch = useDispatch();
	const itemList = useSelector((state: IStore) => state.items.itemList);

	useEffect(() => {
		dispatch(getItems());
	}, []);

	const createUpdateItems = (dataObj: IItem) => {
		const dataRequest: IApiRequest<IItem> = {
			value: dataObj,
		};
		dispatch(createUpdateItem(dataRequest));
	};

	const menuItems: IItem[] = [
		{
			id: 1,
			name: 'Home',
		},
		{
			id: 2,
			name: 'Customers',
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
					<CustomEditableTable<IItem>
						data={menuItems}
						headers={ItemsTableHeaders}
						handleUpdate={createUpdateItems}
					/>
				</Col>
			</Row>
		</Container>
	);
};

export default ItemsList;
