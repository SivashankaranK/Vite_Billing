import { Col, Container, Row } from "react-bootstrap";
import { CustomEditableTable } from "../../components";
import { ICustomTableHeaderTypes } from "../../types";

const GeneralOrders = () => {

  const createUpdateOrders = (dataObj: any) => {
    console.log('dataObj', dataObj)
  }

  const generalOrderHeaders: ICustomTableHeaderTypes[] = [
    {
      label: 'S.No',
      value: 'sno',
      fieldType: 'number',
      isReadOnly: true,
      palceHolder: ''
    },
    {
      label: 'Name',
      value: 'name',
      fieldType: 'string',
      palceHolder: 'Enter Customer name',
      // isLastColumn: true,
      // isReadOnly: true
    },
    {
      label: 'Items',
      value: 'items',
      fieldType: 'string',
      palceHolder: 'Select Item',
      cellType: 'Dropdown',
      isLastColumn: true
    }
  ];

  return (
    <Container>
      <Row>
        <Col>
          <h3>Items</h3>
          <hr />
        </Col>
      </Row>
      <Row>
        <Col>
          <CustomEditableTable<any>
            data={[]}
            headers={generalOrderHeaders}
            handleUpdate={createUpdateOrders}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default GeneralOrders;