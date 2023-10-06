import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function CancelButton() {
  return (
    <Stack spacing={2} direction="row">
      
      <Button variant="outlined" color='error'>취소</Button>
      
    </Stack>
  );
}