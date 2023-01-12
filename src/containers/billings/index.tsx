import dayjs from 'dayjs';
import { Col, Container, Row } from 'react-bootstrap';
import { CustomEditableTable } from '../../components';
import { IApiRequest, IDropDownList, IDropDownOption, IStore, IbillingRequest, IbillingResponce, IbillingView } from '../../types';
import { billingHeaders } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { createUpdateBillings, getBillings } from '../../reducers/billings';
import { customerListRequest, getItems } from '../../reducers';
dayjs().format();

const billings = () => {
	const [billingView, setBillingView] = useState<IbillingView[]>([]);
	const dispatch = useDispatch();
	const billingList = useSelector((state: IStore) => state.billings.billings);
	const customersList = useSelector((state: IStore) => state.customers.customerListResponse);
	const itemsList = useSelector((state: IStore) => state.items.itemList);

	useEffect(() => {
		dispatch(getBillings());
		dispatch(customerListRequest());
		dispatch(getItems());
	}, []);

	useEffect(() => {
		const billingViewList: IbillingView[] = billingList.map((it: IbillingResponce) => {
			return {
				id: it.id,
				customerId: it.customer.id,
				menuItemId: it.menuItem.id,
				billDate: dayjs(it.billDate).format('YYYY/MM/DD'),
				quantity: it.quantity,
				totalAmount: it.totalAmount,
			};
		});
		setBillingView(billingViewList);
	}, [billingList]);

	const createUpdateBillingData = (dataObj: IbillingRequest) => {
		const dataRequest: IApiRequest<IbillingRequest> = {
			value: dataObj,
		};
		dispatch(createUpdateBillings(dataRequest));
	};

	const requiredDataList: IDropDownList = {
		customerId: customersList.map((it) => ({ value: `${it.id}`, text: it.name } as IDropDownOption)),
		menuItemId: itemsList.map((it) => ({ value: `${it.id}`, text: it.name } as IDropDownOption)),
	};

	// const billingItems: IbillingView[] = [
	// 	{
	// 		billDate: '2023-12-10',
	// 		quantity: 23,
	// 		id: 1,
	// 		totalAmount: 2300,
	// 		customerName: 'customerName 1',
	// 		menuItemName: 'menuItemName 1',
	// 	},
	// ];
	// const requiredDataList: IDropDownList = {
	// 	customerName: [
	// 		{
	// 			value: '1',
	// 			text: 'Aximsoft India PVT LTD',
	// 		},
	// 	],
	// 	menuItemName: [
	// 		{
	// 			value: '1',
	// 			text: 'Chicken Briyani',
	// 		},
	// 	],
	// };

	return (
		<Container>
			<Row>
				<Col>
					<h3>Billing</h3>
					<hr />
				</Col>
			</Row>
			<Row>
				<Col>
					<CustomEditableTable<IbillingView>
						data={billingView}
						headers={billingHeaders}
						handleUpdate={createUpdateBillingData}
						requiredData={requiredDataList}
					/>
				</Col>
			</Row>
		</Container>
	);
};

export default billings;
