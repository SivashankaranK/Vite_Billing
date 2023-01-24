import dayjs from 'dayjs';
import { Col, Container, Row } from 'react-bootstrap';
import { CustomEditableTable, ProgressBar } from '../../components';
import { IApiRequest, IDropDownList, IDropDownOption, IStore, IbillingRequest, IbillingResponce, IbillingView } from '../../types';
import { billingHeaders } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { createUpdateBillings, getBillings } from '../../reducers/billings';
import { customerListRequest, getItems } from '../../reducers';

const Billings = () => {
	const [billingView, setBillingView] = useState<IbillingView[]>([]);
	const dispatch = useDispatch();
	const isBillingFetching = useSelector((state: IStore) => state.billings.isBillingFetching);
	const billingList = useSelector((state: IStore) => state.billings.billingList);
	const isCustomerFetching = useSelector((state: IStore) => state.customers.isCustomerFetching);
	const customerListResponse = useSelector((state: IStore) => state.customers.customerListResponse);
	const isItemFetching = useSelector((state: IStore) => state.items.isItemFetching);
	const itemList = useSelector((state: IStore) => state.items.itemList);

	useEffect(() => {
		dispatch(getBillings());
		dispatch(customerListRequest());
		dispatch(getItems());
	}, [dispatch]);

	useEffect(() => {
		const billingViewList: IbillingView[] = billingList.map((it: IbillingResponce) => {
			return {
				id: it.id,
				customerId: it.customer.id,
				menuItemId: it.menuItem.id,
				billDate: dayjs(it.billDate).format('YYYY-MM-DD'),
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
		customerId: customerListResponse.map((it) => ({ value: `${it.id}`, text: it.name } as IDropDownOption)),
		menuItemId: itemList.map((it) => ({ value: `${it.id}`, text: it.name } as IDropDownOption)),
	};

	return (
		<>
			{isBillingFetching || isCustomerFetching || isItemFetching ? <ProgressBar isLoading={true} /> : null}

			<Container fluid={true}>
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
