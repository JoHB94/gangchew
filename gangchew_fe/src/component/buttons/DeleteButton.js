import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


export default function DeleteButton() {
 

  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained" style={{ color: '#fff', background: '#000' }} >
        삭제
      </Button>
    </Stack>
  );
}