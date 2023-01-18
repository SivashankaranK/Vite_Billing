import { Col, Container, Row } from 'react-bootstrap';
import { CustomEditableTable, ProgressBar } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { IApiRequest, IItem, IStore } from '../../types';
import { useEffect, useState } from 'react';
import { ItemsTableHeaders } from '../../utils';
import { getItems, createUpdateItem } from '../../reducers';

const ItemsList = () => {
	const dispatch = useDispatch();
	const { isItemFetching, itemList } = useSelector((state: IStore) => state.items);
	const [isFetching, setIsFetching] = useState(false);
	useEffect(() => {
		setIsFetching(isItemFetching);
	}, [isItemFetching]);
	useEffect(() => {
		dispatch(getItems());
	}, []);

	const createUpdateItems = (dataObj: IItem) => {
		const dataRequest: IApiRequest<IItem> = {
			value: dataObj,
		};
		dispatch(createUpdateItem(dataRequest));
	};
	// const menuItems: IItem[] = Array.from({ length: 20 }, () => ({
	// 	id: 1,
	// 	name: Math.random().toString(36).substr(2, 15),
	// 	price: Number(Math.random().toString(9).substr(2, 3)),
	// 	gstValue: Number(`14.${Math.random().toString(9).substr(2, 2)}`),
	// }));

	return (
		<>
			<ProgressBar isLoading={isFetching} />
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
							data={itemList}
							headers={ItemsTableHeaders}
							handleUpdate={createUpdateItems}
						/>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default ItemsList;
