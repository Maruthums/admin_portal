import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export default function CustomGrid() {
  const [nbRows, setNbRows] = React.useState(3);
  // Custom column definitions
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'family', headerName: 'Family Member', flex: 1 },
    {
      field: 'image',
      headerName: 'Image',
      flex: 1,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="user"
          width={40}
          height={40}
          style={{ borderRadius: '50%' }}
        />
      ),
    },
    { field: 'paid', headerName: 'Paid Amount', flex: 1 },
    { field: 'pending', headerName: 'Pending Amount', flex: 1 },
  ];

  // Example data
  const rows = [
    {
      id: 1,
      name: 'Arun',
      family: '4',
      image: 'https://i.pravatar.cc/40?img=1',
      paid: '₹5,000',
      pending: '₹2,000',
    },
    {
      id: 2,
      name: 'Divya',
      family: '3',
      image: 'https://i.pravatar.cc/40?img=2',
      paid: '₹3,500',
      pending: '₹1,500',
    },
    {
      id: 3,
      name: 'Kumar',
      family: '5',
      image: 'https://i.pravatar.cc/40?img=3',
      paid: '₹7,000',
      pending: '₹0',
    },
  ];

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <DataGrid
        autoHeight
        rows={rows.slice(0, nbRows)}
        columns={columns}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
