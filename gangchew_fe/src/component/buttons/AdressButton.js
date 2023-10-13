import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function AddressButton() {
  return (
    <Stack spacing={2} direction="row">
      
      <Button variant="contained" style={{backgroundColor: '#701edb', color:'#FFFFFF', height:"100%"}}>
        <span style={{marginTop:"9px",marginBottom:"9px"}}>주소 입력</span>
        </Button>
      
    </Stack>
  );
}