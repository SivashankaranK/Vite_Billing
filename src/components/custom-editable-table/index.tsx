import { Table } from 'react-bootstrap';
import { ICustomIndexedTableBody, ICustomTableHeaderTypes } from '../../types/custom-table';
import { CustomRow } from './custom-row';
import { IDropDownList } from '../../types';

interface ICustomTableProps<T> {
	headers: ICustomTableHeaderTypes[];
	data: T[];
	handleUpdate: (dataObj: any) => void;
	requiredData?: IDropDownList;
}
export const CustomEditableTable = <T extends ICustomIndexedTableBody>({
	data,
	headers,
	handleUpdate,
	requiredData,
}: ICustomTableProps<T>) => {
	const ObjForCreateNewData = () => {
		const Obj: any = {};
		for (const key of headers) {
			Obj[key.value] = '';
		}
		return Obj;
	};
	return (
		<div className='table-container'>
			<Table className='common-table'>
				<thead className='table-head'>
					<tr>
						{headers.map((col, index) => {
							return (
								<th key={`tableHeader${index}`}>
									<span className='ps-2'>{col.label}</span>
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody className={`table-body ${data.length !== 0 ? 'overflow_update' : ''}`}>
					<>
						{/* New Row */}
						<CustomRow
							isCreateNewRow={true}
							headers={headers}
							data={ObjForCreateNewData()}
							handleUpdate={handleUpdate}
							requiredData={requiredData}
						/>
						{data && data.length === 0 ? (
							<tr className='table-row'>
								<td
									colSpan={headers.length}
									className='text-center'>
									No data found...
								</td>
							</tr>
						) : (
							data.map((iterate, dIndex) => {
								return (
									<CustomRow<T>
										key={`tablRow${dIndex}`}
										currentIndex={dIndex + 1}
										data={iterate}
										headers={headers}
										handleUpdate={handleUpdate}
										requiredData={requiredData}
									/>
								);
							})
						)}
					</>
				</tbody>
			</Table>
		</div>
	);
};
