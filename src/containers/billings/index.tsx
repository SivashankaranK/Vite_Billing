import dayjs from 'dayjs';
import { Col, Container, Row } from 'react-bootstrap';
import { CustomEditableTable, ProgressBar } from '../../components';
import { IApiRequest, IDropDownList, IDropDownOption, IStore, IbillingRequest, IbillingResponce, IbillingView } from '../../types';
import { billingHeaders } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { createUpdateBillings, getBillings } from '../../reducers/billings';
import { customerListRequest, getItems } from '../../reducers';
dayjs().format();

const Billings = () => {
	const [billingView, setBillingView] = useState<IbillingView[]>([]);
	const dispatch = useDispatch();
	const { billings, isBillingFetching } = useSelector((state: IStore) => state.billings);
	const { customerListResponse, isCustomerFetching } = useSelector((state: IStore) => state.customers);
	const { isItemFetching, itemList } = useSelector((state: IStore) => state.items);
	const [isFetching, setIsFetching] = useState(false);
	useEffect(() => {
		setIsFetching(isBillingFetching || isCustomerFetching || isItemFetching);
	}, [isBillingFetching, isCustomerFetching, isItemFetching]);
	useEffect(() => {
		dispatch(getBillings());
		dispatch(customerListRequest());
		dispatch(getItems());
	}, []);

	useEffect(() => {
		const billingViewList: IbillingView[] = billings.map((it: IbillingResponce) => {
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
	}, [billings]);

	const createUpdateBillingData = (dataObj: IbillingRequest) => {
		const dataRequest: IApiRequest<IbillingRequest> = {
			value: dataObj,
		};
		dispatch(createUpdateBillings(dataRequest));
	};

	const requiredDataList: IDropDownList = {
		customerId: customerListResponse.map((it) => ({ value: `${it.id}`, text: it.name } as IDropDownOption)),
		menuItemId: itemList.map((it) => ({ value: `${it.id}`, text: it.name } as IDropDownOption)),
	};

	// const billingItems: IbillingView[] = [
	// 	{
	// 		billDate: '2023-12-10',
	// 		quantity: 23,
	// 		id: 1,
	// 		totalAmount: 2300,
	// 		customerId: 1,
	// 		menuItemId: 1,
	// 	},
	// ];
	// const requiredDataList: IDropDownList = {
	// 	customerId: [
	// 		{
	// 			value: '1',
	// 			text: 'Aximsoft India PVT LTD',
	// 		},
	// 	],
	// 	menuItemId: [
	// 		{
	// 			value: '1',
	// 			text: 'Chicken Briyani',
	// 		},
	// 	],
	// };

	return (
		<>
			<ProgressBar isLoading={isFetching} />
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
		</>
	);
};

export default Billings;
