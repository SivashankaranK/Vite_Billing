import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateToasterMessage } from '../../../reducers';
import { ICustomIndexedTableBody, ICustomTableHeaderTypes, IDropDownList } from '../../../types';
import { CustomCell } from '../custom-cell';
import produce from 'immer';

interface ICustomRowProsp<T> {
	isCreateNewRow?: boolean;
	headers: ICustomTableHeaderTypes[];
	data: T;
	currentIndex?: number;
	handleUpdate: (dataObj: any) => void;
	requiredData?: IDropDownList;
}

export const CustomRow = <T extends ICustomIndexedTableBody>({
	data,
	isCreateNewRow,
	headers,
	handleUpdate,
	currentIndex,
	requiredData,
}: ICustomRowProsp<T>) => {
	const [isNewDataReseted, setResetData] = useState(false);
	const [rowData, setRowData] = useState(data);

	const dispatch = useDispatch();

	const setColumnValues = (colValue: { [key: string]: string | number }, reqType: string) => {
		const dataObj = produce(rowData, (draft: any) => {
			draft[Object.keys(colValue)[0]] = Object.values(colValue)[0];
		});
		setRowData(dataObj);
		if (reqType === 'update') {
			const inputValidation = headers.filter((it) => {
				return (dataObj[it.value] === undefined || !dataObj[it.value]) && !it.isReadOnly;
			});

			if (!!inputValidation.length) {
				dispatch(updateToasterMessage('All input field must be filled'));
			} else {
				handleUpdate(dataObj);
				setRowData(data);
				if (isCreateNewRow) {
					setResetData(true);
				}
			}
		} else if (reqType === 'reset') {
			setResetData(true);
			setRowData(data);
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
						data={
							hIt.value === 'sno' && currentIndex
								? currentIndex
								: hIt.cellType === 'Dropdown'
								? requiredData && requiredData[`${hIt.value}`].find((x) => x.value == rowData[hIt.value])?.text
								: rowData[hIt.value] || ''
						}
						isDataResetEnabled={isNewDataReseted} // For reset New Cell after submit
						setResetRowData={() => setResetData(false)}
						setColumnValues={setColumnValues}
						dropDownData={requiredData !== undefined ? requiredData[`${hIt.value}`] : []}
					/>
				);
			})}
		</tr>
	);
};
