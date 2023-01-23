import { useEffect, useState } from 'react';
import { Form, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import { ICustomTableHeaderTypes, IDropDownOption } from '../../../types';
import { useDebounce } from '../../../utils';
import { CustomDropdown } from '../../custom-dropdown';
import dayjs from 'dayjs';

interface ICustomCellProps {
	isNewCell?: boolean;
	header: ICustomTableHeaderTypes;
	data: string | number;
	setColumnValues: (colValue: { [key: string]: string | number }, reqType: string) => void;
	isDataResetEnabled: boolean;
	setResetRowData: () => void;
	dropDownData?: IDropDownOption[];
}

export const CustomCell = ({
	isNewCell,
	header,
	data,
	setColumnValues,
	isDataResetEnabled,
	setResetRowData,
	dropDownData,
}: ICustomCellProps) => {
	const [isFieldActive, setActiveField] = useState(false);

	const [activeFieldValue, setActiveFieldValue] = useState<string | number>(data);

	const [enablePopOver, setPopOverState] = useState(false);

	const isDebounceValid = useDebounce(activeFieldValue, 600);

	useEffect(() => {
		if (isFieldActive) {
			if (data === activeFieldValue || (!data && !activeFieldValue)) {
				setPopOverState(false);
			} else {
				if (isNewCell && header.isLastColumn) {
					setPopOverState(true);
				} else if (!isNewCell) {
					setPopOverState(true);
				} else {
					setPopOverState(false);
				}
			}
		}
	}, [isDebounceValid, isFieldActive]);

	const stateReset = () => {
		setActiveField(false);
		setActiveFieldValue('');
		setPopOverState(false);
	};

	useEffect(() => {
		if (isDataResetEnabled) {
			stateReset();
			setResetRowData();
		}
	}, [isDataResetEnabled]);

	const popover = (
		<Popover id='popover-basic'>
			<Popover.Body className='popover-body'>
				<Button
					size='sm'
					className='popover_button'
					variant='light'
					onMouseDown={() => {
						// setRowData({ [header.value]: data });
						setColumnValues({}, 'reset');
						stateReset();
					}}>
					Cancel
				</Button>
				<Button
					size='sm'
					className='popover_button'
					variant='success'
					onMouseDown={() => {
						setColumnValues({ [header.value]: activeFieldValue }, 'update');
					}}>
					Save
				</Button>
			</Popover.Body>
		</Popover>
	);

	return (
		<OverlayTrigger
			show={enablePopOver}
			trigger='click'
			placement={header.isLastColumn && isNewCell ? 'top-end' : 'top'}
			overlay={popover}>
			<td
				className={`${header.isReadOnly ? '' : 'cur-pointer'}`}
				onClick={() => {
					if ((!header.isReadOnly || (isNewCell && header.placeHolder)) && !isFieldActive) {
						// (isNewCell && header.placeHolder) ->to find ID cell and New Column
						setActiveField(true);
						setActiveFieldValue(data || '');
						setPopOverState(true);
					}

					if (isNewCell && activeFieldValue && header.isLastColumn) {
						setPopOverState(true);
					}
				}}>
				{isFieldActive ? (
					header.cellType === 'Dropdown' ? (
						<CustomDropdown
							toggleText={activeFieldValue ? `${activeFieldValue}` : 'Select'}
							itemData={dropDownData ? dropDownData : []}
							getSelectedValue={(value: IDropDownOption) => {
								setPopOverState(false);
								setActiveFieldValue(value.value);
								if (isNewCell && activeFieldValue) {
									setColumnValues({ [header.value]: value.value }, 'blur');
									if (header.isLastColumn) {
										setPopOverState(false);
									}
								} else {
									setColumnValues({ [header.value]: value.value }, 'blur');
								}
							}}
						/>
					) : (
						<Form.Control
							type={header.fieldType}
							autoFocus
							size='sm'
							value={activeFieldValue}
							onChange={(e) => {
								setPopOverState(false);
								if (header.regexPattern && header.regexPattern.test(e.target.value)) {
									setActiveFieldValue(e.target.value);
								} else if (!header.regexPattern) {
									if (header.fieldType === 'date') {
										setActiveFieldValue(dayjs(e.target.value).format('YYYY-MM-DD'));
									} else {
										setActiveFieldValue(e.target.value);
									}
								}
							}}
							placeholder={header.placeHolder}
							onBlur={() => {
								if (isNewCell && activeFieldValue) {
									if (header.fieldType === 'date') {
										setColumnValues({ [header.value]: dayjs(activeFieldValue).format('YYYY/MM/DD') }, 'blur');
									} else {
										setColumnValues({ [header.value]: activeFieldValue }, 'blur');
									}
									if (header.isLastColumn) {
										setPopOverState(false);
									}
								} else {
									stateReset();
								}
							}}
						/>
					)
				) : (
					<div className={`ps-2 ${isNewCell ? 'opacity-50' : ''}`}>{isNewCell ? header.placeHolder : data}</div>
				)}
			</td>
		</OverlayTrigger>
	);
};
