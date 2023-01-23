import { useDispatch } from 'react-redux';
import { IApiRequest, IDropDownOption, IExportDataRequest, IStore } from '../../types';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { customerListRequest, getExportDataList } from '../../reducers';
import { Col, Container, Row, Table, Form, Button } from 'react-bootstrap';
import { CustomDropdown, ProgressBar } from '../../components';
import dayjs from 'dayjs';
import { generateInvoice } from '../../components';

export const ExportData = () => {
	const disptch = useDispatch();
	const { exportDataList, isExaportDataFetching } = useSelector((state: IStore) => state.exportData);
	const { customerListResponse, isCustomerFetching } = useSelector((state: IStore) => state.customers);
	const [customerId, setCustomerId] = useState(0);
	const [customerName, setCustomerName] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [invoiceNo, setInvoiceNo] = useState('');
	const [selected, setSelected] = useState<number[]>([]);

	useEffect(() => {
		disptch(customerListRequest());
	}, []);

	const getExportData = () => {
		const params: IApiRequest<IExportDataRequest> = {
			value: {
				customerId,
				startDate: dayjs(startDate).format('YYYY/MM/DD'),
				endDate: dayjs(endDate).format('YYYY/MM/DD'),
			},
		};
		disptch(getExportDataList(params));
	};

	return (
		<>
			{isExaportDataFetching || isCustomerFetching ? <ProgressBar isLoading={true} /> : null}

			<Container fluid={true}>
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
								getSelectedValue={(option: IDropDownOption) => {
									setCustomerId(Number(option.value));
									setCustomerName(option.text);
								}}
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
					<Col className='d-flex'>
						<Button
							className='btn-secondary'
							onClick={() => {
								setInvoiceNo('');
								getExportData();
							}}
							disabled={customerId !== 0 && startDate && endDate ? false : true}>
							Filter
						</Button>
						<span className='px-2'/>
						<Form.Control
							type='number'
							size='sm'
							className='w-50'
							placeholder='Invoice No'
							value={invoiceNo}
							hidden={exportDataList && exportDataList.length === 0 ? true : false}
							onChange={(e) => {
								setInvoiceNo(e.target.value);
								getExportData();
							}}
						/>
						<span className='px-2'/>
						<Button
							className='btn-dark'
							hidden={invoiceNo === '' ? true : false}
							onClick={() => {
								generateInvoice({
									invoiceNo,
									customerName,
									data: selected.length ? exportDataList.filter((it) => selected.includes(it.id)) : exportDataList,
								});
							}}>
							Download
						</Button>
					</Col>
				</Row>
				<Row>
					<Col>
						<div className='table-container'>
							<Table className='common-table export-data-table'>
								<thead className='table-head'>
									<tr>
										<th>
											<Form.Check
												type='checkbox'
												onChange={(event) => {
													if (!event.target.checked) {
														setSelected([]);
													} else {
														setSelected(exportDataList.map((it) => it.id));
													}
												}}
												checked={selected.length > 0 && selected.length === exportDataList.length}
												label={'S.No'}
												id='select-all-id'
											/>
										</th>
										<th>Bill Date</th>
										<th>Customer Name</th>
										<th>Item Name</th>
										<th>Quantity</th>
										<th>Total Amount</th>
									</tr>
								</thead>
								<tbody className='table-body'>
									{exportDataList.length ? (
										exportDataList.map((it, index) => (
											<tr key={`tableRow${index}`}>
												<td>
													<Form.Check
														type='checkbox'
														value={it.id}
														label={++index}
														id={`data-check-${it.id}`}
														checked={selected.includes(it.id)}
														onChange={(event) => {
															if (!event.target.checked) {
																setSelected((prevState) => prevState.filter((s) => s !== it.id));
															} else {
																setSelected((prevState) => [...prevState, it.id]);
															}
														}}
													/>
												</td>
												<td>{dayjs(it.billDate).format('DD MMM YYYY')}</td>
												<td>{it.customer.name}</td>
												<td>{it.menuItem.name}</td>
												<td>{it.quantity}</td>
												<td>{it.totalAmount}</td>
											</tr>
										))
									) : (
										<tr>
											<td
												colSpan={6}
												className='text-center'>
												<span>No data found...</span>
											</td>
										</tr>
									)}
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
