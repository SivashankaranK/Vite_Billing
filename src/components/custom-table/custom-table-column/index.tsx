import { useEffect, useRef, useState } from "react";
import { Button, Form, OverlayTrigger, Popover } from "react-bootstrap";

interface ICustomTableColumn {
  value: string | number;
  columnkey: number;
  isCreateCell: boolean;
  colSpan?: number;
  className?: string;

}

export const CustomTableColumn = ({ value, columnkey, isCreateCell, colSpan, className }: ICustomTableColumn) => {

  const [activeColValue, setActiveCol] = useState<string>('');

  const inputRef: any = useRef(null);


  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.click();
    }
  }, [activeColValue]);

  const inputActions = (popOverKey: string) => {
    return (
      <Popover key={`popover${popOverKey}`}>
        <Popover.Header>Actions</Popover.Header>
        <Popover.Body>
          <Button variant="outline-secondary" size="sm" key={`popoverCancel${popOverKey}`}>Cancel</Button>
          <Button variant="outline-success" size="sm" key={`popoverSave${popOverKey}`}>Save</Button>
        </Popover.Body>
      </Popover>
    )
  }

  const CustomInput = ({ inputKey }: any) => {

    return (
      <OverlayTrigger trigger={'click'} placement={'top'} overlay={inputActions(inputKey)} key={`overLay${inputKey}`} >
        <Form.Control
          ref={inputRef}
          size="sm"
          type="text"
          placeholder={activeColValue}
          value={isCreateCell ? '' : activeColValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setActiveCol(e.target.value)
          }}
          onBlur={() => {
            setActiveCol('')
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
          <span
            className={isCreateCell ? 'opacity-50' : ''}
            onClick={() => { setActiveCol(`${value}`) }}
          >
            {`${isCreateCell && value ? 'Add ' : ''}`}{value}
          </span>
      }
    </td>
  )
}