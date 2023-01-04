import { useEffect, useRef, useState } from "react";
import { Button, Form, OverlayTrigger, Popover } from "react-bootstrap";
import { useDebounce } from "../../../utils";

interface ICustomTableColumn {
  value: string | number;
  columnkey: number;
  isCreateCell: boolean;
  headerId: string;
  updateFunction: (key: string, value: string) => void;
  colSpan?: number;
  className?: string;

}

export const CustomTableColumn = ({ value, columnkey, isCreateCell, headerId, updateFunction, colSpan, className }: ICustomTableColumn) => {

  const [activeColValue, setActiveCol] = useState<string>('');
  const [createCell, setCreateCell] = useState<{ [key: string]: string }>({});

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
          <Button variant="outline-secondary" size="sm" >Cancel</Button>
          <Button variant="outline-success" size="sm" onMouseDown={() => updateFunction(headerId, activeColValue)}>Save</Button>
        </Popover.Body>
      </Popover>
    )
  }

  const CustomInput = ({ inputKey }: any) => {

    return (
      <OverlayTrigger trigger={'click'} placement={'top'} overlay={inputActions(inputKey)} >
        <Form.Control
          ref={inputRef}
          size="sm"
          type="text"
          placeholder={activeColValue}
          value={isCreateCell ? createCell[headerId] : activeColValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (isCreateCell) {
              setCreateCell({
                ...createCell,
                [headerId]: e.target.value
              })
            }
            setActiveCol(e.target.value)
          }}
          onBlur={() => {
            setActiveCol('');
          }}
        />
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
            {`${isCreateCell && value ? 'Add ' : ''}`}{value}
          </div>
      }
    </td>
  )
}