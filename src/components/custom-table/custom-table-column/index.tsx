import { useEffect, useRef, useState } from "react";
import { Button, Form, OverlayTrigger, Popover } from "react-bootstrap";
import { useDebounce } from "../../../utils";
import { ICustomTableColumn } from "../../../types";

interface ICustomTableColumnProps {
  columnValue: string | number;
  columnkey: number;
  isAddData: boolean;
  updateFunction: () => void;
  className?: string;
  setActiveColValue: (obj: { [key: string]: string }) => void
  isFinalColumn: boolean
  currentHeader: ICustomTableColumn
}

export const CustomTableColumn = ({
  columnValue,
  columnkey,
  isAddData,
  updateFunction,
  className,
  setActiveColValue,
  isFinalColumn,
  currentHeader
}: ICustomTableColumnProps) => {

  const [inputValue, setInputValue] = useState<string | number | null>(null);
  const [newInputValue, setNewInputValue] = useState<{ [key: string]: string }>({});

  const inputRef: any = useRef(null);

  const isDeBounced = useDebounce(inputValue, 500);

  useEffect(() => {
    if (isDeBounced) {
      inputRef.current.focus();
      inputRef.current.click();
    }
  }, [isDeBounced])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputValue]);

  const inputActions = (popOverKey: string) => {
    const isShowPopOver = columnValue !== inputValue;
    return isShowPopOver ? (
      <Popover key={`popover${popOverKey}`}>
        <Popover.Header>Actions</Popover.Header>
        <Popover.Body>
          <Button variant="outline-secondary" size="sm" onMouseDown={() => { setInputValue(''); setNewInputValue({}) }} >Cancel</Button>
          <Button
            variant="outline-success"
            size="sm"
            onMouseDown={updateFunction}
          >
            Save
          </Button>
        </Popover.Body>
      </Popover>
    ) : <></>
  }

  const renderFormControl = () => (
    <Form.Control
      ref={inputRef}
      size="sm"
      type={currentHeader.type}
      placeholder={`${inputValue}`}
      value={isAddData ? newInputValue[currentHeader.identifier] : inputValue || ''}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        if (isAddData) {
          setNewInputValue({
            [currentHeader.identifier]: e.target.value.trimStart()
          })
        }
        setInputValue(e.target.value)
      }}
      onBlur={() => {
        setActiveColValue({ [currentHeader.identifier]: `${inputValue}`.trim() })
        !isAddData ? setInputValue(null) : !newInputValue[currentHeader.identifier] && setInputValue(null);
      }}
    />
  )

  const CustomInput = ({ inputKey }: any) => {
    return isAddData && !isFinalColumn ? renderFormControl() : (
      <OverlayTrigger trigger={'click'} placement={!isAddData ? 'top' : 'right-end'} overlay={inputActions(inputKey)} >
        {renderFormControl()}
      </OverlayTrigger>
    )
  }

  return (
    <td className={className} >
      {
        inputValue !== null ?
          <CustomInput inputKey={columnkey} /> :
          <div
            className={`${isAddData ? 'opacity-50' : ''} ${currentHeader.visible ? 'cur-pointer' : ''}`}
            onClick={() => { if (currentHeader.visible) { setInputValue(`${columnValue}`); } }}
          >
            {`${isAddData && columnValue && !newInputValue[currentHeader.identifier] ? 'Add ' : ''}`}
            {newInputValue[currentHeader.identifier] || columnValue}
          </div>
      }
    </td>
  )
}