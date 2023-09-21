import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';

const columns: GridColDef[] = [
  { field: 'ID', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'email', headerName: 'Mail', width: 130 },
  { field: 'role', headerName: 'Role', width: 130 },
];

export default function UserTable() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/users') 
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Ошибка при получении данных:', error);
      });
  }, []);

  return (
    <div style={{ height: 400,marginTop:'100px', width: '100%',backgroundColor:'grey'}}>
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.ID} 
        autoPageSize
        pageSizeOptions={[5, 10]}
        checkboxSelection
/>
    </div>
  );
}