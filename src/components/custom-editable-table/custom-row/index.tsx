import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateToasterMessage } from '../../../reducers';
import { ICustomIndexedTableBody, ICustomTableHeaderTypes } from '../../../types';
import { CustomCell } from '../custom-cell';
import produce from 'immer';

interface ICustomRowProsp<T> {
	isCreateNewRow?: boolean;
	headers: ICustomTableHeaderTypes[];
	data: T;
	currentIndex?: number;
	handleUpdate: (dataObj: any) => void;
}

export const CustomRow = <T extends ICustomIndexedTableBody>({
	data,
	isCreateNewRow,
	headers,
	handleUpdate,
	currentIndex,
}: ICustomRowProsp<T>) => {
	const [isNewDataReseted, setResetData] = useState(false);
	const [rowData, setRowData] = useState(data);

	const dispatch = useDispatch();

	const setColumnValues = (colValue: { [key: string]: string | number }, saveData: boolean) => {
		const dataObj = produce(rowData, (draft: any) => {
			draft[Object.keys(colValue)[0]] = Object.values(colValue)[0];
		});
		setRowData(dataObj);
		if (saveData) {
			debugger;
			const inputValidation = headers.filter((it) => {
				return (dataObj[it.value] === undefined || !dataObj[it.value]) && !it.isReadOnly;
			});

		console.log('inputValidation', inputValidation);

		if (inputValidation.length) {
			dispatch(updateToasterMessage('All input field must be filled'));
		} else {
			handleUpdate(dataObj);
			setRowData(data);
			if (isCreateNewRow) {
				setResetData(true);
			}
		}
	};

	return (
		<tr className='table-row'>
			{headers.map((hIt, hIndex) => {
				return (
					<CustomCell
						key={`tableCell${hIndex}`}
						isNewCell={isCreateNewRow}
						header={hIt}
						data={hIt.value === 'sno' && currentIndex ? currentIndex : rowData[hIt.value] || ''}
						handleColumnUpdate={handleColumnUpdate}
						isDataResetEnabled={isNewDataReseted} // For reset New Cell after submit
						setResetData={() => setResetData(false)}
						setColumnValues={setColumnValues}
					/>
				);
			})}
		</tr>
	);
};
