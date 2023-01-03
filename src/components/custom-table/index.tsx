import { Table } from "react-bootstrap"
import { ICustomIndexedTableBody, ICustomTableColumn } from "../../types/custom-table"
import { CustomTableRow } from "./cusotm-table-row";

interface ICustomTableProps<T> {
  headers: ICustomTableColumn[];
  data: T[];
}
export const CustomTable = <T extends ICustomIndexedTableBody>({ data, headers }: ICustomTableProps<T>) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {
            headers.map((col, index) => {
              return (
                <th key={`tableHeader${index}`}>{col.label}</th>
              )
            })
          }
        </tr>
      </thead>
      <tbody>
        <CustomTableRow
          key={-1}
          data={{}}
          identifiers={headers}
          rowIndex={-1}
          emptyRow={true}
          emptyRowDisplayText='+ Add Customer'
        />
        {
          data.map((row, rowIndex) => {
            return (
              <CustomTableRow key={rowIndex} data={row} identifiers={headers} rowIndex={rowIndex} />
            )
          })
        }
      </tbody>
    </Table>
  )
}