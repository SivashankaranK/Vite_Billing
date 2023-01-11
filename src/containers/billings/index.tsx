import dayjs from 'dayjs';
import { Col, Container, Row } from 'react-bootstrap';
import { CustomEditableTable } from '../../components';
import { IApiRequest, IStore, Ibilling, IbillingResponce, IbillingView } from '../../types';
import { billingHeaders } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { createUpdateBillings, getBillings } from '../../reducers/billings';
dayjs().format();

const billings = () => {
	const [billingView, setBillingView] = useState<IbillingView[]>([]);
	const dispatch = useDispatch();
	const billingList = useSelector((state: IStore) => state.billings.billings);

	useEffect(() => {
		dispatch(getBillings());
	}, []);

	useEffect(() => {
		const billingViewList: IbillingView[] = billingList.map((it: IbillingResponce) => {
			return {
				...it,
				customerName: it.customer.name,
				menuItemName: it.menuItem.name,
				billDate: dayjs(it.billDate).format('DD-MMM-YYYY'),
			};
		});
		setBillingView(billingViewList);
	}, [billingList]);

	const createUpdateBillingData = (dataObj: Ibilling) => {
		const dataRequest: IApiRequest<Ibilling> = {
			value: dataObj,
		};
		dispatch(createUpdateBillings(dataRequest));
	};

	// const billingItems: IbillingView[] = [
	// 	{
	// 		billDate: '2023-12-10',
	// 		quantity: 23,
	// 		id: 1,
	// 		totalAmount: 2300,
	// 		customerName: '',
	// 		menuItemName: '',
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
					<CustomEditableTable<IbillingView>
						data={billingView}
						headers={billingHeaders}
						handleUpdate={createUpdateBillingData}
					/>
				</Col>
			</Row>
		</Container>
	);
};

export default billings;
