import { useState } from "react";
import { ICustomIndexedTableBody, ICustomTableHeaderTypes } from "../../../types";
import { CustomCell } from "../custom-cell";

interface ICustomRowProsp<T> {
  isCreateNewRow?: boolean;
  headers: ICustomTableHeaderTypes[];
  data: T;
}

export const CustomRow = <T extends ICustomIndexedTableBody>({ data, isCreateNewRow, headers }: ICustomRowProsp<T>) => {

  const [resetData, setResetData] = useState(false);

  const [newData, setNewData] = useState({});
  const handleColumnUpdate = (data: T) => {
    console.log('data', data);
    console.log('newData', newData);
    setResetData(true);
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