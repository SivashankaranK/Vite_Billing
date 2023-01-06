import { useState } from 'react'
import { ICustomIndexedTableBody, ICustomTableHeaderTypes } from '../../../types'
import { CustomCell } from '../custom-cell'
import { useDispatch } from 'react-redux'

interface ICustomRowProsp<T> {
  isCreateNewRow?: boolean
  headers: ICustomTableHeaderTypes[]
  data: T
  handleApiCall: (dataObj: any) => void
}

export const CustomRow = <T extends ICustomIndexedTableBody>({ data, isCreateNewRow, headers, handleApiCall }: ICustomRowProsp<T>) => {
  const dispatch = useDispatch()
  const [resetData, setResetData] = useState(false)

  const [newData, setNewData] = useState({})
  const handleColumnUpdate = (props: T) => {
    const dataObj = { ...data, ...props, ...newData }
    handleApiCall(dataObj)
    console.log('props')
    setResetData(true)
  }

  return (
    <tr>
      {headers.map((hIt, hIndex) => {
        return (
          <CustomCell<T>
            key={`table cell${hIndex}`}
            isNewCell={isCreateNewRow}
            header={hIt}
            data={data}
            handleColumnUpdate={handleColumnUpdate}
            isDataReset={resetData}
            setResetData={() => setResetData(false)}
            setNewData={setNewData}
          />
        )
      })}
    </tr>
  )
}
