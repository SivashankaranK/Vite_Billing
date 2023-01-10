import { Table } from 'react-bootstrap';
import { ICustomIndexedTableBody, ICustomTableHeaderTypes } from '../../types/custom-table';
import { CustomRow } from './custom-row';

interface ICustomTableProps<T> {
  headers: ICustomTableHeaderTypes[];
  data: T[];
  handleUpdate: (dataObj: any) => void;
}
export const CustomEditableTable = <T extends ICustomIndexedTableBody>({ data, headers, handleUpdate }: ICustomTableProps<T>) => {
  const ObjForCreateNewData = () => {
    let Obj: any = {};
    for (const key of headers) {
      Obj[key.value] = '';
    }
    return Obj;
  };
  return (
    <Table
      className='common-table'
      bordered>
      <thead className='table-head'>
        <tr>
          {headers.map((col, index) => {
            return <th key={`tableHeader${index}`}>{col.label}</th>;
          })}
        </tr>
      </thead>
      <tbody className='table-body'>
        {/* New Row */}
        <CustomRow
          isCreateNewRow
          headers={headers}
          data={ObjForCreateNewData()}
          handleUpdate={handleUpdate}
        />

        <>
          {data && data.length === 0 ? (
            <tr className='table-row'>
              <td
                colSpan={headers.length}
                className='text-center'>
                No data found...
              </td>
            </tr>
          ) : (
            data.map((iterate, dIndex) => {
              return (
                <CustomRow<T>
                  key={`tablRow${dIndex}`}
                  data={iterate}
                  headers={headers}
                  handleUpdate={handleUpdate}
                />
              );
            })
          )}
        </>
      </tbody>
    </Table>
  );
};
