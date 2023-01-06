import { useEffect, useState } from 'react'
import { Form, OverlayTrigger, Popover, Button } from 'react-bootstrap'
import { ICustomIndexedTableBody, ICustomTableHeaderTypes } from '../../../types'
import { useDebounce } from '../../../utils'

interface ICustomCellProps<T> {
  isNewCell?: boolean;
  header: ICustomTableHeaderTypes;
  data: T;
  handleColumnUpdate: (props: T) => void;
  isDataResetEnabled: boolean;
  setResetData: () => void;
  setNewData: React.Dispatch<React.SetStateAction<{}>>;
}

export const CustomCell = <T extends ICustomIndexedTableBody>({
  isNewCell,
  header,
  data,
  handleColumnUpdate,
  isDataResetEnabled,
  setResetData,
  setNewData,
}: ICustomCellProps<T>) => {

  const [isFieldActive, setActiveField] = useState(false);

  const [activeFieldValue, setActiveFieldValue] = useState<string | number>('');

  const [enablePopOver, setPopOverState] = useState(false);

  const isDebounceValid = useDebounce(activeFieldValue, 600);

  useEffect(() => {
    if (isFieldActive) {
      if (data[header.value] === activeFieldValue || (!data[header.value] && !activeFieldValue)) {
        setPopOverState(false)
      } else {
        if (isNewCell && header.isLastColumn) {
          setPopOverState(true)
        } else if (!isNewCell) {
          setPopOverState(true)
        } else {
          setPopOverState(false)
        }
      }
    }
  }, [isDebounceValid, isFieldActive])

  const stateReset = () => {
    setActiveField(false)
    setActiveFieldValue('')
    setPopOverState(false)
  }

  useEffect(() => {
    if (isDataResetEnabled) {
      stateReset()
      setResetData()
    }
  }, [isDataResetEnabled])

  const popover = (
    <Popover id='popover-basic'>
      <Popover.Body className='popover-body'>
        <Button
          className='popover_button'
          variant='light'
          onMouseDown={() => {
            stateReset()
          }}
        >
          Cancel
        </Button>
        <Button
          className='popover_button'
          variant='success'
          onMouseDown={() => {
            handleColumnUpdate({
              ...data,
              [header.value]: activeFieldValue,
            })
            stateReset()
          }}
        >
          Save
        </Button>
      </Popover.Body>
    </Popover>
  )

  return (
    <OverlayTrigger show={enablePopOver} trigger='click' placement={header.isLastColumn && isNewCell ? 'right' : 'top'} overlay={popover}>
      <td
        className={`${isNewCell ? 'opacity-50' : ''} ${header.isReadOnly ? '' : 'cur-pointer'}`}
        onClick={() => {
          if (!header.isReadOnly && !isFieldActive) {
            setActiveField(true)
            setActiveFieldValue(data[header.value] || '')
            setPopOverState(true)
          }
          if (isNewCell && activeFieldValue && header.isLastColumn) {
            setPopOverState(true);
          }
        }}
      >
        {isFieldActive ? (
          <Form.Control
            type={header.fieldType}
            autoFocus
            size='sm'
            value={activeFieldValue}
            onChange={(e) => {
              const re = /^[+0-9\b]+$/
              setPopOverState(false)
              if (re.test(e.target.value) && header.isNumberOnly) {
                setActiveFieldValue(e.target.value)
              } else if (!header.isNumberOnly) {
                setActiveFieldValue(e.target.value)
              }
            }}
            placeholder={header.palceHolder}
            onBlur={() => {
              if (isNewCell && activeFieldValue) {
                if (header.isLastColumn) {
                  setPopOverState(false)
                }
              } else {
                stateReset()
              }

              if (isNewCell && activeFieldValue) {
                setNewData({ [header.value]: activeFieldValue })
              }
            }}
          />
        ) : (
          <div>{isNewCell ? header.palceHolder : data[header.value]}</div>
        )}
      </td>
    </OverlayTrigger>
  )
}
