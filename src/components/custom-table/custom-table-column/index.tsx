import { useState } from "react";
import { Button, Form, OverlayTrigger, Popover } from "react-bootstrap";

interface ICustomTableColumn {
  value: React.ReactNode;
  columnkey: string;
  readonly: boolean;
  colSpan?: number;
  className?: string;

}
export const CustomTableColumn = ({ value, columnkey, readonly, colSpan, className }: ICustomTableColumn) => {
  const [editable, setEditable] = useState(false);
  const [inputValue, setInputValue] = useState(`${value}`);

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
          type="text"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value)
          }}
          onBlur={() => {
            setEditable(false)
          }}
        />
      </OverlayTrigger>
    )
  }
  return (
    <td key={columnkey} colSpan={colSpan} className={className}>
      {
        editable && !readonly ?
          (<CustomInput inputKey={columnkey} />) :
          (<span onClick={() => setEditable(true)}>{inputValue}</span>)
      }
    </td>
  )
}