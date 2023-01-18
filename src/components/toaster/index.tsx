import { Toast, ToastContainer } from 'react-bootstrap';
import { ToastPosition } from 'react-bootstrap/ToastContainer';
import closeIcon from '../../assets/icons/close.svg';
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from '../../types';
import { updateToasterMessage } from '../../reducers';

interface IToastifierProps {
	position?: ToastPosition;
	delay?: number;
}

export const Toastifier = ({ position }: IToastifierProps) => {
	const dispatch = useDispatch();
	const toasterMessage = useSelector((state: IStore) => state.common.toasterMessage);
	return (
		<ToastContainer
			className='p-3 toaster__container'
			position={position || 'bottom-end'}>
			<Toast
				autohide
				delay={4000}
				show={!!toasterMessage}
				onClose={() => dispatch(updateToasterMessage(''))}
				className='toaster'>
				<Toast.Body className='toaster-body'>
					<div className='toast__body-content'>
						{toasterMessage}
						<img
							src={closeIcon}
							alt='close-icon'
							className='toaster__close-icon cur-pointer'
							onClick={() => dispatch(updateToasterMessage(''))}
						/>
					</div>
				</Toast.Body>
			</Toast>
		</ToastContainer>
	);
};
