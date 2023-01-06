import { useState } from 'react'
import { ICustomIndexedTableBody, ICustomTableHeaderTypes } from '../../../types'
import { CustomCell } from '../custom-cell'

interface ICustomRowProsp<T> {
  isCreateNewRow?: boolean
  headers: ICustomTableHeaderTypes[]
  data: T
  handleApiCall: (dataObj: any) => void
}

export const CustomRow = <T extends ICustomIndexedTableBody>({ data, isCreateNewRow, headers, handleApiCall }: ICustomRowProsp<T>) => {
  const [isNewDataReseted, setResetData] = useState(false)
  const [newData, setNewData] = useState({})

  const handleColumnUpdate = (value: T) => {
    const dataObj = { ...value, ...newData }

    const inputValidation = headers.filter((it) => {
      return dataObj[it.value] === undefined && !it.isReadOnly
    })
    if (inputValidation.length) {
      console.log('Error Occured', inputValidation)
    } else {
      handleApiCall(dataObj)
      setResetData(true)
      setNewData({})
    }
  }

  return (
    <tr className='table-row'>
      {headers.map((hIt, hIndex) => {
        return (
          <CustomCell<T>
            key={`table cell${hIndex}`}
            isNewCell={isCreateNewRow}
            header={hIt}
            data={data}
            handleColumnUpdate={handleColumnUpdate}
            isDataResetEnabled={isNewDataReseted}
            setResetData={() => setResetData(false)}
            setNewData={setNewData}
          />
        )
      })}
    </tr>
  )
}
