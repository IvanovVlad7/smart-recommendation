import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { Box } from '@mui/material';


const columns: GridColDef[] = [
  { field: 'ID', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'email', headerName: 'Email', width: 300 },
  { field: 'role', headerName: 'Role', width: 130 },
];

export const AdminPanel = () => {
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
    <Box sx={{ background: 'primary.main', pt: 10, height: 'fit-content' }}>
      <DataGrid
        sx={{ 
          boxShadow: 3,
          m: 5,
          background: '#fff',
          minHeight: 200,
          height: 'fit-content'
        }}
        rows={users}
        columns={columns}
        getRowId={(row) => row.ID} 
        autoPageSize
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </Box>
  );
}