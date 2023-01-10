import { useEffect, useState } from 'react';
import { Form, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import { ICustomTableHeaderTypes } from '../../../types';
import { useDebounce } from '../../../utils';

interface ICustomCellProps {
	isNewCell?: boolean;
	header: ICustomTableHeaderTypes;
	data: string | number;
	setColumnValues: (colValue: { [key: string]: string | number }, saveData: boolean) => void;
	isDataResetEnabled: boolean;
	setResetData: () => void;
}

export const CustomCell = ({ isNewCell, header, data, setColumnValues, isDataResetEnabled, setResetData }: ICustomCellProps) => {
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
			setResetData();
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
						setRowData({ [header.value]: data });
						stateReset();
					}}>
					Cancel
				</Button>
				<Button
					size='sm'
					className='popover_button'
					variant='success'
					onMouseDown={() => {
						setColumnValues({ [header.value]: activeFieldValue }, true);
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
				className={`${isNewCell ? 'opacity-50' : ''} ${header.isReadOnly ? '' : 'cur-pointer'}`}
				onClick={() => {
					if ((!header.isReadOnly || (isNewCell && header.palceHolder)) && !isFieldActive) {
						// (isNewCell && header.palceHolder) ->to find ID cell and New Column
						setActiveField(true);
						setActiveFieldValue(data || '');
						setPopOverState(true);
					}

					if (isNewCell && activeFieldValue && header.isLastColumn) {
						setPopOverState(true);
					}
				}}>
				{isFieldActive ? (
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
								setActiveFieldValue(e.target.value);
							}
						}}
						placeholder={header.palceHolder}
						onBlur={() => {
							if (isNewCell && activeFieldValue) {
								setColumnValues({ [header.value]: activeFieldValue }, false);
								if (header.isLastColumn) {
									setPopOverState(false);
								}
							} else {
								stateReset();
							}
						}}
					/>
				) : (
					<div>{isNewCell ? header.palceHolder : data}</div>
				)}
			</td>
		</OverlayTrigger>
	);
};
