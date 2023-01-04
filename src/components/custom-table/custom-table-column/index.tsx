import { useEffect, useRef, useState } from "react";
import { Button, Form, OverlayTrigger, Popover } from "react-bootstrap";
import { useDebounce } from "../../../utils";

interface ICustomTableColumn {
  columnValue: string | number;
  columnkey: number;
  isAddData: boolean;
  headerId: string;
  updateFunction: () => void;
  className?: string;
  setActiveColValue: (obj: { [key: string]: string }) => void
  isFinalColumn: boolean
}

export const CustomTableColumn = ({
  columnValue,
  columnkey,
  isAddData,
  headerId,
  updateFunction,
  className,
  setActiveColValue,
  isFinalColumn
}: ICustomTableColumn) => {

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
      type="text"
      placeholder={`${inputValue}`}
      value={isAddData ? newInputValue[headerId] : inputValue || ''}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        if (isAddData) {
          setNewInputValue({
            [headerId]: e.target.value
          })
        }
        setInputValue(e.target.value)
      }}
      onBlur={() => {
        setActiveColValue({ [headerId]: `${inputValue}`.trim() })
        !isAddData ? setInputValue(null) : !newInputValue[headerId] && setInputValue(null);
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
        inputValue ?
          <CustomInput inputKey={columnkey} /> :
          <div
            className={`${isAddData ? 'opacity-50' : ''} ${headerId !== 'id' ? 'cur-pointer' : ''}`}
            onClick={() => { if (headerId !== 'id') { setInputValue(`${columnValue}`); } }}
          >
            {`${isAddData && columnValue && !newInputValue[headerId] ? 'Add ' : ''}`}{newInputValue[headerId] || columnValue}
          </div>
      }
    </td>
  )
}