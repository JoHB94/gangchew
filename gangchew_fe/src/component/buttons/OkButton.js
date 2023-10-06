import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function OkButton() {
  return (
    <Stack spacing={2} direction="row">
      
      <Button variant="contained" style={{color :'#701edb'}}>확인</Button>
      
    </Stack>
  );
}