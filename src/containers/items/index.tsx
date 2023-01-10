import { Col, Container, Row } from 'react-bootstrap';
import { CustomEditableTable } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { IApiRequest, IItem, IStore } from '../../types';
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
			name: 'Chicken Briyani',
			price: 200,
			gstValue: 2.5,
		},
		{
			id: 2,
			name: 'Mutton Briyani',
			price: 400,
			gstValue: 3.5,
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
