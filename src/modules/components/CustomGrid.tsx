import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';

export default function CustomGrid() {
  const {list
} = useSelector(({user}: any)=> user)
  console.log('state', list);
  
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
            src={params?.value}
          width={40}
          height={40}
        style={{objectFit:'contain', borderRadius: "50%"}}
  alt="Drive image"
/>

      ),
    },
  ];

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      {list?.data?.length > 0 &&
      <DataGrid
        autoHeight
        rows={list?.data?.slice(0, nbRows)}
        columns={columns}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
}
    </Box>
  );
}
