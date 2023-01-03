import { useState } from "react";
import { ICustomIndexedTableBody, ICustomTableColumn } from "../../../types"
import { CustomTableColumn } from "../custom-table-column";

interface ICustomTableRowProps<T> extends ICustomTableEmptyRowProps {
  data: T
  identifiers: ICustomTableColumn[];
  rowIndex: number
}
interface ICustomTableEmptyRowProps {
  emptyRow?: boolean;
  emptyRowDisplayText?: string;
}
export const CustomTableRow = <T extends ICustomIndexedTableBody>({ data, identifiers, rowIndex, emptyRow, emptyRowDisplayText }: ICustomTableRowProps<T>) => {
  const [addNew, setAddNew] = useState();
  return (
    <tr key={`tr${rowIndex}`}>
      {
        emptyRow ? (
          <CustomTableColumn
            key={`td${rowIndex}${-1}`}
            columnkey={`td${rowIndex}${-1}`}
            value={emptyRowDisplayText}
            readonly={true}
            colSpan={identifiers.length}
            className={'text-center'}
          />
        ) : (identifiers.map((col, colIndex) => {
          return (
            <CustomTableColumn
              key={`td${rowIndex}${colIndex}`}
              columnkey={`td${rowIndex}${colIndex}`}
              value={data[col.identifier]}
              readonly={col.identifier === 'id'} />
          )
        }))
      }
    </tr>
  )
}