import { Col, Container, Row } from 'react-bootstrap';
import { CustomEditableTable, ProgressBar } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { IApiRequest, IItem, IStore } from '../../types';
import { useEffect } from 'react';
import { ItemsTableHeaders } from '../../utils';
import { getItems, createUpdateItem } from '../../reducers';

const ItemsList = () => {
	const dispatch = useDispatch();
	const itemList = useSelector((state: IStore) => state.items.itemList);
	const isItemFetching = useSelector((state: IStore) => state.items.isItemFetching);
	useEffect(() => {
		dispatch(getItems());
	}, []);

	const createUpdateItems = (dataObj: IItem) => {
		const dataRequest: IApiRequest<IItem> = {
			value: dataObj,
		};
		dispatch(createUpdateItem(dataRequest));
	};

	return (
		<>
			{isItemFetching ? <ProgressBar isLoading={true} /> : null}
			<Container fluid>
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
