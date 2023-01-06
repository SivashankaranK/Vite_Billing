import { useState } from 'react'
import { Table } from 'react-bootstrap'
import { ICustomIndexedTableBody, ICustomTableHeaderTypes } from '../../types/custom-table'
import { CustomRow } from './custom-row'

interface ICustomTableProps<T> {
  headers: ICustomTableHeaderTypes[]
  data: T[]
  handleApiCall: (dataObj: any) => void
}
export const CustomTable = <T extends ICustomIndexedTableBody>({ data, headers, handleApiCall }: ICustomTableProps<T>) => {
  return (
    <Table striped bordered>
      <thead>
        <tr>
          {headers.map((col, index) => {
            return <th key={`tableHeader${index}`}>{col.label}</th>
          })}
        </tr>
      </thead>
      <tbody>
        {/* New Row */}
        <CustomRow isCreateNewRow headers={headers} data={{}} handleApiCall={handleApiCall} />

        {/* Data  Binding */}
        {data.map((iterate, dIndex) => {
          return <CustomRow<T> data={iterate} headers={headers} key={dIndex} handleApiCall={handleApiCall} />
        })}
      </tbody>
    </Table>
  )
}
