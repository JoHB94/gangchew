import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationRounded() {
  return (
    <Stack spacing={2}>
      <Pagination count={20} variant="outlined" shape="rounded" style={{backgroundcolor:"#701edb"}} />
    </Stack>
  );
}