import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import SampleTable from './SampleTable';

export default function CustomGrid() {
  const { list
  } = useSelector(({ user }: any) => user);

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <SampleTable header={['No', 'Name', 'Family Member', 'Image']} data={list?.data} />
    </Box>
  );
}
