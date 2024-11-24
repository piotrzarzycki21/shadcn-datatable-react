import { useState } from 'react';
import { EditableDataTable } from './components/dataTable/editable-data-table';
import { columns as SimpleColumns } from './components/dataTable/columns/simple-columns';
import { columns as EditableColumns } from './components/dataTable/columns/editable-columns';

import { User } from '@/models/core';
import { Button } from './components/shadcn/button';

function App() {
  const [tableData, setTableData] = useState<User[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'XH0Eo@example.com',
      age: 30,
    },
    {
      id: 2,
      name: 'Jane Doe',
      email: 't2h1l@example.com',
      age: 25,
    },
  ]);

  const [tableData2, setTableData2] = useState<User[]>([]);

  function onAddUser(): void {
    const newUser: User = {
      id: tableData2.length + 1,
      name: '',
      email: '',
      age: 0,
    };
    setTableData2((old: User[]) => [...old, newUser]);
  }

  return (
    <div className="m-10 mx-auto flex max-w-3xl flex-col items-center justify-center space-y-4 rounded-lg bg-gray-100 p-4 shadow-lg">
      <h1 className="text-2xl font-semibold">Table 1</h1>
      <EditableDataTable 
      className="max-h-[290px]"
      columns={
        SimpleColumns
      }
      data={tableData}
      showPaginationWhen={2}
      setData={setTableData}/>
      <h1 className="text-2xl font-semibold">Table 2</h1>
      <EditableDataTable 
      className="max-h-[290px] w-full"
      columns={
        EditableColumns
      }
      data={tableData2}
      showPaginationWhen={4}
      setData={setTableData2}/>
      <div className='flex w-full'>
        <Button onClick={onAddUser}>Add User</Button>
      </div>
    </div>
  );
}

export default App;
