import { useDispatch } from 'react-redux';
import { IApiRequest, IDropDownOption, IExportDataRequest, IStore } from '../../types';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { customerListRequest, getExportDataList } from '../../reducers';
import { Col, Container, Row, Table, Form, Button } from 'react-bootstrap';
import { CustomDropdown, ProgressBar } from '../../components';

export const ExportData = () => {
	const disptch = useDispatch();
	const { exportDataList, isExaportDataFetching } = useSelector((state: IStore) => state.exportData);
	const { customerListResponse, isCustomerFetching } = useSelector((state: IStore) => state.customers);
	const [customerId, setCustomerId] = useState(0);
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [isFetching, setIsFetching] = useState(false);
	useEffect(() => {
		setIsFetching(isExaportDataFetching || isCustomerFetching);
	}, [isExaportDataFetching, isCustomerFetching]);

	useEffect(() => {
		disptch(customerListRequest());
	}, []);

	const getExportData = () => {
		const params: IApiRequest<IExportDataRequest> = {
			value: {
				customerId: customerId,
				endDate: startDate,
				startDate: endDate,
			},
		};
		disptch(getExportDataList(params));
	};

	return (
		<>
			<ProgressBar isLoading={isFetching} />
			<Container fluid>
				<Row>
					<Col>
						<CustomDropdown
							itemData={customerListResponse.map(
								(it) =>
									({
										text: it.name,
										value: it.id,
									} as any),
							)}
							toggleText='Customers'
							getSelectedValue={(option: IDropDownOption) => setCustomerId(Number(option.value))}
						/>
					</Col>
					<Col>
						<Form.Control
							type='date'
							value={startDate}
							onChange={(e) => setStartDate(e.target.value)}
						/>
					</Col>
					<Col>
						<Form.Control
							type='date'
							value={endDate}
							onChange={(e) => setEndDate(e.target.value)}
						/>
					</Col>
					<Col>
						<Button onClick={() => getExportData()}>Filter</Button>
					</Col>
				</Row>
				<Row>
					<Col>
						<div className='table-container'>
							<Table className='common-table'>
								<thead className='table-head'>
									<tr>
										<th>S.No</th>
										<th>Bill Date</th>
										<th>Customer Name</th>
										<th>Item Name</th>
										<th>Quantity</th>
										<th>Total Amount</th>
									</tr>
								</thead>
								<tbody className='table-body'>
									{exportDataList.map((it, index) => (
										<tr>
											<td>{index++}</td>
											<td>{it.billDate}</td>
											<td>{it.customer.name}</td>
											<td>{it.menuItem.name}</td>
											<td>{it.quantity}</td>
											<td>{it.totalAmount}</td>
										</tr>
									))}
								</tbody>
							</Table>
						</div>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default ExportData;
