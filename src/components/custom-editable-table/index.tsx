import { useState } from 'react'
import { Table } from 'react-bootstrap'
import { ICustomIndexedTableBody, ICustomTableHeaderTypes } from '../../types/custom-table'
import { CustomRow } from './custom-row'

interface ICustomTableProps<T> {
  headers: ICustomTableHeaderTypes[]
  data: T[]
  handleApiCall: (dataObj: any) => void
}
export const CustomEditableTable = <T extends ICustomIndexedTableBody>({ data, headers, handleApiCall }: ICustomTableProps<T>) => {
  return data && data.length === 0 ? (
    <div className='no-data'>No data Found...</div>
  ) : (
    <Table className='common-table'>
      <thead className='table-head'>
        <tr>
          {headers.map((col, index) => {
            return <th key={`tableHeader${index}`}>{col.label}</th>
          })}
        </tr>
      </thead>
      <tbody className='table-body'>
        {/* New Row */}
        <CustomRow isCreateNewRow headers={headers} data={{}} handleApiCall={handleApiCall} />

        {/* Data  Binding */}
        {data.map((iterate, dIndex) => {
          return <CustomRow<T> key={`tablRow${dIndex}`} data={iterate} headers={headers} handleApiCall={handleApiCall} />
        })}
      </tbody>
    </Table>
  )
}
