import { useMemo, useState } from "react";
import { ICustomIndexedTableBody, ICustomTableColumn } from "../../../types"
import { CustomTableColumn } from "../custom-table-column";

interface ICustomTableRowProps<T> {
  data: T
  identifiers: ICustomTableColumn[];
  rowIndex: number
}

export const CustomTableRow = <T extends ICustomIndexedTableBody>({ data, identifiers, rowIndex }: ICustomTableRowProps<T>) => {
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
            />
          )
        })
      }
    </tr>
  )
}