import { useEffect, useState } from 'react';
import { Form, OverlayTrigger, Popover, Button } from 'react-bootstrap';
import { ICustomIndexedTableBody, ICustomTableHeaderTypes } from '../../../types';
import { useDebounce } from '../../../utils';

interface ICustomCellProps<T> {
  isNewCell?: boolean;
  header: ICustomTableHeaderTypes;
  data: T;
  handleColumnUpdate: (props: T) => void;
  isDataResetEnabled: boolean;
  setResetData: () => void;
  setNewData: React.Dispatch<React.SetStateAction<{}>>
}


export const CustomCell = <T extends ICustomIndexedTableBody>({ isNewCell, header, data, handleColumnUpdate, isDataResetEnabled, setResetData, setNewData }: ICustomCellProps<T>) => {

  const [activeInputField, setInputFieldState] = useState('');

  const [activeFieldValue, setActiveFieldValue] = useState<string | number>('');

  const [enablePopOver, setPopOverState] = useState(false);

  const isDebounceValid = useDebounce(activeFieldValue, 600);

  useEffect(() => {
    if (activeInputField) {
      if (data[header.value] === activeFieldValue || (!data[header.value] && !activeFieldValue)) {
        setPopOverState(false);
      }
      else {
        if (isNewCell && header.isLastColumn) {
          setPopOverState(true);
        } else if (!isNewCell) {
          setPopOverState(true);
        } else {
          setPopOverState(false);
        }
      }
    }
  }, [isDebounceValid, activeInputField])

  const stateReset = () => {
    setInputFieldState('');
    setActiveFieldValue('');
    setPopOverState(false);
  }

  useEffect(() => {
    if (isDataResetEnabled) {
      stateReset();
      setResetData();
    }
  }, [isDataResetEnabled])

  const popover = (
    <Popover id='popover-basic'>
      <Popover.Body className='popover-body'>
        <Button
          className='popover_button'
          variant='light'
          onMouseDown={() => {
            stateReset();
          }}>
          Cancel
        </Button>
        <Button
          className='popover_button'
          variant='success'
          onMouseDown={() => {
            handleColumnUpdate({
              ...data,
              [activeInputField]: activeFieldValue
            });
            stateReset();
          }}>
          Save
        </Button>
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger show={enablePopOver} trigger='click' placement={header.isLastColumn && isNewCell ? 'right' : 'top'} overlay={popover}>

      <td
        className={`${isNewCell ? 'opacity-50' : ''} ${header.isReadOnly ? '' : 'cur-pointer'}`}
        onClick={() => {
          if (!header.isReadOnly && !activeInputField) {
            setInputFieldState(header.value);
            setActiveFieldValue(data[header.value] || '');
            setPopOverState(true);
          }
        }}
      >
        {activeInputField ?
          <Form.Control
            type={header.fieldType}
            autoFocus
            size='sm'
            value={activeFieldValue}
            onChange={(e) => {
              const re = /^[+0-9\b]+$/;
              setPopOverState(false);
              if (re.test(e.target.value) && header.isNumberOnly) {
                setActiveFieldValue(e.target.value);
              }
              else if (!header.isNumberOnly) {
                setActiveFieldValue(e.target.value);
              }
            }}
            placeholder={header.palceHolder}
            onBlur={() => {
              if (isNewCell && activeFieldValue) {
                if (header.isLastColumn) {
                  setPopOverState(false);
                }
              } else {
                stateReset();
              }

              if (isNewCell && activeFieldValue) {
                setNewData({ [activeInputField]: activeFieldValue });
              }
            }
            }
          />
          : <div>
            {isNewCell ? header.palceHolder : data[header.value]}
          </div>}
      </td>

    </OverlayTrigger>
  )
}