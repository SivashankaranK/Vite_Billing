import { useDispatch } from 'react-redux';
import { IApiRequest, IDropDownOption, IExportDataRequest, IStore } from '../../types';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { customerListRequest, getExportDataList } from '../../reducers';
import { Col, Container, Row, Table, Form, Button } from 'react-bootstrap';
import { CustomDropdown, ProgressBar } from '../../components';
import dayjs from 'dayjs';

export const ExportData = () => {
	const disptch = useDispatch();
	const { exportDataList, isExaportDataFetching } = useSelector((state: IStore) => state.exportData);
	const { customerListResponse, isCustomerFetching } = useSelector((state: IStore) => state.customers);
	const [customerId, setCustomerId] = useState(0);
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');

	useEffect(() => {
		disptch(customerListRequest());
	}, []);

	const getExportData = () => {
		const params: IApiRequest<IExportDataRequest> = {
			value: {
				customerId: customerId,
				startDate: dayjs(startDate).format('YYYY/MM/DD'),
				endDate: dayjs(endDate).format('YYYY/MM/DD'),
			},
		};
		disptch(getExportDataList(params));
	};

	return (
		<>
			{isExaportDataFetching || isCustomerFetching ? <ProgressBar isLoading={true} /> : null}

			<Container fluid>
				<Row>
					<Col>
						<h3>Export</h3>
						<hr />
					</Col>
				</Row>
				<Row className='mb-3'>
					<Col>
						{isCustomerFetching ? (
							<span className='form-control'>Loading customers list...</span>
						) : (
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
						)}
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
							min={startDate}
							onChange={(e) => setEndDate(e.target.value)}
						/>
					</Col>
					<Col>
						<Button
							onClick={() => getExportData()}
							disabled={customerId !== 0 && startDate && endDate ? false : true}>
							Filter
						</Button>
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
											<td>{++index}</td>
											<td>{dayjs(it.billDate).format('DD MMM YYYY')}</td>
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
