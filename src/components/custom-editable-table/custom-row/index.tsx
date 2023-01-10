import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateToasterMessage } from '../../../reducers';
import { ICustomIndexedTableBody, ICustomTableHeaderTypes } from '../../../types';
import { CustomCell } from '../custom-cell';

interface ICustomRowProsp<T> {
	isCreateNewRow?: boolean;
	headers: ICustomTableHeaderTypes[];
	data: T;
	currentIndex?: number;
	handleUpdate: (dataObj: any) => void;
}

export const CustomRow = <T extends ICustomIndexedTableBody>({ data, isCreateNewRow, headers, handleUpdate, currentIndex }: ICustomRowProsp<T>) => {
	const [isNewDataReseted, setResetData] = useState(false);
	const [rowData, setRowData] = useState(data);

	const dispatch = useDispatch();

	// useEffect(()=>{setRowData(data)},[data])

	const handleColumnUpdate = async (colValue: { [key: string]: string | number }) => {
		// setRowData({ ...rowData, ...colValue }); //state not updating
		const dataObj = { ...rowData, ...colValue };

		const inputValidation = headers.filter((it) => {
			return (dataObj[it.value] === undefined || !dataObj[it.value] ) && !it.isReadOnly;
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
						setRowData={(colValue) => setRowData((prev) => ({ ...prev, ...colValue }))} // For New column
					/>
				);
			})}
		</tr>
	);
};
