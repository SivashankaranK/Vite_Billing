import { Toast, ToastContainer, ToastProps } from "react-bootstrap"
import { ToastPosition } from 'react-bootstrap/ToastContainer'
import closeIcon from '../../assets/icons/close.svg'

interface IToastifierProps {
  enabled: boolean;
  message: string;
  setToasterState: () => void;
  position?: ToastPosition;
  delay?: number;
}

export const Toastifier = ({ enabled, message, setToasterState, position }: IToastifierProps) => {
  return (
    <ToastContainer className="p-3 toaster__container" position={position || 'bottom-end'}>
      <Toast autohide delay={4000} show={enabled} onClose={setToasterState} className='toaster'>
        <Toast.Body className="toaster-body">
          <div className='toast__body-content'>
            {message}
            <img src={closeIcon} alt='close-icon'  className='toaster__close-icon cur-pointer' onClick={setToasterState}/>
          </div>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  )
}