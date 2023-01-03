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
          identifiers={headers}
          data={{}}
          rowIndex={-1}
        />
        {
          data.map((row, rowIndex) => {
            return (
              <CustomTableRow
                key={`CustomTableRow${rowIndex}`}
                identifiers={headers}
                data={row}
                rowIndex={rowIndex}
              />
            )
          })
        }
      </tbody>
    </Table>
  )
}