import { useEffect, useRef, useState } from "react";
import { Button, Form, OverlayTrigger, Popover } from "react-bootstrap";
import { useDebounce } from "../../../utils";

interface ICustomTableColumn {
  value: string | number;
  columnkey: number;
  isCreateCell: boolean;
  headerId: string;
  updateFunction: () => void;
  colSpan?: number;
  className?: string;
  setActiveColValue: (obj: { [key: string]: string }) => void
  isFinalColumn: boolean
}

export const CustomTableColumn = ({
  value,
  columnkey,
  isCreateCell,
  headerId,
  updateFunction,
  colSpan,
  className,
  setActiveColValue,
  isFinalColumn
}: ICustomTableColumn) => {

  const [activeColValue, setActiveCol] = useState<string>('');
  const [newData, setNewData] = useState<{ [key: string]: string }>({});

  const inputRef: any = useRef(null);

  const debouncedSearchTerm = useDebounce(activeColValue, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      inputRef.current.focus();
      inputRef.current.click();
    }
  }, [debouncedSearchTerm])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [activeColValue]);

  const inputActions = (popOverKey: string) => {
    return (
      <Popover key={`popover${popOverKey}`}>
        <Popover.Header>Actions</Popover.Header>
        <Popover.Body>
          <Button variant="outline-secondary" size="sm" onMouseDown={() => { setActiveCol(''); setNewData({}) }} >Cancel</Button>
          <Button
            variant="outline-success"
            size="sm"
            onMouseDown={updateFunction}
          >
            Save
          </Button>
        </Popover.Body>
      </Popover>
    )
  }

  const renderFormControl = () => (
    <Form.Control
      ref={inputRef}
      size="sm"
      type="text"
      placeholder={activeColValue}
      value={isCreateCell ? newData[headerId] : activeColValue}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        if (isCreateCell) {
          setNewData({
            [headerId]: e.target.value
          })
        }
        setActiveCol(e.target.value)
      }}
      onBlur={() => {
        setActiveColValue({ [headerId]: activeColValue })
        !isCreateCell && setActiveCol('');
      }}
    />
  )

  const CustomInput = ({ inputKey }: any) => {
    return isCreateCell && !isFinalColumn ? renderFormControl() : (
      <OverlayTrigger trigger={'click'} placement={!isFinalColumn ? 'top' : 'right-end'} overlay={inputActions(inputKey)} >
        {renderFormControl()}
      </OverlayTrigger>
    )
  }

  return (
    <td colSpan={colSpan} className={className} >
      {
        activeColValue ?
          <CustomInput inputKey={columnkey} /> :
          <div
            className={`${isCreateCell ? 'opacity-50' : ''} ${headerId !== 'id' ? 'cur-pointer' : ''}`}
            onClick={() => { if (headerId !== 'id') { setActiveCol(`${value}`); } }}
          >
            {`${isCreateCell && value && !newData[headerId] ? 'Add ' : ''}`}{newData[headerId] || value}
          </div>
      }
    </td>
  )
}