import React, { ReactNode, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { IDropDownOption } from '../../types';

interface ICustomToggle {
	children: ReactNode;
	onClick: (e: React.MouseEvent<any, MouseEvent>) => void;
}
const CustomToggle = React.forwardRef(({ children, onClick }: ICustomToggle, ref: React.ForwardedRef<any>) => {
	return (
		<div
			className='form-control d-flex'
			ref={ref}
			onClick={(e) => {
				e.preventDefault();
				onClick(e);
			}}>
			<span className='me-auto'>{children}</span>
			<span>&#x25bc;</span>
		</div>
	);
});

interface ICustomMenu {
	children: ReactNode;
	style: React.CSSProperties;
	className: string;
}

const CustomMenu = React.forwardRef(({ children, style, className }: ICustomMenu, ref: React.ForwardedRef<any>) => {
	const [value, setValue] = useState('');

	return (
		<div
			ref={ref}
			style={style}
			className={className}>
			<div className='w-100 position-relative pb-5'>
				<Form.Control
					autoFocus={true}
					className='m-2 w-auto position-absolute top-0 start-0 end-0'
					placeholder='search'
					onChange={(e) => setValue(e.target.value)}
					value={value}
					size='sm'
				/>
			</div>
			<ul
				className='list-unstyled overflow-auto'
				style={{ height: '200px' }}>
				{React.Children.toArray(children).filter((child: any) => !value || child.props.children.toLowerCase().startsWith(value))}
			</ul>
		</div>
	);
});

interface ICustomDropDown {
	toggleText: string;
	itemData: IDropDownOption[];
	getSelectedValue: (value: IDropDownOption) => void;
}
export const CustomDropdown = ({ getSelectedValue, itemData, toggleText }: ICustomDropDown) => {
	const [toggleTextValue, setToggleText] = useState(toggleText);
	return (
		<Dropdown>
			<Dropdown.Toggle as={CustomToggle}>{toggleTextValue}</Dropdown.Toggle>
			<Dropdown.Menu as={CustomMenu}>
				{itemData.map((it, index) => (
					<Dropdown.Item
						className='py-2'
						key={`dropDownItem${index}`}
						onClick={(e) => {
							e.preventDefault();
							setToggleText(it.text);
							return getSelectedValue(it);
						}}>
						{it.text}
					</Dropdown.Item>
				))}
			</Dropdown.Menu>
		</Dropdown>
	);
};
