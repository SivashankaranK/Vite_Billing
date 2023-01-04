import { useEffect, useMemo, useState } from "react";
import { ICustomIndexedTableBody, ICustomTableColumn } from "../../../types"
import { CustomTableColumn } from "../custom-table-column";

interface ICustomTableRowProps<T> {
  data: T
  identifiers: ICustomTableColumn[];
  rowIndex: number
}

export const CustomTableRow = <T extends ICustomIndexedTableBody>({ data, identifiers, rowIndex }: ICustomTableRowProps<T>) => {
  const [rowData, setRowData] = useState<T>(data);

  const updateFunction = () => {
    if (doValidate()) {
      console.log('rowData-->', rowData)
      alert('updated')
    } else {
      alert('invalid')
    }
  }

  const doValidate = () => {
    let isValid = false;
    if ((identifiers.length - 1) === Object.keys(rowData).length) {
      Object.keys(rowData).map((key) => {
        if (!rowData[key]) {
          isValid = false;
        } else {
          isValid = true;
        }
      })
    } else {
      isValid = false;
    }
    return isValid
  }

  return (
    <tr>
      {
        identifiers.map((col, colIndex) => {
          return (
            <CustomTableColumn
              key={`CustomTableColumn${colIndex}`}
              columnkey={colIndex}
              value={rowIndex === -1 ? colIndex ? col.label : '' : data[col.identifier] || ''}
              isCreateCell={rowIndex === -1}
              headerId={col.identifier}
              updateFunction={updateFunction}
              setActiveColValue={(obj) => setRowData({ ...rowData, ...obj })}
              isFinalColumn={colIndex - identifiers.length === -1 ? true : false}
            />
          )
        })
      }
    </tr>
  )
}